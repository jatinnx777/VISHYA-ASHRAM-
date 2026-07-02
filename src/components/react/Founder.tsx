import { founder } from '../../content/site';
import { useSingleton } from './useData';
import Media from './Media';

const fallback = {
  founder_photo: founder.photo,
  founder_name: founder.name,
  founder_role: founder.role,
  founder_headline: founder.headline,
  founder_message: founder.paras.join('\n\n'),
  founder_mission: founder.mission,
  founder_vision: founder.vision,
};

function Ico({ d, cls = 'w-6 h-6' }: { d: string; cls?: string }) {
  return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
}
const compass = 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15 9l-2 6-4 2 2-6z';
const star = 'M12 3l2.9 5.9 6.1.9-4.5 4.3 1.1 6.1L12 17.8 6.4 20.9l1.1-6.1L3 10.4l6.1-.9z';
const quote = 'M7 7h5v6a4 4 0 0 1-4 4H7zM14 7h5v6a4 4 0 0 1-4 4h-1z';

export default function Founder() {
  const f = useSingleton('homepage', fallback as any);
  const paras = String(f.founder_message || '').split(/\n\s*\n/).filter(Boolean);

  return (
    <section id="about" className="section-pad bg-white overflow-hidden">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow text-green-deep">Our Story</p>
          <h2 className="font-display d-lg text-navy mt-3">{f.founder_headline}</h2>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* portrait */}
          <div className="lg:col-span-4">
            <div className="relative rounded-3xl overflow-hidden" style={{ background: 'var(--color-green)' }}>
              <span className="absolute right-4 top-4 z-10 w-10 h-10 rounded-lg" style={{ background: 'var(--color-gold)' }} />
              <Media path={f.founder_photo} label="Director photo" alt={f.founder_name} className="relative z-0 aspect-[4/5] w-full" />
            </div>
            <div className="mt-4">
              <h3 className="font-display font-bold text-xl text-navy">{f.founder_name}</h3>
              <p className="text-sm font-semibold text-green-deep">{f.founder_role}</p>
            </div>
          </div>

          {/* message + mission/vision */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl p-8 md:p-10" style={{ background: 'var(--color-cloud)', borderLeft: '5px solid var(--color-green)' }}>
              <Ico d={quote} cls="w-9 h-9 text-green/40" />
              <div className="mt-3 space-y-4">
                {paras.map((p, i) => <p key={i} className="text-body leading-relaxed">{p}</p>)}
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              <div className="card p-6" style={{ boxShadow: 'var(--shadow-soft)' }}>
                <span className="grid place-items-center w-11 h-11 rounded-xl text-green" style={{ background: 'var(--color-green-soft)' }}><Ico d={compass} cls="w-6 h-6" /></span>
                <h4 className="font-display font-bold text-navy mt-4">Our Mission</h4>
                <p className="mt-2 text-body text-sm leading-relaxed">{f.founder_mission}</p>
              </div>
              <div className="card p-6" style={{ boxShadow: 'var(--shadow-soft)' }}>
                <span className="grid place-items-center w-11 h-11 rounded-xl text-blue" style={{ background: 'var(--color-blue-soft)' }}><Ico d={star} cls="w-6 h-6" /></span>
                <h4 className="font-display font-bold text-navy mt-4">Our Vision</h4>
                <p className="mt-2 text-body text-sm leading-relaxed">{f.founder_vision}</p>
              </div>
            </div>
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
