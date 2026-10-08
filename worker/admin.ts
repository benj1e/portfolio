// Cloudflare Worker for /admin. STUB: not deployed, not tested. Read it before turning it on.
// Flow: owner signs in -> /propose (LLM turns text into new JSON) -> validated -> shown as a diff
// in the site -> /commit writes the files to GitHub -> your existing Pages workflow redeploys.
import { SiteSchema } from '../src/data/schema';

interface Env {
  ANTHROPIC_API_KEY: string;
  GITHUB_TOKEN: string; // fine-grained, contents:write on this one repo only
  GITHUB_REPO: string; // "benj1e/benj1e.github.io"
  ALLOWED_GITHUB_USER: string; // "benj1e"
  ALLOWED_ORIGIN: string; // "https://benj1e.github.io"
}
const KEYS = ['profile', 'projects', 'log', 'research'] as const;
const gh = (env: Env, path: string, init: RequestInit = {}) =>
  fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/${path}`, {
    ...init,
    headers: { authorization: `Bearer ${env.GITHUB_TOKEN}`, 'user-agent': 'site-admin', ...init.headers },
  });

// TODO: implement GitHub OAuth, store a signed session cookie, and compare the login to
// ALLOWED_GITHUB_USER. Returning false keeps every route locked until you do.
async function isOwner(_req: Request, _env: Env): Promise<boolean> {
  return false;
}

async function current(env: Env) {
  const out: Record<string, unknown> = {};
  for (const k of KEYS) {
    const r = await (await gh(env, `src/data/${k}.json`)).json<{ content: string }>();
    out[k] = JSON.parse(atob(r.content.replace(/\n/g, '')));
  }
  return out;
}

async function propose(text: string, env: Env) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-5-5',
      max_tokens: 4000,
      system:
        'You update a portfolio site. Given the current data and a request, return ONLY JSON containing the full new ' +
        'value of each collection that must change (keys: profile, projects, log, research). Never invent facts ' +
        'or metrics that the request does not state. Keep every existing field unchanged unless asked.',
      messages: [{ role: 'user', content: `Current data:\n${JSON.stringify(await current(env))}\n\nRequest:\n${text}` }],
    }),
  });
  const data = await res.json<{ content: { type: string; text: string }[] }>();
  const raw = data.content.find((c) => c.type === 'text')?.text ?? '{}';
  return SiteSchema.parse(JSON.parse(raw.replace(/```json|```/g, '').trim()));
}

async function commit(patch: unknown, env: Env) {
  const valid = SiteSchema.parse(patch);
  for (const k of Object.keys(valid) as (keyof typeof valid)[]) {
    const file = `src/data/${k}.json`;
    const { sha } = await (await gh(env, file)).json<{ sha: string }>();
    await gh(env, file, {
      method: 'PUT',
      body: JSON.stringify({
        message: `admin: update ${k}`,
        content: btoa(unescape(encodeURIComponent(JSON.stringify(valid[k], null, 2) + '\n'))),
        sha,
      }),
    });
  }
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const cors = {
      'access-control-allow-origin': env.ALLOWED_ORIGIN,
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'content-type',
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (!(await isOwner(req, env))) return new Response('unauthorized', { status: 401, headers: cors });

    const { pathname } = new URL(req.url);
    const body = (await req.json()) as { text?: string; patch?: unknown };
    if (pathname === '/propose') return Response.json({ patch: await propose(body.text ?? '', env) }, { headers: cors });
    if (pathname === '/commit') { await commit(body.patch, env); return Response.json({ ok: true }, { headers: cors }); }
    return new Response('not found', { status: 404, headers: cors });
  },
};
