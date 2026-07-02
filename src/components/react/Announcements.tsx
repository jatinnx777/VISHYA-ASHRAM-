import { announcements as fallback } from '../../content/site';
import { usePublished } from './useData';

const fmt = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export default function Announcements() {
  const list = usePublished('announcements', fallback as any).slice(0, 3);
  return (
    <section id="announcements" className="section-pad bg-white">
      <div className="container-x">
        <div className="rounded-3xl p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center" style={{ background: 'var(--color-cloud)' }}>
          <div>
            <h2 className="font-display d-lg text-navy">Announcements &<br className="hidden sm:block" /> Latest Updates</h2>
            <div className="mt-8 flex items-center justify-center lg:justify-start">
              <div className="grid place-items-center w-40 h-40 rounded-full" style={{ background: 'var(--color-green-soft)' }}>
                <svg className="w-20 h-20 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10v4a1 1 0 0 0 1 1h2l7 4V5L7 9H5a1 1 0 0 0-1 1z" /><path d="M17 8a4 4 0 0 1 0 8" /></svg>
              </div>
            </div>
          </div>
          <div>
            <ul className="divide-y" style={{ borderColor: 'var(--color-line)' }}>
              {list.map((a: any) => (
                <li key={a.id || a.title} className="py-4 first:pt-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-mute">{fmt(a.date)}</span>
                    {a.is_new && <span className="tag tag-new">New</span>}
                  </div>
                  <p className="mt-1.5 text-ink font-medium leading-snug">{a.title}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-end">
              <a href="/blog" className="btn btn-green" style={{ padding: '0.7rem 1.4rem' }}>View All
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
