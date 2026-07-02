import { useEffect, useRef, useState } from 'react';
import { stats as fallback } from '../../content/site';
import { usePublished } from './useData';

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          if (reduced) { setN(target); return; }
          const dur = 1600, start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <div ref={ref} className="font-display font-extrabold text-5xl md:text-6xl">{n.toLocaleString('en-IN')}<span className="text-gold">{suffix}</span></div>;
}

export default function Statistics() {
  const list = usePublished('stats', fallback as any);
  return (
    <section id="stats" className="relative bg-blue text-white overflow-hidden">
      <div className="arc" />
      <div className="container-x relative z-10 section-pad" style={{ paddingBlock: 'clamp(3rem,6vw,5rem)' }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 text-center">
          {list.map((s: any) => (
            <div key={s.id || s.label}>
              <Counter target={Number(s.value) || 0} suffix={s.suffix || ''} />
              <div className="mt-2 text-sm md:text-base text-white/75">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
