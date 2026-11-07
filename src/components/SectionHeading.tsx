import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface Props {
  num: string
  title: string
}

export default function SectionHeading({ num, title }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
      tl.from('.sh-text', { y: 24, autoAlpha: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 })
      tl.from('.sh-line', { scaleX: 0, duration: 1.1, ease: 'power4.inOut' }, 0.1)
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="mb-14 flex items-center gap-5 md:mb-20">
      <span className="sh-text font-mono text-xs text-accent md:text-sm">({num})</span>
      <h2 className="sh-text font-mono text-xs tracking-[0.3em] text-bone uppercase md:text-sm">
        {title}
      </h2>
      <div className="sh-line h-px flex-1 origin-left bg-line" />
    </div>
  )
}
