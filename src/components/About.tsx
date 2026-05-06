import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

// ── Data ──────────────────────────────────────────────────────────────────────

const PARAGRAPH =
  'YHAENU PLC is a family-owned company with over 20 years of experience in Import, Export, Manufacturing, Transportation, and Hospitality. Headquartered in Ethiopia, we have grown into a trusted name in both local and international markets. Our mission is simple: to be the bridge that links Ethiopia\'s potential to the global stage — delivering quality, precision, and excellence across every vertical we operate in.'

const stats = [
  { end: 20, suffix: '+', label: 'Years of Experience' },
  { end: 5,  suffix: '',  label: 'Business Verticals'  },
  { end: 15, suffix: '+', label: 'Countries Reached'   },
  { end: 1,  suffix: '',  label: 'Unified Vision'      },
]

const services = [
  { icon: '🌍', num: '01', title: 'Import & Export',      desc: 'Facilitating the movement of goods with efficiency, reliability, and market insight across local and international markets.', dark: true  },
  { icon: '🏭', num: '02', title: 'Manufacturing',         desc: 'Producing quality cardboard and carton products that meet global standards with precision and care.',                          dark: false },
  { icon: '🚛', num: '03', title: 'Transportation',        desc: 'Providing reliable vehicles to help customers transport goods, making logistics seamless and dependable.',                    dark: true  },
  { icon: '🏨', num: '04', title: 'Hospitality',           desc: 'South Star International Hotel in Hawassa — memorable experiences through modern and welcoming hotel operations.',            dark: false },
]

// ── Scroll-reveal word-by-word paragraph ─────────────────────────────────────

function RevealParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.4'],
  })

  const words = text.split(' ')

  return (
    <p
      ref={ref}
      className="text-center leading-relaxed flex flex-wrap justify-center gap-x-[0.35em] gap-y-1"
      style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: 'rgba(14,95,19,0.18)' }}
    >
      {words.map((word, i) => {
        const start = i / words.length
        const end = (i + 1) / words.length
        return (
          <WordReveal
            key={i}
            word={word}
            progress={scrollYProgress}
            start={start}
            end={end}
          />
        )
      })}
    </p>
  )
}

function WordReveal({
  word, progress, start, end,
}: {
  word: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  start: number
  end: number
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1])
  const blur = useTransform(progress, [start, end], [6, 0])
  const y = useTransform(progress, [start, end], [12, 0])

  return (
    <motion.span
      style={{ opacity, filter: blur.get ? undefined : undefined, y, display: 'inline-block', color: '#0E5F13' }}
      // apply blur via style update
    >
      <motion.span
        style={{
          display: 'inline-block',
          filter: useTransform(blur, v => `blur(${v}px)`),
          fontWeight: 700,
        }}
      >
        {word}
      </motion.span>
    </motion.span>
  )
}

// ── Counting stat ─────────────────────────────────────────────────────────────

function CountStat({ end, suffix, label, index }: { end: number; suffix: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!inView || !displayRef.current) return
    let start = 0
    const duration = 1800
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
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

// ── 3-D service card ──────────────────────────────────────────────────────────

function ServiceCard({ s, index }: { s: typeof services[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect()
    setTilt({
      x: ((e.clientX - r.left) / r.width  - 0.5) * 22,
      y: ((e.clientY - r.top)  / r.height - 0.5) * -22,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      initial={{ opacity: 0, y: 70, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      animate={{
        rotateX: tilt.y,
        rotateY: tilt.x,
        scale: hovered ? 1.04 : 1,
        boxShadow: hovered
          ? '0 28px 56px rgba(0,0,0,0.22), 0 0 0 1px rgba(236,189,39,0.25)'
          : '0 6px 20px rgba(0,0,0,0.08)',
      }}
      style={{
        transformStyle: 'preserve-3d',
        transformPerspective: 900,
        background: s.dark ? '#0E5F13' : '#F3F6FA',
        borderRadius: 20,
        padding: '1.75rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        border: s.dark ? 'none' : '1px solid rgba(14,95,19,0.08)',
      }}
    >
      {/* Ghost number */}
      <span className="absolute top-2 right-3 font-black pointer-events-none select-none"
        style={{ fontFamily: "'Arial Black', sans-serif", fontSize: '4.5rem', lineHeight: 1,
          color: s.dark ? 'rgba(236,189,39,0.07)' : 'rgba(14,95,19,0.05)' }}>
        {s.num}
      </span>

      {/* Hover glow */}
      <motion.div className="absolute inset-0 rounded-[20px] pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
        style={{ background: s.dark
          ? 'radial-gradient(circle at 60% 30%, rgba(236,189,39,0.14) 0%, transparent 65%)'
          : 'radial-gradient(circle at 60% 30%, rgba(14,95,19,0.07) 0%, transparent 65%)' }} />

      <motion.div className="text-3xl mb-3" animate={{ y: hovered ? -4 : 0 }} transition={{ duration: 0.3 }}
        style={{ transform: 'translateZ(20px)' }}>
        {s.icon}
      </motion.div>

      <h3 className="font-black uppercase mb-2"
        style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
          color: s.dark ? '#F3F6FA' : '#0E5F13', transform: 'translateZ(16px)' }}>
        {s.title}
      </h3>

      <motion.div className="mb-3 h-[2px] rounded-full" style={{ background: '#ECBD27', transform: 'translateZ(12px)' }}
        animate={{ width: hovered ? '55%' : '28%' }} transition={{ duration: 0.35 }} />

      <p className="text-sm leading-relaxed"
        style={{ color: s.dark ? 'rgba(243,246,250,0.65)' : 'rgba(14,95,19,0.6)', transform: 'translateZ(10px)' }}>
        {s.desc}
      </p>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden" style={{ background: '#F3F6FA' }}>

      {/* Parallax blobs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute" style={{ top: '8%', left: '-12%', width: '55%', height: '55%',
          background: 'radial-gradient(ellipse, rgba(236,189,39,0.07) 0%, transparent 65%)', borderRadius: '50%' }} />
        <div className="absolute" style={{ bottom: '5%', right: '-8%', width: '45%', height: '45%',
          background: 'radial-gradient(ellipse, rgba(14,95,19,0.05) 0%, transparent 65%)', borderRadius: '50%' }} />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-28">

        {/* ── Label ── */}
        <motion.div className="flex items-center gap-3 mb-8 justify-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span className="h-[2px] w-8 bg-[#ECBD27]" />
          <span className="text-[#ECBD27] text-xs tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'monospace' }}>
            About Us
          </span>
          <span className="h-[2px] w-8 bg-[#ECBD27]" />
        </motion.div>

        {/* ── Scroll-reveal paragraph ── */}
        <div className="mb-6">
          <RevealParagraph text={PARAGRAPH} />
        </div>

        {/* ── Divider ── */}
        <motion.div className="flex justify-center mb-14"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'center' }}>
          <div className="h-[1px] w-32 bg-[#ECBD27] opacity-40" />
        </motion.div>

        {/* ── Counting stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-24">
          {stats.map((s, i) => (
            <CountStat key={s.label} end={s.end} suffix={s.suffix} label={s.label} index={i} />
          ))}
        </div>

        {/* ── CTA ── */}
        {/* <motion.div className="flex justify-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <motion.a href="#rfq"
            whileHover={{ scale: 1.05, backgroundColor: '#0E5F13', color: '#F3F6FA' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-black uppercase text-sm tracking-wide border-2 border-[#0E5F13] text-[#0E5F13]"
            style={{ fontFamily: "'Arial Black', sans-serif", transition: 'background 0.2s, color 0.2s' }}>
            Request a Quote
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </motion.a>
        </motion.div> */}

      </div>
    </section>
  )
}

