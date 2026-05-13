import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

// Asset imports
import exportImg from '../assets/about/export.jpg'
import importImg from '../assets/about/import.jpg'
import manufacturingImg from '../assets/about/manufacturing.jpg'
import transportationImg from '../assets/about/transportation.jpg'
import hospitalityImg from '../assets/about/hospitality.jpg'

gsap.registerPlugin(ScrollTrigger)

const baseServices = [
  {
    id: 1,
    badge: 'Import & Export',
    title: 'Global Trade Solutions',
    desc: 'Facilitating the movement of goods with efficiency, reliability, and market insight across local and international markets.',
    thumb: exportImg,
    bg: importImg,
  },
  {
    id: 2,
    badge: 'Manufacturing',
    title: 'Precision Production',
    desc: 'Producing quality cardboard and carton products that meet global standards with precision and care.',
    thumb: manufacturingImg,
    bg: manufacturingImg,
  },
  {
    id: 3,
    badge: 'Transportation',
    title: 'Reliable Logistics',
    desc: 'Providing reliable vehicles to help customers transport goods, making logistics seamless and dependable.',
    thumb: transportationImg,
    bg: transportationImg,
  },
  {
    id: 4,
    badge: 'Hospitality',
    title: 'Premium Experience',
    desc: 'South Star International Hotel in Hawassa offers memorable experiences through modern and welcoming hotel operations.',
    thumb: hospitalityImg,
    bg: hospitalityImg,
  },
]

const services = [...baseServices, ...baseServices, ...baseServices]

const CARD_H = 190
const CARD_W = 340
const CARD_GAP = 12
const CARD_STEP = CARD_H + CARD_GAP
const TOTAL_HEIGHT = baseServices.length * CARD_STEP
const X_SLOPE = -85

export default function Services() {
  // Start with the second item of the second set (index 5)
  const [activeIdx, setActiveIdx] = useState(baseServices.length + 1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const centerY = useRef(0)
  const dragStart = useRef<{ y: number; currentY: number } | null>(null)
  const isDragging = useRef(false)

  // ── Entrance Animation ──
  useGSAP(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      gsap.set(card, { y: i % 2 === 0 ? -1200 : 1200, opacity: 0 })
    })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      onEnter: () => {
        cardRefs.current.forEach((card, i) => {
          if (!card) return
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 1.8,
            delay: i * 0.04,
            ease: 'expo.out',
          })
        })
      },
      once: true
    })
  }, { scope: sectionRef })

  const updatePosition = (y: number) => {
    let wrappedY = y
    if (y > 0) wrappedY = y - TOTAL_HEIGHT
    if (y < -TOTAL_HEIGHT * 2) wrappedY = y + TOTAL_HEIGHT

    centerY.current = wrappedY
    const currentX = wrappedY * (X_SLOPE / CARD_STEP)
    gsap.set(stripRef.current, { y: wrappedY, x: currentX })

    const centerPoint = -wrappedY + (window.innerHeight / 2) - (CARD_H / 2)
    const rawIdx = Math.round(centerPoint / CARD_STEP)
    const normalizedIdx = rawIdx % baseServices.length
    const finalIdx = normalizedIdx < 0 ? normalizedIdx + baseServices.length : normalizedIdx

    if (finalIdx !== (activeIdx % baseServices.length)) {
      setActiveIdx(rawIdx)
    }
  }

  useEffect(() => {
    // Center the second item of the middle set (index 5)
    const targetIdx = baseServices.length + 1
    const initialY = -(targetIdx * CARD_STEP) + (window.innerHeight / 2) - (CARD_H / 2)
    updatePosition(initialY)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    dragStart.current = { y: e.clientY, currentY: centerY.current }
      ; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !dragStart.current) return
    const delta = e.clientY - dragStart.current.y
    updatePosition(dragStart.current.currentY + delta)
  }

  const onPointerUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    const targetY = Math.round(centerY.current / CARD_STEP) * CARD_STEP
    const targetX = targetY * (X_SLOPE / CARD_STEP)
    gsap.to(stripRef.current, {
      y: targetY,
      x: targetX,
      duration: 0.7,
      ease: 'power4.out',
      onUpdate: () => {
        centerY.current = gsap.getProperty(stripRef.current, "y") as number
      }
    })
  }

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative w-full h-[100vh] bg-white overflow-hidden flex items-stretch select-none"
    >
      {/* ── LEFT: Representation ── */}
      <div
        className="relative w-[60%] h-full overflow-hidden"
        style={{
          clipPath: `polygon(0 0, 100% 0, calc(100% + ${100 * (X_SLOPE / CARD_STEP)}vh) 100%, 0 100%)`
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx % baseServices.length}
            className="absolute inset-x-0 top-4 bottom-4"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <img
              src={services[activeIdx % services.length].bg}
              alt=""
              className="w-full h-full object-cover brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── CENTER: Diagonal Strip ── */}
      <div
        className="absolute left-[67%] inset-y-0 z-40 flex items-center"
        style={{ width: CARD_W, transform: 'translateX(-50%)' }}
      >
        <div
          className="w-full h-full overflow-visible"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div ref={stripRef} className="cursor-grab active:cursor-grabbing will-change-transform">
            {services.map((s, i) => {
              const isActive = activeIdx === i
              const xOffset = i * X_SLOPE

              return (
                <div
                  key={i}
                  ref={el => { cardRefs.current[i] = el }}
                  className={`relative mb-[12px] transition-all duration-700 ease-out 
                    ${isActive ? 'opacity-100 scale-105' : 'opacity-10 scale-90 blur-[1.5px]'}`}
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    transform: `translateX(${xOffset}px)`,
                    clipPath: 'polygon(23.5% 0%, 100% 0%, 76.5% 100%, 0% 100%)'
                  }}
                >
                  <img src={s.thumb} alt="" className="w-full h-full object-cover pointer-events-none" />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Info Panel ── */}
      <div className="flex-1 bg-white h-full flex flex-col items-center justify-center px-12 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx % baseServices.length}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="w-full flex flex-col items-center text-center relative left-8"
          >
            <div className="mb-6">
              <span className="px-6 py-2 border border-[#ECBD27]/30 rounded-full text-[#ECBD27] font-mono text-[10px] font-bold tracking-[0.4em] uppercase bg-[#ECBD27]/5 backdrop-blur-sm">
                {services[activeIdx % services.length].badge}
              </span>
            </div>

            <h2 className="text-4xl font-black text-[#0E5F13] leading-[1] mb-6 uppercase tracking-tighter max-w-[300px]">
              {services[activeIdx % services.length].title}
            </h2>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 max-w-[280px] font-medium">
              {services[activeIdx % services.length].desc}
            </p>

            <a
              href="#contact"
              className="group relative inline-flex items-center gap-4 px-12 py-5 bg-[#0E5F13] text-white font-bold uppercase tracking-[0.2em] text-[9px]
                         hover:bg-[#ECBD27] hover:text-[#0E5F13] transition-all duration-500 shadow-lg shadow-[#0E5F13]/10"
              style={{ clipPath: 'polygon(12% 0, 100% 0, 88% 100%, 0% 100%)' }}
            >
              Explore Solutions
              <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
