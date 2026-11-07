import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SectionHeading from './SectionHeading'
import { skills } from '../data/resume'

export default function Skills() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.skill-group').forEach((group) => {
        const q = gsap.utils.selector(group)
        const tl = gsap.timeline({ scrollTrigger: { trigger: group, start: 'top 88%' } })
        tl.from(q('.skill-border'), { scaleX: 0, duration: 1.1, ease: 'power4.inOut' })
        tl.from(q('.skill-label'), { y: 24, autoAlpha: 0, duration: 0.7, ease: 'power3.out' }, 0.1)
        tl.from(
          q('.skill-pill'),
          {
            y: 24,
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(1.7)',
          },
          0.25,
        )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="skills" className="px-6 py-28 md:px-10 md:py-40">
      <SectionHeading num="04" title="Arsenal" />

      <div>
        {skills.map((group) => (
          <div
            key={group.label}
            className="skill-group relative grid gap-5 py-9 md:grid-cols-[1fr_2fr] md:gap-10 md:py-12"
          >
            <div className="skill-border absolute top-0 left-0 h-px w-full origin-left bg-line" />
            <h3 className="skill-label font-mono text-xs tracking-[0.25em] text-muted uppercase md:text-sm">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-3">
              {group.items.map((item) => (
                <span key={item} className="skill-pill inline-block">
                  <span
                    data-cursor
                    className="font-display inline-block cursor-default rounded-full border border-line px-6 py-2.5 text-base font-medium text-bone transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-ink md:text-lg"
                  >
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="h-px w-full bg-line" />
      </div>
    </section>
  )
}
