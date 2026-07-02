import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { owners as ownersFallback, founder } from '../../content/site';
import { usePublished, useSingleton } from './useData';
import Media from './Media';

function Ico({ d, cls = 'w-6 h-6' }: { d: string; cls?: string }) {
  return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
}
const compass = 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15 9l-2 6-4 2 2-6z';
const star = 'M12 3l2.9 5.9 6.1.9-4.5 4.3 1.1 6.1L12 17.8 6.4 20.9l1.1-6.1L3 10.4l6.1-.9z';

const storyFallback = {
  founder_headline: founder.headline,
  founder_message: founder.paras.join('\n\n'),
  founder_mission: founder.mission,
  founder_vision: founder.vision,
};

export default function Owners() {
  const list = usePublished('owners', ownersFallback as any);
  const s = useSingleton('homepage', storyFallback as any);
  const intro = String(s.founder_message || '').split(/\n\s*\n/).filter(Boolean)[0];

  // Magnetic x-axis drag carousel
  const viewport = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = viewport.current;
      if (el) setDrag(Math.max(0, el.scrollWidth - el.offsetWidth));
    };
    update();
    window.addEventListener('resize', update);
    const t = setTimeout(update, 400); // after images/fonts settle
    return () => { window.removeEventListener('resize', update); clearTimeout(t); };
  }, [list.length]);

  return (
    <section id="about" className="section-pad bg-white overflow-hidden">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow text-green-deep">Our Directors</p>
          <h2 className="font-display d-lg text-navy mt-3">{s.founder_headline}</h2>
          {intro && <p className="mt-4 text-body leading-relaxed">{intro}</p>}
        </div>
      </div>

      {/* Magnetic drag carousel */}
      <div className="mt-10">
        <motion.div ref={viewport} className="container-x cursor-grab active:cursor-grabbing" style={{ overflow: 'hidden' }}>
          <motion.div
            className="flex gap-5 pb-2"
            drag="x"
            dragConstraints={{ left: -drag, right: 0 }}
            dragElastic={0.12}
            whileTap={{ cursor: 'grabbing' }}
          >
            {list.map((o: any) => (
              <div key={o.id || o.name} className="shrink-0 w-[280px] sm:w-[320px] select-none">
                <div className="relative rounded-3xl overflow-hidden" style={{ background: 'var(--color-green)' }}>
                  <span className="absolute right-4 top-4 z-10 w-9 h-9 rounded-lg" style={{ background: 'var(--color-gold)' }} />
                  <Media path={o.photo} label="Director photo" alt={o.name} className="relative z-0 aspect-[4/5] w-full pointer-events-none" />
                </div>
                <div className="pt-4">
                  <h3 className="font-display font-bold text-lg text-navy">{o.name}</h3>
                  <p className="text-sm font-semibold text-green-deep">{o.role}</p>
                  {o.bio && <p className="mt-2 text-sm text-body leading-relaxed">{o.bio}</p>}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <div className="container-x mt-3">
          <p className="text-xs text-mute">Drag to explore →</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container-x mt-12">
        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
          <div className="card p-6" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <span className="grid place-items-center w-11 h-11 rounded-xl text-green" style={{ background: 'var(--color-green-soft)' }}><Ico d={compass} /></span>
            <h4 className="font-display font-bold text-navy mt-4">Our Mission</h4>
            <p className="mt-2 text-body text-sm leading-relaxed">{s.founder_mission}</p>
          </div>
          <div className="card p-6" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <span className="grid place-items-center w-11 h-11 rounded-xl text-blue" style={{ background: 'var(--color-blue-soft)' }}><Ico d={star} /></span>
            <h4 className="font-display font-bold text-navy mt-4">Our Vision</h4>
            <p className="mt-2 text-body text-sm leading-relaxed">{s.founder_vision}</p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-5 justify-between" style={{ background: 'linear-gradient(160deg,#0c6b34,#083f20)' }}>
          <div>
            <p className="font-display font-bold text-white text-xl md:text-2xl">Distance has nothing to do with education.</p>
            <p className="text-white/80 mt-1">Hajipur is not far from Patna, and now sound coaching is right here at home.</p>
          </div>
          <a href="#admission" className="btn btn-white shrink-0">Book a demo class</a>
        </div>
      </div>
    </section>
  );
}
