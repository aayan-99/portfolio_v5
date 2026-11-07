import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { marqueeWords } from '../data/resume'

/** Infinite text band that speeds up and flips direction with scroll velocity. */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tween = gsap.to('.marquee-track', {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: 'none',
      })

      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = self.getVelocity()
          if (Math.abs(velocity) > 80) {
            tween.timeScale(gsap.utils.clamp(-6, 6, velocity / 250))
          }
          gsap.to(tween, {
            timeScale: velocity < 0 ? -1 : 1,
            duration: 1.4,
            ease: 'power2.out',
            overwrite: true,
          })
        },
      })

      return () => st.kill()
    },
    { scope: root },
  )

  const half = (
    <>
      {marqueeWords.map((word, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span
            className={`font-display px-5 text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold uppercase leading-none ${
              i % 2 === 0 ? 'text-bone' : 'text-stroke'
            }`}
          >
            {word}
          </span>
          <svg viewBox="0 0 100 100" className="h-5 w-5 shrink-0 fill-accent" aria-hidden="true">
            <path d="M50 0 L58 38 L96 29 L66 50 L96 71 L58 62 L50 100 L42 62 L4 71 L34 50 L4 29 L42 38 Z" />
          </svg>
        </span>
      ))}
    </>
  )

  return (
    <div ref={root} className="overflow-hidden border-y border-line py-6" aria-hidden="true">
      <div className="marquee-track flex w-max will-change-transform">
        {half}
        {half}
      </div>
    </div>
  )
}
