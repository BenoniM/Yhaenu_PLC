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
  const [lastActive, setLastActive] = useState<number | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleSetActive = (idx: number) => {
    setLastActive(active)
    setActive(idx)
  }

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  const next = () => handleSetActive((active + 1) % services.length)
  const back = () => handleSetActive((active - 1 + services.length) % services.length)

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(next, 10000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [active])

  // Calculate card order — active card on top, rest stacked behind
  const getCardIndex = (i: number) => {
    if (i === active) return 10
    if (i === lastActive) return 20
    if (i === (active + 1) % services.length) return 5
    return 0
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
          const zIndex = getCardIndex(i)

          return (
            <motion.div
              key={s.id}
              className="absolute inset-0 mx-4 md:mx-10 rounded-[32px] overflow-hidden cursor-pointer"
              style={{ zIndex }}
              animate={{
                scale: isActive ? 1 : i === lastActive ? 1.35 : isBehind1 ? 0.94 : 0.9,
                y: isActive ? 0 : i === lastActive ? 0 : isBehind1 ? -30 : -40,
                opacity: isActive ? 1 : i === lastActive ? 0 : isBehind1 ? 0.7 : 0,
                rotateX: isActive ? 0 : i === lastActive ? 0 : isBehind1 ? -3 : -5,
                filter: isActive
                  ? 'grayscale(0) brightness(1)'
                  : i === lastActive
                    ? 'grayscale(1) brightness(1)'
                    : 'grayscale(0) brightness(0.85)',
              }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => !isActive && handleSetActive(i)}
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

              {/* Border Progress — only show on active */}
              {isActive && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-[101]">
                  <motion.rect
                    x="2"
                    y="2"
                    width="calc(100% - 4px)"
                    height="calc(100% - 4px)"
                    rx="30"
                    fill="none"
                    stroke="#ECBD27"
                    strokeWidth="4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: { duration: 10, ease: "linear" },
                      opacity: { duration: 0.3 }
                    }}
                  />
                </svg>
              )}


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

        <button
          onClick={back}
          aria-label="Previous"
          className="absolute left-2 md:left-[-100px] top-1/2 -translate-y-1/2 z-[100] w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg"
          style={{ background: '#0E5F13' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-2 md:right-[-100px] top-1/2 -translate-y-1/2 z-[100] w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg"
          style={{ background: '#0E5F13' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex items-center justify-center gap-6 mt-8 px-6">
        {services.map((item, i) => (
          <button
            key={item.id}
            onClick={() => handleSetActive(i)}
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

