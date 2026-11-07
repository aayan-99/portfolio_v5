import type Lenis from 'lenis'

/** Singleton holder so any component can drive the smooth scroller. */
export const scroller: { lenis: Lenis | null } = { lenis: null }

export function scrollToSection(selector: string) {
  if (scroller.lenis) {
    scroller.lenis.scrollTo(selector, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) })
  } else {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
  }
}
