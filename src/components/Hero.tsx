import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Hls from 'hls.js'

const HLS_SRC = 'https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8'

const MARQUEE_LOGOS = [
  'Vortex', 'Nimbus', 'Prysma', 'Cirrus', 'Kynder', 'Halcyn',
]

function LogoItem({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      {/* Liquid glass icon */}
      <div
        className="liquid-glass rounded-lg flex items-center justify-center text-white font-semibold text-sm"
        style={{ width: 24, height: 24, fontSize: 11 }}
      >
        {name[0]}
      </div>
      <span className="text-base font-semibold whitespace-nowrap" style={{ color: 'hsl(var(--foreground))' }}>
        {name}
      </span>
    </div>
  )
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const setupHls = () => {
      if (Hls.isSupported()) {
        const hls = new Hls({ lowLatencyMode: false })
        hlsRef.current = hls
        hls.loadSource(HLS_SRC)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {})
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = HLS_SRC
        video.play().catch(() => {})
      }
    }

    // Manual loop — seek to 0 and replay on ended
    const handleEnded = () => {
      video.currentTime = 0
      video.play().catch(() => {})
    }

    video.addEventListener('ended', handleEnded)
    setupHls()

    return () => {
      video.removeEventListener('ended', handleEnded)
      hlsRef.current?.destroy()
    }
  }, [])

  return (
    <div className="relative overflow-hidden" style={{ minHeight: '100svh', background: '#0E5F13' }}>
      {/* ── Background video ── */}
      <video
        ref={videoRef}
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 1 }}
      />

      {/* ── Hero section ── */}
      <section
        id="home"
        className="relative z-10 flex flex-col"
        style={{ minHeight: '100svh', overflow: 'visible' }}
      >
        {/* Blurred overlay shape behind content */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 984,
            height: 527,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(14,95,19,0.85)',
            filter: 'blur(82px)',
            opacity: 0.9,
            zIndex: 0,
          }}
        />

        {/* ── Hero content ── */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'General Sans', sans-serif",
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: '-0.024em',
                color: '#F3F6FA',
              }}
            >
              YHAENU{' '}
              <span
                style={{
                  backgroundImage: 'linear-gradient(to left, #ECBD27, #F3F6FA, #ECBD27)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                PLC
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg leading-8 max-w-md mx-auto"
              style={{ color: '#F3F6FA', marginTop: 9, opacity: 0.8 }}
            >
              A family-owned company bridging Ethiopia's potential to the global stage — through trade, manufacturing, and hospitality.
            </motion.p>

            {/* CTA */}
            <motion.a
              href="#rfq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              whileHover={{ scale: 1.04, background: '#ECBD27', color: '#0E5F13' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center rounded-full font-semibold text-sm transition-all"
              style={{
                marginTop: 25,
                padding: '16px 29px',
                background: 'rgba(236,189,39,0.15)',
                border: '1px solid #ECBD27',
                color: '#ECBD27',
                backdropFilter: 'blur(8px)',
              }}
            >
              Request a Quote →
            </motion.a>
          </div>
        </div>

        {/* ── Logo marquee ── */}
        <motion.div
          className="relative z-10 w-full pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="max-w-5xl mx-auto px-6 flex items-center gap-12">
            {/* Static text */}
            <p
              className="text-sm flex-shrink-0 leading-snug"
              style={{ color: 'rgba(243,246,250,0.5)', minWidth: 120 }}
            >
              Relied on by brands<br />across the globe
            </p>

            {/* Scrolling marquee */}
            <div className="flex-1 overflow-hidden">
              <div className="flex gap-16 animate-marquee" style={{ width: 'max-content' }}>
                {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((name, i) => (
                  <LogoItem key={i} name={name} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
