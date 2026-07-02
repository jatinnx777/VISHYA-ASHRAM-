import { getSupabase, isSupabaseConfigured, SUPABASE_URL } from './supabase';

export { isSupabaseConfigured };

/** Fetch all rows from a table, ordered. Returns [] when Supabase is off. */
export async function listRows<T = any>(table: string, orderBy = 'sort'): Promise<T[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from(table).select('*').order(orderBy, { ascending: true });
  if (error) {
    console.warn(`[db] listRows ${table}:`, error.message);
    return [];
  }
  return (data as T[]) ?? [];
}

/** Only published rows (for the public site). */
export async function listPublished<T = any>(table: string, orderBy = 'sort'): Promise<T[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from(table).select('*').eq('published', true).order(orderBy, { ascending: true });
  if (error) {
    // table might not have `published`; fall back to plain list
    return listRows<T>(table, orderBy);
  }
  return (data as T[]) ?? [];
}

export async function getSingleton<T = any>(table: string): Promise<T | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.from(table).select('*').eq('id', 1).maybeSingle();
  return (data as T) ?? null;
}

export async function upsertRow(table: string, row: Record<string, any>) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not configured');
  const { data, error } = await sb.from(table).upsert(row).select().single();
  if (error) throw error;
  return data;
}

export async function deleteRow(table: string, id: string) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not configured');
  const { error } = await sb.from(table).delete().eq('id', id);
  if (error) throw error;
}

/** Upload a file to the public `media` bucket and return its storage path. */
export async function uploadMedia(file: File, folder: string): Promise<string> {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not configured');
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await sb.storage.from('media').upload(path, file, {
    cacheControl: '3600',
    upsert: true,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  return path;
}

export function publicUrl(path?: string): string | undefined {
  if (!path || !isSupabaseConfigured) return undefined;
  if (path.startsWith('http')) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/media/${path}`;
}
