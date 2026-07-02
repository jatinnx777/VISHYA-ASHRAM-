import { site } from '../../content/site';
import { useSingleton } from './useData';
import { publicUrl } from '../../lib/db';

/**
 * The brand mark used across the site. Renders the CMS-uploaded logo when set,
 * otherwise a clean emblem fallback. `variant` controls colours for the green
 * nav (text via .nav-word CSS) vs the dark footer.
 */
export default function BrandLogo({ variant = 'nav' }: { variant?: 'nav' | 'footer' }) {
  const h = useSingleton('homepage', {} as any);
  const logo = publicUrl(h.brand_logo);
  const wordClass = variant === 'nav' ? 'nav-word' : 'text-white';
  const emblemBg = variant === 'nav' ? 'bg-green' : 'bg-white/15';

  return (
    <a href="/" className="flex items-center gap-2.5 shrink-0">
      {logo ? (
        <img src={logo} alt={site.name} className="h-10 w-auto object-contain" />
      ) : (
        <span className={`grid place-items-center w-9 h-9 rounded-xl text-white shrink-0 ${emblemBg}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4 2 9l10 5 10-5z" /><path d="M6 11v4c0 1.5 3 3 6 3s6-1.5 6-3v-4" /></svg>
        </span>
      )}
      <span className="leading-tight">
        <span className={`block ${wordClass} font-display font-extrabold text-base sm:text-lg tracking-tight`}>VIDYA ASHRAM</span>
        <span className={`block text-[0.6rem] font-medium ${variant === 'nav' ? 'text-gold' : 'text-gold'}`}>{site.tagline}</span>
      </span>
    </a>
  );
}
