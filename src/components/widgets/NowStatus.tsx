import { useEffect, useState } from 'react';
import { now, profile } from '@/data';

const fmt = new Intl.DateTimeFormat('en-CA', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'America/Halifax',
});

// Live local time + current focus list from a JSON source.
export default function NowStatus() {
  const [time, setTime] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(fmt.format(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded border border-line bg-surface/80 p-3">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">now</p>
      <ul className="m-0 list-none space-y-1 p-0 font-mono text-xs text-mute">
        {now.items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
      <p className="mt-3 font-mono text-[10px] text-mute">
        {profile.location}, {time} · updated {now.updated}
      </p>
    </div>
  );
}
