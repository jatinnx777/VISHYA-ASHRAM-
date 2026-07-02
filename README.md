# Vidya Ashram Classes

A premium, next-generation coaching-institute website — **Apple × Premium University × Minimal Luxury**.
Built with Astro, TypeScript, React islands, Tailwind CSS v4, GSAP-style scroll motion, and a Supabase-ready CMS.

This is a **fully isolated project**. Nothing outside this folder is touched — you can lift the
folder into its own repository at any time.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
```

Build for production:

```bash
npm run build
npm run preview
```

## Design system

- **Palette** — deep navy canvas, warm cream & white content bands, royal-blue + gold accents.
- **Type** — Fraunces (editorial display) + Inter (UI/body).
- **Tokens** live in [`src/styles/global.css`](src/styles/global.css) (`@theme`).
- **Placeholder system** — every image/video slot is a clearly labelled placeholder so the owner
  knows exactly what to replace. No stock imagery is used.

## Content & CMS

All content is centralised in [`src/content/site.ts`](src/content/site.ts). Components read from it,
so wiring the database later is a drop-in swap.

To go live with the CMS + Admin portal:

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor.
3. Copy `.env.example` → `.env` and fill in your keys.
4. Create the admin user in **Supabase → Authentication** using the owner email.

Until then the site runs on the built-in placeholder content, and the admission form works in
preview mode.

## Structure

```
src/
 ├─ components/          UI + section components
 │   ├─ sections/        Hero, About, Courses, Faculty, Results, …
 │   └─ react/           interactive islands (AdmissionForm)
 ├─ content/site.ts      single source of truth (CMS mirror)
 ├─ layouts/Base.astro   SEO head, fonts, JSON-LD
 ├─ lib/supabase.ts      Supabase client factory
 ├─ pages/               index, courses, blog, admin
 ├─ styles/global.css    design tokens + utilities
 └─ utils/reveal.ts      scroll-reveal
supabase/schema.sql      database + RLS + storage
```
