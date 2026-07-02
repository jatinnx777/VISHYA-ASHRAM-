import { useEffect, useState } from 'react';
import type { Panel } from './config';
import { listRows, upsertRow, deleteRow, publicUrl } from '../../../lib/db';
import FieldInput from './FieldInput';

export default function CrudPanel({ panel }: { panel: Panel }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setRows(await listRows(panel.table));
    setLoading(false);
  }
  useEffect(() => { load(); }, [panel.key]);

  function startNew() {
    const blank: any = {};
    panel.fields.forEach((f) => {
      blank[f.name] = f.type === 'bool' ? true : f.type === 'number' ? (f.name === 'rating' ? 5 : rows.length + 1) : '';
    });
    setEditing(blank);
  }

  async function save() {
    setSaving(true);
    try {
      const row = { ...editing };
      Object.keys(row).forEach((k) => { if (row[k] === '') row[k] = null; });
      await upsertRow(panel.table, row);
      setEditing(null);
      await load();
    } catch (e: any) {
      alert('Save failed: ' + (e.message || e));
    } finally { setSaving(false); }
  }

  async function remove(id: string) {
    if (!confirm('Delete this item? This cannot be undone.')) return;
    try { await deleteRow(panel.table, id); await load(); }
    catch (e: any) { alert('Delete failed: ' + (e.message || e)); }
  }

  const single = panel.label.replace(/s$/, '');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-2xl text-navy">{panel.label}</h2>
          <p className="text-sm text-body mt-0.5">{loading ? 'Loading...' : `${rows.length} item${rows.length === 1 ? '' : 's'}`}</p>
        </div>
        <button onClick={startNew} className="btn btn-green" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          Add {single.toLowerCase()}
        </button>
      </div>

      {loading ? (
        <div className="grid gap-3">{[0, 1, 2].map((i) => <div key={i} className="h-[70px] rounded-2xl bg-white animate-pulse" style={{ boxShadow: 'var(--shadow-soft)' }} />)}</div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl bg-white border border-dashed border-line p-12 text-center">
          <p className="text-body">No {panel.label.toLowerCase()} yet.</p>
          <button onClick={startNew} className="btn btn-green mt-4" style={{ padding: '0.55rem 1.2rem', fontSize: '0.85rem' }}>Add the first one</button>
        </div>
      ) : (
        <div className="grid gap-2.5">
          {rows.map((r) => {
            const img = panel.imageField ? publicUrl(r[panel.imageField]) : undefined;
            return (
              <div key={r.id} className="bg-white rounded-2xl border border-line p-3 pr-4 flex items-center gap-4 hover:border-green/40 transition-colors">
                {panel.imageField && (
                  <div className="w-12 h-14 rounded-lg overflow-hidden bg-cloud-2 shrink-0 grid place-items-center">
                    {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b6c0cc" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m21 17-5-5-5 5-3-3-5 5" /></svg>
                    )}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-navy truncate">{r[panel.titleField] || '(untitled)'}</p>
                  {panel.subtitleField && <p className="text-sm text-body truncate">{String(r[panel.subtitleField] ?? '')}</p>}
                </div>
                {'published' in r && (
                  <span className="tag hidden sm:inline-flex" style={r.published ? { background: 'var(--color-green-soft)', color: 'var(--color-green-deep)' } : { background: '#eef1f5', color: 'var(--color-mute)' }}>
                    {r.published ? 'Live' : 'Hidden'}
                  </span>
                )}
                <button onClick={() => setEditing(r)} className="grid place-items-center w-9 h-9 rounded-lg text-green-deep hover:bg-green-soft transition-colors shrink-0" aria-label="Edit">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
                </button>
                <button onClick={() => remove(r.id)} className="grid place-items-center w-9 h-9 rounded-lg text-red-500 hover:bg-red-50 transition-colors shrink-0" aria-label="Delete">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13" /></svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-navy/40 grid place-items-end sm:place-items-center p-0 sm:p-4" onClick={() => !saving && setEditing(null)}>
          <div className="bg-white w-full sm:max-w-xl max-h-[92vh] sm:rounded-2xl rounded-t-3xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-line flex items-center justify-between shrink-0">
              <h3 className="font-display font-bold text-lg text-navy">{editing.id ? 'Edit' : 'New'} {single.toLowerCase()}</h3>
              <button onClick={() => setEditing(null)} className="text-mute hover:text-navy" aria-label="Close">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
            <div className="px-6 py-5 overflow-y-auto grid sm:grid-cols-2 gap-4">
              {panel.fields.map((f) => (
                <div key={f.name} className={f.type === 'image' || f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <FieldInput field={f} folder={panel.folder} value={editing[f.name]} onChange={(v) => setEditing((prev: any) => ({ ...prev, [f.name]: v }))} />
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-line flex gap-3 shrink-0">
              <button onClick={() => setEditing(null)} disabled={saving} className="btn flex-1 justify-center" style={{ background: 'var(--color-cloud)', color: 'var(--color-ink)' }}>Cancel</button>
              <button onClick={save} disabled={saving} className="btn btn-green flex-1 justify-center disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
