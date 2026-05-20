import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LEADERSHIP_DATA = [
  { 
    name: 'Yhaenu Founder',       
    role: 'Group President & CEO',                    
    desc: "Visionary leader with 20+ years driving Ethiopia's trade and manufacturing growth.",
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg' // Placeholder
  },
  { 
    name: 'Operations Director',  
    role: 'Group Executive Director, Operations',     
    desc: 'Coordinates logistics, manufacturing, and supply chain across all verticals.',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg' // Placeholder
  },
  { 
    name: 'Trade Director',       
    role: 'Group Executive Director, Trade',          
    desc: 'Leads import-export strategy and international market expansion.',
    image: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg' // Placeholder
  },
]

export default function LeadershipAccordion() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null) // Default to equally divided (null)

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0E5F13] flex items-center justify-center">
      
      {/* ── Mobile Global Tap to Expand Hint ── */}
      <AnimatePresence>
        {hoveredIndex === null && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none md:hidden w-max">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center bg-black/40 backdrop-blur-md px-8 py-5 rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            >
              <svg className="mb-2 text-[#ECBD27] animate-bounce" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
              <span className="text-white text-lg font-black uppercase tracking-widest text-center" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                Tap to Expand
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* ── Title Overlay (Absolute on top of accordion) ── */}
      <div className="absolute top-12 left-10 md:top-16 md:left-16 z-20 pointer-events-none">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-8 bg-[#ECBD27]" />
          <span className="text-xs tracking-[0.4em] uppercase font-bold text-[#ECBD27]" style={{ fontFamily: 'monospace' }}>
            Executive Leadership
          </span>
        </div>
        <h2 className="font-black text-4xl md:text-6xl uppercase text-white" style={{ fontFamily: "'Arial Black', sans-serif" }}>
          Our <span style={{ color: '#ECBD27' }}>Leadership</span>
        </h2>
      </div>

      {/* ── Accordion Container ── 
          We make it 140% wide and center it so the skewed edges are pushed far off-screen 
          and no black triangles show on the left/right.
      */}
      <div 
        className="absolute flex w-[140%] h-full left-1/2" 
        style={{ transform: 'translateX(-50%) skewX(-12deg)' }}
        onMouseLeave={() => setHoveredIndex(null)} // snap back to equal division when mouse leaves the accordion
      >
        
        {LEADERSHIP_DATA.map((item, i) => {
          // If no item is hovered, all are equal (flex 1). If an item is hovered, that item is flex 3, others are flex 1.8.
          const flexValue = hoveredIndex === null ? 1 : (hoveredIndex === i ? 3 : 1.8)
          const isHovered = hoveredIndex === i
          const isCompressed = hoveredIndex !== null && !isHovered

          return (
            <motion.div
              key={i}
              className="relative h-full overflow-hidden border-r border-black/30 cursor-pointer group"
              animate={{ 
                flex: flexValue,
                x: isCompressed ? [0, -5, 5, -3, 3, -1, 1, 0] : 0
              }}
              transition={{ 
                flex: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
                x: { 
                  duration: 0.6, 
                  repeat: isCompressed ? Infinity : 0, 
                  repeatDelay: 0.8 
                }
              }}
              onMouseEnter={() => setHoveredIndex(i)}
            >
              {/* ── Inner Content (Un-skewed) ── 
                  We use a w-[100vw] container centered exactly in the middle of the slice.
                  This ensures the background doesn't expose edges, and the text remains perfectly centered
                  even though the slice itself has slanted boundaries.
              */}
              <div 
                className="absolute top-0 h-full w-[100vw] flex flex-col items-center justify-end pb-20 pointer-events-none"
                style={{ 
                  left: '50%',
                  transform: 'translateX(-50%) skewX(12deg)' 
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ filter: isHovered ? 'grayscale(0%)' : 'grayscale(80%) brightness(0.6)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E5F13]/60 via-[#0E5F13]/20 to-transparent" />
                </div>

                {/* Text Content */}
                <motion.div 
                  className="relative z-10 flex flex-col items-center text-center w-[85%] max-w-[450px]"
                  animate={{ 
                    y: isHovered ? 0 : (isCompressed ? 20 : 10),
                    opacity: isHovered ? 1 : 0,
                    scale: isCompressed ? 0.9 : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 
                    className="font-black text-3xl md:text-5xl uppercase mb-2 text-white" 
                    style={{ fontFamily: "'Arial Black', sans-serif", textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-[#ECBD27] font-bold tracking-widest text-sm md:text-base uppercase mb-4">
                    {item.role}
                  </p>
                  
                  <motion.p 
                    className="text-white/90 text-sm md:text-base leading-relaxed"
                    initial={false}
                    animate={{ 
                      height: isHovered ? 'auto' : 0, 
                      opacity: isHovered ? 1 : 0,
                      marginTop: isHovered ? 8 : 0
                    }}
                    style={{ overflow: 'hidden' }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.desc}
                  </motion.p>
                </motion.div>
              </div>

            </motion.div>
          )
        })}

      </div>
    </div>
  )
}
