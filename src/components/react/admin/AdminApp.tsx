import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '../../../lib/supabase';
import { panels } from './config';
import CrudPanel from './CrudPanel';
import HomepagePanel from './HomepagePanel';
import AdmissionsPanel from './AdmissionsPanel';
import DashboardPanel from './DashboardPanel';
import Login from './Login';

// Grouped, icon-based navigation for a systematic layout.
const groups: { title: string; items: { key: string; label: string; icon: string }[] }[] = [
  { title: '', items: [{ key: 'dashboard', label: 'Dashboard', icon: 'grid' }] },
  { title: 'Website', items: [{ key: 'homepage', label: 'Homepage & Hero', icon: 'home' }] },
  {
    title: 'Content',
    items: [
      { key: 'results', label: 'Results', icon: 'star' },
      { key: 'courses', label: 'Courses', icon: 'book' },
      { key: 'faculty', label: 'Faculty', icon: 'users' },
      { key: 'owners', label: 'Owners / Directors', icon: 'users' },
      { key: 'branches', label: 'Branches', icon: 'pin' },
      { key: 'gallery', label: 'Gallery', icon: 'image' },
      { key: 'testimonials', label: 'Testimonials', icon: 'quote' },
      { key: 'announcements', label: 'Announcements', icon: 'bell' },
      { key: 'stats', label: 'Statistics', icon: 'chart' },
    ],
  },
  { title: 'Leads', items: [{ key: 'admissions', label: 'Admissions', icon: 'inbox' }] },
];

const ICONS: Record<string, string> = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/>',
  star: '<path d="M12 3l2.9 5.9 6.1.9-4.5 4.3 1.1 6.1L12 17.8 6.4 20.9l1.1-6.1L3 10.4l6.1-.9z"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.5a3.5 3.5 0 0 1 0 7"/>',
  image: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 17-5-5-5 5-3-3-5 5"/>',
  quote: '<path d="M7 7h5v6a4 4 0 0 1-4 4H7zM14 7h5v6a4 4 0 0 1-4 4h-1z"/>',
  bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  inbox: '<path d="M3 12h5l2 3h4l2-3h5"/><path d="M5 6h14l2 6v7H3v-7z"/>',
  pin: '<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
};

function NavIcon({ name }: { name: string }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: ICONS[name] || '' }} />;
}

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) { setReady(true); return; }
    sb.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen grid place-items-center bg-cloud px-4 text-center">
        <div className="max-w-md">
          <h1 className="font-display font-bold text-2xl text-navy">Supabase not connected</h1>
          <p className="text-body mt-2">Add your keys to <code className="text-green-deep">.env</code> and restart the dev server.</p>
        </div>
      </div>
    );
  }
  if (!ready) return <div className="min-h-screen grid place-items-center bg-cloud text-body">Loading...</div>;
  if (!session) return <Login />;

  const sb = getSupabase();
  const activePanel = panels.find((p) => p.key === active);
  const activeLabel = groups.flatMap((g) => g.items).find((i) => i.key === active)?.label ?? '';

  return (
    <div className="min-h-screen bg-cloud">
      {/* top bar */}
      <header className="bg-white border-b border-line sticky top-0 z-40">
        <div className="px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-navy" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-green text-white">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4 2 9l10 5 10-5z" /><path d="M6 11v4c0 1.5 3 3 6 3s6-1.5 6-3v-4" /></svg>
            </span>
            <span className="font-display font-extrabold text-navy hidden sm:block">Vidya Ashram Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-sm font-medium text-body hover:text-green-deep hidden sm:inline">View site ↗</a>
            <span className="text-sm text-mute hidden md:inline border-l border-line pl-3">{session.user.email}</span>
            <button onClick={() => sb?.auth.signOut()} className="btn btn-green" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}>Sign out</button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* sidebar */}
        <aside className={`${menuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0 bg-white border-r border-line lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 absolute lg:relative z-30 overflow-y-auto`}>
          <nav className="p-4">
            {groups.map((g, gi) => (
              <div key={gi} className="mb-5">
                {g.title && <p className="px-3 mb-2 text-[0.68rem] font-semibold uppercase tracking-wider text-mute">{g.title}</p>}
                {g.items.map((n) => {
                  const on = active === n.key;
                  return (
                    <button key={n.key} onClick={() => { setActive(n.key); setMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-colors ${on ? 'bg-green text-white' : 'text-ink hover:bg-cloud'}`}>
                      <NavIcon name={n.icon} />{n.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* content */}
        <main className="flex-1 min-w-0 p-5 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* breadcrumb */}
            <p className="text-xs text-mute mb-4">Admin <span className="mx-1">/</span> <span className="text-body font-medium">{activeLabel}</span></p>
            {active === 'dashboard' && <DashboardPanel go={setActive} />}
            {active === 'homepage' && <HomepagePanel />}
            {active === 'admissions' && <AdmissionsPanel />}
            {activePanel && <CrudPanel panel={activePanel} />}
          </div>
        </main>
      </div>
    </div>
  );
}
