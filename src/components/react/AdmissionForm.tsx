import { useState } from 'react';
import { getSupabase, isSupabaseConfigured } from '../../lib/supabase';
import { courses } from '../../content/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';
const classes = ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'Dropper / Repeater'];

export default function AdmissionForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    try {
      const supabase = getSupabase();
      if (supabase) {
        const { error } = await supabase.from('admissions').insert({
          name: data.name,
          parent_name: data.parent_name,
          phone: data.phone,
          email: data.email,
          class: data.class,
          course: data.course,
          message: data.message,
        });
        if (error) throw error;
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus('sent');
      setMsg(
        isSupabaseConfigured
          ? 'Thank you. Our admissions team will call you within 24 hours.'
          : 'Preview mode: the form works. Connect Supabase in .env to store real enquiries.'
      );
      form.reset();
    } catch {
      setStatus('error');
      setMsg('Something went wrong. Please call us directly and we will help right away.');
    }
  }

  const field =
    'w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-mute outline-none transition-shadow focus:ring-2 focus:ring-green/40';
  const label = 'block text-sm font-medium text-body mb-1.5';

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="af-name" className={label}>Student Name</label>
          <input id="af-name" name="name" required placeholder="Student full name" className={field} style={{ borderColor: 'var(--color-line)' }} />
        </div>
        <div>
          <label htmlFor="af-parent" className={label}>Parent Name</label>
          <input id="af-parent" name="parent_name" placeholder="Father's / Mother's name" className={field} style={{ borderColor: 'var(--color-line)' }} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="af-phone" className={label}>Mobile Number</label>
          <input id="af-phone" name="phone" required inputMode="tel" placeholder="Enter 10 digit mobile number" className={field} style={{ borderColor: 'var(--color-line)' }} />
        </div>
        <div>
          <label htmlFor="af-email" className={label}>Email Id</label>
          <input id="af-email" name="email" type="email" placeholder="student@example.com" className={field} style={{ borderColor: 'var(--color-line)' }} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="af-class" className={label}>Current Class</label>
          <select id="af-class" name="class" defaultValue="Class 11" className={field} style={{ borderColor: 'var(--color-line)' }}>
            {classes.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="af-course" className={label}>Interested Course</label>
          <select id="af-course" name="course" defaultValue={courses[0].name} className={field} style={{ borderColor: 'var(--color-line)' }}>
            {courses.map((c) => <option key={c.id}>{c.name} ({c.category})</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="af-msg" className={label}>Message <span className="text-mute font-normal">(optional)</span></label>
        <textarea id="af-msg" name="message" rows={2} placeholder="Anything you would like us to know" className={field} style={{ borderColor: 'var(--color-line)' }} />
      </div>

      <p className="text-sm text-body">By continuing, you agree to our <a href="#" className="font-semibold text-green-deep underline">Terms &amp; Conditions</a>.</p>

      <button type="submit" disabled={status === 'sending'} className="btn btn-green w-full justify-center disabled:opacity-60">
        {status === 'sending' ? 'Sending...' : 'Submit'}
      </button>

      {status === 'sent' && (
        <p className="text-sm rounded-xl px-4 py-3" style={{ background: '#e7f6ee', color: '#0f7a3c' }} role="status">{msg}</p>
      )}
      {status === 'error' && (
        <p className="text-sm rounded-xl px-4 py-3" style={{ background: '#fdecec', color: '#c0392b' }} role="alert">{msg}</p>
      )}
    </form>
  );
}
