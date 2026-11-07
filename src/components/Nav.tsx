import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { scroller, scrollToSection } from '../lib/scroll'
import { profile } from '../data/resume'

const LINKS = [
  { label: 'About', num: '01', target: '#about' },
  { label: 'Experience', num: '02', target: '#experience' },
  { label: 'Works', num: '03', target: '#works' },
  { label: 'Contact', num: '04', target: '#contact' },
]

interface Props {
  started: boolean
}

export default function Nav({ started }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useGSAP(
    () => {
      gsap.set('.menu-overlay', { yPercent: -100 })
      tl.current = gsap
        .timeline({ paused: true })
        .to('.menu-overlay', { yPercent: 0, duration: 0.85, ease: 'power4.inOut' })
        .fromTo(
          '.menu-link-inner',
          { yPercent: 120 },
          { yPercent: 0, duration: 0.8, stagger: 0.07, ease: 'power4.out' },
          '-=0.3',
        )
        .fromTo(
          '.menu-meta',
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
          '-=0.55',
        )
    },
    { scope: root },
  )

  // Bar slides in once the preloader lifts
  useGSAP(
    () => {
      if (!started) return
      gsap.fromTo(
        '.nav-bar',
        { y: -40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', delay: 0.6 },
      )
    },
    { scope: root, dependencies: [started] },
  )

  useEffect(() => {
    if (open) {
      tl.current?.timeScale(1).play()
      scroller.lenis?.stop()
    } else {
      tl.current?.timeScale(1.4).reverse()
      if (started) scroller.lenis?.start()
    }
  }, [open, started])

  const go = (target: string) => {
    setOpen(false)
    // let the overlay start lifting before the page glides
    setTimeout(() => scrollToSection(target), 350)
  }

  return (
    <div ref={root}>
      <header className="nav-bar invisible fixed top-0 left-0 z-[70] flex w-full items-center justify-between px-6 py-5 md:px-10">
        <button
          onClick={() => go('#top')}
          className="font-display text-sm font-semibold tracking-wide text-bone"
        >
          AAYANJIT<span className="text-accent">©</span>26
        </button>
        <div className="hidden font-mono text-xs text-muted md:block">
          BLR, IN — {time} IST
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="group flex items-center gap-3 font-mono text-xs tracking-widest text-bone"
        >
          <span>{open ? 'CLOSE' : 'MENU'}</span>
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 top-0.5 h-px w-full bg-bone transition-transform duration-300 ${
                open ? 'translate-y-[5px] rotate-45' : 'group-hover:-translate-y-0.5'
              }`}
            />
            <span
              className={`absolute bottom-0.5 left-0 h-px w-full bg-bone transition-transform duration-300 ${
                open ? '-translate-y-[5px] -rotate-45' : 'group-hover:translate-y-0.5'
              }`}
            />
          </span>
        </button>
      </header>

      <div className="menu-overlay fixed inset-0 z-[65] flex flex-col justify-between bg-ink-2 px-6 pt-28 pb-8 md:px-10">
        <nav className="flex flex-col gap-1">
          {LINKS.map((link) => (
            <div key={link.num} className="overflow-hidden">
              <button
                onClick={() => go(link.target)}
                className="menu-link-inner group flex w-full items-baseline gap-4 py-1 text-left md:gap-8"
              >
                <span className="font-mono text-xs text-accent md:text-sm">({link.num})</span>
                <span className="font-display text-[clamp(2.8rem,9vw,7rem)] font-semibold leading-[1.05] text-bone transition-colors duration-300 group-hover:text-accent">
                  {link.label}
                </span>
                <span className="font-display ml-auto hidden text-2xl text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100 md:block md:-translate-x-4">
                  ↗
                </span>
              </button>
            </div>
          ))}
        </nav>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="menu-meta flex flex-col gap-1 font-mono text-xs text-muted">
            <span className="text-bone">GET IN TOUCH</span>
            <a href={`mailto:${profile.email}`} className="link-sweep w-fit text-bone/80">
              {profile.email}
            </a>
          </div>
          <div className="menu-meta flex gap-6 font-mono text-xs text-muted">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-sweep text-bone/80"
            >
              LINKEDIN
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="link-sweep text-bone/80">
              PHONE
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
