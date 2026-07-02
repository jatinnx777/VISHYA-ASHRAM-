import type { Field } from './config';
import MediaInput from './MediaInput';

const input = 'w-full rounded-xl border border-line bg-white px-4 py-2.5 text-ink outline-none focus:ring-2 focus:ring-green/40';

export default function FieldInput({
  field, value, folder, onChange,
}: { field: Field; value: any; folder: string; onChange: (v: any) => void }) {
  const id = `f-${field.name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-body mb-1.5">{field.label}</label>
      {field.type === 'text' && <input id={id} className={input} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />}
      {field.type === 'number' && <input id={id} type="number" className={input} value={value ?? 0} onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))} />}
      {field.type === 'textarea' && <textarea id={id} rows={3} className={input} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />}
      {field.type === 'date' && <input id={id} type="date" className={input} value={(value ?? '').slice(0, 10)} onChange={(e) => onChange(e.target.value)} />}
      {field.type === 'select' && (
        <select id={id} className={input} value={value ?? field.options?.[0]} onChange={(e) => onChange(e.target.value)}>
          {field.options?.map((o) => <option key={o}>{o}</option>)}
        </select>
      )}
      {field.type === 'bool' && (
        <label className="inline-flex items-center gap-2 cursor-pointer mt-1">
          <input type="checkbox" className="w-5 h-5 accent-[color:var(--color-green)]" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          <span className="text-sm text-body">{value ? 'Yes' : 'No'}</span>
        </label>
      )}
      {field.type === 'image' && <MediaInput value={value} folder={folder} onChange={onChange} />}
    </div>
  );
}
