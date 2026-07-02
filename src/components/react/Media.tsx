import { useState } from 'react';
import { isSupabaseConfigured } from '../../lib/supabase';

const base = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;

/** Deterministic Supabase Storage public URL for a media path. */
export function mediaUrl(path?: string): string | undefined {
  if (!path || !isSupabaseConfigured || !base) return undefined;
  return `${base}/storage/v1/object/public/media/${path}`;
}

type Props = {
  path?: string;
  alt?: string;
  label?: string;
  className?: string;
  imgClass?: string;
};

/**
 * The single image primitive for the whole site. Every photo comes through here
 * and is controlled by the CMS (Supabase Storage). Until an image exists it
 * renders a graded emerald skeleton that fills its parent — the *parent* owns
 * the layout/aspect, so the placeholder never dictates sizing. A tiny corner tag
 * tells the owner what to upload.
 */
export default function Media({ path, alt = '', label, className = '', imgClass = '' }: Props) {
  const url = mediaUrl(path);
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);
  const show = !!url && !err;

  return (
    <div className={`media ${show && loaded ? 'has-img' : ''} ${className}`}>
      {show && (
        <img
          src={url}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={imgClass}
          onLoad={() => setLoaded(true)}
          onError={() => setErr(true)}
        />
      )}
      {(!show || !loaded) && label && (
        <span className="absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ background: 'var(--color-navy)', color: '#fff' }}>
          {label}
        </span>
      )}
    </div>
  );
}
