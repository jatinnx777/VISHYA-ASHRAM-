import { useEffect, useState } from 'react';
import { listRows, deleteRow } from '../../../lib/db';

export default function AdmissionsPanel() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  async function load() {
    setLoading(true);
    setRows(await listRows('admissions', 'created_at'));
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  const filtered = rows
    .slice()
    .reverse()
    .filter((r) => JSON.stringify(r).toLowerCase().includes(q.toLowerCase()));

  function exportCsv() {
    const cols = ['created_at', 'name', 'parent_name', 'phone', 'email', 'class', 'course', 'message', 'status'];
    const head = cols.join(',');
    const body = filtered
      .map((r) => cols.map((c) => `"${String(r[c] ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([head + '\n' + body], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `admissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  async function remove(id: string) {
    if (!confirm('Delete this enquiry?')) return;
    await deleteRow('admissions', id);
    await load();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="font-display font-bold text-2xl text-navy">Admissions</h2>
          <p className="text-sm text-body mt-0.5">{rows.length} enquir{rows.length === 1 ? 'y' : 'ies'}</p>
        </div>
        <div className="flex items-center gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="rounded-full border border-line px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green/40" />
          <button onClick={exportCsv} className="btn btn-green" style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}>Export CSV</button>
        </div>
      </div>

      {loading ? (
        <p className="text-body">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line p-10 text-center text-body">No enquiries yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-cloud text-left text-body">
                {['Date', 'Student', 'Parent', 'Phone', 'Class', 'Course', ''].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-line align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-mute">{new Date(r.created_at).toLocaleDateString('en-IN')}</td>
                  <td className="px-4 py-3 font-medium text-navy">{r.name}</td>
                  <td className="px-4 py-3">{r.parent_name || '-'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.phone || '-'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.class || '-'}</td>
                  <td className="px-4 py-3">{r.course || '-'}</td>
                  <td className="px-4 py-3"><button onClick={() => remove(r.id)} className="text-red-500 font-semibold hover:underline">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
