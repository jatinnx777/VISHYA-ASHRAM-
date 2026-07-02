import { useState } from 'react';
import { getSupabase } from '../../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sb = getSupabase();
    if (!sb) { setErr('Supabase is not configured.'); return; }
    setBusy(true); setErr('');
    const { error } = await sb.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr(error.message);
    // On success, AdminApp's auth listener swaps to the dashboard.
  }

  const input = 'w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-green/40';

  return (
    <div className="min-h-screen grid place-items-center bg-cloud px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-green text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4 2 9l10 5 10-5z" /><path d="M6 11v4c0 1.5 3 3 6 3s6-1.5 6-3v-4" /></svg>
          </span>
          <span className="font-display font-extrabold text-xl text-navy">Vidya Ashram</span>
        </div>
        <div className="bg-white rounded-2xl p-7 shadow-[0_10px_40px_rgba(16,35,59,0.08)]">
          <h1 className="font-display font-bold text-xl text-navy">Admin sign in</h1>
          <p className="text-sm text-body mt-1 mb-6">Manage the entire website.</p>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-body mb-1.5">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-body mb-1.5">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={input} placeholder="••••••••" />
            </div>
            {err && <p className="text-sm text-red-500">{err}</p>}
            <button disabled={busy} className="btn btn-green w-full justify-center disabled:opacity-60">{busy ? 'Signing in...' : 'Sign in'}</button>
          </form>
        </div>
        <p className="text-center text-xs text-mute mt-5"><a href="/" className="hover:underline">← Back to website</a></p>
      </div>
    </div>
  );
}
