import heroBg from '../assets/hero-bg.png'

const PARAGRAPH =
  'YHAENU PLC is a family-owned company with over 20 years of experience in Import, Export, Manufacturing, Transportation, and Hospitality. Headquartered in Ethiopia, we have grown into a trusted name in both local and international markets. Our mission is simple: to be the bridge that links Ethiopia\'s potential to the global stage — delivering quality, precision, and excellence across every vertical we operate in.'

const stats = [
  { value: 20, suffix: '+', label: 'Years of Experience' },
  { value: 5, suffix: '', label: 'Business Verticals' },
  { value: 15, suffix: '+', label: 'Countries Reached' },
  { value: 1, suffix: '', label: 'Unified Vision' },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 px-6"
      style={{ background: '#0E5F13' }}
    >
      {/* Background Decorative Elements */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(236,189,39,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div
        className="absolute -top-[10%] -right-[5%] w-[40vw] h-[40vw] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(236,189,39,0.05)' }}
      />
      <div
        className="absolute -bottom-[10%] -left-[5%] w-[30vw] h-[30vw] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.03)' }}
      />

      {/* Title - Behind the image (z-0) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none pb-96">
        <h2
          className="font-black uppercase text-center leading-[0.9]"
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 12rem)',
            color: 'white',
            letterSpacing: '-0.02em',
            fontFamily: "'Arial Black', sans-serif",
            opacity: 0.8
          }}
        >
          About <span style={{ color: '#ECBD27' }}>Us</span>
        </h2>
      </div>

      {/* Hero Background Image - Middle Layer (z-10) */}
      <div
        className="absolute inset-0 bottom-[-10%] z-10 pointer-events-none opacity-95"
      >
        <img
          src={heroBg}
          alt="Hero Background"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.8) contrast(1.1)' }}
        />
      </div>

      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center pt-32">

        {/* Description & Stats - In Front (z-20) */}
        <div className="relative w-full flex flex-col items-center">
          <div className="w-full max-w-3xl relative z-20 top-20 mb-20 text-center" style={{ mixBlendMode: 'difference' }}>
            <p
              className="text-lg md:text-[21px] leading-relaxed text-center tracking-wide"
              style={{
                color: 'white',
                fontFamily: "'General Sans', sans-serif",
                fontWeight: 500
              }}
            >
              {PARAGRAPH}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 relative z-20 top-16 md:grid-cols-4 gap-8 md:gap-12 w-full mt-4" style={{ mixBlendMode: 'difference' }}>
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="relative mb-3">
                  <span
                    className="font-black leading-none flex items-baseline"
                    style={{
                      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                      color: 'white',
                      fontFamily: "'Arial Black', sans-serif"
                    }}
                  >
                    {stat.value}
                    <span>{stat.suffix}</span>
                  </span>
                  <div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#ECBD27] scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  />
                </div>
                <span
                  className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-center"
                  style={{ color: 'white', fontFamily: 'monospace', fontWeight: 'bold' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Rough organic bottom edge */}
      <RoughDivider />
    </section>
  )
}

function RoughDivider() {
  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="rough-edge-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div 
        className="absolute bottom-[-120px] left-[-5%] w-[110%] h-[180px] z-[5] pointer-events-none"
        style={{ filter: 'url(#rough-edge-filter)' }}
      >
        <div className="w-full h-full bg-white" style={{ clipPath: 'polygon(0 30%, 100% 15%, 100% 100%, 0 100%)' }} />
      </div>
    </>
  )
}