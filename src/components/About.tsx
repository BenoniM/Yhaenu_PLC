import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

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
    left: '15%',
    /* w: 260, */ w: 370,
    h: 370,
    // Initial 3D state
    rot3d: { x: 0, y: 15, z: 0, p: 1000 },
    zIdx: 8,
    order: 0,
    fly: {
      x: -1800,
      y: -100,
      scale: 4,
      // Fly-off 3D state
      rot3d: { x: -20, y: 90, z: 0 }
    },
  },
  {
    src: transportationImg,
    caption: 'Transportation & Logistics',
    top: '42%',
    left: '68%',
    /* w: 260, */ w: 300,
    h: 300,
    rot3d: { x: 2, y: 8, z: 0, p: 1000 },
    zIdx: 8,
    order: 0,
    fly: {
      x: 1800,
      y: 300,
      scale: 4,
      rot3d: { x: 15, y: -120, z: 0 }
    },
  },
  {
    src: exportImg,
    caption: 'Export Operations',
    top: '22%',
    left: '22%',
    /* w: 190, */ w: 250,
    h: 160,
    rot3d: { x: 0, y: 10, z: 0, p: 1000 },
    zIdx: 5,
    order: 1,
    fly: {
      x: -1000,
      y: -1400,
      scale: 5,
      rot3d: { x: 10, y: 90, z: 0 },
    },
  },
  {
    src: manufacturingImg,
    caption: 'Manufacturing Excellence',
    top: '55%',
    left: '25%',
    /* w: 180, */ w: 200,
    h: 200,
    rot3d: { x: 5, y: 10, z: 0, p: 1000 },
    zIdx: 5,
    order: 1,
    fly: {
      x: -1200,
      y: 800,
      scale: 5,
      rot3d: { x: 60, y: 40, z: -12 },
    },
  },
  {
    src: hospitalityImg,
    caption: 'Hospitality & Leisure',
    top: '15%',
    left: '55%',
    /* w: 170, */ w: 210,
    h: 175,
    rot3d: { x: 5, y: -10, z: 0, p: 1000 },
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
    rot3d: { x: 0, y: -20, z: 0, p: 1000 },
    zIdx: 3,
    order: 2,
    fly: {
      x: 1800,
      y: -200,
      scale: 6,
      rot3d: { x: 40, y: -20, z: 0 },
    },
  },
  {
    src: export2Img,
    caption: 'Trade Network',
    top: '48%',
    left: '35%',
    /* w: 120, */ w: 170,
    h: 130,
    rot3d: { x: 0, y: 20, z: 0, p: 1000 },
    zIdx: 4,
    order: 2,
    fly: {
      x: -1200,
      y: 800,
      scale: 6,
      rot3d: { x: 60, y: 20, z: 0 },
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

function CountStat({ end, suffix, label, index }: { end: number; suffix: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const displayRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (!inView || !displayRef.current) return
    const duration = 1800
    const startTime = performance.now()
    const tick = (now: number) => {
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
          color: 'white',
        }}
      >
        <span ref={displayRef}>0</span>
        <span style={{ color: '#ECBD27' }}>{suffix}</span>
      </span>
      <span
        className="text-xs tracking-[0.2em] uppercase text-center"
        style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'monospace' }}
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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

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

      // Fade out scroll indicator exactly when title shrinks and details appear
      if (scrollIndicatorRef.current) {
        tl.to(scrollIndicatorRef.current, {
          opacity: 0,
          scale: 0.2,
          duration: 0.3,
          ease: 'power2.inOut'
        }, 3.0)
      }

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
      style={{ background: '#0E5F13', position: 'relative' }}
    >
      <div
        ref={pinRef}
        style={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: '#0E5F13',
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
            color: 'white',
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
              {/* {card.caption} */}
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
              color: 'rgba(255, 255, 255, 0.9)',
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

        {/* ── 3D Scroll Indicator ── */}
        <motion.div
          ref={scrollIndicatorRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            position: 'absolute',
            top: '70%',
            left: 0,
            width: '100%',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0px',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: '20px',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: 'white',
              fontWeight: '900',
              fontFamily: 'monospace',
              textShadow: '0 0 30px rgba(255,255,255,0.3)',
              opacity: 0.9,
              textAlign: 'center'
            }}
          >
            Scroll <br /> Down
          </span>

          <div style={{ perspective: '600px', transformStyle: 'preserve-3d', marginTop: '-70px' }}>
            <motion.div
              animate={{
                rotateX: [80, 70, 80],
                z: [0, 60, 0],
                y: [0, 5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <svg width="120" height="200" viewBox="0 0 120 200" fill="none">
                <defs>
                  <linearGradient id="arrowGradientLarge" x1="60" y1="0" x2="60" y2="200" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="40%" stopColor="white" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="white" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="glowLarge" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Long Tapered Tail */}
                <path
                  d="M58 0L62 0L68 160L52 160Z"
                  fill="url(#arrowGradientLarge)"
                  style={{ filter: 'url(#glowLarge)' }}
                />

                {/* Large Head pointing at viewer */}
                <path
                  d="M20 150L60 195L100 150Z"
                  fill="white"
                  style={{ filter: 'url(#glowLarge)' }}
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}