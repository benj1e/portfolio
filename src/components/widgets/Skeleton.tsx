import { useEffect, useRef } from 'react';

type P = [number, number];
type Name =
  | 'head' | 'neck' | 'lSh' | 'rSh' | 'lEl' | 'rEl' | 'lWr' | 'rWr'
  | 'lHip' | 'rHip' | 'lKn' | 'rKn' | 'lAn' | 'rAn';

const BASE: Record<Name, P> = {
  head: [120, 52], neck: [120, 90], lSh: [92, 98], rSh: [148, 98],
  lEl: [80, 140], rEl: [160, 140], lWr: [74, 180], rWr: [166, 180],
  lHip: [104, 178], rHip: [136, 178], lKn: [100, 234], rKn: [140, 234],
  lAn: [98, 290], rAn: [142, 290],
};
const NAMES = Object.keys(BASE) as Name[];
const BONES: [Name, Name][] = [
  ['head', 'neck'], ['neck', 'lSh'], ['neck', 'rSh'], ['lSh', 'lEl'], ['lEl', 'lWr'],
  ['rSh', 'rEl'], ['rEl', 'rWr'], ['lSh', 'lHip'], ['rSh', 'rHip'], ['lHip', 'rHip'],
  ['lHip', 'lKn'], ['lKn', 'lAn'], ['rHip', 'rKn'], ['rKn', 'rAn'],
];
const L1 = 44, L2 = 41; // right upper arm, forearm
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Two-bone IK: elbow and wrist positions for an arm reaching toward T.
function reach(S: P, T: P): { elbow: P; wrist: P } {
  const vx = T[0] - S[0], vy = T[1] - S[1];
  const d = Math.hypot(vx, vy) || 1;
  const dd = clamp(d, 18, L1 + L2 - 1);
  const ux = vx / d, uy = vy / d;
  const a = (L1 * L1 - L2 * L2 + dd * dd) / (2 * dd);
  const h = Math.sqrt(Math.max(L1 * L1 - a * a, 0));
  const px = S[0] + ux * a, py = S[1] + uy * a;
  const c1: P = [px - uy * h, py + ux * h];
  const c2: P = [px + uy * h, py - ux * h];
  return { elbow: c1[1] > c2[1] ? c1 : c2, wrist: [S[0] + ux * dd, S[1] + uy * dd] };
}

export default function Skeleton() {
  const svg = useRef<SVGSVGElement>(null);
  const dots = useRef<Partial<Record<Name, SVGCircleElement | null>>>({});
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const label = useRef<SVGTextElement>(null);

  useEffect(() => {
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: 0, y: 0, on: false };
    const aim: P = [...BASE.rWr];
    const t0 = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const el = svg.current;
      if (!el) return;
      const t = still ? 0 : (now - t0) / 1000;
      const r = el.getBoundingClientRect();
      const want: P = mouse.on
        ? [((mouse.x - r.left) / r.width) * 240, ((mouse.y - r.top) / r.height) * 320]
        : BASE.rWr;
      aim[0] += (want[0] - aim[0]) * 0.08;
      aim[1] += (want[1] - aim[1]) * 0.08;

      const p = {} as Record<Name, P>;
      NAMES.forEach((k) => (p[k] = [BASE[k][0], BASE[k][1]]));

      const breathe = Math.sin(t * 1.4) * 1.5;
      (['neck', 'lSh', 'rSh'] as Name[]).forEach((k) => (p[k][1] += breathe * 0.6));
      p.head[1] += breathe;
      p.head[0] += clamp((aim[0] - 120) * 0.04, -6, 6);
      p.head[1] += clamp((aim[1] - 52) * 0.025, -4, 4);
      p.lEl[0] += Math.sin(t * 0.9) * 2;
      p.lWr[0] += Math.sin(t * 0.9 + 0.6) * 4;
      p.lWr[1] += Math.cos(t * 0.9) * 2;

      const arm = reach(p.rSh, aim);
      p.rEl = arm.elbow;
      p.rWr = arm.wrist;

      NAMES.forEach((k) => {
        const c = dots.current[k];
        if (c) { c.setAttribute('cx', p[k][0].toFixed(1)); c.setAttribute('cy', p[k][1].toFixed(1)); }
      });
      BONES.forEach(([a, b], i) => {
        const l = lines.current[i];
        if (l) {
          l.setAttribute('x1', p[a][0].toFixed(1)); l.setAttribute('y1', p[a][1].toFixed(1));
          l.setAttribute('x2', p[b][0].toFixed(1)); l.setAttribute('y2', p[b][1].toFixed(1));
        }
      });
      const tx = label.current;
      if (tx) {
        tx.setAttribute('x', (p.rWr[0] + 8).toFixed(1));
        tx.setAttribute('y', (p.rWr[1] - 8).toFixed(1));
        tx.textContent = `r_wrist ${(0.94 + 0.04 * Math.sin(t * 2.3)).toFixed(2)}`;
      }
      if (!still) raf = requestAnimationFrame(frame);
    };

    const move = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true; };
    const leave = () => { mouse.on = false; };
    if (!still) {
      window.addEventListener('pointermove', move);
      document.addEventListener('pointerleave', leave);
    }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <figure className="m-0 select-none">
      <svg ref={svg} viewBox="0 0 240 320" className="w-full max-w-[250px]" role="img"
           aria-label="Animated pose-estimation skeleton that follows the cursor">
        <g stroke="var(--color-ink)" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round">
          {BONES.map(([a, b], i) => (
            <line key={i} ref={(n) => { lines.current[i] = n; }}
                  x1={BASE[a][0]} y1={BASE[a][1]} x2={BASE[b][0]} y2={BASE[b][1]} />
          ))}
        </g>
        {NAMES.map((k) =>
          k === 'head' ? (
            <circle key={k} ref={(n) => { dots.current[k] = n; }} cx={BASE[k][0]} cy={BASE[k][1]}
                    r="12" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
          ) : (
            <circle key={k} ref={(n) => { dots.current[k] = n; }} cx={BASE[k][0]} cy={BASE[k][1]}
                    r="3" fill="var(--color-accent)" />
          ),
        )}
        <text ref={label} x={BASE.rWr[0] + 8} y={BASE.rWr[1] - 8} fill="var(--color-mute)"
              fontSize="8" fontFamily="var(--font-mono)" />
      </svg>
      <figcaption className="mt-2 font-mono text-xs text-mute">kpts 14, tracking: cursor</figcaption>
    </figure>
  );
}
