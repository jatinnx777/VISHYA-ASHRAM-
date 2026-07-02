import { motion } from 'framer-motion';
import { courses as fallback } from '../../content/site';
import { usePublished } from './useData';
import Media from './Media';

function Chevron() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>;
}

export default function Courses() {
  const list = usePublished('courses', fallback as any);

  return (
    <section id="courses" className="relative bg-blue text-white overflow-hidden">
      <div className="arc" />
      <div className="container-x relative z-10 section-pad">
        <div className="max-w-2xl">
          <h2 className="font-display d-lg">Our Programmes</h2>
          <p className="mt-3 text-white/75">From the first day of school to the JEE and NEET finish line, one journey under one roof.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c: any, i: number) => (
            <motion.article
              key={c.id || c.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="card card-hover overflow-hidden text-ink flex flex-col"
            >
              <div className="p-7 pb-0 flex-1">
                <h3 className="font-display font-bold text-2xl text-navy tracking-tight">{c.name}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.tag1 && <span className="tag tag-orange">{c.tag1}</span>}
                  {c.tag2 && <span className="tag tag-blue">{c.tag2}</span>}
                  {c.tag3 && <span className="tag tag-green">{c.tag3}</span>}
                </div>
                <p className="mt-4 text-body text-[0.95rem] leading-relaxed">{c.description}</p>
              </div>
              <div className="mt-5 px-7 pb-6 flex items-end justify-between gap-4">
                <Media path={c.photo} label={c.name} alt={c.name} className="w-28 h-36 rounded-2xl shrink-0" />
                <a href="#admission" className="circle-btn shrink-0" aria-label={`Enquire about ${c.name}`}><Chevron /></a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:justify-start">
          <a href="#admission" className="btn btn-white">Book a free demo class <Chevron /></a>
        </div>
      </div>
    </section>
  );
}
