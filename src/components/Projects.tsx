import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SectionHeading from './SectionHeading'
import { projects } from '../data/resume'

export default function Projects() {
  const root = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const moveX = useRef<((v: number) => void) | null>(null)
  const moveY = useRef<((v: number) => void) | null>(null)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const el = previewRef.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0 })
    moveX.current = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3' })
    moveY.current = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3' })
  }, [])

  // preview grows in/out and crossfades between projects
  useGSAP(
    () => {
      gsap.to(previewRef.current, {
        scale: active === null ? 0 : 1,
        rotate: active === null ? -6 : 0,
        duration: 0.5,
        ease: active === null ? 'power3.in' : 'back.out(1.4)',
      })
      if (active !== null) {
        gsap.to('.preview-card', {
          autoAlpha: (i: number) => (i === active ? 1 : 0),
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    },
    { scope: root, dependencies: [active] },
  )

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.project-row').forEach((row) => {
        const q = gsap.utils.selector(row)
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 88%' } })
        tl.from(q('.project-border'), { scaleX: 0, duration: 1.1, ease: 'power4.inOut' })
        tl.from(
          q('.project-content'),
          { y: 40, autoAlpha: 0, duration: 0.8, ease: 'power3.out' },
          0.1,
        )
      })
    },
    { scope: root },
  )

  const onMouseMove = (e: React.MouseEvent) => {
    moveX.current?.(e.clientX)
    moveY.current?.(e.clientY)
  }

  return (
    <section
      ref={root}
      id="works"
      className="px-6 py-28 md:px-10 md:py-40"
      onMouseMove={onMouseMove}
      onMouseLeave={() => setActive(null)}
    >
      <SectionHeading num="03" title="Selected Works" />

      <div>
        {projects.map((project, i) => {
          const Tag = project.link ? 'a' : 'div'
          return (
            <Tag
              key={project.name}
              href={project.link ?? undefined}
              target={project.link ? '_blank' : undefined}
              rel={project.link ? 'noreferrer' : undefined}
              className="project-row group relative block cursor-pointer py-8 md:py-10"
              onMouseEnter={() => setActive(i)}
              data-cursor
            >
              <div className="project-border absolute top-0 left-0 h-px w-full origin-left bg-line" />
              <div className="project-content flex items-baseline gap-5 md:gap-10">
                <span className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-[clamp(1.8rem,4.5vw,3.6rem)] font-semibold leading-none text-bone transition-all duration-500 group-hover:translate-x-3 group-hover:text-accent">
                  {project.name}
                </h3>
                <div className="ml-auto flex flex-col items-end gap-1 text-right">
                  <span className="hidden font-mono text-xs text-muted md:block">
                    {project.tech}
                  </span>
                  <span className="text-xs text-muted/70">{project.description}</span>
                </div>
                <span className="font-display hidden text-2xl text-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:block">
                  ↗
                </span>
              </div>
            </Tag>
          )
        })}
        <div className="h-px w-full bg-line" />
      </div>

      {/* floating preview card follows the cursor */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed top-0 left-0 z-30 hidden h-60 w-88 overflow-hidden rounded-xl [@media(pointer:fine)]:block"
      >
        {projects.map((project, i) => (
          <div
            key={project.name}
            className="preview-card invisible absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{
              background: `linear-gradient(135deg, ${project.hue[0]}, ${project.hue[0]} 40%, ${project.hue[1]}55)`,
            }}
          >
            <span
              className="font-display text-7xl font-semibold"
              style={{ color: project.hue[1] }}
            >
              {project.glyph}
            </span>
            <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase" style={{ color: `${project.hue[1]}cc` }}>
              {project.link ? 'Visit site' : 'Client work'}
            </span>
            {/* index badge */}
            <span className="absolute top-4 right-5 font-mono text-xs" style={{ color: `${project.hue[1]}99` }}>
              {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
