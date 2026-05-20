import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import gsap from 'gsap'
import logoText from '../assets/logo/Logo-Text.svg'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact Us', href: '/contact' },
]

const pathImport = "M66.6218 151.625C67.3516 150.734 68.0659 149.827 68.811 148.951C71.3613 145.94 73.9115 142.929 76.4925 139.941C79.0351 137.007 81.6237 134.111 84.1663 131.184C85.9638 129.118 87.7228 127.021 89.5049 124.947C92.5545 121.398 95.5963 117.841 98.6612 114.3C102.018 110.429 105.406 106.588 108.755 102.709C112.273 98.6301 115.737 94.5205 119.248 90.4416C123.964 84.9571 128.696 79.4955 133.42 74.0263C134.296 73.0124 135.11 71.9523 136.047 70.9998C136.377 70.6618 136.984 70.4544 137.476 70.4391C139.258 70.3699 141.048 70.4083 142.83 70.4083C167.994 70.4083 193.166 70.4083 218.331 70.4083C218.999 70.4083 219.675 70.393 220.343 70.4391C220.705 70.4621 221.066 70.5927 221.419 70.6772C221.273 71.0075 221.181 71.3762 220.973 71.6604C220.313 72.5592 219.606 73.4195 218.922 74.3029C211.433 83.8586 203.944 93.4067 196.454 102.962C192.368 108.178 188.281 113.386 184.187 118.594C179.639 124.378 175.069 130.147 170.529 135.939C166.934 140.525 163.247 145.057 159.852 149.789C158.584 151.555 157.256 151.963 155.251 151.955C126.699 151.901 98.1543 151.916 69.6022 151.909C68.6881 151.909 67.774 151.909 66.8523 151.909C66.7678 151.817 66.6909 151.732 66.6064 151.64L66.6218 151.625Z"
const pathManufacturing = "M233.632 55.706C205.234 55.6753 176.843 55.6753 148.444 55.6753C147.984 55.6753 147.515 55.6369 146.847 55.6061C147.085 55.1683 147.192 54.861 147.377 54.5922C150.203 50.5901 153.023 46.5804 155.865 42.5937C158.814 38.4381 161.787 34.3054 164.745 30.1651C167.756 25.9403 170.751 21.7078 173.747 17.4676C176.336 13.8036 178.901 10.1241 181.49 6.46008C182.819 4.57044 184.148 2.66543 185.554 0.821877C185.838 0.445485 186.422 0.184315 186.906 0.1075C187.62 -0.0154033 188.365 0.0690929 189.102 0.0690929C218.307 0.0690929 247.528 0.0767744 276.74 0.0767744L233.632 55.7137V55.706Z"
const pathTransportation = "M0 0.176666C0.499296 0.130577 0.775829 0.0844883 1.04468 0.0844883C15.4244 0.0537624 29.8041 0.0230365 44.1838 -7.96001e-06C59.0091 -0.0153709 73.8343 -7.96001e-06 88.6596 -7.96001e-06C91.0792 -7.96001e-06 93.4989 -0.0153709 95.9186 0.0921697C96.4256 0.115214 97.0785 0.506969 97.3781 0.92945C102.878 8.81833 108.347 16.7379 113.801 24.6575C116.152 28.0681 118.448 31.5094 120.791 34.92C123.457 38.8068 126.161 42.6629 128.834 46.542C130.731 49.292 132.613 52.042 134.495 54.7996C134.618 54.9763 134.702 55.1837 134.887 55.5294C134.357 55.5755 133.934 55.6446 133.519 55.6446C111.282 55.6446 89.0513 55.6446 66.8135 55.6446C56.7968 55.6446 46.7802 55.6369 36.7635 55.6676C35.7035 55.6676 35.0275 55.3911 34.4361 54.4309C31.3481 49.4226 28.1756 44.4604 25.0186 39.4905C22.9676 36.2719 20.8629 33.0841 18.8119 29.8656C16.9684 26.9697 15.1786 24.043 13.3427 21.1394C11.215 17.7749 9.0795 14.4258 6.92869 11.0767C5.56907 8.96427 4.17104 6.88259 2.8191 4.77019C1.88964 3.31839 1.02164 1.84355 0 0.176666Z"

// Mobile wave
const WAVE_FLAT = 'M0,60 C150,50 300,50 450,60 C600,70 750,70 900,60 C1050,50 1200,50 1350,60 L1440,60 L1440,0 L0,0 Z'
const WAVE_RISE1 = 'M0,50 C150,35 300,40 450,50 C600,60 750,65 900,50 C1050,35 1200,40 1350,50 L1440,50 L1440,0 L0,0 Z'
const WAVE_RISE2 = 'M0,55 C150,45 300,35 450,55 C600,75 750,60 900,55 C1050,45 1200,35 1350,55 L1440,55 L1440,0 L0,0 Z'
const WAVE_SETTLE = 'M0,58 C150,48 300,45 450,58 C600,68 750,68 900,58 C1050,48 1200,45 1350,58 L1440,58 L1440,0 L0,0 Z'

function AnimatedHamburger({ trigger, open }: { trigger: boolean, open: boolean }) {
  const controls = useAnimation()

  useEffect(() => {
    const runAnim = async () => {
      if (open) {
        await controls.start("align")
      } else if (trigger) {
        await controls.start("initial", { duration: 0 })
        await controls.start("compress")
        await controls.start("align")
      } else {
        await controls.start("initial")
      }
    }
    runAnim()
  }, [trigger, open, controls])

  return (
    <svg viewBox="0 0 277 152" className="w-12 h-12 overflow-visible" style={{ pointerEvents: 'none' }}>
      {/* Left Arm (Transportation) - Becomes Top Line */}
      <motion.path d={pathTransportation} fill="#ECBD27"
        style={{ vectorEffect: "non-scaling-stroke", strokeLinecap: "round", strokeLinejoin: "round", stroke: "#ECBD27" }}
        animate={controls}
        variants={{
          initial: { scaleY: 1, scaleX: 1, x: "0%", y: "0%", strokeWidth: 0, originX: 0.5, originY: 0.5 },
          compress: { y: "-40%", scaleY: 0.05, scaleX: 1.1, strokeWidth: 3, transition: { duration: 1.2, ease: "anticipate" } },
          align: { x: "53%", y: "-38%", scaleY: 0.05, scaleX: 1.33, strokeWidth: 6, transition: { duration: 1.2, ease: "backOut" } }
        }}
      />
      {/* Right Arm (Manufacturing) - Becomes Middle Line */}
      <motion.path d={pathManufacturing} fill="#ECBD27"
        style={{ vectorEffect: "non-scaling-stroke", strokeLinecap: "round", strokeLinejoin: "round", stroke: "#ECBD27" }}
        animate={controls}
        variants={{
          initial: { scaleY: 1, scaleX: 1, x: "0%", y: "0%", strokeWidth: 0, originX: 0.5, originY: 0.5 },
          compress: { y: "40%", scaleY: 0.05, scaleX: 1.1, strokeWidth: 3, transition: { duration: 1.2, ease: "anticipate" } },
          align: { x: "-56%", y: "86%", scaleY: 0.05, scaleX: 1.38, strokeWidth: 6, transition: { duration: 1.2, ease: "backOut" } }
        }}
      />
      {/* Bottom Stem (Import) - Becomes Bottom Line */}
      <motion.path d={pathImport} fill="#ECBD27"
        style={{ vectorEffect: "non-scaling-stroke", strokeLinecap: "round", strokeLinejoin: "round", stroke: "#ECBD27" }}
        animate={controls}
        variants={{
          initial: { scaleY: 1, scaleX: 1, x: "0%", y: "0%", strokeWidth: 0, originX: 0.5, originY: 0.5 },
          compress: { y: "40%", scaleY: 0.05, scaleX: 1.0, strokeWidth: 3, transition: { duration: 1.2, ease: "anticipate" } },
          align: { x: "-4%", y: "42%", scaleY: 0.05, scaleX: 1.16, strokeWidth: 6, transition: { duration: 1.2, ease: "backOut" } }
        }}
      />
    </svg>
  )
}

function AnimatedWave() {
  return (
    <motion.svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
      style={{ position: 'absolute', bottom: -60, left: 0, width: '100%', height: 60, display: 'block' }}>
      <motion.path fill="#0E5F13"
        initial={{ d: WAVE_FLAT }}
        animate={{ d: [WAVE_FLAT, WAVE_RISE1, WAVE_RISE2, WAVE_SETTLE] }}
        transition={{ duration: 2, ease: 'easeInOut', times: [0, 0.3, 0.6, 1], repeat: Infinity }}
      />
    </motion.svg>
  )
}


export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [isPastHero, setIsPastHero] = useState(false)
  const lastScrollY = useRef(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const isHomePage = location.pathname === '/'

    const onScroll = () => {
      const current = window.scrollY
      const heroThreshold = window.innerHeight * 1.2 // Threshold past the Hero pinning

      setIsPastHero(current > heroThreshold)

      if (isHomePage && current < heroThreshold) {
        // Keep navbar visible while in or near the Hero section on home page
        setVisible(true)
      } else {
        // Apply hide-on-scroll-down, show-on-scroll-up logic
        if (current > lastScrollY.current + 10 && current > 0) {
          setVisible(false)
        } else if (current < lastScrollY.current - 10 || current <= 0) {
          setVisible(true)
        }
      }
      lastScrollY.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  const isHomePage = location.pathname === '/'
  const shouldHaveBg = isPastHero || !isHomePage

  const [isHeroFinished, setIsHeroFinished] = useState(!isHomePage)

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsHeroFinished(true)
      return
    }
    const handleComplete = () => setIsHeroFinished(true)
    window.addEventListener('hero-animation-complete', handleComplete)

    // Failsafe: if the GSAP animation gets blocked or bypassed on mobile, force the navbar to appear after 4 seconds
    const failsafe = setTimeout(() => setIsHeroFinished(true), 4000)

    return () => {
      window.removeEventListener('hero-animation-complete', handleComplete)
      clearTimeout(failsafe)
    }
  }, [location.pathname])

  useEffect(() => {
    setOpen(false)


    if (location.pathname !== '/') {
      setIsHeroFinished(true)
      // Safety reset for GSAP-modified elements
      const navLeft = document.querySelector('.nav-left')
      const navRight = document.querySelector('.nav-right')
      if (navLeft) gsap.set(navLeft, { clearProps: "x,y,opacity,transform,position,left,right,top,bottom,yPercent" })
      if (navRight) gsap.set(navRight, { clearProps: "x,y,opacity,transform,position,left,right,top,bottom,yPercent" })
      gsap.set('.navbar-container', { clearProps: "maxWidth" })
      gsap.set('.nav-link-0, .nav-link-1, .nav-link-2, .nav-link-3', { clearProps: "x,y,opacity,transform" })
    } else {
      // If going back to home, reset hero finished state so it can animate again
      setIsHeroFinished(false)

      // Explicitly reset navbar elements to their default home-page states
      const navLeft = document.querySelector('.nav-left')
      const navRight = document.querySelector('.nav-right')
      if (navLeft) gsap.set(navLeft, { clearProps: "x,y,opacity,transform,position,left,right,top,bottom,yPercent" })
      if (navRight) gsap.set(navRight, { clearProps: "x,y,opacity,transform,position,left,right,top,bottom,yPercent" })

      // Ensure container starts at full width
      gsap.set('.navbar-container', { maxWidth: 1600, clearProps: "clipPath" })

      // Reset links
      gsap.set('.nav-link-0, .nav-link-1, .nav-link-2, .nav-link-3', { clearProps: "x,y,opacity,transform" })

      // Ensure the Y logo is hidden initially
      gsap.set('.navbar-y-logo', { opacity: 0 })
    }
    setVisible(true)
  }, [location.pathname])


  return (
    <>
      {/* ══════════════════════════════════════════════
          DESKTOP — Rekorder-style floating pill navbar
      ══════════════════════════════════════════════ */}
      <motion.div
        className="hidden md:block fixed top-4 left-0 right-0 z-50 px-4"
        initial={{ y: -120, opacity: 0 }}
        animate={{
          y: (visible && isHeroFinished) ? 0 : -120,
          opacity: (visible && isHeroFinished) ? 1 : 0
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="navbar-container relative flex items-stretch px-8 mx-auto w-full transition-all duration-700 ease-in-out h-[64px]"
          style={{
            background: shouldHaveBg ? '#0E5F13' : 'transparent',
            maxWidth: (isHomePage && isPastHero) ? 720 : 1600,
            backdropFilter: shouldHaveBg ? 'blur(8px)' : 'none',
            clipPath: (isHomePage && isPastHero)
              ? 'polygon(40px 0, 100% 0, calc(100% - 40px) 100%, 0 100%)'
              : 'polygon(24px 0, 100% 0, calc(100% - 24px) 100%, 0 100%)',
          }}
        >
          {/* Brand — far left */}
          <Link
            to="/"
            className="nav-left flex items-center gap-2 z-10"
            style={{ textDecoration: 'none' }}
          >
            <img
              src={logoText}
              alt="YHAENU"
              style={{
                height: 22,
                width: 'auto',
                filter: 'brightness(0) saturate(100%) invert(86%) sepia(43%) saturate(1478%) hue-rotate(345deg) brightness(100%) contrast(92%)'
              }}
            />
          </Link>

          {/* Nav links — centered */}
          <div className="flex-1 flex items-stretch justify-center gap-4 relative">
            {navLinks.map((link, idx) => {
              const isActive = location.pathname === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`nav-link-${idx} relative flex items-center justify-center w-[130px] cursor-pointer z-10 no-underline group`}
                  style={{
                    background: 'transparent',
                    textDecoration: 'none'
                  }}
                >
                  <span
                    className="font-bold uppercase text-[11px] tracking-widest relative z-10 transition-colors duration-300"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      color: isActive ? '#0E5F13' : '#ECBD27',
                      letterSpacing: '0.15em'
                    }}
                  >
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute inset-0 z-0"
                      style={{ 
                        background: '#ECBD27',
                        clipPath: `polygon(${(isHomePage && isPastHero) ? 40 : 24}px 0, 100% 0, calc(100% - ${(isHomePage && isPastHero) ? 40 : 24}px) 100%, 0 100%)`
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* The hidden miniature Y logo, ready to fade in at the end of Hero scroll animation */}
          <div className="navbar-y-logo absolute left-[48%] top-1/2 w-[70px] opacity-0 pointer-events-none z-0" style={{ transform: 'translate(-50%, -50%)' }}>
            <svg viewBox="0 0 277 152" className="w-full h-full">
              <path d={pathImport} fill="#ECBD27" />
              <path d={pathManufacturing} fill="#ECBD27" />
              <path d={pathTransportation} fill="#ECBD27" />
            </svg>
          </div>

          {/* RFQ — far right */}
          <Link
            to="/rfq"
            className="nav-right flex items-center self-center py-3 px-10 cursor-pointer flex-shrink-0 overflow-hidden no-underline bg-white hover:bg-[#ECBD27] transition-colors duration-300 group"
            style={{
              clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
              textDecoration: 'none'
            }}
          >
            <span
              className="font-black uppercase text-[11px] tracking-widest"
              style={{
                fontFamily: "'Arial Black', sans-serif",
                color: '#0E5F13',
                letterSpacing: '0.12em'
              }}
            >
              Get a Quote
            </span>
          </Link>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════
          MOBILE TOP BAR
      ══════════════════════════════════════════════ */}
      <motion.header
        className={`md:hidden fixed top-4 left-0 right-0 ${open ? 'z-[9990]' : 'z-[10000]'} flex items-center justify-center pointer-events-none`}
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: (visible && isHeroFinished) ? 0 : -80,
          opacity: (visible && isHeroFinished) ? 1 : 0
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
          className="w-16 h-16 rounded-full flex items-center justify-center pointer-events-auto border-2 shadow-lg"
          style={{ background: '#0E5F13', borderColor: '#ECBD27' }}
        >
          <AnimatedHamburger trigger={visible && isHeroFinished} open={open} />
        </motion.button>
      </motion.header>

      {/* ══════════════════════════════════════════════
          MOBILE MENU OVERLAY
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9998] bg-black/60 md:hidden backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div key="panel"
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[9999] w-full md:hidden flex flex-col"
              style={{ background: '#F3F6FA', overflow: 'visible' }}
            >
              <AnimatedWave />

              {/* Close Button perfectly overlaid on top of the hamburger button spot */}
              <div className="fixed top-4 left-0 right-0 flex items-center justify-center z-50 pointer-events-none">
                <motion.button onClick={() => setOpen(false)} aria-label="Close menu"
                  whileHover={{ scale: 1.08, rotate: 90 }} whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center border-2 shadow-lg pointer-events-auto"
                  style={{ background: '#0E5F13', borderColor: '#ECBD27' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ECBD27" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>
              </div>
              {/* Elegant Premium Links */}
              <nav className="flex flex-col justify-center flex-1 px-10 gap-8 relative z-10 mt-24 pb-8">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); setOpen(false); navigate(link.href); }}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="block relative overflow-hidden group"
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="flex items-center justify-between border-b border-[#0E5F13]/20 pb-4">
                        <span className="font-medium uppercase tracking-[0.2em] text-2xl"
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                            color: isActive ? '#ECBD27' : '#0E5F13'
                          }}>
                          {link.label}
                        </span>
                        <motion.span
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#ECBD27' : '#0E5F13'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </motion.span>
                      </div>
                      {/* Active Indicator Line */}
                      {isActive && (
                        <motion.div
                          layoutId="mobile-premium-indicator"
                          className="absolute bottom-0 left-0 h-[2px] bg-[#ECBD27]"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.6, ease: "circOut" }}
                        />
                      )}
                    </motion.a>
                  );
                })}
                <motion.a href="/rfq" onClick={() => { setOpen(false); navigate('/rfq') }}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="flex items-center justify-center gap-2 w-full font-black uppercase tracking-wide py-8 text-base shadow-md mt-4 relative top-40"
                  style={{
                    fontFamily: "'Arial Black', sans-serif",
                    background: '#0E5F13',
                    color: '#ECBD27',
                    border: '2px solid #ECBD27',
                    textDecoration: 'none',
                    clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)'
                  }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Request a Quote →
                </motion.a>
              </nav>

              <div className="h-1 w-full bg-[#ECBD27] relative z-10" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
