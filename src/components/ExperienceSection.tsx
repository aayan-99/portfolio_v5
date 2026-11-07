import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SectionHeading from './SectionHeading'
import { experience } from '../data/resume'

export default function ExperienceSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.xp-row').forEach((row) => {
        const q = gsap.utils.selector(row)
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 85%' },
        })
        tl.from(q('.xp-border'), { scaleX: 0, duration: 1.2, ease: 'power4.inOut' })
        tl.from(
          q('.xp-content'),
          { y: 50, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
          0.15,
        )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="experience" className="px-6 py-28 md:px-10 md:py-40">
      <SectionHeading num="02" title="Experience" />

      <div>
        {experience.map((job) => (
          <article key={job.company} className="xp-row group relative py-10 md:py-14">
            <div className="xp-border absolute top-0 left-0 h-px w-full origin-left bg-line" />
            <div className="grid gap-4 md:grid-cols-[1fr_2fr] md:gap-10">
              <div className="xp-content flex flex-row items-baseline justify-between md:flex-col md:justify-start md:gap-3">
                <span className="font-mono text-xs text-muted">{job.period}</span>
                <span className="font-mono text-xs tracking-wider text-accent uppercase">
                  {job.role}
                </span>
              </div>
              <div>
                <div className="xp-content">
                  <h3 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-none text-bone transition-all duration-500 group-hover:translate-x-3 group-hover:text-accent">
                    {job.company}
                  </h3>
                </div>
                <p className="xp-content mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                  {job.summary}
                </p>
                <div className="xp-content mt-6 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className=" border border-line px-4 py-1.5 font-mono text-[0.65rem] tracking-wide text-muted transition-colors duration-300 group-hover:border-bone/30 group-hover:text-bone"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
        <div className="h-px w-full bg-line" />
      </div>
    </section>
  )
}
