import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'

const WORDS = ['QUALITY', 'PRECISION', 'EXCELLENCE', 'INNOVATION']

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [wordIndex, setWordIndex] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const springY = useSpring(rawY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const id = setInterval(() => setWordIndex(i => (i + 1) % WORDS.length), 2200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  const mx = useSpring(mousePos.x * 16, { stiffness: 60, damping: 18 })
  const my = useSpring(mousePos.y * 10, { stiffness: 60, damping: 18 })
  const mx2 = useSpring(-mousePos.x * 10, { stiffness: 50, damping: 15 })
  const my2 = useSpring(-mousePos.y * 8, { stiffness: 50, damping: 15 })
  const cardRX = useSpring(mousePos.y * -8, { stiffness: 60, damping: 18 })
  const cardRY = useSpring(mousePos.x * 8, { stiffness: 60, damping: 18 })

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: 640, background: '#0a1628' }}
    >
      {/* ── Background video + image ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: springY, scale }}>
        <video
          src="/hero.mov"
          autoPlay muted loop playsInline
          onCanPlay={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.42) saturate(1.15)' }}
        />
        <img
          src="/src/assets/hero.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.42) saturate(1.15)', zIndex: -1 }}
        />
      </motion.div>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'linear-gradient(135deg, rgba(14,95,19,0.7) 0%, rgba(10,22,40,0.35) 60%, rgba(236,189,39,0.1) 100%)'
      }} />
      {/* Subtle bottom fade — only 20% height so it doesn't eat CTAs */}
      <div className="absolute bottom-0 left-0 right-0 z-[2]" style={{
        height: '20%',
        background: 'linear-gradient(to top, rgba(10,22,40,0.85) 0%, transparent 100%)'
      }} />

      {/* ── Orbs ── */}
      <motion.div className="absolute z-[2] rounded-full pointer-events-none"
        style={{ width: 480, height: 480, top: '-8%', right: '-6%',
          background: 'radial-gradient(circle, rgba(236,189,39,0.16) 0%, transparent 65%)',
          x: mx, y: my }} />
      <motion.div className="absolute z-[2] rounded-full pointer-events-none"
        style={{ width: 320, height: 320, bottom: '12%', left: '-4%',
          background: 'radial-gradient(circle, rgba(14,95,19,0.45) 0%, transparent 65%)',
          x: mx2, y: my2 }} />

      {/* ── Grid ── */}
      <svg className="absolute inset-0 w-full h-full z-[2] pointer-events-none opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#ECBD27" strokeWidth="0.8"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* ── Main content ── */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pb-16 "
        style={{ y: textY, opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center gap-3 mb-5 sticky"
        >
          <span className="h-[1px] w-8 bg-[#ECBD27]" />
          <span className="text-[#ECBD27] text-[10px] tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'monospace' }}>
            Est. 2003 · Ethiopia
          </span>
          <span className="h-[1px] w-8 bg-[#ECBD27]" />
        </motion.div>

        {/* YHAENU */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            initial={{ y: '110%' }}
            animate={loaded ? { y: '0%' } : {}}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="font-black uppercase leading-none"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              color: '#F3F6FA',
              letterSpacing: '-0.02em',
            }}
          >
            YHAENU
          </motion.h1>
        </div>

        {/* PLC — outlined */}
        <div className="overflow-hidden mb-6">
          <motion.p
            initial={{ y: '110%' }}
            animate={loaded ? { y: '0%' } : {}}
            transition={{ duration: 0.85, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="font-black uppercase leading-none"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              WebkitTextStroke: '2px #ECBD27',
              color: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            PLC
          </motion.p>
        </div>

        {/* Rotating word row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span
            className="text-[#F3F6FA]/50 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'monospace' }}
          >
            Delivering
          </span>

          {/* Fixed-width slot so layout never shifts */}
          <div className="relative overflow-hidden" style={{ width: 160, height: 22 }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center font-black uppercase text-xs tracking-[0.25em]"
                style={{ color: '#ECBD27', fontFamily: "'Arial Black', sans-serif" }}
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05, backgroundColor: '#ECBD27', color: '#0E5F13' }}
            whileTap={{ scale: 0.97 }}
            className="px-7 py-3 rounded-full font-black uppercase text-xs tracking-widest border-2 border-[#ECBD27] text-[#ECBD27]"
            style={{ fontFamily: "'Arial Black', sans-serif", transition: 'background 0.2s, color 0.2s' }}
          >
            Our Products
          </motion.a>
          <motion.a
            href="#rfq"
            whileHover={{ scale: 1.05, opacity: 0.9 }}
            whileTap={{ scale: 0.97 }}
            className="px-7 py-3 rounded-full font-black uppercase text-xs tracking-widest text-[#0E5F13]"
            style={{ background: '#ECBD27', fontFamily: "'Arial Black', sans-serif" }}
          >
            Request a Quote →
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ── Floating stat card ── */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ bottom: '22%', right: '5%', rotateX: cardRX, rotateY: cardRY, transformPerspective: 800 }}
        initial={{ opacity: 0, x: 50 }}
        animate={loaded ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 1.0 }}
      >
        <div className="rounded-2xl px-5 py-4 flex flex-col gap-1"
          style={{
            background: 'rgba(14,95,19,0.65)',
            backdropFilter: 'blur(18px)',
            border: '1px solid rgba(236,189,39,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <span className="text-[#ECBD27] text-[9px] tracking-widest uppercase font-bold" style={{ fontFamily: 'monospace' }}>Trusted Since</span>
          <span className="text-[#F3F6FA] font-black text-4xl leading-none" style={{ fontFamily: "'Arial Black', sans-serif" }}>2003</span>
          <span className="text-[#F3F6FA]/45 text-[10px] tracking-wide">Addis Ababa, Ethiopia</span>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <span className="text-[#F3F6FA]/35 text-[8px] tracking-[0.35em] uppercase" style={{ fontFamily: 'monospace' }}>Scroll</span>
        <motion.div
          className="w-[1px] bg-[#ECBD27]"
          animate={{ height: [10, 26, 10], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Wave into next section ── */}
      <div className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none">
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: 70 }}>
          <path
            d="M0,35 C180,65 360,5 540,40 C720,72 900,15 1080,45 C1260,70 1380,25 1440,40 L1440,70 L0,70 Z"
            fill="#F3F6FA"
          />
        </svg>
      </div>
    </section>
  )
}

