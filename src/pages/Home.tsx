import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '@/components/Section';
import Skeleton from '@/components/widgets/Skeleton';
import NowStatus from '@/components/widgets/NowStatus';
import VisitorLog from '@/components/widgets/VisitorLog';
import ProjectList from '@/components/widgets/ProjectList';
import ProjectDrawer from '@/components/widgets/ProjectDrawer';
import { profile, projects } from '@/data';
import { trackEvent } from '@/lib/analytics';
import type { Project } from '@/data/schema';

function Boot({ lines }: { lines: string[] }) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const full = lines.join('\n');
  const [n, setN] = useState(reduce ? full.length : 0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setN((v) => (v >= full.length ? (clearInterval(id), v) : v + 1)), 22);
    return () => clearInterval(id);
  }, [full, reduce]);
  return (
    <pre className="caret m-0 min-h-[5.5rem] whitespace-pre-wrap font-mono text-sm leading-6 text-mute">
      {full.slice(0, n)}
    </pre>
  );
}

export default function Home() {
  const [open, setOpen] = useState<Project | null>(null);
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <div className="grid items-center gap-10 pt-6 md:grid-cols-[1fr_250px]">
        <div>
          <Boot lines={profile.bootLines} />
          <h1 className="mb-0 mt-8 text-5xl font-medium leading-[1.05] tracking-tight">{profile.name}</h1>
          <p className="mt-4 text-xl text-mute">{profile.tagline}</p>
          <div className="mt-8 space-y-2">
            <NowStatus />
            <VisitorLog />
          </div>
        </div>
        <Skeleton />
      </div>

      <Section title="selected work">
        <ProjectList items={featured} onOpen={setOpen} />
        <p className="mt-6 font-mono text-sm">
          <Link to="/lab" className="text-accent underline">everything else is in the lab</Link>
        </p>
      </Section>

      <Section title="contact">
        <ul className="m-0 list-none space-y-2 p-0 font-mono text-sm">
          <li><a className="text-ink underline decoration-line hover:decoration-accent" href={`mailto:${profile.email}`}
                 onClick={() => trackEvent('click/email')}>{profile.email}</a></li>
          <li><a className="text-ink underline decoration-line hover:decoration-accent" href={profile.github}>github</a></li>
          <li><a className="text-ink underline decoration-line hover:decoration-accent" href={profile.linkedin}>linkedin</a></li>
          <li><a className="text-ink underline decoration-line hover:decoration-accent" href={profile.resumeUrl}
                 onClick={() => trackEvent('click/resume')}>resume</a></li>
        </ul>
      </Section>

      <ProjectDrawer project={open} onClose={() => setOpen(null)} />
    </>
  );
}
