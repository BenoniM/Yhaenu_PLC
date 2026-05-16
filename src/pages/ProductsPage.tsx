import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Hls from 'hls.js'
import Footer from '../components/Footer'
import Cta from '../components/Cta'
import { useNavigate } from 'react-router-dom'

const HLS_SRC = 'https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8'
const LOOP_END_OFFSET = 4 // seconds before end to restart loop

// ── Nova Orb ─────────────────────────────────────────────────────────────────
function NovaOrb({ size = 500, x = '50%', y = '50%', color1 = '#ECBD27', color2 = '#0E5F13', opacity = 0.15, duration = 9, delay = 0 }: {
  size?: number; x?: string; y?: string; color1?: string; color2?: string; opacity?: number; duration?: number; delay?: number
}) {
  return (
    <motion.div className="absolute pointer-events-none"
      style={{
        width: size, height: size, left: x, top: y, transform: 'translate(-50%,-50%)', borderRadius: '50%',
        background: `radial-gradient(circle at 40% 40%, ${color1}, ${color2} 50%, transparent 70%)`,
        filter: 'blur(60px)', opacity, zIndex: 0
      }}
      animate={{ scale: [1, 1.15, 0.95, 1.1, 1], x: [0, 30, -20, 15, 0], y: [0, -20, 25, -10, 0] }}
      transition={{ duration, ease: 'easeInOut', repeat: Infinity, delay }}
    />
  )
}

// ── Product data ──────────────────────────────────────────────────────────────
const products = [
  {
    title: 'Green Coffee Beans',
    shortTitle: 'Coffee',
    description: 'Premium Ethiopian Arabica green coffee — washed and natural processed from Yirgacheffe, Sidama, Jimma, and Harar regions.',
    image: '/products1.jpeg',
    type: 'Export',
    category: 'Specialty Coffee',
    badge: 'Export Grade',
    detail: 'Yirgacheffe · Sidama · Jimma · Harar',
  },
  {
    title: 'Oilseeds & Pulses',
    shortTitle: 'Oilseeds',
    description: 'High-quality Ethiopian sesame seeds, lentils, and other oilseeds exported to international markets with full traceability.',
    image: '/products2.jpeg',
    type: 'Export',
    category: 'Oil Seeds',
    badge: 'Export Grade',
    detail: 'Humera · Wollega · Tigray',
  },
  {
    title: 'Cardboard Packaging',
    shortTitle: 'Packaging',
    description: 'Manufacturing high-quality cardboard and carton packaging products that meet global standards for local and international clients.',
    image: '/products3.jpeg',
    type: 'Manufacturing',
    category: 'Packaging',
    badge: 'ISO Standard',
    detail: 'Custom · Bulk · Retail',
  },
  {
    title: 'Industrial Materials',
    shortTitle: 'Industrial',
    description: 'Sourcing and importing essential industrial materials and goods to support Ethiopia\'s growing manufacturing and construction sectors.',
    image: '/products4.jpeg',
    type: 'Import',
    category: 'Industrial',
    badge: 'Certified',
    detail: 'Machinery · Equipment · Materials',
  },
  {
    title: 'Transportation Fleet',
    shortTitle: 'Logistics',
    description: 'Reliable fleet of vehicles providing seamless goods transportation across Ethiopia, ensuring timely and secure delivery.',
    image: '/products5.jpeg',
    type: 'Logistics',
    category: 'Transportation',
    badge: 'Nationwide',
    detail: 'Freight · Warehousing · Distribution',
  },
  {
    title: 'South Star Hotel',
    shortTitle: 'Hospitality',
    description: 'A 4-star hotel in Hawassa offering memorable experiences through modern, welcoming hospitality for business and leisure travelers.',
    image: '/products6.jpg',
    type: 'Hospitality',
    category: 'Hotel & Leisure',
    badge: '4-Star',
    detail: 'Hawassa · Sister Company',
  },
]

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: typeof products[0] }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center justify-between p-7 overflow-hidden cursor-pointer"
      style={{
        minHeight: 520,
        borderRadius: '2.5rem',
        background: hovered ? '#0E5F13' : '#F3F6FA',
        transition: 'background 0.4s ease',
        border: hovered ? '1px solid rgba(236,189,39,0.3)' : '1px solid rgba(14,95,19,0.08)',
        boxShadow: hovered ? '0 24px 60px rgba(14,95,19,0.25)' : '0 2px 16px rgba(0,0,0,0.05)',
      }}
    >
      {/* Logo watermark on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.06, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <img src="/logo.png" alt="" className="w-full h-auto" style={{ filter: 'brightness(10)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top — badge + category */}
      <div className="relative z-10 w-full flex flex-col items-end text-right mb-4">
        <span
          className="font-black text-xl mb-1"
          style={{ fontFamily: "'Arial Black', sans-serif", color: hovered ? '#ECBD27' : '#0E5F13', transition: 'color 0.3s' }}
        >
          {product.badge}
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.2em] mb-1"
          style={{ color: hovered ? 'rgba(243,246,250,0.5)' : 'rgba(14,95,19,0.5)', transition: 'color 0.3s' }}
        >
          {product.type}
        </span>
        <span
          className="text-sm"
          style={{ color: hovered ? 'rgba(243,246,250,0.8)' : 'rgba(14,95,19,0.7)', transition: 'color 0.3s' }}
        >
          {product.category}
        </span>
      </div>

      {/* Image */}
      <motion.div
        className="relative z-10 w-full px-2 my-2"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full object-cover rounded-2xl shadow-md"
          style={{
            aspectRatio: '4/3',
            mixBlendMode: hovered ? 'normal' : 'multiply',
            transition: 'mix-blend-mode 0.3s',
          }}
        />
      </motion.div>

      {/* Bottom — title + detail + CTA */}
      <div className="relative z-10 w-full text-center mt-4 space-y-3">
        <p
          className="text-[10px] uppercase tracking-[0.15em]"
          style={{ color: hovered ? 'rgba(243,246,250,0.5)' : 'rgba(14,95,19,0.5)', transition: 'color 0.3s' }}
        >
          {product.detail}
        </p>
        <h3
          className="font-black uppercase leading-none"
          style={{
            fontFamily: "'Arial Black', sans-serif",
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            color: hovered ? '#F3F6FA' : '#0E5F13',
            letterSpacing: '-0.02em',
            transition: 'color 0.3s',
          }}
        >
          {product.shortTitle}
        </h3>
        <p
          className="text-xs leading-relaxed"
          style={{ color: hovered ? 'rgba(243,246,250,0.65)' : 'rgba(14,95,19,0.6)', transition: 'color 0.3s' }}
        >
          {product.description}
        </p>

        <motion.button
          onClick={() => navigate('/rfq')}
          className="w-full py-3 px-6 rounded-full font-black text-xs uppercase tracking-widest"
          style={{
            fontFamily: "'Arial Black', sans-serif",
            background: hovered ? '#ECBD27' : '#0E5F13',
            color: hovered ? '#0E5F13' : '#ECBD27',
            border: 'none',
            transition: 'background 0.3s, color 0.3s',
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Inquire Now →
        </motion.button>
      </div>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: '-80px' })

  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const setupHls = () => {
      if (Hls.isSupported()) {
        const hls = new Hls({
          lowLatencyMode: false,
          maxBufferLength: 120,
          maxMaxBufferLength: 240,
          backBufferLength: 0,
        })
        hlsRef.current = hls
        hls.loadSource(HLS_SRC)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => { })
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = HLS_SRC
        video.play().catch(() => { })
      }
    }

    const handleTimeUpdate = () => {
      // If we're within LOOP_END_OFFSET of the end, jump back to start
      if (video.duration && video.currentTime >= video.duration - LOOP_END_OFFSET) {
        video.currentTime = 0
        video.play().catch(() => { })
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    setupHls()

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      hlsRef.current?.destroy()
    }
  }, [])

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden flex flex-col justify-end" style={{ minHeight: '50vh', background: '#0E5F13' }}>
        {/* Background video */}
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.4 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0E5F13 0%, rgba(14,95,19,0.5) 50%, rgba(14,95,19,0.2) 100%)' }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-40 pb-16">
          <motion.p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#ECBD27', fontFamily: 'monospace' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Our Collection
          </motion.p>
          <motion.h1 className="font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#F3F6FA', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Products & <span style={{ color: '#ECBD27' }}>Services</span>
          </motion.h1>
          <motion.p className="text-lg max-w-2xl" style={{ color: 'rgba(243,246,250,0.75)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            From premium Ethiopian exports to world-class imports — we bridge Ethiopia's potential to the global market.
          </motion.p>
          <motion.a
            href="/rfq"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.04, background: '#ECBD27', color: '#0E5F13' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center rounded-full font-semibold text-sm transition-all"
            style={{
              marginTop: 24,
              padding: '14px 28px',
              background: 'rgba(236,189,39,0.15)',
              border: '1px solid #ECBD27',
              color: '#ECBD27',
              backdropFilter: 'blur(8px)',
            }}
          >
            Request a Quote →
          </motion.a>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="relative overflow-hidden py-24" style={{ background: '#fff' }}>
        <NovaOrb size={600} x="90%" y="20%" color1="#ECBD27" color2="#fff" opacity={0.15} duration={9} delay={1} />
        <NovaOrb size={400} x="5%" y="80%" color1="#0E5F13" color2="#fff" opacity={0.08} duration={11} delay={3} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-[#ECBD27]" />
              <span className="text-[#ECBD27] text-xs tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'monospace' }}>
                What We Offer
              </span>
              <span className="h-[2px] w-8 bg-[#ECBD27]" />
            </div>
            <h2
              className="font-black uppercase leading-none"
              style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#0E5F13', letterSpacing: '-0.02em' }}
            >
              Our <span style={{ color: '#ECBD27' }}>Products</span>
            </h2>
            <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: 'rgba(14,95,19,0.65)' }}>
              Hover over each card to explore. Click "Inquire Now" to request a quote.
            </p>
          </motion.div>

          <motion.div
            ref={gridRef}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {products.map((p) => (
              <ProductCard key={p.title} product={p} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="relative overflow-hidden py-20" style={{ background: '#0E5F13' }}>
        <NovaOrb size={500} x="20%" y="50%" color1="#ECBD27" color2="#0a3d0a" opacity={0.12} duration={10} delay={2} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <span className="h-[2px] w-8 bg-[#ECBD27]" />
            <span className="text-[#ECBD27] text-xs tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'monospace' }}>
              Certifications & Memberships
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'EPOSPEA', desc: 'Ethiopian Pulses, Oilseeds and Spices Processors-Exporters Association — ensuring compliance with export standards.' },
              { name: 'ECA', desc: 'Ethiopian Coffee Association member — upholding the highest standards in Ethiopian coffee production and export.' },
            ].map((cert, i) => (
              <motion.div key={i} className="rounded-2xl p-7 flex items-start gap-5"
                style={{ background: 'rgba(243,246,250,0.05)', border: '1px solid rgba(236,189,39,0.25)' }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm"
                  style={{ background: '#ECBD27', color: '#0E5F13', fontFamily: "'Arial Black', sans-serif" }}>
                  ✓
                </div>
                <div>
                  <h3 className="font-black uppercase text-sm mb-2" style={{ fontFamily: "'Arial Black', sans-serif", color: '#ECBD27' }}>{cert.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(243,246,250,0.7)' }}>{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Cta />
      <Footer />
    </>
  )
}
