import { useEffect, useState } from 'react';
import { getSingleton, upsertRow } from '../../../lib/db';
import { homepageFields } from './config';
import FieldInput from './FieldInput';

const sections = [
  { title: 'Hero section', fields: ['hero_photo', 'hero_line1', 'hero_line2', 'hero_line3', 'hero_sub', 'primary_cta', 'secondary_cta'] },
  { title: 'Founder / Director', fields: ['founder_photo', 'founder_name', 'founder_role', 'founder_headline', 'founder_message', 'founder_mission', 'founder_vision'] },
  { title: 'Contact details', fields: ['phone', 'whatsapp', 'email', 'address', 'map_embed'] },
];

export default function HomepagePanel() {
  const [row, setRow] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { getSingleton('homepage').then((r) => setRow(r ?? { id: 1 })); }, []);

  async function save() {
    setSaving(true); setSaved(false);
    try {
      await upsertRow('homepage', { ...row, id: 1 });
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    } catch (e: any) { alert('Save failed: ' + (e.message || e)); }
    finally { setSaving(false); }
  }

  if (!row) return <p className="text-body">Loading...</p>;
  const field = (name: string) => homepageFields.find((f) => f.name === name)!;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 sticky top-16 bg-cloud py-2 z-10 -mt-2">
        <div>
          <h2 className="font-display font-bold text-2xl text-navy">Homepage & Hero</h2>
          <p className="text-sm text-body mt-0.5">Everything at the top of your website.</p>
        </div>
        <button onClick={save} disabled={saving} className="btn btn-green disabled:opacity-60" style={{ padding: '0.6rem 1.3rem', fontSize: '0.9rem' }}>
          {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save changes'}
        </button>
      </div>

      <div className="grid gap-5">
        {sections.map((s) => (
          <div key={s.title} className="bg-white rounded-2xl border border-line p-6">
            <h3 className="font-display font-bold text-navy mb-5">{s.title}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {s.fields.map((name) => {
                const f = field(name);
                const full = f.type === 'image' || f.type === 'textarea';
                return (
                  <div key={name} className={full ? 'sm:col-span-2' : ''}>
                    <FieldInput field={f} folder="hero" value={row[name]} onChange={(v) => setRow((p: any) => ({ ...p, [name]: v }))} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
