import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Hls from 'hls.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'
import Cta from '../components/Cta'
import GridBackground from '../components/GridBackground'
import WhatWeOffer from '../components/WhatWeOffer'

gsap.registerPlugin(ScrollTrigger)

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



// ── Page ─────────────────────────────────────────────────────────────────────
export default function ProductsPage() {

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

  useEffect(() => {
    // Divider scroll animation
    const st = gsap.fromTo(".cert-divider", { scaleY: 0 }, {
      scaleY: 1,
      duration: 1.5,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".cert-section",
        start: "top 70%",
      }
    })

    // Parallax and hover clips for Certifications & Memberships cards
    const cards = gsap.utils.toArray<HTMLElement>('.cert-card')
    cards.forEach((card, index) => {
      const content = card.querySelector('.parallax-content')
      const bg = card.querySelector('.hover-bg')
      if (!content || !bg) return

      const isLeft = index % 2 === 0
      
      // Set initial clip-path (hidden)
      gsap.set(bg, {
        clipPath: isLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
        opacity: 1
      })

      card.addEventListener('mouseenter', () => {
        gsap.to(bg, { clipPath: "inset(0 0% 0 0%)", duration: 0.8, ease: "power3.inOut" })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(bg, {
          clipPath: isLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
          duration: 0.6,
          ease: "power3.inOut"
        })
        gsap.to(content, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.3)" })
      })

      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        gsap.to(content, {
          x: x * 30,
          y: y * 30,
          rotateX: -y * 10,
          rotateY: x * 10,
          duration: 0.6,
          ease: "power2.out",
          transformPerspective: 1000
        })
      })
    })

    return () => {
      if (st.scrollTrigger) st.scrollTrigger.kill()
      st.kill()
    }
  }, [])

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden flex flex-col justify-end" style={{ minHeight: '70vh', background: '#0E5F13' }}>
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
        <GridBackground color="#ECBD27" gridSize={60} opacity={0.08} isVisible={true} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-40 pb-20">
          <motion.p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#ECBD27', fontFamily: 'monospace' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Our Collection
          </motion.p>
          <motion.h1 className="font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#F3F6FA', letterSpacing: '-0.02em' }}
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

      {/* ── What We Offer (scroll-pinned panel) ── */}
      <WhatWeOffer />

      {/* ── Certifications ── */}
      <section className="cert-section relative overflow-hidden py-24 md:py-32 border-t border-black/10 bg-white">
        <NovaOrb size={500} x="20%" y="50%" color1="#ECBD27" color2="#F3F6FA" opacity={0.12} duration={10} delay={2} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="flex items-center gap-3 mb-16">
            <span className="h-[2px] w-8 bg-[#0E5F13]" />
            <span className="text-[#0E5F13] text-xs tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'monospace' }}>
              Certifications & Memberships
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 relative">
            {/* EPOSPEA */}
            <div className="lg:col-span-5 cert-card group relative py-4 transition-colors duration-500 cursor-pointer">
              {/* Sliding Gold Background - Spans off screen left with Rhombus Skew */}
              <div className="hover-bg absolute top-0 bottom-0 bg-[#ECBD27] z-0 pointer-events-none"
                style={{ left: '-100vw', right: '-20%', transform: 'skewX(-15deg)', transformOrigin: 'top' }} />

              <div className="parallax-content relative z-10">
                <div className="px-6 md:px-8 py-4">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-px bg-[#0E5F13] origin-left section-line transition-colors duration-500 group-hover:bg-[#0E5F13]" />
                    <span className="text-xs font-bold uppercase tracking-[0.3em] transition-colors duration-500 text-[#0E5F13]/60 group-hover:text-[#0E5F13]" style={{ fontFamily: 'monospace' }}>Association</span>
                  </div>
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="shrink-0 p-4 bg-[#0E5F13] rounded-full group-hover:bg-white transition-all duration-500 shadow-sm flex items-center justify-center font-black text-sm text-white group-hover:text-[#0E5F13] w-12 h-12">
                      ✓
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-500 text-[#0E5F13] group-hover:text-[#0E5F13] leading-snug tracking-tight" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                        EPOSPEA
                      </h3>
                      <p className="text-sm leading-relaxed transition-colors duration-500 text-[#0E5F13]/80 group-hover:text-[#0E5F13]/90 mt-2">
                        Ethiopian Pulses, Oilseeds and Spices Processors-Exporters Association — ensuring compliance with export standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider on large screens - Skewed Diagonally */}
            <div className="hidden lg:block lg:col-span-2 relative h-full" style={{ transform: 'skewX(-15deg)', transformOrigin: 'top' }}>
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/10 origin-top cert-divider scale-y-100" />
            </div>

            {/* ECA */}
            <div className="lg:col-span-5 cert-card group relative py-4 transition-colors duration-500 cursor-pointer">
              {/* Sliding Gold Background - Spans off screen right with Rhombus Skew */}
              <div className="hover-bg absolute top-0 bottom-0 bg-[#ECBD27] z-0 pointer-events-none"
                style={{ left: '-20%', right: '-100vw', transform: 'skewX(-15deg)', transformOrigin: 'top' }} />

              <div className="parallax-content relative z-10">
                <div className="px-6 md:px-8 py-4">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-px bg-[#0E5F13] origin-left section-line transition-colors duration-500 group-hover:bg-[#0E5F13]" />
                    <span className="text-xs font-bold uppercase tracking-[0.3em] transition-colors duration-500 text-[#0E5F13]/60 group-hover:text-[#0E5F13]" style={{ fontFamily: 'monospace' }}>Membership</span>
                  </div>
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="shrink-0 p-4 bg-[#0E5F13] rounded-full group-hover:bg-white transition-all duration-500 shadow-sm flex items-center justify-center font-black text-sm text-white group-hover:text-[#0E5F13] w-12 h-12">
                      ✓
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-500 text-[#0E5F13] group-hover:text-[#0E5F13] leading-snug tracking-tight" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                        ECA
                      </h3>
                      <p className="text-sm leading-relaxed transition-colors duration-500 text-[#0E5F13]/80 group-hover:text-[#0E5F13]/90 mt-2">
                        Ethiopian Coffee Association member — upholding the highest standards in Ethiopian coffee production and export.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Cta />
      <Footer />
    </>
  )
}
