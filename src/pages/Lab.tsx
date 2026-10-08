import { useState } from 'react';
import Section from '@/components/Section';
import ProjectList from '@/components/widgets/ProjectList';
import ProjectDrawer from '@/components/widgets/ProjectDrawer';
import { log, projects, research } from '@/data';
import type { Project } from '@/data/schema';

export default function Lab() {
  const [open, setOpen] = useState<Project | null>(null);
  return (
    <>
      <h1 className="m-0 text-5xl font-medium tracking-tight">lab</h1>
      <p className="mt-3 text-xl text-mute">Research, builds, and a running log.</p>

      {research.length > 0 && (
      <Section title="research">
        {research.map((r) => (
          <article key={r.title} className="border-t border-line py-5">
            <h3 className="m-0 text-xl font-medium">{r.title}</h3>
            <p className="mt-1 text-mute">{r.summary}</p>
            <p className="mt-2 font-mono text-xs text-mute">{r.status}, {r.tags.join(', ')}</p>
          </article>
        ))}
      </Section>
      )}

      <Section title="projects">
        <ProjectList items={projects} onOpen={setOpen} />
      </Section>

      <Section title="build log">
        <ul className="m-0 list-none space-y-3 p-0 font-mono text-sm">
          {[...log].reverse().map((e) => (
            <li key={e.date + e.text} className="flex gap-4">
              <span className="shrink-0 text-mute">{e.date}</span>
              <span>{e.text}</span>
            </li>
          ))}
        </ul>
      </Section>

      <ProjectDrawer project={open} onClose={() => setOpen(null)} />
    </>
  );
}
