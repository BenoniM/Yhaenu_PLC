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
    image: '/products1.jpeg',
    type: 'Export',
    category: 'Specialty Coffee',
    badge: 'Export Grade',
    detail: 'Yirgacheffe · Sidama · Jimma · Harar',
  },
  {
    title: 'Oilseeds & Pulses',
    shortTitle: 'Oilseeds',
    description: 'High-quality Ethiopian sesame seeds, lentils, and other oilseeds exported to international markets with full traceability.',
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
    image: '/products3.jpeg',
    type: 'Manufacturing',
    category: 'Packaging',
    badge: 'ISO Standard',
    detail: 'Custom · Bulk · Retail',
  },
  {
    title: 'Industrial Materials',
    shortTitle: 'Industrial',
    description: 'Sourcing and importing essential industrial materials and goods to support Ethiopia\'s growing manufacturing and construction sectors.',
    image: '/products4.jpeg',
    type: 'Import',
    category: 'Industrial',
    badge: 'Certified',
    detail: 'Machinery · Equipment · Materials',
  },
  {
    title: 'Transportation Fleet',
    shortTitle: 'Logistics',
    description: 'Reliable fleet of vehicles providing seamless goods transportation across Ethiopia, ensuring timely and secure delivery.',
    image: '/products5.jpeg',
    type: 'Logistics',
    category: 'Transportation',
    badge: 'Nationwide',
    detail: 'Freight · Warehousing · Distribution',
  },
  {
    title: 'South Star Hotel',
    shortTitle: 'Hospitality',
    description: 'A 4-star hotel in Hawassa offering memorable experiences through modern, welcoming hospitality for business and leisure travelers.',
    image: '/products6.jpg',
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
}: {
  product: (typeof products)[0]
  cardRef: (el: HTMLDivElement | null) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start', // Push to top
        padding: '80px 80px 0 60px', // Moved top-left
        gap: '80px', // Good breathing room
        opacity: 0, // GSAP controls this
      }}
    >
      {/* ── IMAGE SECTION ── */}
      <div
        className="card-image-wrapper"
        style={{
          height: '65%', // Smaller overall size
          aspectRatio: '3/4', // EXACT ORIGINAL SHAPE, locked.
          flexShrink: 0, // Don't allow flex to squish the aspect ratio
          position: 'relative',
          padding: '12px',
          border: '1px solid rgba(236,189,39,0.3)',
          boxSizing: 'border-box',
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
        className="card-text"
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          textAlign: 'left',
          height: '65%',
        }}
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
          style={{
            fontSize: 15,
            color: 'rgba(243,246,250,0.85)',
            lineHeight: 1.7,
            marginBottom: 24,
            maxWidth: '90%',
          }}
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
          end: '+=450%', // Significantly reduced total scroll distance
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
      const STAGGER = 0.15 // Time gap between each card sequence
      const TRANSIT = 0.12 // Duration of the animation
      // The hold is now very short (STAGGER - TRANSIT = 0.03) to keep things moving
      const CARD_START = 0.2

      products.forEach((_, i) => {
        const wrapper = cardRefs.current[i]
        if (!wrapper) return

        // Determine when this card's enter/exit transition happens
        const syncTime = CARD_START + i * STAGGER

        // Enter animation for cards 1 to N
        if (i > 0) {
          // Enter from bottom-right exactly at syncTime
          tl.to(wrapper, { opacity: 1, x: 0, y: 0, ease: 'power1.inOut', duration: TRANSIT }, syncTime)
        }

        // Exit animation for all but the last card
        if (i < products.length - 1) {
          // The exit happens exactly at the same syncTime for the NEXT card
          const exitTime = CARD_START + (i + 1) * STAGGER

          // Whole card moves to top-left
          tl.to(wrapper, { opacity: 0, x: '-40vw', y: '-40vh', ease: 'power1.inOut', duration: TRANSIT }, exitTime)
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
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '75%', // Expanded to 75% width
            height: '100%',
            zIndex: 20,
            background: 'linear-gradient(160deg, #0c4a10 0%, #0E5F13 40%, #0a3d0e 100%)',
            boxShadow: '-8px 0 60px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <GridBackground color="#ECBD27" gridSize={60} opacity={0.08} isVisible={true} />

          {/* Overlapping Card Slot */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              margin: '0 40px 40px',
              borderRadius: 24,
              zIndex: 10,
            }}
          >
            {products.map((product, i) => (
              <PanelCard
                key={product.title}
                product={product}
                cardRef={(el) => { cardRefs.current[i] = el }}
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

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
