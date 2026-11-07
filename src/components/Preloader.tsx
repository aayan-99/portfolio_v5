import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const WORDS = ['DESIGN', 'MOTION', 'CODE', 'EXPERIENCE']

interface Props {
  onReveal: () => void
}

export default function Preloader({ onReveal }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const [gone, setGone] = useState(false)

  useGSAP(
    () => {
      const counter = { v: 0 }
      const words = gsap.utils.toArray<HTMLElement>('.pre-word')
      const tl = gsap.timeline({ onComplete: () => setGone(true) })

      // word carousel — each word sharpens into focus from a blur, holds so
      // it can be read, then blurs back out before the next one enters
      const IN = 0.5
      const HOLD = 0.35
      const FADE = 0.3
      const STEP = IN + HOLD + FADE
      words.forEach((word, i) => {
        tl.fromTo(
          word,
          { autoAlpha: 0, filter: 'blur(16px)', scale: 1.06 },
          { autoAlpha: 1, filter: 'blur(0px)', scale: 1, duration: IN, ease: 'power2.out' },
          i * STEP,
        )
        if (i < words.length - 1) {
          tl.to(
            word,
            { autoAlpha: 0, filter: 'blur(12px)', scale: 0.98, duration: FADE, ease: 'power2.in' },
            i * STEP + IN + HOLD,
          )
        }
      })

      // counter 000 → 100, landing just after the last word settles
      tl.to(
        counter,
        {
          v: 100,
          duration: (WORDS.length - 1) * STEP + IN + 0.3,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
            }
          },
        },
        0,
      )

      // exit — content slips up, then the two curtains lift
      tl.to('.pre-content', { yPercent: -40, autoAlpha: 0, duration: 0.5, ease: 'power2.in' })
      tl.add(() => onReveal())
      tl.to('.pre-panel-main', { yPercent: -100, duration: 1, ease: 'power4.inOut' })
      tl.to('.pre-panel-accent', { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '<0.08')
    },
    { scope: root },
  )

  if (gone) return null

  return (
    <div ref={root} className="fixed inset-0 z-[100]">
      <div className="pre-panel-accent absolute inset-0 bg-accent" />
      <div className="pre-panel-main absolute inset-0 flex flex-col justify-between bg-ink p-6 md:p-10">
        <div className="pre-content flex h-full flex-col">
          <div className="flex items-center justify-between font-mono text-xs tracking-widest text-muted">
            <span>AAYANJIT BHUYAN</span>
            <span>PORTFOLIO — 2026</span>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="relative h-[clamp(3.5rem,9vw,8rem)] w-[90vw]">
              {WORDS.map((w) => (
                <span
                  key={w}
                  className="pre-word font-display absolute inset-x-0 top-0 block text-center text-[clamp(3rem,8vw,7rem)] font-semibold leading-none text-bone"
                  style={{ opacity: 0 }}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <span
              ref={counterRef}
              className="font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-none text-bone tabular-nums"
            >
              000
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
