import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Contact Us', href: '#contact' },
]

// Wave paths - smooth, clean waves
const WAVE_FLAT   = 'M0,60 C150,50 300,50 450,60 C600,70 750,70 900,60 C1050,50 1200,50 1350,60 L1440,60 L1440,0 L0,0 Z'
const WAVE_RISE1  = 'M0,50 C150,35 300,40 450,50 C600,60 750,65 900,50 C1050,35 1200,40 1350,50 L1440,50 L1440,0 L0,0 Z'
const WAVE_RISE2  = 'M0,55 C150,45 300,35 450,55 C600,75 750,60 900,55 C1050,45 1200,35 1350,55 L1440,55 L1440,0 L0,0 Z'
const WAVE_SETTLE = 'M0,58 C150,48 300,45 450,58 C600,68 750,68 900,58 C1050,48 1200,45 1350,58 L1440,58 L1440,0 L0,0 Z'

function AnimatedWave() {
  return (
    <motion.svg
      viewBox="0 0 1440 60"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={{ position: 'absolute', bottom: -60, left: 0, width: '100%', height: 60, display: 'block' }}
    >
      <motion.path
        fill="#0E5F13"
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
  return (
    <motion.a
      href={href}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hovered"
      className="group relative flex flex-col items-center gap-2 cursor-pointer select-none"
      style={{ perspective: 1000 }}
    >
      {/* Label */}
      <span className="flex flex-wrap justify-center">
        {label.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block font-black uppercase text-center"
            style={{
              fontFamily: "'Arial Black', 'Impact', sans-serif",
              fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
              lineHeight: 1.1,
              color: '#ECBD27',
              transformOrigin: '50% 50%',
            }}
            variants={{ hovered: { rotateY: 360, color: '#F3F6FA', scale: 1.1 } }}
            transition={{ duration: 0.5, delay: i * 0.022, ease: 'easeInOut' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </motion.a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Top Bar ── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3"
        animate={{
          background: scrolled ? '#0E5F13' : 'transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.2)' : 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex-1" />
        <motion.button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[4px] shadow-md md:hidden"
          animate={{ background: scrolled ? '#ECBD27' : '#F3F6FA' }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="block w-4 h-[2px] rounded-full"
            animate={{ background: scrolled ? '#0E5F13' : '#0E5F13' }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-4 h-[2px] rounded-full"
            animate={{ background: scrolled ? '#0E5F13' : '#0E5F13' }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.header>

      {/* ── Desktop Navigation (centered) ── */}
      <motion.nav
        className="hidden md:fixed md:top-0 md:left-0 md:right-0 md:z-50 md:flex items-center justify-center pt-4 pb-4"
        animate={{
          background: scrolled ? 'rgba(14,95,19,0.95)' : 'transparent',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full">
          <div className="flex items-center justify-center gap-16">
            {navLinks.map((link, i) => (
              <FlipWord
                key={link.href}
                label={link.label}
                href={link.href}
                onClick={() => {}}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[99] bg-black/50 md:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="panel"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-full md:hidden flex flex-col"
              style={{ background: '#F3F6FA', overflow: 'visible' }}
            >
              <AnimatedWave />

              {/* Close button */}
              <div className="flex justify-end px-5 py-3 relative z-10">
                <motion.button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  whileHover={{ scale: 1.08, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 rounded-full bg-[#0E5F13] flex items-center justify-center shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F3F6FA" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col justify-center flex-1 px-8 gap-8 relative z-10">
                {navLinks.map((link, i) => (
                  <FlipWord
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    delay={0.05 + i * 0.07}
                  />
                ))}

                {/* RFQ */}
                <motion.a
                  href="#rfq"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.07, duration: 0.4 }}
                  whileHover={{ scale: 1.04, backgroundColor: '#0E5F13', color: '#F3F6FA' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 self-center font-black uppercase tracking-wide px-5 py-2 rounded-full shadow-lg text-xs border-2 border-[#ECBD27] text-[#0E5F13]"
                  style={{ fontFamily: "'Arial Black', sans-serif", transition: 'background 0.2s, color 0.2s' }}
                >
                  <span>Request a Quote (RFQ)</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
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
