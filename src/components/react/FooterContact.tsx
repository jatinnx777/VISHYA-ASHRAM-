import { site } from '../../content/site';
import { useSingleton } from './useData';

const I = {
  phone: 'M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  mail: 'M3 5h18v14H3zM3 7l9 6 9-6',
  pin: 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zM12 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
};
function Ic({ d }: { d: string }) {
  return <svg className="w-4 h-4 mt-0.5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
}

export default function FooterContact() {
  const c = useSingleton('homepage', { phone: site.phone, email: site.email, address: site.address } as any);
  return (
    <ul className="space-y-3 text-white/70 text-sm">
      <li className="flex items-start gap-2.5"><Ic d={I.phone} /><a href={`tel:${c.phone}`} className="hover:text-white">{c.phone}</a></li>
      <li className="flex items-start gap-2.5"><Ic d={I.mail} /><a href={`mailto:${c.email}`} className="hover:text-white break-all">{c.email}</a></li>
      <li className="flex items-start gap-2.5"><Ic d={I.pin} /><span>{c.address}</span></li>
    </ul>
  );
}
