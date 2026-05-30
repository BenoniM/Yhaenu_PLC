import React, { useRef, useState } from 'react'
import JourneySection from '../components/JourneySection'
import LeadershipAccordion from '../components/LeadershipAccordion'
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValueEvent } from 'framer-motion'
import Cta from '../components/Cta'
import Footer from '../components/Footer'
import Services from '../components/Services'
import GridBackground from '../components/GridBackground'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4'

// ── Nova Glow Orb — WebGL-inspired CSS animated orb ─────────────────────────
function NovaOrb({
  size = 600,
  x = '50%',
  y = '50%',
  color1 = '#ECBD27',
  color2 = '#0E5F13',
  opacity = 0.18,
  duration = 8,
  delay = 0,
}: {
  size?: number
  x?: string
  y?: string
  color1?: string
  color2?: string
  opacity?: number
  duration?: number
  delay?: number
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: `radial-gradient(circle at 40% 40%, ${color1}, ${color2} 50%, transparent 70%)`,
        filter: 'blur(60px)',
        opacity,
        zIndex: 0,
      }}
      animate={{
        scale: [1, 1.15, 0.95, 1.1, 1],
        x: [0, 30, -20, 15, 0],
        y: [0, -20, 25, -10, 0],
        rotate: [0, 15, -10, 20, 0],
      }}
      transition={{
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
        delay,
      }}
    />
  )
}

// ── Animated Coordinate Tracker ──────────────────────────────────────────────
function AnimatedCoordinate({ val, prefix }: { val: any; prefix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useMotionValueEvent(val, 'change', (latest: number) => {
    if (ref.current) ref.current.textContent = `${prefix}: ${Math.round(latest)}`
  })
  return <span ref={ref}>{prefix}: 0</span>
}

// ── Stacked Core Values ──────────────────────────────────────────────────────
const stackedValuesData = [
  { img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop' },
  { img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop' },
  { img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop' },
  { img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop' },
  { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop' },
]

function StackedValues() {
  return (
    <div className="relative w-full pb-32">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row items-stretch border-t border-[rgba(14,95,19,0.1)] bg-[#F3F6FA] w-full"
          style={{
            position: 'sticky',
            top: 80 + (i * 80),
            minHeight: '250px',
            boxShadow: i > 0 ? '0 -10px 30px -15px rgba(0,0,0,0.1)' : 'none',
            zIndex: 10 + i
          }}
        >
          {/* Left: Number */}
          <div className="w-full md:w-[15%] px-8 md:px-12 pt-[26px] self-start flex-shrink-0 h-[80px] md:h-auto">
            <span className="text-[#0E5F13] font-black text-xl md:text-2xl leading-none block" style={{ fontFamily: "'Arial Black', sans-serif" }}>
              0{i + 1} /
            </span>
          </div>

          {/* Center: Image */}
          <div className="w-full md:w-[40%] px-6 md:px-10 pt-4 md:pt-[26px] pb-6 md:pb-10 border-y md:border-y-0 relative flex-shrink-0 flex flex-col justify-center">
            {/* Diagonal Dividers matching the Rhombus */}
            <div className="hidden md:block absolute top-0 bottom-0 w-[1px] bg-[rgba(14,95,19,0.1)] left-0" style={{ transform: 'skewX(-8deg)' }}></div>
            <div className="hidden md:block absolute top-0 bottom-0 w-[1px] bg-[rgba(14,95,19,0.1)] right-0" style={{ transform: 'skewX(-8deg)' }}></div>
            
            <div className="w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-gray-200" style={{ transform: 'skewX(-8deg)' }}>
              <img src={stackedValuesData[i].img} alt={v.label} className="w-full h-full object-cover" style={{ transform: 'skewX(8deg) scale(1.15)' }} />
            </div>
          </div>

          {/* Right: Description */}
          <div className="w-full md:w-[45%] px-8 md:px-16 pt-6 md:pt-[26px] pb-8 md:pb-10 flex flex-col justify-start flex-grow">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#ECBD27] mb-4" style={{ fontFamily: 'monospace' }}>
              {v.label}
            </p>
            <h3 className="text-3xl capitalize text-[#0E5F13] mb-6 leading-tight" style={{ fontFamily: "'Arial Black', sans-serif", letterSpacing: '-0.02em' }}>
              {v.desc}
            </h3>
          </div>
        </div>
      ))}
    </div>
  )
}
// ── Mission & Vision Split Interaction ───────────────────────────────────────
function MissionVisionSplit() {
  const [hoveredSide, setHoveredSide] = useState<'mission' | 'vision' | null>(null)

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] flex flex-col md:flex-row overflow-hidden border-y border-[rgba(236,189,39,0.2)]">
      {/* Left: Mission */}
      <div
        className="w-full md:w-1/2 relative h-full cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-[rgba(236,189,39,0.2)] group/mission"
        onMouseEnter={() => setHoveredSide('mission')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <img
          src="https://images.pexels.com/photos/8550846/pexels-photo-8550846.jpeg"
          alt="Mission"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out"
          style={{ transform: hoveredSide === 'mission' ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className={`absolute inset-0 transition-colors duration-500 ${hoveredSide === 'mission' ? 'bg-[#0E5F13]/40' : 'bg-[#0E5F13]/70'}`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden text-center w-full px-4">
          <motion.h3
            className="text-5xl md:text-8xl font-black text-[#F3F6FA] uppercase tracking-widest"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
            animate={{
              y: hoveredSide === 'mission' ? -20 : 0,
              opacity: hoveredSide === 'mission' ? 0 : 0.6,
              scale: hoveredSide === 'mission' ? 1.1 : 1
            }}
            transition={{ duration: 0.5 }}
          >
            Mission
          </motion.h3>
        </div>

        {/* Hover Pop-up for Mission */}
        <div
          className="absolute top-1/2 left-1/2 w-[85%] max-w-[450px] p-10 z-20 pointer-events-none transition-all duration-500 ease-out flex flex-col justify-center items-center text-center shadow-2xl bg-[#ECBD27]"
          style={{
            transform: `translate(-50%, -50%) scale(${hoveredSide === 'mission' ? 1 : 0.95})`,
            opacity: hoveredSide === 'mission' ? 1 : 0,
          }}
        >
          <h4 className="font-black text-2xl md:text-3xl uppercase mb-4 tracking-widest text-[#0E5F13]" style={{ fontFamily: "'Arial Black', sans-serif" }}>
            Our Mission
          </h4>
          <p className="text-sm md:text-base leading-relaxed font-semibold text-[#0E5F13]">
            To provide high-quality products and services across import-export, coffee farming and processing, and manufacturing, while fostering sustainability, innovation, integrity, and long-term partnerships in all areas of operation.
          </p>
        </div>
      </div>

      {/* Right: Vision */}
      <div
        className="w-full md:w-1/2 relative h-full cursor-pointer overflow-hidden group/vision"
        onMouseEnter={() => setHoveredSide('vision')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <img
          src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?q=80&w=1200&auto=format&fit=crop"
          alt="Vision"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out"
          style={{ transform: hoveredSide === 'vision' ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className={`absolute inset-0 transition-colors duration-500 ${hoveredSide === 'vision' ? 'bg-[#0E5F13]/40' : 'bg-[#0E5F13]/70'}`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden text-center w-full px-4">
          <motion.h3
            className="text-5xl md:text-8xl font-black text-[#ECBD27] uppercase tracking-widest"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
            animate={{
              y: hoveredSide === 'vision' ? -20 : 0,
              opacity: hoveredSide === 'vision' ? 0 : 0.6,
              scale: hoveredSide === 'vision' ? 1.1 : 1
            }}
            transition={{ duration: 0.5 }}
          >
            Vision
          </motion.h3>
        </div>

        {/* Hover Pop-up for Vision */}
        <div
          className="absolute top-1/2 left-1/2 w-[85%] max-w-[450px] p-10 z-20 pointer-events-none transition-all duration-500 ease-out flex flex-col justify-center items-center text-center shadow-2xl bg-[#F3F6FA]"
          style={{
            transform: `translate(-50%, -50%) scale(${hoveredSide === 'vision' ? 1 : 0.95})`,
            opacity: hoveredSide === 'vision' ? 1 : 0,
          }}
        >
          <h4 className="font-black text-2xl md:text-3xl uppercase mb-4 tracking-widest text-[#0E5F13]" style={{ fontFamily: "'Arial Black', sans-serif" }}>
            Our Vision
          </h4>
          <p className="text-sm md:text-base leading-relaxed font-semibold text-[#0E5F13]">
            To become a leading diversified Ethiopian enterprise that delivers sustainable value across agriculture, manufacturing, logistics, and international trade, while contributing to national economic growth.
          </p>
        </div>
      </div>
    </div>
  )
}

const values = [
  { icon: '🌱', label: 'Sustainability', desc: 'Building for the long term people, planet, and profit.' },
  { icon: '💡', label: 'Innovation', desc: 'Continuously improving how we serve our partners.' },
  { icon: '🤝', label: 'Integrity', desc: 'Honest, transparent dealings in every interaction.' },
  { icon: '🔗', label: 'Partnership', desc: 'Long-term relationships built on mutual growth.' },
  { icon: '🏆', label: 'Excellence', desc: 'Uncompromising quality across every vertical.' },
]


// ── Helpers ──────────────────────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-[2px] w-8 bg-[#ECBD27]" />
      <span className="text-xs tracking-[0.4em] uppercase font-bold" style={{ color: '#ECBD27', fontFamily: 'monospace' }}>
        {text}
      </span>
    </div>
  )
}

function Heading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className="font-black uppercase leading-none mb-6"
      style={{
        fontFamily: "'Arial Black', sans-serif",
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        color: light ? '#F3F6FA' : '#0E5F13',
        letterSpacing: '-0.02em',
      }}
    >
      {children}
    </h2>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Aboutpage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0])
  const strategyRef = useRef<HTMLElement>(null)
  const { scrollYProgress: strategyScroll } = useScroll({ target: strategyRef, offset: ['start 85%', 'center center'] })
  const clipProgress = useTransform(strategyScroll, [0, 1], [0, 100])
  const clipInverted = useTransform(clipProgress, v => `${100 - v}%`)
  const strategyClipPath = useMotionTemplate`inset(0% ${clipInverted} ${clipInverted} 0%)`

  const xValue = useTransform(clipProgress, [0, 100], [0, 757])
  const yValue = useTransform(clipProgress, [0, 100], [0, 934])

  const footprintRef = useRef<HTMLElement>(null)
  const { scrollYProgress: footprintScroll } = useScroll({ target: footprintRef, offset: ['start 85%', 'center center'] })
  const footprintClipProgress = useTransform(footprintScroll, [0, 1], [0, 100])
  const footprintClipInverted = useTransform(footprintClipProgress, v => `${100 - v}%`)
  const footprintClipPath = useMotionTemplate`inset(0% 0% ${footprintClipInverted} ${footprintClipInverted})`

  const footprintXValue = useTransform(footprintClipProgress, [0, 100], [0, 757])
  const footprintYValue = useTransform(footprintClipProgress, [0, 100], [0, 934])

  return (
    <>
      {/* ══════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════ */}
      <div ref={heroRef} className="relative overflow-hidden flex flex-col justify-end" style={{ position: 'relative', minHeight: '70vh', background: '#0E5F13' }}>
        <motion.video
          src={VIDEO_SRC}
          autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.3, y: heroY }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0E5F13 0%, rgba(14,95,19,0.5) 50%, rgba(14,95,19,0.2) 100%)' }} />
        <GridBackground color="#ECBD27" gridSize={60} opacity={0.08} isVisible={true} />
        {/* Nova orbs */}
        <NovaOrb size={700} x="80%" y="30%" color1="#ECBD27" color2="#0E5F13" opacity={0.15} duration={10} />
        <NovaOrb size={400} x="10%" y="70%" color1="#ECBD27" color2="#0a3d0a" opacity={0.12} duration={7} delay={2} />

        <motion.div
          className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-40 pb-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#ECBD27', fontFamily: 'monospace' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Who We Are
          </motion.p>
          <motion.h1
            className="font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#F3F6FA', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          >
            About <span style={{ color: '#ECBD27' }}>YHAENU</span>
          </motion.h1>
          <motion.p className="text-lg max-w-2xl" style={{ color: 'rgba(243,246,250,0.75)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
            Yhaenu PLC continues to grow its vision of becoming a leading diversified Ethiopian enterprise delivering sustainable value across agriculture, manufacturing, logistics, and international trade.
          </motion.p>
          {/* Spacer to match the height of the "Request a Quote" button on the Products page */}
          <div style={{ height: 74 }} aria-hidden="true" />
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════
          2. HISTORY & STRATEGY
      ══════════════════════════════════════════════ */}
      <section ref={strategyRef} className="relative py-24 overflow-hidden border-y border-[rgba(0,0,0,0.08)]" style={{ background: '#F3F6FA' }}>
        {/* Nova orbs */}
        <NovaOrb size={500} x="90%" y="20%" color1="#ECBD27" color2="#F3F6FA" opacity={0.25} duration={9} delay={1} />
        <NovaOrb size={350} x="5%" y="80%" color1="#0E5F13" color2="#F3F6FA" opacity={0.1} duration={11} delay={3} />

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 border-x border-[rgba(0,0,0,0.08)]">

          <div className="border-r border-[rgba(0,0,0,0.08)] flex flex-col">
            <div className="w-full relative border-b border-[rgba(0,0,0,0.08)]">
              {/* Corner crosshairs */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 z-20">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[rgba(0,0,0,0.3)]"></div>
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[rgba(0,0,0,0.3)]"></div>
              </div>
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 z-20">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[rgba(0,0,0,0.3)]"></div>
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[rgba(0,0,0,0.3)]"></div>
              </div>
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 z-20">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[rgba(0,0,0,0.3)]"></div>
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[rgba(0,0,0,0.3)]"></div>
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 z-20">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[rgba(0,0,0,0.3)]"></div>
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[rgba(0,0,0,0.3)]"></div>
              </div>

              <motion.div
                style={{
                  aspectRatio: '4/5',
                  clipPath: strategyClipPath
                }}
                className="w-full relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
                  alt="History and Strategy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>

              {/* Moving Coordinates tracking the expanding bottom-right corner */}
              <motion.div
                className="absolute z-30"
                style={{
                  left: useMotionTemplate`${clipProgress}%`,
                  top: useMotionTemplate`${clipProgress}%`
                }}
              >
                {/* Crosshair at the moving corner */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#0E5F13]"></div>
                  <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#0E5F13]"></div>
                </div>

                <div className="absolute -bottom-6 -left-8 text-[10px] text-[#0E5F13] font-mono tracking-widest whitespace-nowrap">
                  <AnimatedCoordinate val={xValue} prefix="X" />
                </div>
                <div className="absolute -top-12 -right-12 text-[10px] text-[#0E5F13] font-mono tracking-widest whitespace-nowrap rotate-90 origin-bottom-left">
                  <AnimatedCoordinate val={yValue} prefix="Y" />
                </div>
              </motion.div>
            </div>
            <div className="flex-grow p-10 min-h-[100px]"></div>
          </div>

          <motion.div className="p-10 md:p-16 flex flex-col justify-center" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel text="History & Strategy" />
            <Heading>Built on Trust,{' '}<span style={{ color: '#ECBD27' }}>Driven by Purpose</span></Heading>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(14,95,19,0.8)' }}>
              Yhaenu PLC is a family-owned company with over 20 years of experience in Import, Export, Manufacturing, Transportation, and Hospitality. Headquartered in Ethiopia, we've grown into a trusted name in both local and international markets.
            </p>
            <p className="text-base leading-relaxed mb-12" style={{ color: 'rgba(14,95,19,0.8)' }}>
              Our mission is simple: to be the bridge that links Ethiopia's potential to the global stage — delivering quality, precision, and excellence across every vertical we operate in.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. VISION, MISSION & VALUES
      ══════════════════════════════════════════════ */}
      <section className="relative pt-24 pb-24 overflow-hidden" style={{ background: '#0E5F13' }}>
        {/* Nova orbs */}
        <NovaOrb size={800} x="50%" y="50%" color1="#ECBD27" color2="#0a3d0a" opacity={0.12} duration={12} />
        <NovaOrb size={400} x="5%" y="20%" color1="#ECBD27" color2="#0E5F13" opacity={0.1} duration={8} delay={4} />
        <NovaOrb size={350} x="95%" y="80%" color1="#ECBD27" color2="#0E5F13" opacity={0.1} duration={9} delay={2} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 mb-16">
          <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-[#ECBD27]" />
              <span className="text-[#ECBD27] text-xs tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'monospace' }}>Vision, Mission & Values</span>
              <span className="h-[2px] w-8 bg-[#ECBD27]" />
            </div>
            <Heading light>Where We're <span style={{ color: '#ECBD27' }}>Going</span></Heading>
          </motion.div>
        </div>

        {/* Full-width Split Interaction */}
        <div className="relative z-10 w-full">
          <MissionVisionSplit />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CORE VALUES (STACKED)
      ══════════════════════════════════════════════ */}
      <section className="relative pt-24 overflow-visible" style={{ background: '#F3F6FA' }}>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 mb-16">
          <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-[#ECBD27]" />
              <span className="text-[#0E5F13] text-xs tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'monospace' }}>Core Values</span>
              <span className="h-[2px] w-8 bg-[#ECBD27]" />
            </div>
            <Heading>Our Guiding <span style={{ color: '#ECBD27' }}>Principles</span></Heading>
          </motion.div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <StackedValues />
        </div>
      </section>

      {/* ── Services (What We Do) ── */}
      {/* <Services /> */}

      {/* ══════════════════════════════════════════════
          4. LEADERSHIP (DIAGONAL ACCORDION)
      ══════════════════════════════════════════════ */}
      {/* <LeadershipAccordion /> */}

      {/* ══════════════════════════════════════════════
          5. JOURNEY (scroll-scrubbed video)
      ══════════════════════════════════════════════ */}
      <JourneySection />

      {/* ══════════════════════════════════════════════
          6. FOOTPRINT
      ══════════════════════════════════════════════ */}
      {/* <section ref={footprintRef} className="relative py-24 overflow-hidden border-y border-[rgba(0,0,0,0.08)]" style={{ background: '#F3F6FA' }}>
        <NovaOrb size={600} x="50%" y="50%" color1="#ECBD27" color2="#F3F6FA" opacity={0.2} duration={10} />
        <NovaOrb size={300} x="90%" y="10%" color1="#0E5F13" color2="#F3F6FA" opacity={0.1} duration={7} delay={3} />

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 border-x border-[rgba(0,0,0,0.08)]"> */}
          {/* Text Left */}
          {/* <motion.div
            className="p-10 md:p-16 flex flex-col justify-center order-2 md:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel text="Our Footprint" />
            <Heading>Expanding Horizons{' '}<span style={{ color: '#ECBD27' }}>Across Africa</span></Heading>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(14,95,19,0.75)' }}>
              At Yhaenu PLC, our impact extends beyond products — it's etched into the geography of Ethiopia and beyond. From manufacturing facilities to hospitality and logistics, our footprint tells a story of industrial transformation, local empowerment, and economic growth.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[{ num: '15+', label: 'Countries' }, { num: '20+', label: 'Years' }, { num: '5', label: 'Verticals' }].map((s, i) => (
                <div key={i} className="text-center border border-[rgba(0,0,0,0.1)] py-4 bg-white shadow-sm" style={{ borderColor: 'rgba(14,95,19,0.1)' }}>
                  <p className="font-black text-2xl" style={{ fontFamily: "'Arial Black', sans-serif", color: '#0E5F13' }}>{s.num}</p>
                  <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: '#ECBD27', fontFamily: 'monospace', fontWeight: 700 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div> */}

          {/* Image Right */}
          {/* <div className="border-l border-[rgba(0,0,0,0.08)] flex flex-col order-1 md:order-2">
            <div className="w-full relative border-b border-[rgba(0,0,0,0.08)]"> */}
              {/* Corner crosshairs */}
              {/* <div className="absolute -top-1.5 -left-1.5 w-3 h-3 z-20">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#0E5F13]"></div>
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#0E5F13]"></div>
              </div>
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 z-20">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#0E5F13]"></div>
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#0E5F13]"></div>
              </div>
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 z-20">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#0E5F13]"></div>
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#0E5F13]"></div>
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 z-20">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#0E5F13]"></div>
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#0E5F13]"></div>
              </div> */}

              {/* <motion.div
                style={{
                  aspectRatio: '4/5',
                  clipPath: footprintClipPath
                }}
                className="w-full relative"
              >
                <video src={VIDEO_SRC} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
              </motion.div> */}

              {/* Moving Coordinates tracking the expanding bottom-left corner */}
              {/* <motion.div
                className="absolute z-30"
                style={{
                  left: footprintClipInverted,
                  top: useMotionTemplate`${footprintClipProgress}%`
                }}
              > */}
                {/* Crosshair at the moving corner */}
                {/* <div className="absolute -top-1.5 -left-1.5 w-3 h-3">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#0E5F13]"></div>
                  <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#0E5F13]"></div>
                </div> */}

                {/* <div className="absolute -bottom-6 -right-8 text-[10px] text-[#0E5F13] font-mono tracking-widest whitespace-nowrap">
                  <AnimatedCoordinate val={footprintXValue} prefix="X" />
                </div>
                <div className="absolute -top-12 -left-12 text-[10px] text-[#0E5F13] font-mono tracking-widest whitespace-nowrap rotate-90 origin-bottom-left">
                  <AnimatedCoordinate val={footprintYValue} prefix="Y" />
                </div>
              </motion.div> */}
            {/* </div>
            <div className="flex-grow p-10 min-h-[100px]"></div>
          </div>
        </div>
      </section> */}

      <Cta />
      <Footer />
    </>
  )
}
