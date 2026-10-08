import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { commands, matches, type Ctx } from '@/lib/commands';

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const [out, setOut] = useState<string[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const list = useMemo(() => commands.filter((c) => matches(c, q)), [q]);

  useEffect(() => {
    if (!open) return;
    setQ(''); setI(0); setOut([]);
    const id = setTimeout(() => input.current?.focus(), 0);
    return () => clearTimeout(id);
  }, [open]);

  if (!open) return null;

  const ctx: Ctx = {
    navigate: (to) => { nav(to); onClose(); },
    open: (url) => { window.open(url, '_blank', 'noopener'); onClose(); },
    print: setOut,
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') { e.preventDefault(); setI((n) => Math.min(n + 1, list.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setI((n) => Math.max(n - 1, 0)); }
    else if (e.key === 'Enter') list[i]?.run(ctx);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[18vh]"
         onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-label="Command palette"
           className="w-full max-w-lg overflow-hidden rounded-md border border-line bg-surface font-mono text-sm shadow-2xl">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="text-accent">$</span>
          <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setI(0); setOut([]); }}
                 onKeyDown={onKey} placeholder="type a command"
                 className="w-full bg-transparent text-ink outline-none placeholder:text-mute" />
        </div>
        {out.length > 0 ? (
          <pre className="m-0 whitespace-pre-wrap px-4 py-3 text-ink">{out.join('\n')}</pre>
        ) : (
          <ul className="m-0 max-h-72 list-none overflow-auto p-1">
            {list.map((c, n) => (
              <li key={c.id}>
                <button onMouseEnter={() => setI(n)} onClick={() => c.run(ctx)}
                        className={`w-full rounded px-3 py-2 text-left ${n === i ? 'bg-line text-ink' : 'text-mute'}`}>
                  {c.label}
                </button>
              </li>
            ))}
            {list.length === 0 && <li className="px-3 py-2 text-mute">command not found</li>}
          </ul>
        )}
      </div>
    </div>
  );
}
