import { useState } from 'react';
import { uploadMedia, publicUrl } from '../../../lib/db';

export default function MediaInput({
  value, folder, onChange,
}: { value?: string; folder: string; onChange: (path: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const url = publicUrl(value);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setErr('');
    try {
      const path = await uploadMedia(file, folder);
      onChange(path);
    } catch (e: any) {
      setErr(e.message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-24 rounded-xl overflow-hidden bg-cloud-2 border border-line grid place-items-center shrink-0">
        {url ? <img src={url} alt="" className="w-full h-full object-cover" /> : <span className="text-[10px] text-mute text-center px-1">No image</span>}
      </div>
      <div className="min-w-0">
        <label className="btn btn-green cursor-pointer" style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}>
          {busy ? 'Uploading...' : url ? 'Replace image' : 'Upload image'}
          <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={busy} />
        </label>
        {value && <button type="button" onClick={() => onChange('')} className="ml-2 text-sm text-red-500 hover:underline">Remove</button>}
        {err && <p className="text-xs text-red-500 mt-1">{err}</p>}
        <p className="text-xs text-mute mt-1 truncate">Optimised and served from Supabase Storage.</p>
      </div>
    </div>
  );
}
