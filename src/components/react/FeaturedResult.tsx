import { featured, results as fallbackResults } from '../../content/site';
import { useSingleton, usePublished } from './useData';
import Media from './Media';

export default function FeaturedResult() {
  const f = useSingleton('homepage', featured as any);
  const toppers = usePublished('results', fallbackResults as any).slice(0, 4);

  return (
    <section className="relative bg-white">
      <div className="container-x">
        <div className="relative -mt-28 lg:-mt-36 rounded-3xl overflow-hidden"
          style={{ background: '#0b5c30', boxShadow: '0 30px 70px rgba(8,63,32,0.35)' }}>
          <div className="relative z-10 p-7 md:p-10 lg:p-12 text-white">
            <div className="text-center">
              <div className="inline-flex items-center gap-2.5">
                <span className="grid place-items-center w-9 h-9 rounded-lg" style={{ background: '#0a4a27' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4 2 9l10 5 10-5z" /><path d="M6 11v4c0 1.5 3 3 6 3s6-1.5 6-3v-4" /></svg>
                </span>
                <span className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">{f.featured_title}</span>
              </div>
              <div className="mt-4 inline-block rounded-xl px-5 py-2 font-display font-bold text-lg md:text-xl text-navy" style={{ background: 'linear-gradient(180deg,#ffe08a,#f5c518)' }}>{f.featured_badge}</div>
              <h2 className="font-display font-bold text-xl md:text-2xl mt-4 text-white/95">{f.featured_headline}</h2>
            </div>

            <div className="mt-9 grid lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {toppers.map((t: any) => (
                  <div key={t.id || t.name} className="rounded-2xl overflow-hidden" style={{ background: '#0a4a27' }}>
                    <Media path={t.photo} label="AIR" alt={t.name} className="aspect-[4/5] w-full" />
                    <div className="text-center py-2.5">
                      <div className="font-display font-extrabold text-gold text-lg leading-none">{t.rank}</div>
                      <div className="text-xs text-white/70 mt-1">{t.name}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-4 rounded-2xl p-6 flex flex-col justify-center text-center" style={{ background: '#0a4a27' }}>
                <div className="inline-block mx-auto rounded-full px-4 py-1.5 text-sm font-semibold text-green-deep" style={{ background: 'linear-gradient(180deg,#ffe08a,#f5c518)' }}>Overall Result Highlights</div>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {[[f.highlight1_value, f.highlight1_label], [f.highlight2_value, f.highlight2_label]].map(([v, l], i) => (
                    <div key={i}>
                      <div className="font-display font-extrabold text-gold text-5xl leading-none">{v}</div>
                      <div className="text-xs text-white/75 mt-2 leading-snug">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
