import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Cta from '../components/Cta'
import Footer from '../components/Footer'

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

// ── 3D Carousel for Core Values ──────────────────────────────────────────────
function Values3DCarousel() {
  const totalItems = values.length
  const spreadAngle = 360 / totalItems
  const translateZ = 320

  return (
    <div
      style={{
        width: '100%',
        height: 340,
        position: 'relative',
        perspective: '1000px',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes carousel-rotation {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }
        .values-carousel {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transform-style: preserve-3d;
          transform-origin: center center;
          animation: carousel-rotation 18s infinite linear;
        }
        .values-carousel:hover {
          animation-play-state: paused;
        }
        .values-carousel figure {
          position: absolute;
          margin: 0;
          top: 50%;
          left: 50%;
          transform-origin: center center;
          backface-visibility: visible;
          transition: transform 0.4s ease;
        }
      `}</style>

      <div className="values-carousel">
        {values.map((v, i) => {
          const angle = i * spreadAngle
          const transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${translateZ}px)`
          return (
            <figure
              key={i}
              style={{
                width: 180,
                height: 200,
                transform,
                borderRadius: 16,
                background: 'rgba(10,61,10,0.85)',
                border: '1px solid rgba(236,189,39,0.35)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem 1rem',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
            >
              <span style={{ fontSize: '2.5rem', marginBottom: '0.75rem', display: 'block' }}>{v.icon}</span>
              <p
                style={{
                  fontFamily: "'Arial Black', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#ECBD27',
                  marginBottom: '0.5rem',
                }}
              >
                {v.label}
              </p>
              <p style={{ fontSize: '0.72rem', color: 'rgba(243,246,250,0.65)', lineHeight: 1.5 }}>
                {v.desc}
              </p>
            </figure>
          )
        })}
      </div>
    </div>
  )
}
function ConicCard({ icon, label, text, delay }: { icon: string; label: string; text: string; delay: number }) {
  return (
    <div className="relative rounded-[14px] p-[2px] overflow-hidden h-full">
      {/* Rotating conic gradient border */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: 'conic-gradient(from 0deg, transparent 0deg, #ECBD27 60deg, transparent 120deg)',
          zIndex: 0,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, ease: 'linear', repeat: Infinity, delay }}
      />
      {/* Inner card */}
      <div
        className="relative rounded-[12px] p-8 h-full"
        style={{ background: '#0a3d0a', zIndex: 1 }}
      >
        {/* Inner glow orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 200,
            height: 200,
            top: '-20%',
            right: '-10%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,189,39,0.12) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-4xl">{icon}</span>
            <h3
              className="font-black uppercase text-base"
              style={{ fontFamily: "'Arial Black', sans-serif", color: '#ECBD27' }}
            >
              {label}
            </h3>
          </div>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(243,246,250,0.85)' }}>
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────
const timeline = [
  { year: '2003', event: 'Yhaenu PLC is founded in Addis Ababa, Ethiopia' },
  { year: '2007', event: 'Expansion into manufacturing — cardboard and carton products' },
  { year: '2012', event: 'Transportation division launched, growing the logistics fleet' },
  { year: '2016', event: 'South Star International Hotel opens in Hawassa' },
  { year: '2020', event: 'Entry into coffee farming and international export markets' },
  { year: '2024', event: 'Operations now span 15+ countries across Africa and beyond' },
]

const values = [
  { icon: '🌱', label: 'Sustainability', desc: 'Building for the long term — people, planet, and profit.' },
  { icon: '💡', label: 'Innovation',     desc: 'Continuously improving how we serve our partners.' },
  { icon: '🤝', label: 'Integrity',      desc: 'Honest, transparent dealings in every interaction.' },
  { icon: '🔗', label: 'Partnership',    desc: 'Long-term relationships built on mutual growth.' },
  { icon: '🏆', label: 'Excellence',     desc: 'Uncompromising quality across every vertical.' },
]

const leadership = [
  { name: 'Yhaenu Founder',       role: 'Group President & CEO',                    desc: "Visionary leader with 20+ years driving Ethiopia's trade and manufacturing growth." },
  { name: 'Operations Director',  role: 'Group Executive Director, Operations',     desc: 'Coordinates logistics, manufacturing, and supply chain across all verticals.' },
  { name: 'Trade Director',       role: 'Group Executive Director, Trade',          desc: 'Leads import-export strategy and international market expansion.' },
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

  return (
    <>
      {/* ══════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════ */}
      <div ref={heroRef} className="relative overflow-hidden" style={{ minHeight: '70vh', background: '#0E5F13' }}>
        <motion.video
          src={VIDEO_SRC}
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.3, y: heroY }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0E5F13 0%, rgba(14,95,19,0.5) 50%, rgba(14,95,19,0.2) 100%)' }} />
        {/* Nova orbs */}
        <NovaOrb size={700} x="80%" y="30%" color1="#ECBD27" color2="#0E5F13" opacity={0.15} duration={10} />
        <NovaOrb size={400} x="10%" y="70%" color1="#ECBD27" color2="#0a3d0a" opacity={0.12} duration={7} delay={2} />

        <motion.div
          className="relative z-10 flex flex-col justify-end h-full max-w-6xl mx-auto px-6 pb-20 pt-40"
          style={{ opacity: heroOpacity }}
        >
          <motion.p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#ECBD27', fontFamily: 'monospace' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Who We Are
          </motion.p>
          <motion.h1
            className="font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 'clamp(3rem, 9vw, 7rem)', color: '#F3F6FA', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          >
            About <span style={{ color: '#ECBD27' }}>YHAENU</span>
          </motion.h1>
          <motion.p className="text-lg max-w-2xl" style={{ color: 'rgba(243,246,250,0.75)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
            Yhaenu PLC continues to grow its vision of becoming a leading diversified Ethiopian enterprise delivering sustainable value across agriculture, manufacturing, logistics, and international trade.
          </motion.p>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════
          2. HISTORY & STRATEGY
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#F3F6FA' }}>
        {/* Nova orbs */}
        <NovaOrb size={500} x="90%" y="20%" color1="#ECBD27" color2="#F3F6FA" opacity={0.25} duration={9} delay={1} />
        <NovaOrb size={350} x="5%" y="80%" color1="#0E5F13" color2="#F3F6FA" opacity={0.1} duration={11} delay={3} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel text="History & Strategy" />
            <Heading>Built on Trust,{' '}<span style={{ color: '#ECBD27' }}>Driven by Purpose</span></Heading>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(14,95,19,0.8)' }}>
              Yhaenu PLC is a family-owned company with over 20 years of experience in Import, Export, Manufacturing, Transportation, and Hospitality. Headquartered in Ethiopia, we've grown into a trusted name in both local and international markets.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(14,95,19,0.8)' }}>
              Our mission is simple: to be the bridge that links Ethiopia's potential to the global stage — delivering quality, precision, and excellence across every vertical we operate in.
            </p>
            <div className="inline-flex items-center gap-4 rounded-2xl px-6 py-4" style={{ background: '#0E5F13' }}>
              <span className="font-black text-4xl leading-none" style={{ fontFamily: "'Arial Black', sans-serif", color: '#ECBD27' }}>30,000+</span>
              <span className="text-sm" style={{ color: 'rgba(243,246,250,0.75)' }}>Lives impacted<br />across Ethiopia</span>
            </div>
          </motion.div>

          <motion.div className="rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <video src={VIDEO_SRC} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. VISION, MISSION & VALUES
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#0E5F13' }}>
        {/* Nova orbs */}
        <NovaOrb size={800} x="50%" y="50%" color1="#ECBD27" color2="#0a3d0a" opacity={0.12} duration={12} />
        <NovaOrb size={400} x="5%" y="20%" color1="#ECBD27" color2="#0E5F13" opacity={0.1} duration={8} delay={4} />
        <NovaOrb size={350} x="95%" y="80%" color1="#ECBD27" color2="#0E5F13" opacity={0.1} duration={9} delay={2} />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-[#ECBD27]" />
              <span className="text-[#ECBD27] text-xs tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'monospace' }}>Vision, Mission & Values</span>
              <span className="h-[2px] w-8 bg-[#ECBD27]" />
            </div>
            <Heading light>Where We're <span style={{ color: '#ECBD27' }}>Going</span></Heading>
          </motion.div>

          {/* Vision + Mission conic cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              { icon: '🔭', label: 'Vision Statement', text: 'To become a leading diversified Ethiopian enterprise that delivers sustainable value across agriculture, manufacturing, logistics, and international trade, while contributing to national economic growth.', delay: 0 },
              { icon: '🎯', label: 'Mission Statement', text: 'To provide high-quality products and services across import-export, coffee farming and processing, and manufacturing, while fostering sustainability, innovation, integrity, and long-term partnerships in all areas of operation.', delay: 2 },
            ].map((item, i) => (
              <motion.div key={i} className="rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
                <ConicCard icon={item.icon} label={item.label} text={item.text} delay={item.delay} />
              </motion.div>
            ))}
          </div>

          {/* Core Values — 3D Carousel */}
          <h3 className="font-black uppercase text-center mb-10" style={{ fontFamily: "'Arial Black', sans-serif", color: '#F3F6FA', fontSize: '1.1rem', letterSpacing: '0.1em' }}>
            Core Values
          </h3>
          <Values3DCarousel />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. LEADERSHIP
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#F3F6FA' }}>
        <NovaOrb size={500} x="15%" y="30%" color1="#ECBD27" color2="#F3F6FA" opacity={0.2} duration={10} delay={1} />
        <NovaOrb size={400} x="85%" y="70%" color1="#0E5F13" color2="#F3F6FA" opacity={0.1} duration={8} delay={3} />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div className="mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionLabel text="Executive Leadership" />
            <Heading>Our <span style={{ color: '#ECBD27' }}>Leadership</span></Heading>
            <p className="text-base max-w-xl" style={{ color: 'rgba(14,95,19,0.7)' }}>
              Our senior executives bring tremendous experience, visionary thinking and a shared commitment to excellence, creativity, and innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {leadership.map((l, i) => (
              <motion.div key={i} className="rounded-2xl p-7"
                style={{ background: '#fff', border: '1px solid rgba(14,95,19,0.1)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(14,95,19,0.12)', transition: { duration: 0.25 } }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 font-black text-xl"
                  style={{ background: '#ECBD27', color: '#0E5F13', fontFamily: "'Arial Black', sans-serif" }}>
                  {l.name[0]}
                </div>
                <h3 className="font-black uppercase text-sm mb-1" style={{ fontFamily: "'Arial Black', sans-serif", color: '#0E5F13' }}>{l.name}</h3>
                <p className="text-xs mb-3" style={{ color: '#ECBD27' }}>{l.role}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(14,95,19,0.6)' }}>{l.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. TIMELINE
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#0E5F13' }}>
        <NovaOrb size={600} x="80%" y="50%" color1="#ECBD27" color2="#0a3d0a" opacity={0.13} duration={11} delay={2} />
        <NovaOrb size={400} x="10%" y="30%" color1="#ECBD27" color2="#0E5F13" opacity={0.1} duration={9} delay={5} />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div className="mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[2px] w-8 bg-[#ECBD27]" />
              <span className="text-[#ECBD27] text-xs tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'monospace' }}>Our Journey</span>
            </div>
            <Heading light>Building Ethiopia,{' '}<span style={{ color: '#ECBD27' }}>One Milestone at a Time</span></Heading>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[2px]" style={{ background: 'rgba(236,189,39,0.2)', transform: 'translateX(-50%)' }} />
            <div className="flex flex-col gap-10">
              {timeline.map((item, i) => (
                <motion.div key={i}
                  className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-10 md:pl-0`}>
                    <span className="font-black text-2xl block mb-1" style={{ fontFamily: "'Arial Black', sans-serif", color: '#ECBD27' }}>{item.year}</span>
                    <p className="text-base" style={{ color: 'rgba(243,246,250,0.8)' }}>{item.event}</p>
                  </div>
                  <div className="absolute left-[10px] md:left-1/2 w-4 h-4 rounded-full border-2 border-[#ECBD27]"
                    style={{ background: '#0E5F13', transform: 'translateX(-50%)', top: 4 }} />
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. FOOTPRINT
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#F3F6FA' }}>
        <NovaOrb size={600} x="50%" y="50%" color1="#ECBD27" color2="#F3F6FA" opacity={0.2} duration={10} />
        <NovaOrb size={300} x="90%" y="10%" color1="#0E5F13" color2="#F3F6FA" opacity={0.1} duration={7} delay={3} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel text="Our Footprint" />
            <Heading>Expanding Horizons{' '}<span style={{ color: '#ECBD27' }}>Across Africa</span></Heading>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(14,95,19,0.75)' }}>
              At Yhaenu PLC, our impact extends beyond products — it's etched into the geography of Ethiopia and beyond. From manufacturing facilities to hospitality and logistics, our footprint tells a story of industrial transformation, local empowerment, and economic growth.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[{ num: '15+', label: 'Countries' }, { num: '20+', label: 'Years' }, { num: '5', label: 'Verticals' }].map((s, i) => (
                <div key={i} className="text-center rounded-xl py-4" style={{ background: '#0E5F13', border: '1px solid rgba(236,189,39,0.2)' }}>
                  <p className="font-black text-2xl" style={{ fontFamily: "'Arial Black', sans-serif", color: '#ECBD27' }}>{s.num}</p>
                  <p className="text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(243,246,250,0.5)', fontFamily: 'monospace' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/3' }}
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <video src={VIDEO_SRC} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <Cta />
      <Footer />
    </>
  )
}
