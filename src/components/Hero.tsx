import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { profile } from '../data/resume'

interface Props {
  started: boolean
}

function Chars({ text, lineClass }: { text: string; lineClass: string }) {
  return (
    <span className={`${lineClass} flex overflow-hidden`} aria-hidden="true">
      {text.split('').map((char, i) => (
        <span key={i} className="hero-char inline-block will-change-transform">
          {char}
        </span>
      ))}
    </span>
  )
}

export default function Hero({ started }: Props) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!started) return

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo(
        '.hero-char',
        { yPercent: 115, rotate: 5 },
        { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.035 },
        0.1,
      )
      tl.fromTo(
        '.hero-meta',
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 },
        0.7,
      )
      tl.fromTo(
        '.hero-rule',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power4.inOut' },
        0.8,
      )

      // scroll hint line breathing
      gsap.fromTo(
        '.scroll-line-fill',
        { yPercent: -100 },
        { yPercent: 100, duration: 1.6, ease: 'power2.inOut', repeat: -1, delay: 2 },
      )
    },
    { scope: root, dependencies: [started] },
  )

  // kinetic exit — the two name lines shear apart as you scroll past
  useGSAP(
    () => {
      const scrub = {
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      }
      gsap.to('.hero-line-1', { xPercent: -7, scrollTrigger: scrub })
      gsap.to('.hero-line-2', { xPercent: 7, scrollTrigger: { ...scrub } })
      gsap.to('.hero-fade', {
        autoAlpha: 0,
        y: -60,
        scrollTrigger: { ...scrub, end: '70% top' },
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pt-28 pb-8 md:px-10"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -top-1/4 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(closest-side, #ff4d24, transparent)' }}
      />

      <div className="hero-fade hero-meta invisible flex items-center justify-between font-mono text-xs tracking-widest text-muted">
        <span className="flex items-center gap-2">
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          OPEN TO WORK
        </span>
        <span className="hidden md:block">PORTFOLIO — 2026</span>
        <span>{profile.location.toUpperCase()}</span>
      </div>

      <h1 className="hero-fade font-display select-none font-semibold uppercase leading-[0.92] tracking-tight text-bone">
        <span className="sr-only">
          {profile.firstName} {profile.lastName}
        </span>
        <span className="block text-[clamp(3.5rem,13.5vw,13rem)]">
          <Chars text={profile.firstName} lineClass="hero-line-1 justify-start" />
        </span>
        <span className="block text-[clamp(3.5rem,13.5vw,13rem)]">
          <span className="hero-line-2 flex items-center justify-end gap-[0.06em] overflow-hidden">
            <span className="hero-char inline-block shrink-0 will-change-transform">
              <svg
                viewBox="0 0 100 100"
                className="spin-slow h-[0.55em] w-[0.55em] fill-accent"
                aria-hidden="true"
              >
                <path d="M50 0 L58 38 L96 29 L66 50 L96 71 L58 62 L50 100 L42 62 L4 71 L34 50 L4 29 L42 38 Z" />
              </svg>
            </span>
            {profile.lastName.split('').map((char, i) => (
              <span key={i} className="hero-char inline-block will-change-transform">
                {char}
              </span>
            ))}
          </span>
        </span>
      </h1>

      <div className="hero-fade flex flex-col gap-8">
        <div className="hero-rule h-px w-full origin-left bg-line" />
        <div className="flex flex-wrap items-end justify-between gap-8">
          <p className="hero-meta invisible font-display max-w-xs text-lg font-medium leading-snug text-bone md:max-w-sm md:text-2xl">
            Software Developer crafting products that feel{' '}
            <span className="text-accent">alive</span>.
          </p>
          <p className="hero-meta invisible max-w-sm text-sm leading-relaxed text-muted md:text-base">
            {profile.summary}
          </p>
          <div className="hero-meta invisible flex items-center gap-3 font-mono text-xs tracking-widest text-muted">
            <span>SCROLL</span>
            <span className="relative block h-10 w-px overflow-hidden bg-line">
              <span className="scroll-line-fill absolute inset-0 bg-accent" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
