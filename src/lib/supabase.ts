import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client factory.
 *
 * The URL and anon key are PUBLIC values (safe in the browser — data is guarded
 * by row-level security), so we fall back to the project defaults when env vars
 * are not set. This means the deployed site works without any Vercel config.
 * The service-role key is never referenced here.
 */
const DEFAULT_URL = 'https://gfvtjodzhfuhguumtvkj.supabase.co';
const DEFAULT_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmdnRqb2R6aGZ1aGd1dW10dmtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5NzIwODQsImV4cCI6MjA5ODU0ODA4NH0.czSoJ76kh9G4bDvLSpYYd7FDmToJEJ2-z38b90gyHcY';

export const SUPABASE_URL = (import.meta.env.PUBLIC_SUPABASE_URL as string) || DEFAULT_URL;
const anonKey = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string) || DEFAULT_ANON;

export const isSupabaseConfigured = !!SUPABASE_URL && !!anonKey && !SUPABASE_URL.includes('your-project');

let _client: SupabaseClient | null = null;

/** Browser/anon client. */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!_client) {
    _client = createClient(SUPABASE_URL, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return _client;
}
