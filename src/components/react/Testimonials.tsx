import { testimonials as fallback } from '../../content/site';
import { usePublished } from './useData';

function Star() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2.9 5.9 6.1.9-4.5 4.3 1.1 6.1L12 17.8 6.4 20.9l1.1-6.1L3 10.4l6.1-.9z" /></svg>;
}

export default function Testimonials() {
  const list = usePublished('testimonials', fallback as any);
  return (
    <section id="testimonials" className="section-pad bg-white">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="font-display d-lg text-navy">Loved by students and parents alike</h2>
          <p className="mt-3 text-body">Real words from the families of Hajipur who trust us with the years that matter most.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {list.map((t: any) => (
            <figure key={t.id || t.name} className="card p-7 flex flex-col" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-gold">{Array.from({ length: t.rating || 5 }).map((_, i) => <Star key={i} />)}</div>
                <span className="font-display font-bold text-lg" style={{ color: '#4285F4' }}>G</span>
              </div>
              <blockquote className="mt-4 text-ink leading-relaxed flex-1">{t.quote}</blockquote>
              <figcaption className="mt-6 pt-5 border-t flex items-center gap-3" style={{ borderColor: 'var(--color-line)' }}>
                <span className="grid place-items-center w-11 h-11 rounded-full text-green shrink-0" style={{ background: 'var(--color-green-soft)' }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
                </span>
                <span>
                  <span className="block font-semibold text-navy">{t.name}</span>
                  <span className="block text-sm text-mute">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
