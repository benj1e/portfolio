import { useEffect, useRef } from 'react';
import type { Project } from '@/data/schema';

const LABELS = { problem: 'Problem', decision: 'A decision I made', broke: 'What broke', result: 'Result' } as const;

export default function ProjectDrawer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    closeBtn.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  if (!project) return null;
  const cs = project.caseStudy;
  const hasCase = cs && Object.values(cs).some(Boolean);

  return (
    <div className="fixed inset-0 z-40 bg-black/60" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside role="dialog" aria-label={project.title}
             className="absolute right-0 top-0 h-full w-full max-w-md overflow-auto border-l border-line bg-surface p-8">
        <button ref={closeBtn} onClick={onClose} className="mb-8 font-mono text-xs text-mute hover:text-ink">
          close (esc)
        </button>
        <h3 className="m-0 text-3xl font-medium leading-tight">{project.title}</h3>
        <p className="mt-3 text-mute">{project.summary}</p>

        {project.metrics.length > 0 && (
          <p className="mt-6 font-mono text-sm text-accent">{project.metrics.join(', ')}</p>
        )}

        {hasCase ? (
          <dl className="mt-8 space-y-5">
            {(Object.keys(LABELS) as (keyof typeof LABELS)[]).map(
              (k) => cs?.[k] && (
                <div key={k}>
                  <dt className="font-mono text-xs text-mute">{LABELS[k]}</dt>
                  <dd className="m-0">{cs[k]}</dd>
                </div>
              ),
            )}
          </dl>
        ) : (
          <p className="mt-8 font-mono text-xs text-mute">Case study coming soon.</p>
        )}

        <p className="mt-8 font-mono text-xs text-mute">{project.stack.join(', ')}</p>
        <p className="mt-4 flex gap-5 font-mono text-sm">
          {project.links.demo && <a className="text-accent underline" href={project.links.demo}>demo</a>}
          {project.links.repo && <a className="text-accent underline" href={project.links.repo}>repo</a>}
        </p>
      </aside>
    </div>
  );
}
