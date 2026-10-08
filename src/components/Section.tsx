import type { ReactNode } from 'react';

export default function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-20">
      <h2 className="mb-6 font-mono text-sm font-medium text-accent">{title}</h2>
      {children}
    </section>
  );
}
