import { hero } from '../../content/site';
import { useSingleton } from './useData';
import Media from './Media';

export default function Hero() {
  const h = useSingleton('homepage', hero as any);
  return (
    <section id="home" className="relative bg-green text-white overflow-hidden">
      <div className="arc" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
      <div className="container-x relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center pt-32 lg:pt-36 pb-40 lg:pb-48">
          <div className="lg:col-span-7">
            <p className="eyebrow text-white/80">{hero.eyebrow}</p>
            <h1 className="font-display d-hero mt-5">
              {h.hero_line1}<br />{h.hero_line2}<br />
              <span className="text-gold">{h.hero_line3}</span>
            </h1>
            <p className="mt-6 max-w-xl text-white/85 text-lg leading-relaxed">{h.hero_sub}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#admission" className="btn btn-white">{h.primary_cta || 'Enquire Now'}</a>
              <a href="#courses" className="btn btn-dark">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
                {h.secondary_cta || 'Get More Information'}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <svg className="absolute -left-2 -top-4 w-14 h-14 text-white/70 hidden lg:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19a2 2 0 0 1 2-2h13" /></svg>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="absolute -right-3 -bottom-3 w-32 h-32 rounded-2xl" style={{ background: 'var(--color-gold)' }} />
              <div className="absolute -left-3 top-6 w-20 h-20 rounded-2xl" style={{ background: '#0f7a3c' }} />
              <Media path={h.hero_photo} label="Hero students" alt="Vidya Ashram students" className="relative rounded-3xl aspect-[4/5] w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-20 bg-blue" style={{ clipPath: 'ellipse(80% 100% at 50% 100%)' }} />
    </section>
  );
}
