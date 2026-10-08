// GoatCounter: cookieless, no personal data. Off in dev, without a site code, or with Do Not Track.
type GC = { count: (o: { path: string; title?: string; event?: boolean }) => void };
declare global {
  interface Window {
    goatcounter?: Partial<GC> & { no_onload?: boolean };
  }
}

const code = import.meta.env.VITE_GOATCOUNTER_CODE;
const enabled = import.meta.env.PROD && !!code && navigator.doNotTrack !== '1';
const queue: Array<() => void> = [];
let ready = false;

export function initAnalytics() {
  if (!enabled || document.getElementById('gc-script')) return;
  window.goatcounter = { no_onload: true };
  const s = document.createElement('script');
  s.id = 'gc-script';
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
  s.onload = () => {
    ready = true;
    queue.splice(0).forEach((fn) => fn());
  };
  document.head.appendChild(s);
}

function send(fn: () => void) {
  if (!enabled) return;
  if (ready) fn();
  else queue.push(fn);
}

export const trackPage = (path: string) => send(() => window.goatcounter?.count?.({ path }));

// Named events show up in GoatCounter as paths: "r/rbc", "src/linkedin", "click/resume".
export const trackEvent = (name: string) =>
  send(() => window.goatcounter?.count?.({ path: name, title: name, event: true }));

// ?src=linkedin on any URL counts as a visit from that source.
export function trackSource() {
  const src = new URLSearchParams(location.search).get('src');
  if (src) trackEvent(`src/${src.slice(0, 40)}`);
}
