# Aayanjit Bhuyan — Portfolio

Dark, editorial, motion-driven portfolio built with **React 19 + TypeScript + Tailwind CSS v4 + GSAP** (ScrollTrigger, SplitText) and **Lenis** smooth scrolling.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build (dist/)
npm run preview  # preview the production build
```

## Architecture

- `src/data/resume.ts` — all site content (profile, experience, projects, skills). Edit this file to update the site; no component changes needed.
- `src/lib/scroll.ts` — Lenis singleton + `scrollToSection` helper used by nav/footer.
- `src/components/` — one component per section:
  - `Preloader` — word roll + 000→100 counter, double-curtain exit
  - `Cursor` — custom dot + lagging ring (pointer-fine devices only)
  - `Nav` — fixed bar, live IST clock, full-screen menu overlay
  - `Hero` — staggered char reveal, scroll-sheared name lines
  - `Marquee` — infinite band, speeds up / flips with scroll velocity
  - `About` — SplitText line reveals + animated stat counters
  - `ExperienceSection`, `Projects` (cursor-following preview cards), `Skills`, `Footer` (magnetic CTA)

## Conventions

- GSAP animates wrapper elements; CSS `transition-*` hover effects live on children. Never put both on the same element — they fight over `transform`/`opacity`.
- All scroll animations live inside `useGSAP({ scope })` so they're auto-cleaned.
- Reduced-motion users get static infinite animations (see `@media (prefers-reduced-motion)` in `index.css`).
