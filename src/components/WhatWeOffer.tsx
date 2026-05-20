import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import productsVideo from '../assets/products/13962252_3840_2160_60fps (1).mp4'
import GridBackground from './GridBackground'

gsap.registerPlugin(ScrollTrigger)

// ── Product data ──────────────────────────────────────────────────────────────
const products = [
  {
    title: 'Green Coffee Beans',
    shortTitle: 'Coffee',
    description: 'Premium Ethiopian Arabica green coffee — washed and natural processed from Yirgacheffe, Sidama, Jimma, and Harar regions.',
    longDescription: 'Our green coffee beans are sourced from the finest high-altitude regions of Ethiopia. With meticulous quality control, we ensure every batch meets export grade standards, offering the rich, distinct flavor profiles that Ethiopian coffee is famous for worldwide.',
    features: ['Washed & Natural Processed', 'Fully Traceable', 'High Altitude Grown', 'Direct from Farmers'],
    image: 'src/assets/about/export.jpg',
    type: 'Export',
    category: 'Specialty Coffee',
    badge: 'Export Grade',
    detail: 'Yirgacheffe · Sidama · Jimma · Harar',
  },
  {
    title: 'Oilseeds & Pulses',
    shortTitle: 'Oilseeds',
    description: 'High-quality Ethiopian sesame seeds, lentils, and other oilseeds exported to international markets with full traceability.',
    longDescription: 'We export premium Ethiopian oilseeds and pulses, renowned for their nutritional value and purity. Our state-of-the-art cleaning and sorting facilities guarantee a product that meets strict international food safety standards.',
    features: ['99% Purity Minimum', 'Mechanically Cleaned', 'Organically Grown', 'Bulk Packaging Options'],
    image: '/products2.jpeg',
    type: 'Export',
    category: 'Oil Seeds',
    badge: 'Export Grade',
    detail: 'Humera · Wollega · Tigray',
  },
  {
    title: 'Cardboard Packaging',
    shortTitle: 'Packaging',
    description: 'Manufacturing high-quality cardboard and carton packaging products that meet global standards for local and international clients.',
    longDescription: 'Our manufacturing division produces durable, customizable cardboard and carton packaging. We cater to various industries, providing sustainable packaging solutions that protect goods during transit and enhance brand presentation.',
    features: ['Corrugated Cartons', 'Custom Printing', 'Eco-Friendly Materials', 'Industrial & Retail Packaging'],
    image: 'src/assets/about/manufacturing.jpg',
    type: 'Manufacturing',
    category: 'Packaging',
    badge: 'ISO Standard',
    detail: 'Custom · Bulk · Retail',
  },
  {
    title: 'Transportation Fleet',
    shortTitle: 'Logistics',
    description: 'Reliable fleet of vehicles providing seamless goods transportation across Ethiopia, ensuring timely and secure delivery.',
    longDescription: 'With a robust fleet of modern trucks, our logistics division ensures safe and timely delivery of goods across Ethiopia. We handle both dry freight and specialized cargo, offering end-to-end supply chain solutions.',
    features: ['GPS Tracked Fleet', 'Experienced Drivers', 'Heavy Duty Transport', 'Warehousing Services'],
    image: 'src/assets/about/transportation2.jpg',
    type: 'Logistics',
    category: 'Transportation',
    badge: 'Nationwide',
    detail: 'Freight · Warehousing · Distribution',
  },
  {
    title: 'South Star Hotel',
    shortTitle: 'Hospitality',
    description: 'A 4-star hotel in Hawassa offering memorable experiences through modern, welcoming hospitality for business and leisure travelers.',
    longDescription: 'South Star International Hotel in Hawassa is a beacon of luxury and comfort. Whether for business conferences or leisurely getaways, our 4-star amenities, exceptional dining, and dedicated staff provide an unforgettable experience.',
    features: ['Luxury Accommodations', 'Conference Facilities', 'Fine Dining Restaurants', 'Swimming Pool & Spa'],
    image: 'src/assets/about/hospitality.jpg',
    type: 'Hospitality',
    category: 'Hotel & Leisure',
    badge: '4-Star',
    detail: 'Hawassa · Sister Company',
  },
]

// ── Side-by-Side Product Card ─────────────────────────────────────────────────
function PanelCard({
  product,
  cardRef,
  onExplore,
}: {
  product: (typeof products)[0]
  cardRef: (el: HTMLDivElement | null) => void
  onExplore: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute inset-0 flex flex-col md:flex-row items-center md:items-start pt-12 md:pt-[80px] px-6 md:pl-[60px] md:pr-[80px] gap-6 md:gap-[80px]"
      style={{
        opacity: 0, // GSAP controls this
      }}
    >
      {/* ── IMAGE SECTION ── */}
      <div
        className="relative shrink-0 p-2 md:p-3 box-border h-[40%] md:h-[65%]"
        style={{
          aspectRatio: '3/4', // EXACT ORIGINAL SHAPE, locked.
          border: '1px solid rgba(236,189,39,0.3)',
        }}
      >
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 60%, rgba(10,45,12,0.8) 100%)',
            }}
          />
          {/* Badge */}
          <span
            style={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              background: '#ECBD27',
              color: '#0E5F13',
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '6px 12px',
              fontFamily: "'Arial Black', sans-serif",
            }}
          >
            {product.badge}
          </span>
        </div>
      </div>

      {/* ── TEXT SECTION ── */}
      <div
        className="flex-1 flex flex-col justify-start items-center md:items-start text-center md:text-left h-auto md:h-[65%] w-full"
      >
        <div style={{ width: '100%', height: '1px', background: 'rgba(236,189,39,0.4)', marginBottom: '20px' }} />

        <h3
          style={{
            fontFamily: "'Arial Black', sans-serif",
            color: '#F3F6FA',
            fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          {product.title}
        </h3>

        <div style={{ width: '100%', height: '1px', background: 'rgba(236,189,39,0.4)', marginBottom: '24px' }} />

        <p
          className="text-sm md:text-[15px] text-[#F3F6FA]/85 leading-relaxed mb-6 max-w-full md:max-w-[90%]"
        >
          {product.description}
        </p>

        <p
          style={{
            fontSize: 11,
            color: 'rgba(236,189,39,0.8)',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            marginBottom: 32,
            fontFamily: 'monospace',
          }}
        >
          {product.type} · {product.detail}
        </p>

        <button
          onClick={onExplore}
          className="relative overflow-hidden group border border-[#ECBD27]/30 hover:border-[#ECBD27] transition-colors duration-300 rounded-full px-8 py-3"
        >
          <div className="absolute inset-0 bg-[#ECBD27] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 text-[#ECBD27] group-hover:text-[#0E5F13] font-bold text-xs uppercase tracking-widest transition-colors duration-300">
            Explore More
          </span>
        </button>
      </div>
    </div>
  )
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function WhatWeOffer() {
  const containerRef = useRef<HTMLDivElement>(null) // scroll driver
  const sectionRef = useRef<HTMLDivElement>(null)  // pinned screen
  const heroTextRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)   // green panel sliding from right
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const [activeProduct, setActiveProduct] = useState<(typeof products)[0] | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const section = sectionRef.current
    const heroText = heroTextRef.current
    const panel = panelRef.current
    if (!container || !section || !heroText || !panel) return

    // Initial states
    gsap.set(panel, { x: '100%' })

    // Set up child elements within cards
    cardRefs.current.forEach((wrapper, i) => {
      if (!wrapper) return

      if (i === 0) {
        gsap.set(wrapper, { opacity: 1, x: 0, y: 0 })
      } else {
        // Next products appear from bottom-right
        gsap.set(wrapper, { opacity: 0, x: '40vw', y: '40vh' })
      }
    })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=600%', // Increased scroll distance to accommodate equalized hold times
          pin: section,
          anticipatePin: 1,
          scrub: 0.5, // Reduced scrub delay for snappier scrolling connection
        },
      })

      // Phase 1: Hero text fades out & Green panel slides in from the right
      tl.to(heroText, { opacity: 0, y: -50, ease: 'none', duration: 0.1 }, 0)
      tl.fromTo(
        panel,
        { x: '100%' },
        { x: '0%', ease: 'power2.out', duration: 0.2 },
        0
      )

      // Phase 2: Sequential card transitions
      const PANEL_ARRIVE = 0.2  // Time when panel is fully in place
      const HOLD_0 = 0.02       // Drastically shortened hold for the first card since it's already read while sliding in
      const HOLD = 0.15         // Amount of scrolling time subsequent cards stay fully readable
      const TRANSIT = 0.10      // Amount of scrolling time the slide-in/out animation takes

      products.forEach((_, i) => {
        const wrapper = cardRefs.current[i]
        if (!wrapper) return

        if (i === 0) {
          // Card 0 is already visible. It exits almost immediately after the panel arrives to prevent the "weird" stall.
          const exitTime = PANEL_ARRIVE + HOLD_0
          tl.to(wrapper, { opacity: 0, x: '-40vw', y: '-40vh', ease: 'power1.inOut', duration: TRANSIT }, exitTime)
        } else {
          // Calculate enter time dynamically based on the first card's unique shorter hold
          const enterTime = PANEL_ARRIVE + HOLD_0 + (i - 1) * (TRANSIT + HOLD)
          
          tl.to(wrapper, { opacity: 1, x: 0, y: 0, ease: 'power1.inOut', duration: TRANSIT }, enterTime)

          // Calculate exit time for all but the very last card
          if (i < products.length - 1) {
            const exitTime = enterTime + TRANSIT + HOLD
            tl.to(wrapper, { opacity: 0, x: '-40vw', y: '-40vh', ease: 'power1.inOut', duration: TRANSIT }, exitTime)
          }
        }
      })

    }, container)

    return () => ctx.revert()
  }, [])

  return (
    // Scroll driver: tall enough to house the entire pinned scroll journey
    <div ref={containerRef}>
      {/* Pinned viewport */}
      <div
        ref={sectionRef}
        style={{
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        {/* ── Background video ── */}
        <video
          src={productsVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.75,
          }}
        />

        {/* Dark overlay for legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(14,95,19,0.35) 0%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* ── Hero centred text ── */}
        <div
          ref={heroTextRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            pointerEvents: 'none',
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          {/* Eye-brow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ height: 2, width: 40, background: '#ECBD27', display: 'block' }} />
            <span
              style={{
                color: '#ECBD27',
                fontSize: 11,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                fontWeight: 700,
              }}
            >
              What We Offer
            </span>
            <span style={{ height: 2, width: 40, background: '#ECBD27', display: 'block' }} />
          </div>

          {/* Main heading */}
          <h2
            style={{
              fontFamily: "'Arial Black', sans-serif",
              color: '#F3F6FA',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              textShadow: '0 4px 40px rgba(0,0,0,0.6)',
              marginBottom: 24,
            }}
          >
            Our{' '}
            <span style={{ color: '#ECBD27' }}>Products</span>
          </h2>

          {/* Sub-copy */}
          <p
            style={{
              color: 'rgba(243,246,250,0.72)',
              fontSize: 'clamp(0.9rem, 1.6vw, 1.15rem)',
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            Hover over each card to explore.{' '}
            <span style={{ color: '#ECBD27' }}>Click "Inquire Now"</span>{' '}
            to request a quote.
          </p>

          {/* Scroll cue */}
          <div
            style={{
              position: 'absolute',
              bottom: 36,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 9,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(243,246,250,0.5)',
                fontFamily: 'monospace',
              }}
            >
              Scroll to explore
            </span>
            <div
              style={{
                width: 1.5,
                height: 36,
                background: 'linear-gradient(to bottom, rgba(236,189,39,0.8), transparent)',
                animation: 'pulse 1.8s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* ── Green panel (slides in from right) ── */}
        <div
          ref={panelRef}
          className="absolute top-0 right-0 h-full w-full md:w-[75%] z-20 flex flex-col overflow-hidden shadow-[-8px_0_60px_rgba(0,0,0,0.5)]"
          style={{
            background: 'linear-gradient(160deg, #0c4a10 0%, #0E5F13 40%, #0a3d0e 100%)',
          }}
        >
          <GridBackground color="#ECBD27" gridSize={60} opacity={0.08} isVisible={true} />

          {/* Overlapping Card Slot */}
          <div
            className="flex-1 relative mx-6 md:mx-[40px] mb-6 md:mb-[40px] rounded-[24px] z-10"
          >
            {products.map((product, i) => (
              <PanelCard
                key={product.title}
                product={product}
                cardRef={(el) => { cardRefs.current[i] = el }}
                onExplore={() => setActiveProduct(product)}
              />
            ))}
          </div>
        </div>

        {/* Left side accent — thin gold vertical line */}
        <div
          style={{
            position: 'absolute',
            left: 32,
            top: '50%',
            transform: 'translateY(-50%)',
            height: '40%',
            width: 1.5,
            background: 'linear-gradient(to bottom, transparent, #ECBD27, transparent)',
            zIndex: 5,
          }}
        />
      </div>

      {/* ── Detail Panel Overlay ── */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          activeProduct ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop blur */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500" 
          onClick={() => setActiveProduct(null)}
        />

        {/* Slide-in content panel */}
        <div
          className={`absolute top-0 left-0 h-full w-full md:w-[75%] bg-[#0E5F13] shadow-[20px_0_60px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-y-auto overflow-x-hidden ${
            activeProduct ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{
            background: 'linear-gradient(145deg, #0c4a10 0%, #0E5F13 50%, #0a3d0e 100%)',
          }}
        >
          <GridBackground color="#ECBD27" gridSize={40} opacity={0.06} isVisible={true} />
          
          <div className="relative z-10 px-8 py-12 md:px-16 h-full flex flex-col">
            <button 
              onClick={() => setActiveProduct(null)} 
              className="absolute top-16 md:top-24 right-8 md:right-16 text-[#ECBD27] border border-[#ECBD27] hover:bg-[#ECBD27] hover:text-[#0E5F13] transition-colors p-2 rounded-full z-20 shadow-lg bg-[#0E5F13]/50 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {activeProduct && (
              <div className="flex-1 flex flex-col md:flex-row gap-10 md:gap-16 items-start h-full pt-20 md:pt-28 pb-16">
                
                {/* Left Side: Text and Details */}
                <div className="w-full md:w-1/2 flex flex-col justify-center py-4">
                  <span className="inline-block self-start bg-[#ECBD27] text-[#0E5F13] text-[10px] font-black uppercase tracking-widest px-3 py-1 mb-6 font-['Arial_Black']">
                    {activeProduct.badge}
                  </span>

                  <h2 className="text-[#F3F6FA] text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[1.1] mb-6 font-['Arial_Black']">
                    {activeProduct.title}
                  </h2>

                  <div className="w-full h-px bg-[#ECBD27]/30 mb-6" />

                  <p className="text-[#F3F6FA]/90 text-sm md:text-base leading-relaxed mb-8">
                    {activeProduct.longDescription}
                  </p>

                  <h3 className="text-[#ECBD27] text-xs uppercase tracking-widest font-bold mb-4 font-mono">
                    Key Features
                  </h3>
                  
                  <ul className="space-y-3 mb-10">
                    {activeProduct.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-[#F3F6FA]/80 text-sm">
                        <span className="w-1.5 h-1.5 bg-[#ECBD27] rounded-full mr-4 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full md:w-max px-12 bg-[#ECBD27] hover:bg-[#F3F6FA] text-[#0E5F13] transition-colors duration-300 font-black text-sm uppercase tracking-widest py-4 rounded-full font-['Arial_Black'] shadow-lg">
                    Inquire Now
                  </button>
                </div>

                {/* Right Side: Image */}
                <div className="w-full md:w-1/2 h-[30vh] md:h-[70%] md:sticky md:top-28 relative rounded-2xl overflow-hidden border border-[#ECBD27]/20 flex-shrink-0 shadow-2xl">
                  <img 
                    src={activeProduct.image} 
                    alt={activeProduct.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0E5F13]/80 via-transparent to-transparent mix-blend-multiply" />
                  <div className="absolute inset-0 border border-[#ECBD27]/10 rounded-2xl" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
