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
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const slideDir = useRef(1)

  const centerY = useRef(0)
  const dragStart = useRef<{ y: number; currentY: number } | null>(null)
  const isDragging = useRef(false)
  const isWheeling = useRef(false)
  const isHovered = useRef(false)
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const snapTween = useRef<gsap.core.Tween | null>(null)

  useGSAP(() => {
    // ── Auto Scroll Carousel ──
    let timeout: ReturnType<typeof setTimeout> | null = null

    const nextSlide = () => {
      if (!isDragging.current && !isWheeling.current && !isHovered.current) {
        const currentY = centerY.current
        const targetY = Math.round(currentY / CARD_STEP) * CARD_STEP - CARD_STEP
        
        if (snapTween.current) snapTween.current.kill()
        const proxy = { y: currentY }
        snapTween.current = gsap.to(proxy, {
          y: targetY,
          duration: 1.2,
          ease: 'power2.inOut',
          onUpdate: () => updatePosition(proxy.y),
          onComplete: () => {
            timeout = setTimeout(nextSlide, 3500)
          }
        })
      } else {
        timeout = setTimeout(nextSlide, 1000)
      }
    }

    timeout = setTimeout(nextSlide, 3500)

    return () => {
      if (timeout) clearTimeout(timeout)
      if (snapTween.current) snapTween.current.kill()
    }
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

    setActiveIdx(prev => finalIdx !== prev ? finalIdx : prev)
  }

  useEffect(() => {
    // Center the second item of the middle set (index 5)
    const targetIdx = baseServices.length + 1
    const initialY = -(targetIdx * CARD_STEP) + (window.innerHeight / 2) - (CARD_H / 2)
    updatePosition(initialY)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    if (snapTween.current) snapTween.current.kill()
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
    const currentY = centerY.current
    const targetY = Math.round(currentY / CARD_STEP) * CARD_STEP
    
    if (snapTween.current) snapTween.current.kill()
    const proxy = { y: currentY }
    snapTween.current = gsap.to(proxy, {
      y: targetY,
      duration: 0.7,
      ease: 'power4.out',
      onUpdate: () => updatePosition(proxy.y)
    })
  }

  const onWheel = (e: React.WheelEvent) => {
    if (snapTween.current) snapTween.current.kill()
    isWheeling.current = true
    updatePosition(centerY.current - e.deltaY * 0.5)

    if (wheelTimeout.current) clearTimeout(wheelTimeout.current)
    wheelTimeout.current = setTimeout(() => {
      isWheeling.current = false
      const currentY = centerY.current
      const targetY = Math.round(currentY / CARD_STEP) * CARD_STEP
      
      const proxy = { y: currentY }
      snapTween.current = gsap.to(proxy, {
        y: targetY,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => updatePosition(proxy.y)
      })
    }, 200)
  }

  const mobileNavigate = (dir: 1 | -1) => {
    slideDir.current = dir
    const targetY = centerY.current - dir * CARD_STEP
    if (snapTween.current) snapTween.current.kill()
    const proxy = { y: centerY.current }
    snapTween.current = gsap.to(proxy, {
      y: targetY,
      duration: 0.7,
      ease: 'power4.out',
      onUpdate: () => updatePosition(proxy.y)
    })
  }

  const mobileGoTo = (targetIdx: number) => {
    const forward = (targetIdx - activeIdx + baseServices.length) % baseServices.length
    const backward = (activeIdx - targetIdx + baseServices.length) % baseServices.length
    const steps = forward <= backward ? forward : -backward
    if (steps === 0) return
    slideDir.current = steps > 0 ? 1 : -1
    const targetY = centerY.current - steps * CARD_STEP
    if (snapTween.current) snapTween.current.kill()
    const proxy = { y: centerY.current }
    snapTween.current = gsap.to(proxy, {
      y: targetY,
      duration: 0.7,
      ease: 'power4.out',
      onUpdate: () => updatePosition(proxy.y)
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
            key={activeIdx}
            className="absolute inset-x-0 top-4 bottom-4"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <img
              src={baseServices[activeIdx].bg}
              alt=""
              className="w-full h-full object-cover brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── CENTER: Diagonal Strip ── */}
      <div
        className="absolute left-[67%] inset-y-0 z-40 flex items-center pointer-events-none"
        style={{ width: CARD_W, transform: 'translateX(-50%)' }}
      >
        <div className="w-full h-full overflow-visible">
          <div ref={stripRef} className="will-change-transform">
            {services.map((s, i) => {
              const isActive = (i % baseServices.length) === activeIdx
              const xOffset = i * X_SLOPE

              return (
                <div
                  key={i}
                  ref={el => { cardRefs.current[i] = el }}
                  className={`relative mb-[12px] transition-all duration-700 ease-out pointer-events-auto cursor-grab active:cursor-grabbing
                    ${isActive ? 'opacity-100 scale-105 z-10' : 'opacity-100 scale-90 blur-[3px]'}`}
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    transform: `translateX(${xOffset}px)`,
                    clipPath: 'polygon(23.5% 0%, 100% 0%, 76.5% 100%, 0% 100%)'
                  }}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  onWheel={onWheel}
                  onMouseEnter={() => { isHovered.current = true }}
                  onMouseLeave={() => { isHovered.current = false }}
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
            key={activeIdx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="w-full flex flex-col items-center text-center relative left-8"
          >
            <div className="mb-6">
              <span className="px-6 py-2 border border-[#ECBD27]/30 rounded-full text-[#ECBD27] font-mono text-[10px] font-bold tracking-[0.4em] uppercase bg-[#ECBD27]/5 backdrop-blur-sm">
                {baseServices[activeIdx].badge}
              </span>
            </div>

            <h2 className="text-4xl font-black text-[#0E5F13] leading-[1] mb-6 uppercase tracking-tighter max-w-[300px]">
              {baseServices[activeIdx].title}
            </h2>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 max-w-[280px] font-medium">
              {baseServices[activeIdx].desc}
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

      {/* ── MOBILE SERVICES LAYOUT (hidden on desktop) ── */}
      <div className="absolute inset-0 md:hidden z-[60] overflow-hidden bg-white">

        {/* Full-bleed animated background with slide transition */}
        <AnimatePresence mode="wait" custom={slideDir.current}>
          <motion.div
            key={activeIdx}
            custom={slideDir.current}
            variants={{
              enter: (dir: number) => ({ x: dir * 100 + '%', opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({ x: -dir * 100 + '%', opacity: 0 })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <img
              src={baseServices[activeIdx].bg}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.3) saturate(1.3)' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Brand green tint */}
        <div className="absolute inset-0 bg-[#0E5F13]/30 pointer-events-none" />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

        {/* Yellow left accent stripe */}
        <div className="absolute left-0 top-[12%] bottom-[12%] w-[3px] bg-[#ECBD27]" />

        {/* Top row: counter only */}
        <div className="absolute top-10 left-8 right-6 flex justify-between items-start z-10">
          <div className="flex flex-col">
            <span
              className="text-[#ECBD27] font-black leading-[0.85]"
              style={{ fontFamily: "'Arial Black', sans-serif", fontSize: '3.8rem' }}
            >
              {String(activeIdx + 1).padStart(2, '0')}
            </span>
            <span className="text-white/30 text-[8px] tracking-[0.4em] uppercase font-mono mt-1">
              /{String(baseServices.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Prev / Next nav arrows */}
        <button
          onClick={() => mobileNavigate(-1)}
          aria-label="Previous service"
          className="absolute left-3 top-[54%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => mobileNavigate(1)}
          aria-label="Next service"
          className="absolute right-3 top-[54%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-12 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: 'circOut' }}
            >
              {/* Badge line */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#ECBD27]" />
                <span
                  className="text-[#ECBD27] text-[8px] font-bold tracking-[0.4em] uppercase"
                  style={{ fontFamily: 'monospace' }}
                >
                  {baseServices[activeIdx].badge}
                </span>
              </div>

              {/* Title */}
              <h2
                className="text-white uppercase leading-[0.9] mb-4"
                style={{
                  fontFamily: "'Arial Black', sans-serif",
                  fontSize: 'clamp(2rem, 9vw, 2.8rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                }}
              >
                {baseServices[activeIdx].title}
              </h2>

              {/* Description */}
              <p className="text-white/60 text-[12.5px] leading-relaxed mb-6 max-w-[290px]">
                {baseServices[activeIdx].desc}
              </p>

              {/* CTA + dots row */}
              <div className="flex items-center justify-between">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-7 py-3 bg-[#ECBD27] text-[#0E5F13] font-black text-[8.5px] uppercase tracking-[0.22em]"
                  style={{ clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0% 100%)' }}
                >
                  Explore
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <div className="flex items-center gap-2">
                  {baseServices.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => mobileGoTo(i)}
                      aria-label={`Service ${i + 1}`}
                      className={`transition-all duration-300 rounded-full ${
                        i === activeIdx ? 'w-6 h-[3px] bg-[#ECBD27]' : 'w-[5px] h-[5px] bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

