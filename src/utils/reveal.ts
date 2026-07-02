/**
 * Scroll-reveal using GSAP ScrollTrigger when available, with an
 * IntersectionObserver fallback. Elements with `.reveal` fade + rise into view.
 * Honours prefers-reduced-motion (CSS already forces them visible).
 */
export function initReveal() {
  if (typeof window === 'undefined') return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
  if (!els.length) return;

  if (prefersReduced) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.delay ?? 0);
          window.setTimeout(() => el.classList.add('is-visible'), delay);
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  els.forEach((el) => io.observe(el));
}
