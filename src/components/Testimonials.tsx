import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    quote:
      "YHAENU PLC has been our most reliable trade partner for over a decade. Their efficiency in handling import logistics is unmatched — they always deliver on time and with full transparency.",
    name: 'Abebe Girma',
    title: 'CEO — Addis Trading Co.',
    avatar: '/testimonial.png',
  },
  {
    id: 2,
    quote:
      "The carton packaging we source from YHAENU meets every international standard we require. Their manufacturing quality is consistent and their team is incredibly professional.",
    name: 'Sara Tesfaye',
    title: 'Procurement Manager — EthioExport Ltd.',
    avatar: '/testimonial2.png',
  },
]

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })

  const cardY = useTransform(scrollYProgress, [0, 1], [60, 0])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const cardScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])

  return (
    <motion.div
      ref={ref}
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{
        y: cardY,
        opacity: cardOpacity,
        scale: cardScale,
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background with gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(236,189,39,0.15) 0%, rgba(14,95,19,0.1) 100%)',
          border: '1px solid rgba(236,189,39,0.3)',
        }}
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(236,189,39,0.25) 0%, rgba(14,95,19,0.15) 100%)',
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative p-8 md:p-10 h-full flex flex-col justify-between min-h-[320px]">
        {/* Top: Avatar and stars */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="rounded-full overflow-hidden shadow-lg"
              style={{
                width: 80,
                height: 80,
                border: '3px solid #ECBD27',
              }}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Stars */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#ECBD27"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <polygon points="12 2 15.09 10.26 24 10.26 17.55 16.52 19.64 24.78 12 18.52 4.36 24.78 6.45 16.52 0 10.26 8.91 10.26" />
              </motion.svg>
            ))}
          </div>
        </div>

        {/* Middle: Quote */}
        <motion.p
          className="text-base leading-relaxed mb-6 flex-grow"
          style={{ color: '#F3F6FA' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          "{t.quote}"
        </motion.p>

        {/* Bottom: Name and title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p
            className="font-black text-sm uppercase tracking-wide"
            style={{ color: '#ECBD27', fontFamily: "'Arial Black', sans-serif" }}
          >
            {t.name}
          </p>
          <p className="text-xs mt-1" style={{ color: 'rgba(243,246,250,0.6)' }}>
            {t.title}
          </p>
        </motion.div>
      </div>

      {/* Animated border on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          border: '2px solid #ECBD27',
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden py-28"
      style={{ background: '#0E5F13' }}
    >
      {/* Parallax blobs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute"
          style={{
            top: '5%',
            left: '-15%',
            width: '55%',
            height: '55%',
            background: 'radial-gradient(ellipse, rgba(236,189,39,0.07) 0%, transparent 65%)',
            borderRadius: '50%',
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '5%',
            right: '-10%',
            width: '45%',
            height: '45%',
            background: 'radial-gradient(ellipse, rgba(236,189,39,0.05) 0%, transparent 65%)',
            borderRadius: '50%',
          }}
        />
      </motion.div>

      <div className="relative z-10 w-full px-6">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#ECBD27]" />
            <span
              className="text-[#ECBD27] text-xs tracking-[0.4em] uppercase font-bold"
              style={{ fontFamily: 'monospace' }}
            >
              Testimonials
            </span>
            <span className="h-[2px] w-8 bg-[#ECBD27]" />
          </div>
         
         
        </motion.div>

        {/* ── Grid Layout ── */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

