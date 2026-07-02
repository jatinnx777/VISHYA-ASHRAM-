/**
 * Central content model for Vidya Ashram Classes (Hajipur, Vaishali).
 * Shapes match the Supabase tables (see supabase/schema.sql), so these arrays
 * double as the instant fallback for the live CMS reads. No em dashes.
 */

export const site = {
  name: 'Vidya Ashram Classes',
  short: 'Vidya Ashram',
  tagline: 'A new ray of hope for sound education in Hajipur.',
  location: 'Hajipur',
  district: 'Vaishali',
  phone: '+91 90000 00000',
  whatsapp: '+91 90000 00000',
  email: 'admissions@vidyaashramclasses.com',
  address: 'Vidya Ashram Classes, Hajipur, Vaishali, Bihar. Add the full address in Admin, Homepage.',
  mapEmbed: '',
  socials: { instagram: '#', youtube: '#', facebook: '#' },
};

export const hero = {
  eyebrow: 'Hajipur  ·  Vaishali  ·  JEE  ·  NEET  ·  Foundation',
  hero_line1: 'The Leader in JEE, NEET',
  hero_line2: '& Foundation Coaching',
  hero_line3: 'in Hajipur',
  hero_sub: 'Sound, balanced education for the students of Hajipur and Vaishali. Experienced faculty, small batches and regular tests, led by NIT graduate Mr. Gaurav Roy.',
  primary_cta: 'Enquire Now',
  secondary_cta: 'Get More Information',
  hero_photo: '',
};

export const featured = {
  featured_title: 'Vidya Ashram Hajipur',
  featured_badge: 'JEE Advanced 2026 Results',
  featured_headline: 'The legacy of toppers continues strong',
  highlight1_value: '9', highlight1_label: 'Students under 1000 All India Rank',
  highlight2_value: '18', highlight2_label: 'Students under 2000 All India Rank',
};

export const stats = [
  { value: 2400, suffix: '+', label: 'Students taught' },
  { value: 350, suffix: '+', label: 'Selections' },
  { value: 12, suffix: '', label: 'Years of service' },
  { value: 20, suffix: '+', label: 'Expert faculty' },
];

export type CourseCategory = 'Engineering' | 'Medical' | 'Foundation';
export const courses = [
  { id: 'ascend', name: 'Ascend', category: 'Engineering', description: '2 year integrated classroom program for JEE Main and Advanced, for students moving to Class 11.', tag1: 'Engineering (11th)', tag2: 'Class 11th', tag3: '18 to 24 Months', photo: '' },
  { id: 'sprint', name: 'Sprint', category: 'Engineering', description: '1 year focused program for JEE Main and Advanced, for students moving to Class 12.', tag1: 'Engineering (12th)', tag2: 'Class 12th', tag3: '12 to 15 Months', photo: '' },
  { id: 'pulse', name: 'Pulse', category: 'Medical', description: '2 year and 1 year tracks for NEET UG, with daily practice and full length testing.', tag1: 'Medical (NEET)', tag2: 'Class 11th & 12th', tag3: '12 to 24 Months', photo: '' },
  { id: 'aarambh', name: 'Aarambh', category: 'Foundation', description: 'Foundation program for Class 9 and 10 that builds Olympiad grade reasoning and character early.', tag1: 'Foundation', tag2: 'Class 9th & 10th', tag3: '12 Months', photo: '' },
];

export const announcements = [
  { id: 'a1', title: 'Vidya Ashram Scholarship Test 2026 to 27 is officially open. Register now for free.', date: '2026-06-29', is_new: true },
  { id: 'a2', title: 'NEET UG 2026 paper solution goes live. Watch now.', date: '2026-06-21', is_new: true },
  { id: 'a3', title: 'NEET UG 2026 answer key released by Vidya Ashram. Download now.', date: '2026-06-21', is_new: true },
  { id: 'a4', title: 'New Foundation, JEE and NEET 2027 batches. Limited seats per batch.', date: '2026-06-05', is_new: false },
];

export type ResultCategory = 'IIT JEE' | 'NEET' | 'Olympiad' | 'Top Rankers' | '12th Board' | '10th Board';
export const results = [
  { id: 'r1', name: 'Student Name', exam: 'JEE Advanced', category: 'IIT JEE', rank: 'AIR 321', detail: 'IIT Bombay', year: '2026', photo: '' },
  { id: 'r2', name: 'Student Name', exam: 'JEE Advanced', category: 'IIT JEE', rank: 'AIR 464', detail: 'IIT Delhi', year: '2026', photo: '' },
  { id: 'r3', name: 'Student Name', exam: 'NEET UG', category: 'NEET', rank: 'AIR 637', detail: '695 / 720', year: '2026', photo: '' },
  { id: 'r4', name: 'Student Name', exam: 'NEET UG', category: 'NEET', rank: 'AIR 672', detail: '691 / 720', year: '2026', photo: '' },
  { id: 'r5', name: 'Student Name', exam: 'NTSE', category: 'Olympiad', rank: 'Scholar', detail: 'National Scholar', year: '2026', photo: '' },
  { id: 'r6', name: 'Student Name', exam: 'Class 12 Board', category: '12th Board', rank: '98.2%', detail: 'School Topper', year: '2026', photo: '' },
  { id: 'r7', name: 'Student Name', exam: 'Class 10 Board', category: '10th Board', rank: '98.8%', detail: 'School Topper', year: '2026', photo: '' },
  { id: 'r8', name: 'Student Name', exam: 'JEE Main', category: 'Top Rankers', rank: '99.8 %ile', detail: 'NIT Trichy', year: '2026', photo: '' },
];

export const faculty = [
  { id: 'f1', name: 'Mr. Gaurav Roy', subject: 'Physics · Director', qualification: 'B.Tech, NIT Calicut', experience: '12 Years', photo: '' },
  { id: 'f2', name: 'Faculty Name', subject: 'Mathematics', qualification: 'M.Sc Mathematics', experience: '15 Years', photo: '' },
  { id: 'f3', name: 'Faculty Name', subject: 'Chemistry', qualification: 'Ph.D Chemistry', experience: '12 Years', photo: '' },
  { id: 'f4', name: 'Faculty Name', subject: 'Biology', qualification: 'MBBS, M.Sc', experience: '16 Years', photo: '' },
];

// Founder / Director's message (Mr. Gaurav Roy)
export const founder = {
  name: 'Mr. Gaurav Roy',
  role: 'Chief Director & Founder',
  photo: '',
  headline: 'A vision for Vaishali, built in Hajipur',
  paras: [
    'In a very short span of time Vidya Ashram Classes has reached new heights in education. Hajipur has earned its name in politics and trade, yet sound coaching has long been out of reach for most of its students. Vidya Ashram was founded to change that.',
    'Our Chief Director, Mr. Gaurav Roy, is a son of Vaishali. He cleared IIT JEE in 2012 and completed his B.Tech from NIT Calicut. After teaching at institutes across the country, he chose to return home and serve his own soil.',
    'His belief is simple. Students should learn not only for exams but for life, so that they grow strong in mind, spirit and character. Distance has nothing to do with the quality of education, and Hajipur deserves the very best.',
  ],
  mission: 'To bring sound and balanced education to Hajipur, so no student has to leave home to prepare well.',
  vision: 'To make the land of Vaishali proud, one well prepared student at a time.',
};

export const whyChooseUs = [
  { title: 'Experienced Faculty', body: 'Senior subject specialists led by an NIT graduate, teaching in Hajipur with genuine care.', icon: 'compass' },
  { title: 'Small Batch Size', body: 'Deliberately limited seats so every student is seen, heard and mentored.', icon: 'users' },
  { title: 'Regular Tests', body: 'Weekly tests under real exam conditions, so there are no surprises on the day.', icon: 'test' },
  { title: 'Doubt Sessions', body: 'Dedicated daily doubt clearing so nothing is ever left unresolved.', icon: 'chat' },
  { title: 'Character & Culture', body: 'We build strong minds and strong character, not just strong scorecards.', icon: 'book' },
  { title: 'Personal Guidance', body: 'A mentor who tracks each student and speaks regularly with parents.', icon: 'star' },
];

export const testimonials = [
  { id: 't1', quote: 'The mentors knew exactly where my son was weak before he did. That is the difference.', name: 'Parent', role: 'JEE 2026', rating: 5 },
  { id: 't2', quote: 'Small batches meant I could never hide. It is the reason I improved so much.', name: 'Student', role: 'NEET 2026', rating: 5 },
  { id: 't3', quote: 'Finally, sound coaching in Hajipur itself. We did not have to send our daughter to Patna.', name: 'Parent', role: 'Board 2025', rating: 5 },
];

export const galleryTiles = [
  { id: 'g1', label: 'Campus', ratio: 'tall', media: '' },
  { id: 'g2', label: 'Classroom', ratio: 'wide', media: '' },
  { id: 'g3', label: 'Lab session', ratio: 'square', media: '' },
  { id: 'g4', label: 'Toppers wall', ratio: 'tall', media: '' },
  { id: 'g5', label: 'Library', ratio: 'square', media: '' },
  { id: 'g6', label: 'Event day', ratio: 'wide', media: '' },
  { id: 'g7', label: 'Award ceremony', ratio: 'square', media: '' },
];

export const faqs = [
  { q: 'Where is Vidya Ashram Classes located?', a: 'We are located in Hajipur, in the Vaishali district of Bihar. The address and map are in the Contact section, and you are always welcome to visit.' },
  { q: 'Who runs Vidya Ashram Classes?', a: 'It is led by Mr. Gaurav Roy, an NIT Calicut graduate and IIT JEE qualifier from Vaishali, along with a team of senior teachers.' },
  { q: 'Which courses do you offer?', a: 'JEE (Main and Advanced), NEET UG, Foundation for Class 9 and 10, and Board classes for Class 11 and 12.' },
  { q: 'How large are the batches?', a: 'Batches are deliberately small so every student gets personal attention and mentoring.' },
  { q: 'Can I attend a demo class before enrolling?', a: 'Yes. Book a free demo class through the enquiry form and our team will schedule it for you.' },
  { q: 'Is there a scholarship available?', a: 'We run a scholarship test offering up to 100 percent fee waiver for meritorious students. Watch the announcements for dates.' },
];

export const navLinks = [
  { label: 'Courses', href: '#courses' },
  { label: 'Results', href: '#results' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];
