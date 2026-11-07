import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Magnetic from './Magnetic'
import { scrollToSection } from '../lib/scroll'
import { profile } from '../data/resume'

export default function Footer() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
      tl.fromTo(
        '.footer-line-inner',
        { yPercent: 115 },
        { yPercent: 0, duration: 1.2, stagger: 0.12, ease: 'power4.out' },
      )
      tl.fromTo(
        '.footer-cta',
        { scale: 0 },
        { scale: 1, duration: 0.9, ease: 'back.out(1.6)' },
        0.5,
      )
      tl.fromTo(
        '.footer-meta',
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out' },
        0.6,
      )
    },
    { scope: root },
  )

  return (
    <footer
      ref={root}
      id="contact"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pt-32 pb-8 md:px-10"
    >
      <div
        className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(closest-side, #ff4d24, transparent)' }}
      />

      <div className="relative">
        <p className="footer-meta invisible mb-8 font-mono text-xs tracking-[0.3em] text-accent uppercase">
          (05) — Have an idea?
        </p>
        <h2 className="font-display select-none font-semibold uppercase leading-[0.95] tracking-tight text-bone">
          <span className="mask-line">
            <span className="footer-line-inner block text-[clamp(3rem,11vw,10rem)]">
              Let&rsquo;s work
            </span>
          </span>
          <span className="mask-line">
            <span className="footer-line-inner block text-[clamp(3rem,11vw,10rem)]">
              together<span className="text-accent">.</span>
            </span>
          </span>
        </h2>

        <div className="mt-12 flex flex-wrap items-center gap-10 md:mt-16">
          <Magnetic strength={0.45}>
            <a
              href={`mailto:${profile.email}`}
              className="footer-cta group flex h-36 w-36 items-center justify-center rounded-full border border-bone/30 text-center transition-colors duration-500 hover:border-accent hover:bg-accent md:h-44 md:w-44"
            >
              <span className="font-mono text-xs tracking-widest text-bone uppercase transition-colors duration-500 group-hover:text-ink">
                Say hello ↗
              </span>
            </a>
          </Magnetic>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="footer-meta invisible link-sweep font-display w-fit text-xl font-medium text-bone md:text-3xl"
            >
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="footer-meta invisible link-sweep w-fit font-mono text-sm text-muted"
            >
              {profile.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="relative mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[0.65rem] tracking-wider text-muted uppercase md:text-xs">
        <span className="footer-meta invisible">
          © 2026 {profile.firstName} {profile.lastName} — All rights reserved
        </span>
        <div className="footer-meta invisible flex gap-6">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="link-sweep text-bone/80"
          >
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="link-sweep text-bone/80">
            Email
          </a>
        </div>
        <button
          onClick={() => scrollToSection('#top')}
          className="footer-meta invisible link-sweep text-bone/80"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
