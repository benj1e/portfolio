import { useMemo, useState } from 'react';
import { siteData } from '@/data';
import { ADMIN_API, commit, propose, type Patch } from '@/lib/admin';
import { diffJson } from '@/lib/diff';

export default function Admin() {
  const [text, setText] = useState('');
  const [patch, setPatch] = useState<Patch | null>(null);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const diffs = useMemo(
    () => (patch ? (Object.keys(patch) as (keyof Patch)[]).map((k) => ({ key: k, lines: diffJson(siteData[k], patch[k]) })) : []),
    [patch],
  );

  if (!ADMIN_API) {
    return (
      <p className="font-mono text-sm text-mute">
        Admin is off. Deploy worker/admin.ts and set VITE_ADMIN_API to enable it.
      </p>
    );
  }

  const run = async (fn: () => Promise<void>) => {
    setBusy(true); setMsg('');
    try { await fn(); } catch (e) { setMsg(e instanceof Error ? e.message : 'Something went wrong.'); }
    setBusy(false);
  };

  return (
    <div className="font-mono text-sm">
      <h1 className="m-0 text-xl text-accent">admin</h1>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5}
                placeholder="Describe the change. Example: added a project called X, built with Y."
                className="mt-4 w-full rounded border border-line bg-surface p-3 text-ink outline-none focus:border-accent" />
      <button disabled={busy || !text.trim()} onClick={() => run(async () => setPatch(await propose(text)))}
              className="mt-3 rounded border border-line px-3 py-2 hover:border-accent disabled:opacity-40">
        propose change
      </button>

      {diffs.map((d) => (
        <div key={d.key} className="mt-6">
          <p className="mb-2 text-mute">{d.key}.json</p>
          <pre className="m-0 max-h-80 overflow-auto rounded border border-line bg-surface p-3 text-xs leading-5">
            {d.lines.map((l, i) => (
              <div key={i} className={l.type === 'add' ? 'text-green-400' : l.type === 'del' ? 'text-red-400' : 'text-mute'}>
                {l.type === 'add' ? '+ ' : l.type === 'del' ? '- ' : '  '}{l.text}
              </div>
            ))}
          </pre>
        </div>
      ))}

      {patch && (
        <button disabled={busy} onClick={() => run(async () => { await commit(patch); setPatch(null); setText(''); setMsg('Committed. The site redeploys in about a minute.'); })}
                className="mt-4 rounded bg-accent px-3 py-2 font-medium text-bg disabled:opacity-40">
          approve and commit
        </button>
      )}
      {msg && <p className="mt-4 text-mute">{msg}</p>}
    </div>
  );
}
