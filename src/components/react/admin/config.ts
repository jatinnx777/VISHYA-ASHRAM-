export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'image' | 'bool' | 'date';
export type Field = { name: string; label: string; type: FieldType; options?: string[] };
export type Panel = {
  key: string;
  label: string;
  table: string;
  folder: string;       // storage folder for image uploads
  titleField: string;   // shown as the row heading in the list
  imageField?: string;  // which field renders as the thumbnail
  subtitleField?: string;
  fields: Field[];
};

export const panels: Panel[] = [
  {
    key: 'results', label: 'Results', table: 'results', folder: 'results',
    titleField: 'name', imageField: 'photo', subtitleField: 'rank',
    fields: [
      { name: 'photo', label: 'Student photo', type: 'image' },
      { name: 'name', label: 'Student name', type: 'text' },
      { name: 'rank', label: 'Rank / AIR', type: 'text' },
      { name: 'exam', label: 'Exam', type: 'text' },
      { name: 'category', label: 'Category', type: 'select', options: ['IIT JEE', 'NEET', 'Olympiad', 'Top Rankers', '12th Board', '10th Board'] },
      { name: 'detail', label: 'Detail (college or marks)', type: 'text' },
      { name: 'year', label: 'Year', type: 'text' },
      { name: 'sort', label: 'Order', type: 'number' },
      { name: 'published', label: 'Published', type: 'bool' },
    ],
  },
  {
    key: 'courses', label: 'Courses', table: 'courses', folder: 'courses',
    titleField: 'name', imageField: 'photo', subtitleField: 'category',
    fields: [
      { name: 'photo', label: 'Course photo', type: 'image' },
      { name: 'name', label: 'Program name', type: 'text' },
      { name: 'category', label: 'Category (filter)', type: 'select', options: ['Engineering', 'Medical', 'Foundation'] },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'tag1', label: 'Tag 1 (orange)', type: 'text' },
      { name: 'tag2', label: 'Tag 2 (blue)', type: 'text' },
      { name: 'tag3', label: 'Tag 3 (green)', type: 'text' },
      { name: 'sort', label: 'Order', type: 'number' },
      { name: 'published', label: 'Published', type: 'bool' },
    ],
  },
  {
    key: 'faculty', label: 'Faculty', table: 'faculty', folder: 'faculty',
    titleField: 'name', imageField: 'photo', subtitleField: 'subject',
    fields: [
      { name: 'photo', label: 'Faculty photo', type: 'image' },
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'subject', label: 'Subject', type: 'text' },
      { name: 'qualification', label: 'Qualification', type: 'text' },
      { name: 'experience', label: 'Experience', type: 'text' },
      { name: 'sort', label: 'Order', type: 'number' },
      { name: 'published', label: 'Published', type: 'bool' },
    ],
  },
  {
    key: 'gallery', label: 'Gallery', table: 'gallery', folder: 'gallery',
    titleField: 'label', imageField: 'media',
    fields: [
      { name: 'media', label: 'Photo', type: 'image' },
      { name: 'label', label: 'Caption', type: 'text' },
      { name: 'ratio', label: 'Shape', type: 'select', options: ['tall', 'wide', 'square'] },
      { name: 'sort', label: 'Order', type: 'number' },
    ],
  },
  {
    key: 'announcements', label: 'Announcements', table: 'announcements', folder: 'announcements',
    titleField: 'title', subtitleField: 'date',
    fields: [
      { name: 'title', label: 'Announcement', type: 'textarea' },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'is_new', label: 'Show "New" badge', type: 'bool' },
      { name: 'sort', label: 'Order', type: 'number' },
      { name: 'published', label: 'Published', type: 'bool' },
    ],
  },
  {
    key: 'testimonials', label: 'Testimonials', table: 'testimonials', folder: 'testimonials',
    titleField: 'name', subtitleField: 'role',
    fields: [
      { name: 'quote', label: 'Quote', type: 'textarea' },
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'role', label: 'Role (e.g. Parent, NEET 2026)', type: 'text' },
      { name: 'rating', label: 'Stars (1 to 5)', type: 'number' },
      { name: 'sort', label: 'Order', type: 'number' },
      { name: 'published', label: 'Published', type: 'bool' },
    ],
  },
  {
    key: 'stats', label: 'Statistics', table: 'stats', folder: 'stats',
    titleField: 'label', subtitleField: 'value',
    fields: [
      { name: 'value', label: 'Number', type: 'number' },
      { name: 'suffix', label: 'Suffix (e.g. +)', type: 'text' },
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'sort', label: 'Order', type: 'number' },
    ],
  },
];

// Homepage singleton fields (hero, featured banner, contact).
export const homepageFields: Field[] = [
  { name: 'hero_photo', label: 'Hero photo (students)', type: 'image' },
  { name: 'hero_line1', label: 'Hero line 1', type: 'text' },
  { name: 'hero_line2', label: 'Hero line 2', type: 'text' },
  { name: 'hero_line3', label: 'Hero line 3 (accent)', type: 'text' },
  { name: 'hero_sub', label: 'Hero subtext', type: 'textarea' },
  { name: 'primary_cta', label: 'Primary button text', type: 'text' },
  { name: 'secondary_cta', label: 'Secondary button text', type: 'text' },
  { name: 'founder_photo', label: 'Founder / Director photo', type: 'image' },
  { name: 'founder_name', label: 'Founder name', type: 'text' },
  { name: 'founder_role', label: 'Founder role', type: 'text' },
  { name: 'founder_headline', label: 'Founder section headline', type: 'text' },
  { name: 'founder_message', label: "Founder's message (paragraphs separated by a blank line)", type: 'textarea' },
  { name: 'founder_mission', label: 'Mission', type: 'textarea' },
  { name: 'founder_vision', label: 'Vision', type: 'textarea' },
  { name: 'phone', label: 'Phone', type: 'text' },
  { name: 'whatsapp', label: 'WhatsApp number', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'address', label: 'Address', type: 'textarea' },
  { name: 'map_embed', label: 'Google Maps embed URL', type: 'text' },
];
