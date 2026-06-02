import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import importVideo from '../assets/hero-video/import.mp4'
import manufacturingVideo from '../assets/hero-video/manufacturing.mp4'
import transportationVideo from '../assets/hero-video/hospitality.mp4'
import logoWordmark from '/yhaenu.svg'

const VIDEOS = [importVideo, manufacturingVideo, transportationVideo] as const

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Cycle background videos
  const [bgIndex, setBgIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(i => (i + 1) % VIDEOS.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Preload videos
  useEffect(() => {
    const links: HTMLLinkElement[] = []
    VIDEOS.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'video'
      link.href = src
      link.type = 'video/mp4'
      document.head.appendChild(link)
      links.push(link)
    })
    return () => links.forEach(link => document.head.removeChild(link))
  }, [])

  // Entrance animation
  useGSAP(() => {
    gsap.set([wordmarkRef.current, descRef.current], {
      opacity: 0,
      y: 40,
    })
    gsap.set(overlayRef.current, { opacity: 0 })

    const tl = gsap.timeline({ delay: 0.3 })

    tl.to(overlayRef.current, { opacity: 1, duration: 1.2, ease: 'power2.out' })
      .to(wordmarkRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.6')
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.5')
      .call(() => {
        window.dispatchEvent(new CustomEvent('hero-animation-complete'))
      })
  }, { scope: containerRef })

  // Disable scroll during entrance
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto'
    }, 2800)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'auto'
    }
  }, [])


  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full h-[100svh] bg-[#0a1a0b] m-0 p-0"
    >
      {/* ── BACKGROUND VIDEOS ── */}
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{
            zIndex: 1,
            opacity: bgIndex === i ? 1 : 0,
            filter: 'brightness(0.55) saturate(1.1)',
            transform: 'translate3d(0,0,0)',
          }}
        />
      ))}

      {/* ── GRADIENT OVERLAY ── */}
      {/* Linear fade from transparent at top to green at bottom */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(10,26,11,0.95) 100%)',
        }}
      />

      {/* ── CONTENT ── */}
      <div className="absolute inset-0 z-[10] flex flex-col items-center justify-center gap-6 md:gap-8 px-6 pointer-events-none">

        {/* Full wordmark — YHAENU */}
        <div ref={wordmarkRef} className="w-full max-w-[min(1100px,95vw)]">
          <img
            src={logoWordmark}
            alt="YHAENU"
            className="w-full h-auto"
            style={{
              filter:
                'brightness(0) saturate(100%) invert(86%) sepia(43%) saturate(1478%) hue-rotate(345deg) brightness(100%) contrast(92%)',
            }}
          />
        </div>

        {/* Description */}
        <div ref={descRef} className="text-center max-w-2xl space-y-2">
          <p className="text-white/80 text-sm md:text-base font-light tracking-[0.12em] uppercase">
            Est. 2003 &nbsp;·&nbsp; Addis Ababa, Ethiopia
          </p>
          <p className="text-white/60 text-xs md:text-sm font-light tracking-wide leading-relaxed">
            Import · Export · Manufacturing · Hospitality
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[#ECBD27] text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#ECBD27] to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  )
}
