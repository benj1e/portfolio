import { SiteSchema, type SiteData } from '@/data/schema';

export const ADMIN_API = import.meta.env.VITE_ADMIN_API;
export type Patch = Partial<SiteData>;

async function call(path: string, body: unknown) {
  const res = await fetch(`${ADMIN_API}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(res.status === 401 ? 'Not signed in as owner.' : `Request failed (${res.status}).`);
  return res.json();
}

// Free text in, proposed new versions of whichever collections changed out.
export async function propose(text: string): Promise<Patch> {
  const { patch } = await call('/propose', { text });
  return SiteSchema.parse(patch); // never trust the response shape
}

export async function commit(patch: Patch): Promise<void> {
  await call('/commit', { patch: SiteSchema.parse(patch) });
}
