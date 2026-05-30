import { motion } from 'framer-motion'
import GridBackground from './GridBackground'

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

const divisions = [
  { 
    id: 'import', 
    title: 'Import / Export',
    desc: 'Bridging Ethiopian markets with the globe through premium coffee export and diverse import operations.'
  },
  { 
    id: 'manufacturing', 
    title: 'Manufacturing',
    desc: 'Producing high-quality cardboard and packaging solutions that meet rigorous international standards.'
  },
  { 
    id: 'hospitality', 
    title: 'Hospitality',
    desc: 'Delivering exceptional guest experiences with world-class service across our growing hospitality portfolio.'
  }
]

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: '#0E5F13' }}
    >
      <GridBackground color="#ECBD27" gridSize={60} opacity={0.08} isVisible={true} />

      {/* Ambient blobs */}
      <div className="absolute -top-[10%] -right-[5%] w-[40vw] h-[40vw] rounded-full blur-[140px] pointer-events-none" style={{ background: 'rgba(236,189,39,0.06)', zIndex: 3 }} />
      <div className="absolute bottom-0 left-[-5%] w-[30vw] h-[30vw] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(236,189,39,0.04)', zIndex: 3 }} />

      <div className="relative z-30 max-w-7xl mx-auto px-6">
        {/* Header & Short Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white font-black uppercase leading-[0.88]"
              style={{
                fontFamily: "'Arial Black', sans-serif",
                fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                // textShadow: '0 4px 24px rgba(0,0,0,0.6)',
              }}
            >
              About<br /><div className='text-[#ECBD27]'>Us</div>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-white/80 text-base md:text-xl mt-8 leading-relaxed"
              style={{ fontFamily: "'General Sans', sans-serif" }}
            >
              YHAENU PLC is a family-owned company with over 20 years of experience.
              Headquartered in Ethiopia, we have grown into a trusted name in both local 
              and international markets. Our mission is simple: to be the bridge that 
              links Ethiopia's potential to the global stage — delivering quality, 
              precision, and excellence.
            </motion.p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 shrink-0">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 + (i * 0.1), ease: "easeOut" }}
                className="flex flex-col border-l-2 border-[#ECBD27]/30 pl-4 md:pl-6"
              >
                <span
                  className="font-black text-white flex items-baseline leading-none"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: "'Arial Black', sans-serif" }}
                >
                  {stat.value}<span className="text-[#ECBD27] text-3xl ml-1">{stat.suffix}</span>
                </span>
                <span
                  className="text-[9px] md:text-xs tracking-[0.2em] uppercase text-white/50 mt-2 font-bold"
                  style={{ fontFamily: 'monospace' }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divisions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {divisions.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 + (i * 0.15), ease: "easeOut" }}
              className="relative overflow-hidden shadow-2xl border border-white/10 group aspect-[4/3] md:aspect-[3/4]"
            >
              <img
                src={SECTION_IMAGES[item.id]}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                style={{ filter: 'brightness(0.6) contrast(1.1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E5F13] via-[#0E5F13]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <span className="text-[#ECBD27] font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3 font-bold translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Division
                </span>
                <h3
                  className="text-white font-black text-2xl md:text-3xl uppercase tracking-tight mb-2 group-hover:-translate-y-1 transition-transform duration-500"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  {item.title}
                </h3>
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                  <p className="text-white/80 text-sm mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
