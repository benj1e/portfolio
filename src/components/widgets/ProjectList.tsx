import type { Project } from '@/data/schema';

export default function ProjectList({ items, onOpen }: { items: Project[]; onOpen: (p: Project) => void }) {
  return (
    <ul className="m-0 list-none border-b border-line p-0">
      {items.map((p) => (
        <li key={p.slug} className="border-t border-line">
          <button onClick={() => onOpen(p)}
                  className="group relative block w-full py-5 pl-0 text-left transition-[padding] hover:pl-4">
            <span className="absolute left-0 top-5 h-[calc(100%-2.5rem)] w-0.5 bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="block text-xl font-medium">{p.title}</span>
            <span className="mt-1 block text-mute">{p.summary}</span>
            <span className="mt-2 block font-mono text-xs text-mute">{p.stack.join(', ')}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
