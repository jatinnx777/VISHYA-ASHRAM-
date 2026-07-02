import { useEffect, useState } from 'react';
import { getSupabase } from '../../../lib/supabase';
import { panels } from './config';

export default function DashboardPanel({ go }: { go: (key: string) => void }) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    (async () => {
      const entries: Record<string, number> = {};
      for (const p of panels) {
        const { count } = await sb.from(p.table).select('*', { count: 'exact', head: true });
        entries[p.key] = count ?? 0;
      }
      const { count: adm } = await sb.from('admissions').select('*', { count: 'exact', head: true });
      entries['admissions'] = adm ?? 0;
      setCounts(entries);
      const { data } = await sb.from('admissions').select('*').order('created_at', { ascending: false }).limit(5);
      setRecent(data ?? []);
    })();
  }, []);

  const tiles = [
    { key: 'results', label: 'Results' },
    { key: 'courses', label: 'Courses' },
    { key: 'faculty', label: 'Faculty' },
    { key: 'gallery', label: 'Gallery' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'admissions', label: 'Admissions' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display font-bold text-2xl text-navy">Dashboard</h2>
        <p className="text-sm text-body mt-0.5">A quick overview of your website content.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map((t) => (
          <button key={t.key} onClick={() => go(t.key)} className="card p-5 text-left card-hover" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <p className="text-sm text-body">{t.label}</p>
            <p className="font-display font-extrabold text-3xl text-navy mt-1">{counts[t.key] ?? '·'}</p>
            <p className="text-xs text-green-deep font-semibold mt-2">Manage →</p>
          </button>
        ))}
      </div>

      <div className="mt-8 card p-6" style={{ boxShadow: 'var(--shadow-soft)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-navy">Recent enquiries</h3>
          <button onClick={() => go('admissions')} className="text-sm font-semibold text-green-deep hover:underline">View all</button>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-body">No enquiries yet.</p>
        ) : (
          <ul className="divide-y" style={{ borderColor: 'var(--color-line)' }}>
            {recent.map((r) => (
              <li key={r.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-navy truncate">{r.name} <span className="text-mute font-normal">· {r.course || 'General'}</span></p>
                  <p className="text-xs text-mute">{r.phone}</p>
                </div>
                <span className="text-xs text-mute shrink-0">{new Date(r.created_at).toLocaleDateString('en-IN')}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
