import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home',       href: '/'         },
  { label: 'About Us',   href: '/about'    },
  { label: 'Products',   href: '/products' },
  { label: 'Contact Us', href: '/contact'  },
]

// Mobile wave
const WAVE_FLAT   = 'M0,60 C150,50 300,50 450,60 C600,70 750,70 900,60 C1050,50 1200,50 1350,60 L1440,60 L1440,0 L0,0 Z'
const WAVE_RISE1  = 'M0,50 C150,35 300,40 450,50 C600,60 750,65 900,50 C1050,35 1200,40 1350,50 L1440,50 L1440,0 L0,0 Z'
const WAVE_RISE2  = 'M0,55 C150,45 300,35 450,55 C600,75 750,60 900,55 C1050,45 1200,35 1350,55 L1440,55 L1440,0 L0,0 Z'
const WAVE_SETTLE = 'M0,58 C150,48 300,45 450,58 C600,68 750,68 900,58 C1050,48 1200,45 1350,58 L1440,58 L1440,0 L0,0 Z'

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

function FlipWord({ label, href, onClick, delay = 0 }: {
  label: string; href: string; onClick: () => void; delay?: number
}) {
  const navigate = useNavigate()
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClick()
    navigate(href)
  }
  return (
    <motion.a href={href} onClick={handleClick}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hovered" className="cursor-pointer select-none" style={{ textDecoration: 'none' }}>
      <span className="flex flex-wrap">
        {label.split('').map((char, i) => (
          <motion.span key={i} className="inline-block font-black uppercase"
            style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 'clamp(1.4rem, 5vw, 2rem)', color: '#0E5F13' }}
            variants={{ hovered: { color: '#ECBD27', scale: 1.05 } }}
            transition={{ duration: 0.3, delay: i * 0.02 }}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </motion.a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      if (current < 80) {
        setVisible(true)
      } else if (current > lastScrollY.current + 8) {
        // scrolling down
        setVisible(false)
      } else if (current < lastScrollY.current - 8) {
        // scrolling up
        setVisible(true)
      }
      lastScrollY.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setVisible(true)
  }, [location.pathname])

  const handleNav = (href: string) => {
    navigate(href)
  }

  return (
    <>
      {/* ══════════════════════════════════════════════
          DESKTOP — Rekorder-style floating pill navbar
      ══════════════════════════════════════════════ */}
      <motion.div
        className="hidden md:block fixed top-4 left-0 right-0 z-50 px-6"
        animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="flex items-center px-3 py-2 rounded-2xl mx-auto"
          style={{
            background: '#0E5F13',
            border: '1px solid rgba(236,189,39,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            maxWidth: 860,
          }}
        >
          {/* Logo — far left */}
          <motion.button
            onClick={() => handleNav('/')}
            className="flex items-center px-3 py-1 rounded-xl flex-shrink-0 mr-4"
            whileHover={{ background: 'rgba(236,189,39,0.1)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <img src="/logo.png" alt="YHAENU PLC" style={{ height: 30, width: 'auto', objectFit: 'contain' }} />
          </motion.button>

          {/* Nav links — centered (flex-1 + justify-center) */}
          <div className="flex-1 flex items-center justify-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href
              return (
                <motion.button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="relative flex flex-col items-center gap-[3px] px-5 py-2 rounded-xl cursor-pointer"
                  style={{
                    background: isActive ? '#ECBD27' : 'transparent',
                    minWidth: 90,
                  }}
                  whileHover={{ background: isActive ? '#ECBD27' : 'rgba(236,189,39,0.12)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="block rounded-full" style={{ width: 5, height: 5, background: isActive ? '#0E5F13' : '#ECBD27', opacity: isActive ? 1 : 0.6 }} />
                  <span
                    className="font-black uppercase text-[10px] tracking-widest"
                    style={{ fontFamily: "'Arial Black', sans-serif", color: isActive ? '#0E5F13' : 'rgba(243,246,250,0.85)', letterSpacing: '0.12em' }}
                  >
                    {link.label}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* RFQ — far right */}
          <motion.button
            onClick={() => handleNav('/rfq')}
            className="flex flex-col items-center gap-[3px] px-5 py-2 rounded-xl cursor-pointer flex-shrink-0 ml-4"
            style={{
              background: location.pathname === '/rfq' ? '#ECBD27' : 'rgba(236,189,39,0.15)',
              border: '1px solid rgba(236,189,39,0.4)',
              minWidth: 110,
            }}
            whileHover={{ background: '#ECBD27', scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            <span className="block rounded-full" style={{ width: 5, height: 5, background: '#ECBD27' }} />
            <span
              className="font-black uppercase text-[10px] tracking-widest"
              style={{ fontFamily: "'Arial Black', sans-serif", color: location.pathname === '/rfq' ? '#0E5F13' : '#ECBD27', letterSpacing: '0.1em' }}
            >
              Get a Quote
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════
          MOBILE TOP BAR
      ══════════════════════════════════════════════ */}
      <motion.header
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5"
        style={{ height: 60, background: 'rgba(14,95,19,0.96)', backdropFilter: 'blur(12px)' }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src="/logo.png" alt="YHAENU PLC" style={{ height: 30, width: 'auto', objectFit: 'contain' }} />
        <motion.button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[5px]"
          style={{ background: 'rgba(236,189,39,0.15)', border: '1px solid rgba(236,189,39,0.3)' }}
        >
          <span className="block w-4 h-[2px] rounded-full bg-[#ECBD27]" />
          <span className="block w-4 h-[2px] rounded-full bg-[#ECBD27]" />
          <span className="block w-3 h-[2px] rounded-full bg-[#ECBD27]" />
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
              className="fixed inset-0 z-[99] bg-black/50 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div key="panel"
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-full md:hidden flex flex-col"
              style={{ background: '#F3F6FA', overflow: 'visible' }}
            >
              <AnimatedWave />

              {/* Close */}
              <div className="flex items-center justify-between px-6 py-4 relative z-10">
                <img src="/logo.png" alt="YHAENU PLC" style={{ height: 30, width: 'auto', objectFit: 'contain' }} />
                <motion.button onClick={() => setOpen(false)} aria-label="Close menu"
                  whileHover={{ scale: 1.08, rotate: 90 }} whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-[#0E5F13] flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F3F6FA" strokeWidth="3" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>
              </div>

              {/* Links */}
              <nav className="flex flex-col justify-center flex-1 px-8 gap-6 relative z-10">
                {navLinks.map((link, i) => (
                  <FlipWord key={link.href} label={link.label} href={link.href}
                    onClick={() => setOpen(false)} delay={0.05 + i * 0.07} />
                ))}
                <motion.a href="/rfq" onClick={() => { setOpen(false); navigate('/rfq') }}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="inline-flex items-center gap-2 self-start font-black uppercase tracking-wide px-6 py-3 rounded-full text-sm"
                  style={{ fontFamily: "'Arial Black', sans-serif", background: '#0E5F13', color: '#ECBD27', border: '2px solid #ECBD27', textDecoration: 'none' }}
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
