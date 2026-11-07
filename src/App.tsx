import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import { scroller } from './lib/scroll'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import ExperienceSection from './components/ExperienceSection'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export default function App() {
  const [started, setStarted] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    scroller.lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      scroller.lenis = null
    }
  }, [])

  useEffect(() => {
    if (started) {
      scroller.lenis?.start()
    } else {
      scroller.lenis?.stop()
      window.scrollTo(0, 0)
    }
  }, [started])

  useGSAP(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.4 },
    })
  })

  return (
    <>
      <Preloader onReveal={() => setStarted(true)} />
      <Cursor />
      <div
        ref={progressRef}
        className="fixed top-0 left-0 z-[80] h-0.5 w-full origin-left scale-x-0 bg-accent"
      />
      <Nav started={started} />
      <main>
        <Hero started={started} />
        <Marquee />
        <About />
        <ExperienceSection />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </>
  )
}
