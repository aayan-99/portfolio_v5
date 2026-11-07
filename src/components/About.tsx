import { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import SectionHeading from './SectionHeading'
import { profile, stats } from '../data/resume'

export default function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-accent')
        .trim()
      let highlightTween: gsap.core.Tween | undefined

      SplitText.create('.about-statement', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => {
          // re-splitting rebuilds the paragraph DOM, so the color tween must
          // be recreated against the fresh highlight spans each time
          highlightTween?.revert()
          highlightTween = gsap.to('.statement-highlight', {
            color: accent,
            stagger: 0.2,
            ease: 'none',
            scrollTrigger: {
              trigger: '.about-statement',
              start: 'top 75%',
              end: 'top 35%',
              scrub: true,
            },
          })
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.09,
            ease: 'power4.out',
            scrollTrigger: { trigger: '.about-statement', start: 'top 82%' },
          })
        },
      })

      gsap.from('.about-body', {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-body', start: 'top 88%' },
      })

      gsap.utils.toArray<HTMLElement>('.stat-card').forEach((card, i) => {
        const value = card.querySelector<HTMLElement>('.stat-value')!
        const target = Number(value.dataset.value)
        gsap.from(card, {
          y: 50,
          autoAlpha: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 92%' },
        })
        gsap.fromTo(
          value,
          { textContent: 0 },
          {
            textContent: target,
            duration: 1.8,
            delay: i * 0.1,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: { trigger: card, start: 'top 92%' },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="about" className="px-6 py-28 md:px-10 md:py-40">
      <SectionHeading num="01" title="About" />

      <p className="about-statement font-display max-w-5xl text-[clamp(1.8rem,4.2vw,3.8rem)] font-medium leading-[1.15] text-bone">
        I build interfaces where <span className="statement-highlight">design</span>,{' '}
        <span className="statement-highlight">motion</span> and{' '}
        <span className="statement-highlight">engineering</span> meet — products that feel as
        good as they look.
      </p>

      <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2">
        <p className="about-body max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {profile.about}
        </p>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-line">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card flex flex-col gap-3 bg-ink p-6 md:p-8">
              <span className="font-display text-5xl font-semibold text-bone md:text-6xl">
                <span className="stat-value tabular-nums" data-value={stat.value}>
                  0
                </span>
                <span className="text-accent">{stat.suffix}</span>
              </span>
              <span className="font-mono text-[0.65rem] tracking-wider text-muted uppercase md:text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
