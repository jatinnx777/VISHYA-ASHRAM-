import { faculty as fallback } from '../../content/site';
import { usePublished } from './useData';
import Media from './Media';

export default function Faculty() {
  const list = usePublished('faculty', fallback as any);
  return (
    <section id="faculty" className="section-pad" style={{ background: 'var(--color-cloud)' }}>
      <div className="container-x">
        <h2 className="font-display d-lg text-navy">Meet Our Top Mentors and Leaders</h2>
        <p className="mt-3 text-body max-w-2xl">Founded and led by an NIT graduate from Vaishali, our faculty brings genuine experience to every classroom in Hajipur.</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((f: any) => (
            <article key={f.id || f.name} className="group">
              <div className="relative rounded-3xl overflow-hidden" style={{ background: 'var(--color-blue)' }}>
                <span className="absolute left-4 top-1/2 z-10 w-9 h-9 rounded-md" style={{ background: 'var(--color-green)' }} />
                <Media path={f.photo} label="Faculty" alt={f.name} className="relative z-0 aspect-[4/5] w-full" />
                <div className="absolute inset-0 z-20 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, rgba(19,60,125,0.85), transparent 60%)' }}>
                  <span className="tag" style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--color-blue-deep)' }}>{f.subject}</span>
                </div>
              </div>
              <div className="pt-4">
                <h3 className="font-display font-bold text-lg text-navy">{f.name}</h3>
                <p className="text-sm text-mute mt-0.5">{f.qualification}</p>
                <p className="text-sm font-semibold text-ink mt-2">Exp: {f.experience}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
