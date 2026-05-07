import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Hls from 'hls.js'

const HLS_SRC = 'https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8'
const PAUSE_AT = 4 // seconds — pause here and hold as a still frame

export default function Hero() {
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
          video.play().catch(() => {})
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = HLS_SRC
        video.play().catch(() => {})
      }
    }

    // Pause at the target frame and hold it as a still image
    const handleTimeUpdate = () => {
      if (video.currentTime >= PAUSE_AT) {
        video.pause()
        video.currentTime = PAUSE_AT
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
    <div className="relative overflow-hidden" style={{ minHeight: '100svh', background: '#0E5F13' }}>
      {/* ── Background video (pauses at PAUSE_AT seconds) ── */}
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
              href="/rfq"
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
      </section>
    </div>
  )
}
