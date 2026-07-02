import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { courses as fallback, type CourseCategory } from '../../content/site';
import { usePublished } from './useData';
import Media from './Media';

const cats: CourseCategory[] = ['Engineering', 'Medical', 'Foundation'];

function Chevron() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>;
}

export default function Courses() {
  const all = usePublished('courses', fallback as any);
  const [cat, setCat] = useState<CourseCategory>('Engineering');
  const list = all.filter((c: any) => c.category === cat);

  return (
    <section id="courses" className="relative bg-blue text-white overflow-hidden">
      <div className="arc" />
      <div className="container-x relative z-10 section-pad">
        <div>
          <h2 className="font-display d-lg">Explore Courses</h2>
          <p className="mt-3 text-white/75 max-w-md">Programs built around small batches, senior faculty and a steady test rhythm.</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {cats.map((c) => {
            const active = c === cat;
            return (
              <button key={c} onClick={() => setCat(c)} className="chip" aria-pressed={active}
                style={active ? { background: '#fff', color: 'var(--color-blue-deep)' } : { background: 'rgba(255,255,255,0.12)', color: '#fff' }}>
                {c}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((c: any) => (
              <motion.article key={c.id || c.name} layout
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -6 }}
                className="card card-hover overflow-hidden text-ink">
                <div className="p-7 pb-0">
                  <h3 className="font-display font-bold text-2xl text-navy">{c.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.tag1 && <span className="tag tag-orange">{c.tag1}</span>}
                    {c.tag2 && <span className="tag tag-blue">{c.tag2}</span>}
                    {c.tag3 && <span className="tag tag-green">{c.tag3}</span>}
                  </div>
                  <p className="mt-4 text-body text-[0.95rem] leading-relaxed">{c.description}</p>
                </div>
                <div className="mt-5 px-7 pb-6 flex items-end justify-between gap-4">
                  <Media path={c.photo} label={c.category} alt={c.name} className="w-28 h-36 rounded-2xl shrink-0" />
                  <a href="#admission" className="circle-btn shrink-0" aria-label={`Enquire about ${c.name}`}><Chevron /></a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 flex justify-center md:justify-end">
          <a href="/courses" className="btn btn-white">View All Courses <Chevron /></a>
        </div>
      </div>
    </section>
  );
}
