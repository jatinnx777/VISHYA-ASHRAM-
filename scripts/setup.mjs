/**
 * Seed the database with starter content (mirrors src/content/site.ts).
 * Idempotent: seeds a table only when it is empty. Run AFTER schema.sql:
 *   node scripts/setup.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split('\n').filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, '')]; })
);

const sb = createClient(env.PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function seed(table, rows) {
  const { count, error: cErr } = await sb.from(table).select('*', { count: 'exact', head: true });
  if (cErr) { console.log(`✗ ${table}: ${cErr.message} (did you run schema.sql?)`); return; }
  if ((count ?? 0) > 0) { console.log(`• ${table}: already has ${count} rows, skipped`); return; }
  const { error } = await sb.from(table).insert(rows);
  console.log(error ? `✗ ${table}: ${error.message}` : `✓ ${table}: seeded ${rows.length}`);
}

// Homepage singleton
{
  const { error } = await sb.from('homepage').upsert({
    id: 1,
    hero_line1: 'The Leader in JEE, NEET',
    hero_line2: '& Foundation Coaching',
    hero_line3: 'in Hajipur',
    hero_sub: 'Sound, balanced education for the students of Hajipur and Vaishali. Experienced faculty, small batches and regular tests, led by NIT graduate Mr. Gaurav Roy.',
    hero_photo: null,
    primary_cta: 'Enquire Now',
    secondary_cta: 'Get More Information',
    featured_title: 'Vidya Ashram Hajipur',
    featured_badge: 'JEE Advanced 2026 Results',
    featured_headline: 'The legacy of toppers continues strong',
    highlight1_value: '9', highlight1_label: 'Students under 1000 All India Rank',
    highlight2_value: '18', highlight2_label: 'Students under 2000 All India Rank',
    phone: '+91 90000 00000', whatsapp: '+91 90000 00000',
    email: 'admissions@vidyaashramclasses.com',
    address: 'Vidya Ashram Classes, Hajipur, Vaishali, Bihar. Add the full address in Admin, Homepage.',
    map_embed: '',
  });
  console.log(error ? `✗ homepage: ${error.message}` : '✓ homepage: singleton set');
}

await seed('stats', [
  { value: 2400, suffix: '+', label: 'Students taught', sort: 1 },
  { value: 350, suffix: '+', label: 'Selections', sort: 2 },
  { value: 12, suffix: '', label: 'Years of service', sort: 3 },
  { value: 20, suffix: '+', label: 'Expert faculty', sort: 4 },
]);

await seed('courses', [
  { name: 'Ascend', category: 'Engineering', class_level: 'Class 11th', duration: '18 to 24 Months', description: '2 year integrated classroom program for JEE Main and Advanced, for students moving to Class 11.', tag1: 'Engineering (11th)', tag2: 'Class 11th', tag3: '18 to 24 Months', sort: 1 },
  { name: 'Sprint', category: 'Engineering', class_level: 'Class 12th', duration: '12 to 15 Months', description: '1 year focused program for JEE Main and Advanced, for students moving to Class 12.', tag1: 'Engineering (12th)', tag2: 'Class 12th', tag3: '12 to 15 Months', sort: 2 },
  { name: 'Pulse', category: 'Medical', class_level: 'Class 11th & 12th', duration: '12 to 24 Months', description: '2 year and 1 year tracks for NEET UG, with daily practice and full length testing.', tag1: 'Medical (NEET)', tag2: 'Class 11th & 12th', tag3: '12 to 24 Months', sort: 3 },
  { name: 'Aarambh', category: 'Foundation', class_level: 'Class 9th & 10th', duration: '12 Months', description: 'Foundation program for Class 9 and 10 that builds Olympiad grade reasoning early.', tag1: 'Foundation', tag2: 'Class 9th & 10th', tag3: '12 Months', sort: 4 },
]);

await seed('faculty', [
  { name: 'Mr. Gaurav Roy', subject: 'Physics · Director', qualification: 'B.Tech, NIT Calicut', experience: '12 Years', sort: 1 },
  { name: 'Faculty Name', subject: 'Mathematics', qualification: 'M.Sc Mathematics', experience: '15 Years', sort: 2 },
  { name: 'Faculty Name', subject: 'Chemistry', qualification: 'Ph.D Chemistry', experience: '12 Years', sort: 3 },
  { name: 'Faculty Name', subject: 'Biology', qualification: 'MBBS, M.Sc', experience: '16 Years', sort: 4 },
]);

await seed('results', [
  { name: 'Student Name', exam: 'JEE Advanced', category: 'IIT JEE', rank: 'AIR 321', detail: 'IIT Bombay', year: '2026', sort: 1 },
  { name: 'Student Name', exam: 'JEE Advanced', category: 'IIT JEE', rank: 'AIR 464', detail: 'IIT Delhi', year: '2026', sort: 2 },
  { name: 'Student Name', exam: 'NEET UG', category: 'NEET', rank: 'AIR 637', detail: '695 / 720', year: '2026', sort: 3 },
  { name: 'Student Name', exam: 'NEET UG', category: 'NEET', rank: 'AIR 672', detail: '691 / 720', year: '2026', sort: 4 },
  { name: 'Student Name', exam: 'NTSE', category: 'Olympiad', rank: 'Scholar', detail: 'National Scholar', year: '2026', sort: 5 },
  { name: 'Student Name', exam: 'Class 12 Board', category: '12th Board', rank: '98.2%', detail: 'School Topper', year: '2026', sort: 6 },
  { name: 'Student Name', exam: 'Class 10 Board', category: '10th Board', rank: '98.8%', detail: 'School Topper', year: '2026', sort: 7 },
  { name: 'Student Name', exam: 'JEE Main', category: 'Top Rankers', rank: '99.8 %ile', detail: 'NIT Trichy', year: '2026', sort: 8 },
]);

await seed('gallery', [
  { label: 'Campus', ratio: 'tall', sort: 1 }, { label: 'Classroom', ratio: 'wide', sort: 2 },
  { label: 'Lab session', ratio: 'square', sort: 3 }, { label: 'Toppers wall', ratio: 'tall', sort: 4 },
  { label: 'Library', ratio: 'square', sort: 5 }, { label: 'Event day', ratio: 'wide', sort: 6 },
  { label: 'Award ceremony', ratio: 'square', sort: 7 },
]);

await seed('announcements', [
  { title: 'Vidya Ashram Scholarship Test 2026 to 27 is officially open. Register now for free.', date: '2026-06-29', is_new: true, sort: 1 },
  { title: 'NEET UG 2026 paper solution goes live. Watch now.', date: '2026-06-21', is_new: true, sort: 2 },
  { title: 'NEET UG 2026 answer key released by Vidya Ashram. Download now.', date: '2026-06-21', is_new: true, sort: 3 },
  { title: 'New Foundation, JEE and NEET 2027 batches. Limited seats per batch.', date: '2026-06-05', is_new: false, sort: 4 },
]);

await seed('testimonials', [
  { quote: 'The mentors knew exactly where my son was weak before he did. That is the difference.', name: 'Parent', role: 'JEE 2026', rating: 5, sort: 1 },
  { quote: 'Small batches meant I could never hide. It is the reason I improved so much.', name: 'Student', role: 'NEET 2026', rating: 5, sort: 2 },
  { quote: 'Finally, sound coaching in Hajipur itself. We did not have to send our daughter to Patna.', name: 'Parent', role: 'Board 2025', rating: 5, sort: 3 },
]);

console.log('\nSeed complete.');
