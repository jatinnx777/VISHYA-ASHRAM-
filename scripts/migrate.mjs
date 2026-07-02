/**
 * Applies supabase/schema.sql directly to the database (runs DDL) and then
 * seeds starter content. Requires DATABASE_URL in .env (the Session pooler
 * connection string from Supabase, Settings > Database).
 *   node scripts/migrate.mjs
 */
import postgres from 'postgres';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split('\n').filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, '')]; })
);

const url = env.DATABASE_URL;
if (!url) { console.error('✗ DATABASE_URL missing in .env'); process.exit(1); }

const sql = readFileSync(new URL('../supabase/schema.sql', import.meta.url), 'utf8');
const client = postgres(url, { prepare: false, ssl: 'require' });

try {
  console.log('Applying schema.sql ...');
  await client.unsafe(sql);
  console.log('✓ Schema applied (tables + RLS + storage policies)\n');
} catch (e) {
  console.error('✗ Schema error:', e.message);
  process.exit(1);
} finally {
  await client.end();
}

console.log('Seeding content ...');
execSync('node scripts/setup.mjs', { stdio: 'inherit', cwd: new URL('..', import.meta.url) });
