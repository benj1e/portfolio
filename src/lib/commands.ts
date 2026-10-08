import { profile } from '@/data';
import { trackEvent } from './analytics';

export type Ctx = {
  navigate: (to: string) => void;
  open: (url: string) => void;
  print: (lines: string[]) => void;
};
export type Command = { id: string; label: string; keywords?: string; run: (c: Ctx) => void };

export const commands: Command[] = [
  { id: 'home', label: 'cd ~', keywords: 'home start', run: (c) => c.navigate('/') },
  { id: 'lab', label: 'cd lab', keywords: 'projects research work', run: (c) => c.navigate('/lab') },
  { id: 'whoami', label: 'whoami', keywords: 'about me', run: (c) => c.print([profile.name, profile.tagline, profile.location]) },
  {
    id: 'resume',
    label: 'get_resume()',
    keywords: 'cv download pdf',
    run: (c) => { trackEvent('click/resume'); c.open(profile.resumeUrl); },
  },
  { id: 'github', label: 'open github', keywords: 'code repo', run: (c) => c.open(profile.github) },
  { id: 'linkedin', label: 'open linkedin', keywords: 'connect', run: (c) => c.open(profile.linkedin) },
  {
    id: 'email',
    label: 'mail benji',
    keywords: 'contact hire',
    run: (c) => { trackEvent('click/email'); c.open(`mailto:${profile.email}`); },
  },
  {
    id: 'sudo',
    label: 'sudo hire benji',
    keywords: 'easter egg',
    run: (c) => {
      trackEvent('easter/sudo');
      c.print(['[sudo] password for recruiter: ********', 'permission granted.', `next step: ${profile.email}`]);
    },
  },
];

export const matches = (c: Command, q: string) =>
  `${c.label} ${c.keywords ?? ''}`.toLowerCase().includes(q.trim().toLowerCase());
