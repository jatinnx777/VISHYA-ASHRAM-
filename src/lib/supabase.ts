import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client factory.
 *
 * The public marketing site runs perfectly without Supabase configured — it
 * falls back to the content in `src/content/site.ts`. Supabase is only required
 * for the Admin portal, CMS reads, and media uploads.
 */
const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured =
  !!url && !!anonKey && !url.includes('your-project');

let _client: SupabaseClient | null = null;

/** Browser/anon client. Returns null when Supabase isn't configured yet. */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!_client) {
    _client = createClient(url as string, anonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return _client;
}
