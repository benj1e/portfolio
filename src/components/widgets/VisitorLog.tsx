import { useEffect, useState } from 'react';

// Renders nothing unless VITE_VISIT_API is set and responds. Wire it to your analytics later.
export default function VisitorLog() {
  const [last, setLast] = useState<{ city: string; ago: string } | null>(null);
  useEffect(() => {
    const api = import.meta.env.VITE_VISIT_API;
    if (!api) return;
    fetch(api)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.city && d?.ago && setLast(d))
      .catch(() => {});
  }, []);
  if (!last) return null;
  return (
    <p className="font-mono text-xs text-mute">
      last visit from {last.city}, {last.ago}
    </p>
  );
}
