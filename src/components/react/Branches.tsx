import { branches as fallback } from '../../content/site';
import { usePublished } from './useData';
import Media from './Media';

function Ico({ d }: { d: string }) {
  return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
}
const pin = 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z';
const phoneIc = 'M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z';
const arrow = 'M5 12h14M13 6l6 6-6 6';

export default function Branches() {
  const list = usePublished('branches', fallback as any);

  return (
    <section id="branches" className="section-pad" style={{ background: 'var(--color-cloud)' }}>
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow text-green-deep">Our Branches</p>
          <h2 className="font-display d-lg text-navy mt-3">Find your nearest Vidya Ashram</h2>
          <p className="mt-3 text-body">Multiple centres across Bagmali, Hajipur. Visit the one closest to you.</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((b: any, i: number) => (
            <article key={b.id || b.name} className="card card-hover overflow-hidden flex flex-col" style={{ boxShadow: 'var(--shadow-soft)' }}>
              {b.photo ? (
                <Media path={b.photo} label="Branch" alt={b.name} className="aspect-[16/10] w-full" />
              ) : (
                <div className="aspect-[16/10] w-full grid place-items-center" style={{ background: 'linear-gradient(160deg,#16964c,#0a5c2e)' }}>
                  <span className="grid place-items-center w-14 h-14 rounded-2xl text-white" style={{ background: 'rgba(255,255,255,0.15)' }}><Ico d={pin} /></span>
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-deep">
                  <span className="w-2 h-2 rounded-full bg-green" /> Branch {i + 1}
                </span>
                <h3 className="font-display font-bold text-navy mt-2 leading-snug">{b.name}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed flex-1">{b.address}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 pt-3 border-t" style={{ borderColor: 'var(--color-line)' }}>
                  {b.phone && (
                    <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-green-deep">
                      <Ico d={phoneIc} /> {b.phone}
                    </a>
                  )}
                  {b.map_url && (
                    <a href={b.map_url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sm font-semibold text-green-deep hover:underline ml-auto">
                      Directions <Ico d={arrow} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
