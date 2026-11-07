import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/** Custom cursor: instant dot + lagging ring that grows over interactive targets. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const dot = dotRef.current!
    const ring = ringRef.current!
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

    const move = (e: MouseEvent) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest('a, button, [data-cursor]')
      gsap.to(ring, {
        scale: interactive ? 2.2 : 1,
        opacity: interactive ? 0.55 : 1,
        duration: 0.35,
        ease: 'power3.out',
      })
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] hidden [@media(pointer:fine)]:block">
      <div ref={dotRef} className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-accent" />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 h-9 w-9 rounded-full border border-bone/40"
      />
    </div>
  )
}
