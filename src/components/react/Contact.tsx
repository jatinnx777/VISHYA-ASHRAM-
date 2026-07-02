import { site } from '../../content/site';
import { useSingleton } from './useData';

const I = {
  phone: 'M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  wa: 'M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3zM8.5 8.5c0 4 3 7 7 7 .6 0 1-.5 1-1l-2-1-1 1c-1.5-.6-2.4-1.5-3-3l1-1z',
  mail: 'M3 5h18v14H3zM3 7l9 6 9-6',
  pin: 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zM12 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
};

function Ic({ d }: { d: string }) {
  return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
}

export default function Contact() {
  const fallback = { phone: site.phone, whatsapp: site.whatsapp, email: site.email, address: site.address, map_embed: site.mapEmbed };
  const c = useSingleton('homepage', fallback as any);
  const waNumber = (c.whatsapp || '').replace(/[^0-9]/g, '');

  const details = [
    { icon: I.phone, label: 'Call us', value: c.phone, href: `tel:${c.phone}`, color: 'var(--color-green)', bg: 'var(--color-green-soft)' },
    { icon: I.wa, label: 'WhatsApp', value: 'Chat now', href: `https://wa.me/${waNumber}`, color: '#1aa34a', bg: '#e7f8ee' },
    { icon: I.mail, label: 'Email', value: c.email, href: `mailto:${c.email}`, color: 'var(--color-blue)', bg: 'var(--color-blue-soft)' },
    { icon: I.pin, label: 'Visit', value: c.address, href: '#', color: 'var(--color-gold-deep)', bg: '#fff6da' },
  ];

  return (
    <section id="contact" className="section-pad bg-white">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow text-green-deep">Visit us in {site.location}</p>
          <h2 className="font-display d-lg text-navy mt-3">Come and see the classrooms for yourself</h2>
          <p className="mt-3 text-body">We are easiest to reach on WhatsApp or a phone call, but you are always welcome to walk in.</p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-start">
          <div className="grid sm:grid-cols-2 gap-4">
            {details.map((d) => (
              <a key={d.label} href={d.href} className="card p-6 flex items-center gap-4 card-hover" style={{ boxShadow: 'var(--shadow-soft)' }}>
                <span className="grid place-items-center w-12 h-12 rounded-xl shrink-0" style={{ background: d.bg, color: d.color }}><Ic d={d.icon} /></span>
                <span className="min-w-0">
                  <span className="block text-xs text-mute">{d.label}</span>
                  <span className="block font-semibold text-navy text-sm break-words">{d.value}</span>
                </span>
              </a>
            ))}
            <div className="sm:col-span-2 flex items-center gap-3">
              <span className="text-sm text-body">Follow us</span>
              {Object.entries(site.socials).map(([k, v]) => (
                <a key={k} href={v} aria-label={k} className="grid place-items-center w-10 h-10 rounded-full text-green-deep font-semibold capitalize" style={{ background: 'var(--color-green-soft)' }}>{k[0].toUpperCase()}</a>
              ))}
            </div>
          </div>

          {c.map_embed ? (
            <div className="rounded-3xl overflow-hidden aspect-[16/11]" style={{ boxShadow: 'var(--shadow-soft)' }}>
              <iframe src={c.map_embed} title="Map" className="w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          ) : (
            <div className="media rounded-3xl aspect-[16/11] grid place-items-center">
              <div className="relative z-10 text-center text-body">
                <span className="grid place-items-center mx-auto w-12 h-12 rounded-xl text-green" style={{ background: 'var(--color-green-soft)' }}><Ic d={I.pin} /></span>
                <p className="mt-2 font-semibold text-navy">Google Map, {site.location}</p>
                <p className="text-xs text-mute">Add the embed URL in Admin, Homepage, Contact details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
