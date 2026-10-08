import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import GridBackground from './widgets/GridBackground';
import CommandPalette from './widgets/CommandPalette';
import { profile } from '@/data';

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <>
      <GridBackground />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6">
        <header className="flex items-center justify-between py-6 font-mono text-sm">
          <Link to="/" className="font-medium text-accent">
            {profile.handle}()
          </Link>
          <nav className="flex items-center gap-5 text-mute">
            <Link to="/lab" className="hover:text-ink">lab</Link>
            <button
              onClick={() => setOpen(true)}
              className="rounded border border-line px-2 py-1 text-xs hover:border-mute hover:text-ink"
              aria-label="Open command palette"
            >
              Ctrl K
            </button>
          </nav>
        </header>
        <main className="flex-1 pb-24">
          <Outlet />
        </main>
        <footer className="border-t border-line py-6 font-mono text-xs text-mute">
          No cookies. Visit counts are anonymous.
        </footer>
      </div>
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}
