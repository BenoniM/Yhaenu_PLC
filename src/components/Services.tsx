import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const services = [
  {
    id: 1,
    num: '01',
    badge: 'Import & Export',
    title: 'Trade is in the air',
    desc: 'Facilitating the movement of goods with efficiency, reliability, and market insight across local and international markets.',
    image: '/products1.jpeg',
  },
  {
    id: 2,
    num: '02',
    badge: 'Manufacturing',
    title: 'Quality is in the air',
    desc: 'Producing quality cardboard and carton products that meet global standards with precision and care.',
    image: '/products2.jpeg',
  },
  {
    id: 3,
    num: '03',
    badge: 'Transportation',
    title: 'Motion is in the air',
    desc: 'Providing reliable vehicles to help customers transport goods, making logistics seamless and dependable.',
    image: '/products3.jpeg',
  },
  {
    id: 4,
    num: '04',
    badge: 'Hospitality',
    title: 'Warmth is in the air',
    desc: 'South Star International Hotel in Hawassa offers memorable experiences through modern and welcoming hotel operations.',
    image: '/products4.jpeg',
  },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  const next = () => setActive((active + 1) % services.length)
  const back = () => setActive((active - 1 + services.length) % services.length)

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(next, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [active])

  // Calculate card order — active card on top, rest stacked behind
  const getCardIndex = (i: number) => {
    if (i === active) return services.length - 1 // front
    if (i === (active + 1) % services.length) return services.length - 2 // 1st behind
    if (i === (active + 2) % services.length) return services.length - 3 // 2nd behind
    return 0 // rest hidden
  }

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative overflow-hidden"
      style={{ background: '#F3F6FA', paddingTop: '6rem', paddingBottom: '6rem' }}
    >
      {/* ── Header ── */}
      <motion.div style={{ y: headerY, opacity: headerOpacity }} className="text-center mb-10 px-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-[2px] w-8 bg-[#ECBD27]" />
          <span className="text-[#ECBD27] text-xs tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'monospace' }}>
            What We Do
          </span>
          <span className="h-[2px] w-8 bg-[#ECBD27]" />
        </div>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="font-black uppercase leading-none"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              color: '#0E5F13',
              letterSpacing: '-0.02em',
            }}
          >
            Our Services
          </motion.h2>
        </div>
      </motion.div>

      {/* ── Stacked cards container ── */}
      <div className="relative mx-auto" style={{ maxWidth: 1100, height: '70vh', minHeight: 500, perspective: 1200 }}>
        {services.map((s, i) => {
          const isActive = i === active
          const isBehind1 = i === (active + 1) % services.length
          const isBehind2 = i === (active + 2) % services.length
          const zIndex = getCardIndex(i)

          return (
            <motion.div
              key={s.id}
              className="absolute inset-0 mx-4 md:mx-10 rounded-[32px] overflow-hidden cursor-pointer"
              style={{ zIndex }}
              animate={{
                scale: isActive ? 1 : isBehind1 ? 0.94 : isBehind2 ? 0.88 : 0.82,
                y: isActive ? 0 : isBehind1 ? -30 : isBehind2 ? -60 : -90,
                opacity: isActive ? 1 : isBehind1 ? 0.7 : isBehind2 ? 0.4 : 0,
                rotateX: isActive ? 0 : isBehind1 ? -3 : isBehind2 ? -6 : -9,
                filter: isActive ? 'brightness(1)' : 'brightness(0.85)',
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => !isActive && setActive(i)}
            >
              {/* Background image */}
              <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(10,18,40,0.88) 0%, rgba(10,18,40,0.3) 50%, rgba(10,18,40,0.1) 100%)',
                }}
              />
        

              {/* Top-left badge — only show on active */}
              {isActive && (
                <motion.div
                  className="absolute top-8 left-8 flex items-center gap-3"
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span
                    className="font-black text-[#ECBD27]"
                    style={{ fontFamily: "'Arial Black', sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em' }}
                  >
                    {s.num}
                  </span>
                  <span className="h-[1px] w-6 bg-[#ECBD27]" />
                  <span className="text-[#F3F6FA]/70 text-xs tracking-widest uppercase" style={{ fontFamily: 'monospace' }}>
                    {s.badge}
                  </span>
                </motion.div>
              )}

              {/* Bottom content — only show on active */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center px-8 pb-10">
                  <motion.p
                    className="text-[#F3F6FA]/60 text-xs tracking-widest uppercase mb-2"
                    style={{ fontFamily: 'monospace' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                  >
                    {s.badge}
                  </motion.p>

                  <motion.h3
                    className="font-bold text-[#F3F6FA] mb-3"
                    style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', lineHeight: 1.15 }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32, duration: 0.55 }}
                  >
                    {s.title}
                  </motion.h3>

                  <motion.p
                    className="text-[#F3F6FA]/70 text-sm max-w-md leading-relaxed mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {s.desc}
                  </motion.p>

                  <motion.a
                    href="#rfq"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.45 }}
                    whileHover={{ scale: 1.05, backgroundColor: '#ECBD27', color: '#0E5F13', borderColor: '#ECBD27' }}
                    whileTap={{ scale: 0.97 }}
                    className="px-7 py-2 rounded-full text-sm font-bold border border-[#F3F6FA]/50 text-[#F3F6FA]"
                    style={{ backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.1)', transition: 'all 0.2s' }}
                  >
                    Learn More
                  </motion.a>
                </div>
              )}
            </motion.div>
          )
        })}

        {/* ── Progress bar — top of active card ── */}
        <div
          className="absolute left-4 right-4 md:left-10 md:right-10 top-0 h-[3px] rounded-full overflow-hidden z-[101]"
          style={{ background: 'rgba(243,246,250,0.2)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: '#ECBD27' }}
            key={active}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
          />
        </div>
        <button
          onClick={back}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-[100] w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: 'rgba(243,246,250,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(243,246,250,0.2)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F3F6FA" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-[100] w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: 'rgba(243,246,250,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(243,246,250,0.2)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F3F6FA" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex items-center justify-center gap-6 mt-8 px-6">
        {services.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setActive(i)}
            className="group flex flex-col items-center gap-2 focus:outline-none"
            aria-label={`Go to ${item.badge}`}
          >
            <motion.div
              className="rounded-xl overflow-hidden"
              animate={{
                width: active === i ? 80 : 56,
                height: active === i ? 52 : 36,
                opacity: active === i ? 1 : 0.45,
                boxShadow: active === i ? '0 4px 16px rgba(236,189,39,0.4)' : 'none',
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={item.image} alt={item.badge} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              className="rounded-full"
              animate={{
                width: active === i ? 24 : 6,
                height: 4,
                background: active === i ? '#ECBD27' : '#0E5F13',
                opacity: active === i ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>

      
    </section>
  )
}

