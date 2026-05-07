import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import exportImg from '../assets/about/export.jpg'
import export2Img from '../assets/about/export2.jpg'
import hospitalityImg from '../assets/about/hospitality.jpg'
import importImg from '../assets/about/import.jpg'
import import2Img from '../assets/about/import2.jpg'
import manufacturingImg from '../assets/about/manufacturing.jpg'
import transportationImg from '../assets/about/transportation.jpg'
import transportation2Img from '../assets/about/transportation2.jpg'

gsap.registerPlugin(ScrollTrigger)

// ── Data ──────────────────────────────────────────────────────────────────────

const PARAGRAPH =
  'YHAENU PLC is a family-owned company with over 20 years of experience in Import, Export, Manufacturing, Transportation, and Hospitality. Headquartered in Ethiopia, we have grown into a trusted name in both local and international markets. Our mission is simple: to be the bridge that links Ethiopia\'s potential to the global stage — delivering quality, precision, and excellence across every vertical we operate in.'

const stats = [
  { end: 20, suffix: '+', label: 'Years of Experience' },
  { end: 5, suffix: '', label: 'Business Verticals' },
  { end: 15, suffix: '+', label: 'Countries Reached' },
  { end: 1, suffix: '', label: 'Unified Vision' },
]

const IMAGE_CARDS = [
  {
    src: importImg,
    caption: 'Import & Global Trade',
    top: '35%',
    left: '10%',
    /* w: 260, */ w: 370,
    h: 370,
    // Initial 3D state
    rot3d: { x: 5, y: 5, z: 0, p: 1000 }, 
    zIdx: 8,
    order: 0,
    fly: {
      x: -1800,
      y: -300,
      scale: 4,
      // Fly-off 3D state
      rot3d: { x: -45, y: 90, z: -15 } 
    },
  },
  {
    src: transportationImg,
    caption: 'Transportation & Logistics',
    top: '42%',
    left: '61%',
    /* w: 260, */ w: 300,
    h: 300,
    rot3d: { x: 8, y: 8, z: 0, p: 1000 },
    zIdx: 8,
    order: 0,
    fly: {
      x: 1800,
      y: 300,
      scale: 4,
      rot3d: { x: 30, y: -90, z: 20 }
    },
  },
  {
    src: exportImg,
    caption: 'Export Operations',
    top: '22%',
    left: '22%',
    /* w: 190, */ w: 250,
    h: 160,
    rot3d: { x: 10, y: 5, z: 0, p: 1000 },
    zIdx: 5,
    order: 1,
    fly: {
      x: -1000,
      y: -1400,
      scale: 5,
      rot3d: { x: 90, y: 0, z: 10 },
    },
  },
  {
    src: manufacturingImg,
    caption: 'Manufacturing Excellence',
    top: '55%',
    left: '25%',
    /* w: 180, */ w: 200,
    h: 200,
    rot3d: { x: 5, y: -10, z: 0, p: 1000 },
    zIdx: 5,
    order: 1,
    fly: {
      x: -1200,
      y: 800,
      scale: 5,
      rot3d: { x: -60, y: 40, z: -12 },
    },
  },
  {
    src: hospitalityImg,
    caption: 'Hospitality & Leisure',
    top: '15%',
    left: '55%',
    /* w: 170, */ w: 210,
    h: 175,
    rot3d: { x: 5, y: 10, z: 0, p: 1000 },
    zIdx: 5,
    order: 1,
    fly: {
      x: 1200,
      y: -900,
      scale: 5,
      rot3d: { x: 60, y: -40, z: 14 },
    },
  },
  {
    src: import2Img,
    caption: 'Global Sourcing',
    top: '45%',
    left: '60%',
    /* w: 130, */ w: 180,
    h: 150,
    rot3d: { x: 0, y: 0, z: 0, p: 1000 },
    zIdx: 3,
    order: 2,
    fly: {
      x: 1800,
      y: -200,
      scale: 6,
      rot3d: { x: 40, y: 20, z: 0 },
    },
  },
  {
    src: export2Img,
    caption: 'Trade Network',
    top: '48%',
    left: '35%',
    /* w: 120, */ w: 170,
    h: 130,
    rot3d: { x: 0, y: 0, z: 0, p: 1000 },
    zIdx: 4,
    order: 2,
    fly: {
      x: -1200,
      y: 800,
      scale: 6,
      rot3d: { x: 60, y: -20, z: 0 },
    },
  },
  {
    src: transportation2Img,
    caption: 'Freight Solutions',
    top: '40%',
    left: '45%',
    w: 135,
    h: 105,
    rot3d: { x: 0, y: 0, z: 0, p: 1000 },
    zIdx: 3,
    order: 2,
    fly: {
      x: 0,
      y: -1200,
      scale: 8,
      rot3d: { x: 60, y: 0, z: 0 },
    },
  },
]

// ── CountStat ─────────────────────────────────────────────────────────────────

function CountStat({ end, suffix, label, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const displayRef = useRef(null)

  useEffect(() => {
    if (!inView || !displayRef.current) return
    const duration = 1800
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * end)
      if (displayRef.current) displayRef.current.textContent = String(current)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-1 px-6 py-4"
    >
      <span
        className="font-black leading-none tabular-nums"
        style={{
          fontFamily: "'Arial Black', sans-serif",
          fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
          color: '#0E5F13',
        }}
      >
        <span ref={displayRef}>0</span>
        <span style={{ color: '#ECBD27' }}>{suffix}</span>
      </span>
      <span
        className="text-xs tracking-[0.2em] uppercase text-center"
        style={{ color: 'rgba(14,95,19,0.5)', fontFamily: 'monospace' }}
      >
        {label}
      </span>
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function About() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const cardsRef = useRef([])
  const titleRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    if (!pinRef.current || cards.length === 0) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          pin: pinRef.current,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      const layerTimings = [0, 0.9, 1.8]

      cards.forEach((card, i) => {
        const data = IMAGE_CARDS[i]
        const startAt = layerTimings[data.order] ?? 0

        tl.to(
          card,
          {
            scale: data.fly.scale,
            x: data.fly.x,
            y: data.fly.y,
            // GSAP 3D shorthand
            rotateX: data.fly.rot3d.x,
            rotateY: data.fly.rot3d.y,
            rotationZ: data.fly.rot3d.z,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          startAt
        )
      })

      const contentStart = 3.0

      if (titleRef.current) {
        tl.to(titleRef.current, {
          top: '12%',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          duration: 0.5,
          ease: 'power2.inOut',
        }, contentStart)
      }

      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { y: 250, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          contentStart + 0.15
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ background: '#F3F6FA', position: 'relative' }}
    >
      <div
        ref={pinRef}
        style={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: '#F3F6FA',
          perspective: '1200px', // Global perspective for the container
        }}
      >
        <h2
          ref={titleRef}
          style={{
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, 25%)',
            fontSize: 'clamp(4rem, 13vw, 12rem)',
            fontWeight: 900,
            color: '#0E5F13',
            whiteSpace: 'nowrap',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            zIndex: 1,
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          ABOUT US
        </h2>

        {IMAGE_CARDS.map((card, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            style={{
              position: 'absolute',
              top: card.top,
              left: card.left,
              width: card.w,
              height: card.h,
              zIndex: card.zIdx,
              willChange: 'transform',
              transformStyle: 'preserve-3d',
              // Initial 3D transform string
              transform: `perspective(${card.rot3d.p}px) rotateX(${card.rot3d.x}deg) rotateY(${card.rot3d.y}deg) rotateZ(${card.rot3d.z}deg)`,
            }}
          >
            <img
              src={card.src}
              alt={card.caption}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <p
              style={{
                color: '#ECBD27',
                fontSize: 13,
                marginTop: 10,
                fontWeight: 'bold',
                letterSpacing: '0.09em',
                textTransform: 'Capitalize',
              }}
            >
              {card.caption}
            </p>
          </div>
        ))}

        <div
          ref={contentRef}
          style={{
            position: 'absolute',
            top: '32%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 720,
            zIndex: 10,
            opacity: 0,
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.8,
              color: 'rgba(14,95,19,0.75)',
              fontFamily: "'General Sans', sans-serif",
              marginBottom: 40,
            }}
          >
            {PARAGRAPH}
          </p>

          <div style={{ width: 80, height: 1, background: '#ECBD27', opacity: 0.5, margin: '0 auto 40px' }} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
            {stats.map((s, i) => (
              <CountStat key={s.label} end={s.end} suffix={s.suffix} label={s.label} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}