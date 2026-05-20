import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GridBackground from './GridBackground'

type Section = 'import' | 'manufacturing' | 'hospitality' | null

const pathImport = "M66.6218 151.625C67.3516 150.734 68.0659 149.827 68.811 148.951C71.3613 145.94 73.9115 142.929 76.4925 139.941C79.0351 137.007 81.6237 134.111 84.1663 131.184C85.9638 129.118 87.7228 127.021 89.5049 124.947C92.5545 121.398 95.5963 117.841 98.6612 114.3C102.018 110.429 105.406 106.588 108.755 102.709C112.273 98.6301 115.737 94.5205 119.248 90.4416C123.964 84.9571 128.696 79.4955 133.42 74.0263C134.296 73.0124 135.11 71.9523 136.047 70.9998C136.377 70.6618 136.984 70.4544 137.476 70.4391C139.258 70.3699 141.048 70.4083 142.83 70.4083C167.994 70.4083 193.166 70.4083 218.331 70.4083C218.999 70.4083 219.675 70.393 220.343 70.4391C220.705 70.4621 221.066 70.5927 221.419 70.6772C221.273 71.0075 221.181 71.3762 220.973 71.6604C220.313 72.5592 219.606 73.4195 218.922 74.3029C211.433 83.8586 203.944 93.4067 196.454 102.962C192.368 108.178 188.281 113.386 184.187 118.594C179.639 124.378 175.069 130.147 170.529 135.939C166.934 140.525 163.247 145.057 159.852 149.789C158.584 151.555 157.256 151.963 155.251 151.955C126.699 151.901 98.1543 151.916 69.6022 151.909C68.6881 151.909 67.774 151.909 66.8523 151.909C66.7678 151.817 66.6909 151.732 66.6064 151.64L66.6218 151.625Z"
const pathManufacturing = "M233.632 55.706C205.234 55.6753 176.843 55.6753 148.444 55.6753C147.984 55.6753 147.515 55.6369 146.847 55.6061C147.085 55.1683 147.192 54.861 147.377 54.5922C150.203 50.5901 153.023 46.5804 155.865 42.5937C158.814 38.4381 161.787 34.3054 164.745 30.1651C167.756 25.9403 170.751 21.7078 173.747 17.4676C176.336 13.8036 178.901 10.1241 181.49 6.46008C182.819 4.57044 184.148 2.66543 185.554 0.821877C185.838 0.445485 186.422 0.184315 186.906 0.1075C187.62 -0.0154033 188.365 0.0690929 189.102 0.0690929C218.307 0.0690929 247.528 0.0767744 276.74 0.0767744L233.632 55.7137V55.706Z"
const pathHospitality = "M0 0.176666C0.499296 0.130577 0.775829 0.0844883 1.04468 0.0844883C15.4244 0.0537624 29.8041 0.0230365 44.1838 -7.96001e-06C59.0091 -0.0153709 73.8343 -7.96001e-06 88.6596 -7.96001e-06C91.0792 -7.96001e-06 93.4989 -0.0153709 95.9186 0.0921697C96.4256 0.115214 97.0785 0.506969 97.3781 0.92945C102.878 8.81833 108.347 16.7379 113.801 24.6575C116.152 28.0681 118.448 31.5094 120.791 34.92C123.457 38.8068 126.161 42.6629 128.834 46.542C130.731 49.292 132.613 52.042 134.495 54.7996C134.618 54.9763 134.702 55.1837 134.887 55.5294C134.357 55.5755 133.934 55.6446 133.519 55.6446C111.282 55.6446 89.0513 55.6446 66.8135 55.6446C56.7968 55.6446 46.7802 55.6369 36.7635 55.6676C35.7035 55.6676 35.0275 55.3911 34.4361 54.4309C31.3481 49.4226 28.1756 44.4604 25.0186 39.4905C22.9676 36.2719 20.8629 33.0841 18.8119 29.8656C16.9684 26.9697 15.1786 24.043 13.3427 21.1394C11.215 17.7749 9.0795 14.4258 6.92869 11.0767C5.56907 8.96427 4.17104 6.88259 2.8191 4.77019C1.88964 3.31839 1.02164 1.84355 0 0.176666Z"

const getMaskUrl = (pathD: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 277 152" preserveAspectRatio="xMidYMid meet"><path d="${pathD}" fill="black"/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

const SECTION_IMAGES: Record<string, string> = {
  import: 'https://images.pexels.com/photos/32119533/pexels-photo-32119533.jpeg',
  manufacturing: 'https://images.pexels.com/photos/34221998/pexels-photo-34221998.jpeg',
  hospitality: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/79/03/the-building.jpg?w=2000&h=-1&s=1',
}

const stats = [
  { value: 20, suffix: '+', label: 'Years of Experience' },
  { value: 5, suffix: '', label: 'Business Verticals' },
  { value: 15, suffix: '+', label: 'Countries Reached' },
  { value: 1, suffix: '', label: 'Unified Vision' },
]

const PARA_PARTS: { text: string; key: Section | null }[] = [
  { text: 'YHAENU PLC is a family-owned company with over 20 years of experience in\n', key: null },
  { text: 'Import/Export', key: 'import' },
  { text: 'Manufacturing', key: 'manufacturing' },
  { text: 'Hospitality', key: 'hospitality' },
  { text: "\nHeadquartered in Ethiopia, we have grown into a trusted name in both local and international markets. Our mission is simple: to be the bridge that links Ethiopia's potential to the global stage — delivering quality, precision, and excellence across every vertical we operate in.", key: null },
]

const mobileParagraphs = {
  import: 'Bridging Ethiopian markets with the globe through premium coffee export and diverse import operations.',
  manufacturing: 'Producing high-quality cardboard and packaging solutions that meet rigorous international standards.',
  hospitality: 'Delivering exceptional guest experiences with world-class service across our growing hospitality portfolio.'
}

const shadow = '0 2px 20px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.8)'

const imageVariants = {
  idle: (i: number) => ({
    scale: [1, 1.05, 1],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 1,
    }
  }),
  hovered: {
    scale: 1.1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  unhovered: {
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export default function About() {
  const [hovered, setHovered] = useState<Section>(null)

  // ── Mobile: start with a default active section so content is visible ──
  const [mobileSection, setMobileSection] = useState<Section>('import')
  const [isMobileView, setIsMobileView] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  )
  useEffect(() => {
    const handler = () => setIsMobileView(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Desktop uses mouse hover; mobile uses the tapped section
  const displaySection = isMobileView ? mobileSection : hovered

  const cycleSection = (id: Section) => {
    setMobileSection(id)
  }

  const renderParagraph = () => {
    const intro = PARA_PARTS[0].text
    const verticals = PARA_PARTS.slice(1, 4)
    const outro = PARA_PARTS[4].text

    return (
      <>
        <span>{intro}</span>
        
        <div className="relative h-14 md:h-20 my-1 overflow-hidden">
          {verticals.map((v) => {
            const isActive = displaySection === v.key
            return (
              <span
                key={v.key}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  color: '#ECBD27',
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  textShadow: '0 0 30px rgba(236,189,39,0.3)',
                  opacity: isActive ? 1 : 0,
                  transform: isActive 
                    ? 'translateY(0)' 
                    : displaySection === null 
                      ? 'translateY(20px)' 
                      : 'translateY(-20px)',
                  visibility: isActive ? 'visible' : 'hidden',
                  transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {v.text}
              </span>
            )
          })}
        </div>

        <span>{outro}</span>
      </>
    )
  }

  return (
    <section
      id="about"
      className="relative w-full min-h-screen md:h-screen overflow-hidden"
      style={{ background: '#0E5F13' }}
    >
      {/* Grid / Glow — same as Hero */}
      <GridBackground color="#ECBD27" gridSize={60} opacity={0.08} isVisible={!hovered} />

      {/* Ambient blobs */}
      <div className="absolute -top-[10%] -right-[5%] w-[40vw] h-[40vw] rounded-full blur-[140px] pointer-events-none" style={{ background: 'rgba(236,189,39,0.06)', zIndex: 3 }} />
      <div className="absolute bottom-0 left-[-5%] w-[30vw] h-[30vw] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(236,189,39,0.04)', zIndex: 3 }} />

      {/* Hover bg images — fill entire section */}
      {(['import', 'manufacturing', 'hospitality'] as const).map((id) => (
        <div key={id} className="absolute inset-0 pointer-events-none"
          style={{ opacity: displaySection === id ? 1 : 0, transition: 'opacity 0.55s ease', zIndex: 10 }}>
          <img src={SECTION_IMAGES[id]} alt={id} className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.5) contrast(1.1)' }} />
        </div>
      ))}

      {/* ── Desktop Layout shell — hidden on mobile ── */}
      <div
        className="hidden md:block relative w-full h-full"
        style={{ zIndex: 20 }}
      >
        {/* Masked Logo Windows (Unhovered State) */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
          {(['import', 'manufacturing', 'hospitality'] as const).map((id, index) => {
             const pathD = id === 'import' ? pathImport : id === 'manufacturing' ? pathManufacturing : pathHospitality;
             return (
              <div
                key={`mask-${id}`}
                className="absolute inset-0 w-full h-full origin-center"
                style={{
                  maskImage: getMaskUrl(pathD),
                  WebkitMaskImage: getMaskUrl(pathD),
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  opacity: displaySection && displaySection !== id ? 0 : 1,
                  transition: 'opacity 0.5s ease'
                }}
              >
                <motion.div
                  custom={index}
                  variants={imageVariants}
                  initial="idle"
                  animate={displaySection === id ? "hovered" : displaySection !== null ? "unhovered" : "idle"}
                  className="absolute inset-0 w-full h-full origin-center"
                >
                  <img src={SECTION_IMAGES[id]} alt={id} className="w-full h-full object-cover" style={{ filter: 'brightness(0.7) contrast(1.1)' }} />
                  
                  {/* Overlay over it (yellowish unhovered, greenish when hovered) */}
                  <div 
                    className="absolute inset-0" 
                    style={{ 
                      backgroundColor: displaySection === id ? '#0E5F13' : '#ECBD27', 
                      opacity: displaySection === id ? 0.6 : 0.25,
                      backdropFilter: displaySection === id ? 'blur(4px)' : 'blur(2px)',
                      transition: 'all 0.5s ease' 
                    }} 
                  />
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────
            Responsive SVG + Content Container
        ───────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 flex flex-col md:block z-20">
          
          {/* Top half on mobile / Full screen on desktop: SVG Logo */}
          <div className="relative w-full h-[45vh] md:h-full shrink-0 flex items-center md:block">
            <svg
              viewBox="0 0 277 152"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full block"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <clipPath id="about-logo-clip">
                  <path d={pathHospitality} />
                  <path d={pathManufacturing} />
                  <path d={pathImport} />
                </clipPath>
                <filter id="about-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <text
                x="138.5" y="28"
                textAnchor="middle" dominantBaseline="middle"
                fontFamily="'Arial Black', 'Arial Bold', sans-serif"
                fontWeight="900" fontSize="40" letterSpacing="-1.5"
                fill="#ECBD27"
                style={{
                  userSelect: 'none',
                  pointerEvents: 'none',
                  opacity: displaySection ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                ABOUT US
              </text>

              <g style={{ cursor: 'pointer' }}>
                {(['import', 'manufacturing', 'hospitality'] as const).map((id) => {
                  const pathD = id === 'import' ? pathImport : id === 'manufacturing' ? pathManufacturing : pathHospitality;
                  return (
                    <path
                      key={`path-${id}`}
                      d={pathD}
                      fill="transparent"
                      style={{ transformOrigin: '138.5px 76px' }}
                      onMouseEnter={() => setHovered(id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => cycleSection(id)}
                    />
                  )
                })}
              </g>
            </svg>
          </div>

          {/* Bottom half on mobile / Centered absolute on desktop: Content */}
          <div
            className="flex-1 md:absolute md:inset-0 flex flex-col items-center justify-center md:pointer-events-none pb-12 md:pb-0"
            style={{
              opacity: displaySection ? 1 : 0,
              transition: 'opacity 0.5s ease',
              zIndex: 50,
            }}
          >
            <div className="hidden md:block h-36" />

            <div className="flex-1 flex items-center justify-center px-6">
              <div className="w-full max-w-4xl text-center">
                <p
                  className="text-sm md:text-xl leading-relaxed tracking-wide"
                  style={{ color: 'white', fontFamily: "'General Sans', sans-serif", fontWeight: 500, textShadow: shadow, whiteSpace: 'pre-line' }}
                >
                  {renderParagraph()}
                </p>
              </div>
            </div>

            <div className="w-full max-w-5xl px-6 pb-2 md:pb-10 mt-6 md:mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span
                      className="font-black leading-none flex items-baseline"
                      style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', color: 'white', fontFamily: "'Arial Black', sans-serif", textShadow: shadow }}
                    >
                      {stat.value}<span>{stat.suffix}</span>
                    </span>
                    <span
                      className="text-[9px] md:text-[12px] tracking-[0.2em] uppercase text-center mt-2"
                      style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace', fontWeight: 'bold', textShadow: shadow }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── MOBILE STACKED LAYOUT ── */}
      <div className="md:hidden flex flex-col w-full bg-[#0E5F13] relative z-30 pb-20 pt-16">
        <div className="px-6 mb-10 text-center">
          <h2
            className="text-white font-black uppercase leading-[0.88]"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontSize: 'clamp(3rem, 14vw, 4.5rem)',
              textShadow: '0 4px 24px rgba(0,0,0,0.6)',
            }}
          >
            About<br />Us
          </h2>
          <p
            className="text-white/80 text-[14px] mt-6 leading-relaxed max-w-sm mx-auto"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            YHAENU PLC is a family-owned company with over 20 years of experience,
            headquartered in Ethiopia and trusted across local and international markets.
          </p>
        </div>

        {/* The 3 Sections Stacked */}
        <div className="flex flex-col gap-6 px-4">
          {([
            { id: 'import' as const, title: 'Import / Export' },
            { id: 'manufacturing' as const, title: 'Manufacturing' },
            { id: 'hospitality' as const, title: 'Hospitality' }
          ]).map((item) => (
            <div key={item.id} className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group aspect-[4/3]">
              <img
                src={SECTION_IMAGES[item.id]}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.4) saturate(1.2)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E5F13]/90 via-[#0E5F13]/40 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-[#ECBD27] font-mono text-[10px] tracking-[0.3em] uppercase mb-2 font-bold">
                  Division
                </span>
                <h3
                  className="text-white font-black text-2xl uppercase tracking-tight"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-white/70 text-xs mt-3 line-clamp-3 leading-relaxed">
                  {mobileParagraphs[item.id]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Global Stats Grid for mobile */}
        <div className="grid grid-cols-2 gap-4 px-6 mt-12 border-t border-white/10 pt-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center bg-white/5 py-6 rounded-xl border border-white/5">
              <span
                className="font-black text-white leading-none"
                style={{
                  fontSize: '2rem',
                  fontFamily: "'Arial Black', sans-serif",
                }}
              >
                {stat.value}{stat.suffix}
              </span>
              <span
                className="text-[8px] tracking-[0.2em] uppercase text-white/50 mt-2 font-bold"
                style={{ fontFamily: 'monospace' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
