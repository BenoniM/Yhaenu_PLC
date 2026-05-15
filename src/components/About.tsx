import { useState } from 'react'
import GridBackground from './GridBackground'

type Section = 'import' | 'manufacturing' | 'hospitality' | null

const pathImport = "M66.6218 151.625C67.3516 150.734 68.0659 149.827 68.811 148.951C71.3613 145.94 73.9115 142.929 76.4925 139.941C79.0351 137.007 81.6237 134.111 84.1663 131.184C85.9638 129.118 87.7228 127.021 89.5049 124.947C92.5545 121.398 95.5963 117.841 98.6612 114.3C102.018 110.429 105.406 106.588 108.755 102.709C112.273 98.6301 115.737 94.5205 119.248 90.4416C123.964 84.9571 128.696 79.4955 133.42 74.0263C134.296 73.0124 135.11 71.9523 136.047 70.9998C136.377 70.6618 136.984 70.4544 137.476 70.4391C139.258 70.3699 141.048 70.4083 142.83 70.4083C167.994 70.4083 193.166 70.4083 218.331 70.4083C218.999 70.4083 219.675 70.393 220.343 70.4391C220.705 70.4621 221.066 70.5927 221.419 70.6772C221.273 71.0075 221.181 71.3762 220.973 71.6604C220.313 72.5592 219.606 73.4195 218.922 74.3029C211.433 83.8586 203.944 93.4067 196.454 102.962C192.368 108.178 188.281 113.386 184.187 118.594C179.639 124.378 175.069 130.147 170.529 135.939C166.934 140.525 163.247 145.057 159.852 149.789C158.584 151.555 157.256 151.963 155.251 151.955C126.699 151.901 98.1543 151.916 69.6022 151.909C68.6881 151.909 67.774 151.909 66.8523 151.909C66.7678 151.817 66.6909 151.732 66.6064 151.64L66.6218 151.625Z"
const pathManufacturing = "M233.632 55.706C205.234 55.6753 176.843 55.6753 148.444 55.6753C147.984 55.6753 147.515 55.6369 146.847 55.6061C147.085 55.1683 147.192 54.861 147.377 54.5922C150.203 50.5901 153.023 46.5804 155.865 42.5937C158.814 38.4381 161.787 34.3054 164.745 30.1651C167.756 25.9403 170.751 21.7078 173.747 17.4676C176.336 13.8036 178.901 10.1241 181.49 6.46008C182.819 4.57044 184.148 2.66543 185.554 0.821877C185.838 0.445485 186.422 0.184315 186.906 0.1075C187.62 -0.0154033 188.365 0.0690929 189.102 0.0690929C218.307 0.0690929 247.528 0.0767744 276.74 0.0767744L233.632 55.7137V55.706Z"
const pathHospitality = "M0 0.176666C0.499296 0.130577 0.775829 0.0844883 1.04468 0.0844883C15.4244 0.0537624 29.8041 0.0230365 44.1838 -7.96001e-06C59.0091 -0.0153709 73.8343 -7.96001e-06 88.6596 -7.96001e-06C91.0792 -7.96001e-06 93.4989 -0.0153709 95.9186 0.0921697C96.4256 0.115214 97.0785 0.506969 97.3781 0.92945C102.878 8.81833 108.347 16.7379 113.801 24.6575C116.152 28.0681 118.448 31.5094 120.791 34.92C123.457 38.8068 126.161 42.6629 128.834 46.542C130.731 49.292 132.613 52.042 134.495 54.7996C134.618 54.9763 134.702 55.1837 134.887 55.5294C134.357 55.5755 133.934 55.6446 133.519 55.6446C111.282 55.6446 89.0513 55.6446 66.8135 55.6446C56.7968 55.6446 46.7802 55.6369 36.7635 55.6676C35.7035 55.6676 35.0275 55.3911 34.4361 54.4309C31.3481 49.4226 28.1756 44.4604 25.0186 39.4905C22.9676 36.2719 20.8629 33.0841 18.8119 29.8656C16.9684 26.9697 15.1786 24.043 13.3427 21.1394C11.215 17.7749 9.0795 14.4258 6.92869 11.0767C5.56907 8.96427 4.17104 6.88259 2.8191 4.77019C1.88964 3.31839 1.02164 1.84355 0 0.176666Z"

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

const shadow = '0 2px 20px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.8)'

export default function About() {
  const [hovered, setHovered] = useState<Section>(null)

  const renderParagraph = () => {
    const intro = PARA_PARTS[0].text
    const verticals = PARA_PARTS.slice(1, 4)
    const outro = PARA_PARTS[4].text

    return (
      <>
        <span>{intro}</span>
        
        <div className="relative h-14 md:h-20 my-1 overflow-hidden">
          {verticals.map((v) => {
            const isActive = hovered === v.key
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
                    : hovered === null 
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
      className="relative w-full h-screen overflow-hidden"
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
          style={{ opacity: hovered === id ? 1 : 0, transition: 'opacity 0.55s ease', zIndex: 10 }}>
          <img src={SECTION_IMAGES[id]} alt={id} className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.5) contrast(1.1)' }} />
        </div>
      ))}

      {/* ── Layout shell — fills full viewport height ── */}
      <div
        className="relative w-full h-full"
        style={{ zIndex: 20 }}
      >
        {/* ─────────────────────────────────────────────────────────
            SVG Logo — full edge-to-edge width
            The logo paths live inside <g> and fade out on hover.
            The ABOUT US text lives outside <g> so it stays visible.
            Transparent hit areas sit on top in a separate <g>.
        ───────────────────────────────────────────────────────── */}
        <svg
          viewBox="0 0 277 152"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full block"
          style={{ display: 'block', overflow: 'visible' }}
        >
          <defs>
            {/* Clip to logo union shape for two-tone title */}
            <clipPath id="about-logo-clip">
              <path d={pathHospitality} />
              <path d={pathManufacturing} />
              <path d={pathImport} />
            </clipPath>
            {/* Subtle glow on active arm */}
            <filter id="about-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Logo paths — fade to invisible on hover */}
          <g style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.5s ease' }}>
            <path
              d={pathHospitality}
              fill={hovered === 'hospitality' ? '#F5CA40' : '#ECBD27'}
              style={{ transition: 'fill 0.35s ease' }}
            />
            <path
              d={pathManufacturing}
              fill={hovered === 'manufacturing' ? '#F5CA40' : '#ECBD27'}
              style={{ transition: 'fill 0.35s ease' }}
            />
            <path
              d={pathImport}
              fill={hovered === 'import' ? '#F5CA40' : '#ECBD27'}
              style={{ transition: 'fill 0.35s ease' }}
            />
          </g>

          {/* ABOUT US — yellowish base (visible on green bg AND dark bg image) */}
          <text
            x="138.5" y="28"
            textAnchor="middle" dominantBaseline="middle"
            fontFamily="'Arial Black', 'Arial Bold', sans-serif"
            fontWeight="900" fontSize="40" letterSpacing="-1.5"
            fill="#ECBD27"
            style={{ userSelect: 'none', pointerEvents: 'none' }}
          >
            ABOUT US
          </text>

          {/* ABOUT US — dark green layer, clipped to logo shape (green-on-yellow, non-hover only) */}
          <text
            x="138.5" y="28"
            textAnchor="middle" dominantBaseline="middle"
            fontFamily="'Arial Black', 'Arial Bold', sans-serif"
            fontWeight="900" fontSize="40" letterSpacing="-1.5"
            fill="#0E5F13"
            clipPath="url(#about-logo-clip)"
            style={{
              userSelect: 'none',
              pointerEvents: 'none',
              opacity: hovered ? 0 : 1,
              transition: 'opacity 0.4s ease',
            }}
          >
            ABOUT US
          </text>

          {/* Transparent hit areas — always on top, trigger hover */}
          <g style={{ cursor: 'pointer' }}>
            <path d={pathHospitality} fill="transparent"
              onMouseEnter={() => setHovered('hospitality')}
              onMouseLeave={() => setHovered(null)} />
            <path d={pathManufacturing} fill="transparent"
              onMouseEnter={() => setHovered('manufacturing')}
              onMouseLeave={() => setHovered(null)} />
            <path d={pathImport} fill="transparent"
              onMouseEnter={() => setHovered('import')}
              onMouseLeave={() => setHovered(null)} />
          </g>

          {/* HOVER hint — visible only when nothing is hovered */}
          <g
            style={{
              opacity: hovered ? 0 : 1,
              transition: 'opacity 0.5s ease',
              pointerEvents: 'none',
            }}
          >
            {/* "HOVER" label — placed at the arrow origin point */}
            <text
              x="78" y="91"
              textAnchor="middle" dominantBaseline="middle"
              fontFamily="'Arial Black', monospace"
              fontWeight="900" fontSize="5.5" letterSpacing="1.2"
              fill="#ECBD27"
              style={{ userSelect: 'none' }}
            >
              HOVER
            </text>

            {/*
              Original paths from #010.svg (viewBox 0 0 1920 1080).
              Scale factor: 277/1920 ≈ 0.1443 horizontally, 152/1080 ≈ 0.1407 vertically.
              We apply transform="scale(0.1443, 0.1407)" to each group.

              Arrow 1: Left arrow (→ Hospitality, top-left segment)
              Body: line 17, Arrowhead: line 18
            */}
            <g transform="scale(0.1443, 0.1407)">
              {/* Arrow 1 body */}
              <path
                d="M446.395 631.547C429.189 629.575 380.084 624.682 375.426 590.798C373.487 576.699 376.927 556.345 384.979 546.337C402.271 524.845 436.858 547.724 412.709 574.22C399.166 589.079 376.807 580.378 361.028 573.937C337.768 564.444 324.952 542.605 313.052 516.325C307.008 502.978 289.592 433.975 292.966 435.723"
                fill="none" stroke="#ECBD27" strokeWidth="5" strokeLinecap="round"
              />
              {/* Arrow 1 arrowhead */}
              <path
                d="M284.037 411.272C287.466 413.225 313.391 429.254 310.403 426.773C306.492 423.526 302.22 420.684 298.619 416.847C294.359 412.309 289.34 409.175 285.472 404.086C282.078 399.62 279.588 431.393 280.152 437.011"
                fill="none" stroke="#ECBD27" strokeWidth="5" strokeLinecap="round"
              />
            </g>

            {/*
              Arrow 2: Right arrow (→ Manufacturing, top-right segment)
              Body: line 21, Arrowhead: line 22
            */}
            <g transform="scale(0.1443, 0.1407)">
              {/* Arrow 2 body */}
              <path
                d="M625 630.762C644.116 638.469 697.918 661.496 737.383 616.868C753.804 598.298 771.314 567.695 773.606 548.777C778.528 508.149 720.653 519.151 717.398 570.959C715.572 600.013 746.725 601.431 769.018 602.012C801.88 602.867 837.062 580.075 875.901 550.505C895.626 535.488 983.869 449.43 978.72 449.826"
                fill="none" stroke="#ECBD27" strokeWidth="5" strokeLinecap="round"
              />
              {/* Arrow 2 arrowhead */}
              <path
                d="M1012.73 421.011C1007.31 421.661 965.084 428.337 970.602 426.681C977.825 424.512 984.99 423.13 992.511 419.948C1001.41 416.183 1009.62 414.847 1018.69 410.072C1026.65 405.883 996.458 451.903 990.121 459.43"
                fill="none" stroke="#ECBD27" strokeWidth="5" strokeLinecap="round"
              />
            </g>

            {/*
              Arrow 3: Down arrow (→ Import, bottom segment)
              Body: line 19, Arrowhead: line 20
            */}
            <g transform="scale(0.1443, 0.1407)">
              {/* Arrow 3 body */}
              <path
                d="M490.566 667C489.151 684.093 484.556 732.811 509.39 740.336C519.723 743.467 535.694 741.853 544.621 734.803C563.793 719.663 552.335 683.66 528.223 705.109C514.7 717.138 517.502 739.883 519.707 755.961C522.956 779.66 537.304 794.161 555.165 808.148C564.235 815.251 613.468 838.373 612.716 834.903"
                fill="none" stroke="#ECBD27" strokeWidth="5" strokeLinecap="round"
              />
              {/* Arrow 3 arrowhead */}
              <path
                d="M629.697 845.809C628.799 842.267 621.058 815.378 622.429 818.532C624.224 822.66 625.651 827.108 627.944 830.983C630.656 835.567 632.178 840.776 635.372 845.022C638.175 848.747 613.731 848.437 609.578 847.393"
                fill="none" stroke="#ECBD27" strokeWidth="5" strokeLinecap="round"
              />
            </g>
          </g>
        </svg>

        {/* ── Description & Stats — absolutely centred over the SVG ── */}
        <div
          className="absolute inset-0 flex flex-col items-center pointer-events-none"
          style={{
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.5s ease',
            zIndex: 50,
          }}
        >
          {/* Top spacer for title area */}
          <div className="h-20 md:h-36" />

          {/* Description - Centered between Title and Stats */}
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="w-full max-w-4xl text-center">
              <p
                className="text-base md:text-xl leading-relaxed tracking-wide"
                style={{ color: 'white', fontFamily: "'General Sans', sans-serif", fontWeight: 500, textShadow: shadow, whiteSpace: 'pre-line' }}
              >
                {renderParagraph()}
              </p>
            </div>
          </div>

          {/* Stats - At the bottom */}
          <div className="w-full max-w-5xl px-6 pb-6 md:pb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span
                    className="font-black leading-none flex items-baseline"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', fontFamily: "'Arial Black', sans-serif", textShadow: shadow }}
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
    </section>
  )
}