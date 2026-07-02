import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { results as fallback, type ResultCategory } from '../../content/site';
import { usePublished } from './useData';
import Media from './Media';

const filters: ('All' | ResultCategory)[] = ['All', 'IIT JEE', 'NEET', 'Olympiad', 'Top Rankers', '12th Board', '10th Board'];

export default function Results() {
  const all = usePublished('results', fallback as any);
  const [f, setF] = useState<'All' | ResultCategory>('All');
  const list = f === 'All' ? all : all.filter((r: any) => r.category === f);

  return (
    <section id="results" className="section-pad bg-white">
      <div className="container-x">
        <h2 className="font-display d-lg text-navy">Our Top Performers who made us proud</h2>
        <p className="mt-3 text-body max-w-2xl">Our results reflect the passion, hard work and effort of our students and teachers.</p>

        <div className="mt-7 flex flex-wrap gap-2.5">
          {filters.map((c) => {
            const active = c === f;
            return (
              <button key={c} onClick={() => setF(c)} className="chip" aria-pressed={active}
                style={active ? { background: 'var(--color-navy)', color: '#fff' } : { background: '#fff', color: 'var(--color-ink)', border: '1px solid var(--color-line)' }}>
                {c}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((r: any, i: number) => (
              <motion.article key={r.id || r.name + i} layout
                initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -6 }}
                className="card card-hover overflow-hidden">
                <div className="relative">
                  <Media path={r.photo} label={r.category} alt={r.name} className="aspect-[4/5] w-full" />
                  <div className="absolute left-3 bottom-3 rounded-full px-3 py-1 font-display font-extrabold text-sm text-white" style={{ background: 'var(--color-green-btn)', boxShadow: '0 8px 20px rgba(12,138,66,0.35)' }}>{r.rank}</div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-display font-bold text-navy leading-tight">{r.name}</h3>
                  <p className="text-sm text-body mt-1">{r.exam}</p>
                  <p className="text-sm font-semibold text-green-deep mt-0.5">{r.detail}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
