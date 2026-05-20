import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import journeyVideo from '../assets/journey/13844771_3840_2160_25fps (1).mp4'
import GridBackground from './GridBackground'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  { year: '2003', event: 'Yhaenu PLC is founded in Addis Ababa, Ethiopia' },
  { year: '2007', event: 'Expansion into manufacturing — cardboard and carton products' },
  { year: '2012', event: 'Transportation division launched, growing the logistics fleet' },
  { year: '2016', event: 'South Star International Hotel opens in Hawassa' },
  { year: '2020', event: 'Entry into coffee farming and international export markets' },
  { year: '2024', event: 'Operations now span 15+ countries across Africa and beyond' },
]

// One Unsplash image per milestone — swaps in ONLY when that year appears
const MILESTONE_IMAGES = [
  'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=1600&q=80', // 2003 – Addis / founding
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80', // 2007 – manufacturing
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80', // 2012 – logistics
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80', // 2016 – hotel
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80', // 2020 – coffee
  'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1600&q=80', // 2024 – global
]

const SIDES: ('right' | 'left')[] = ['right', 'right', 'right', 'left', 'left', 'left']

export default function JourneySection() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const sectionRef    = useRef<HTMLDivElement>(null)
  const videoRef      = useRef<HTMLVideoElement>(null)
  const titleRef      = useRef<HTMLDivElement>(null)

  // ── Visual cover (green bg + images + grid) ─────────────────────────────────
  // Separate from the label panel so we can apply an SVG clip-path that
  // cuts the rhombus hole cleanly, letting the video show through.
  const coverRef      = useRef<HTMLDivElement>(null)

  // ── Label panel (transparent container — just positions the milestone text) ──
  const panelRef      = useRef<HTMLDivElement>(null)
  const boxRef        = useRef<HTMLDivElement>(null)
  const holeRef       = useRef<HTMLDivElement>(null) // tracks skewX value for GSAP

  // ── SVG clip-path that punches the rhombus out of coverRef ──────────────────
  const clipPathElRef = useRef<SVGPathElement>(null)

  const mRefs     = useRef<(HTMLDivElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    const section   = sectionRef.current
    const video     = videoRef.current
    const title     = titleRef.current
    const cover     = coverRef.current
    const panel     = panelRef.current
    const box       = boxRef.current
    const hole      = holeRef.current
    const clipEl    = clipPathElRef.current
    if (!container || !section || !video || !title || !cover || !panel || !box || !hole || !clipEl) return

    // ── Initial states ────────────────────────────────────────────────────────
    gsap.set([panel, cover], { x: '-100%' })
    gsap.set(box, { left: '4%' })
    gsap.set(hole, { skewX: -12 })
    mRefs.current.forEach(el  => el && gsap.set(el,  { opacity: 0, y: 10 }))
    imageRefs.current.forEach(el => el && gsap.set(el, { opacity: 0 }))

    // ── Proxy objects for video scrub + panel progress ────────────────────────
    const proxyT        = { t: 0 }
    const proxyPanel    = { progress: 0 }   // 0 = fully left, 1 = fully on-screen

    // Init the clip-path once so there's no flash
    clipEl.setAttribute('clip-rule', 'evenodd')
    updateClipPath()

    // ── Clip-path updater — runs every animation frame via gsap.ticker ────────
    function updateClipPath() {
      if (!box || !hole || !section || !clipEl) return
      const sW = section.offsetWidth
      const sH = section.offsetHeight
      if (!sW || !sH) return

      // Convert panel progress → pixel translation of cover (matches x: '-100%' → '0%')
      const panelX = -sW * (1 - proxyPanel.progress)

      // Box left (GSAP writes CSS directly): e.g. '4%', '37%', '62%'
      const leftPx = (parseFloat(box.style.left || '4') / 100) * sW
      const absLeft = panelX + leftPx

      const topPx    = 0.12 * sH
      const widthPx  = 0.26 * sW
      const heightPx = 0.76 * sH

      const skewDeg  = (gsap.getProperty(hole, 'skewX') as number) ?? -12
      const tanSkew  = Math.tan((skewDeg * Math.PI) / 180)

      // Four corners of the skewed rhombus hole in section coordinates
      const tlx = absLeft + topPx * tanSkew,          tly = topPx
      const trx = absLeft + widthPx + topPx * tanSkew, tr_y = topPx
      const blx = absLeft + (topPx + heightPx) * tanSkew,          bly = topPx + heightPx
      const brx = absLeft + widthPx + (topPx + heightPx) * tanSkew, br_y = topPx + heightPx

      // Even-odd path: outer rect fills cover; inner polygon subtracts the hole
      const d = [
        `M0,0 L${sW},0 L${sW},${sH} L0,${sH} Z`,
        `M${tlx},${tly} L${trx},${tr_y} L${brx},${br_y} L${blx},${bly} Z`,
      ].join(' ')

      clipEl.setAttribute('d', d)
    }

    gsap.ticker.add(updateClipPath)

    // ── Main scroll-driven timeline ───────────────────────────────────────────
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end:   '+=520%',
          pin:    section,
          anticipatePin: 1,
          scrub:  0.8,
        },
      })

      // Phase 1 (0→10%): title fades out
      tl.to(title, { opacity: 0, y: -40, ease: 'none', duration: 0.10 }, 0)

      // Phase 2 (0→38%): green box slides in FIRST — cover + labels together
      tl.fromTo([cover, panel], { x: '-100%' }, { x: '0%', ease: 'power2.out', duration: 0.38 }, 0)
      // Mirror into the proxy so clip-path can track the slide-in position
      tl.fromTo(proxyPanel, { progress: 0 }, { progress: 1, ease: 'power2.out', duration: 0.38 }, 0)

      // Phase 3 (38→100%): video scrub
      tl.to(proxyT, {
        t: 1, ease: 'none', duration: 0.62,
        onUpdate() { if (video.duration) video.currentTime = proxyT.t * video.duration },
      }, 0.38)

      // Box movement: left → center → right
      tl.to(box, { left: '37%', ease: 'none', duration: 0.12 }, 0.38)
      tl.to(box, { left: '62%', ease: 'none', duration: 0.22 }, 0.78)

      // Rhombus shape flip (skew reversal at midpoint)
      tl.to(hole, { skewX: 12, ease: 'power2.inOut', duration: 0.10 }, 0.60)

      // Milestone schedule — labels AND background images only appear here
      const F = 0.03   // fade duration
      const H = 0.05   // hold before fade-out

      const schedule = [
        { idx: 0, start: 0.38 }, // RIGHT — rect moving left→center
        { idx: 1, start: 0.46 }, // RIGHT — rect near center
        { idx: 2, start: 0.54 }, // RIGHT — fully paused at center
        { idx: 3, start: 0.65 }, // LEFT  — still paused at center
        { idx: 4, start: 0.78 }, // LEFT  — rect resuming right
        { idx: 5, start: 0.89 }, // LEFT  — rect near right edge
      ]

      schedule.forEach(({ idx, start }) => {
        const el  = mRefs.current[idx]
        const img = imageRefs.current[idx]
        if (!el) return

        // Milestone text: slide up to appear, slide up to disappear
        tl.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0,   ease: 'power1.out', duration: F }, start)
        tl.to(el,                             { opacity: 0, y: -16,  ease: 'power1.in',  duration: F }, start + F + H)

        // Background image fades in when year appears, fades out when it leaves
        // Blur is CONSTANT (8px) — only opacity moves
        if (img) {
          tl.to(img, { opacity: 1, ease: 'power1.out', duration: F }, start)
          if (idx < MILESTONES.length - 1) {
            tl.to(img, { opacity: 0, ease: 'power1.in', duration: F }, start + F + H)
          }
          // Last image stays at opacity:1 until scroll ends
        }
      })
    }, container)

    return () => {
      ctx.revert()
      gsap.ticker.remove(updateClipPath)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <div ref={sectionRef} className="h-screen overflow-hidden bg-black relative">

        {/* ── Background video (shows through the rhombus hole) ── */}
        <video
          ref={videoRef}
          src={journeyVideo}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)',
            zIndex: 1,
          }}
        />

        {/* ── Title (fades as panel slides in) ── */}
        <div
          ref={titleRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ zIndex: 20 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-[2px] w-8 bg-[#ECBD27]" />
            <span
              className="text-[#ECBD27] text-xs tracking-[0.4em] uppercase font-bold"
              style={{ fontFamily: 'monospace' }}
            >
              Our Journey
            </span>
            <span className="h-[2px] w-8 bg-[#ECBD27]" />
          </div>
          <h2
            className="font-black uppercase text-center text-white leading-[1.05]"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.03em',
              textShadow: '0 2px 30px rgba(0,0,0,0.5)',
            }}
          >
            Building Ethiopia,<br />
            <span style={{ color: '#ECBD27' }}>One Milestone</span><br />
            at a Time
          </h2>
        </div>

        {/* ────────────────────────────────────────────────────────────────────
            SVG clip-path definition.
            The <path> uses an even-odd combined shape:
              outer rect (full section)  + inner rhombus (the hole).
            The intersection is excluded → the rhombus is transparent,
            showing the video behind coverRef.
        ──────────────────────────────────────────────────────────────────── */}
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', width: 0, height: 0, overflow: 'visible' }}
        >
          <defs>
            <clipPath id="journey-panel-clip" clipPathUnits="userSpaceOnUse">
              <path ref={clipPathElRef} d="" clipRule="evenodd" />
            </clipPath>
          </defs>
        </svg>

        {/* ── Visual cover: green + per-milestone images + grid ──────────────
            Slides in from left (same animation as panelRef).
            SVG clip-path cuts the rhombus hole so video shows through.
            Grid/glow lives ONLY here — on the green box, nowhere else.
        ──────────────────────────────────────────────────────────────────── */}
        <div
          ref={coverRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ zIndex: 25, clipPath: 'url(#journey-panel-clip)' }}
        >
          {/* Solid brand-green background (the "green box") */}
          <div style={{ position: 'absolute', inset: 0, background: '#0E5F13', zIndex: 0 }} />

          {/* Blurred Unsplash images — appear ONLY when their milestone does.
              Blur (8px) is a constant CSS filter; opacity is what GSAP animates.
              Scale(1.04) hides the blur-edge bleed without changing composition. */}
          {MILESTONE_IMAGES.map((url, i) => (
            <div
              key={`img-${i}`}
              ref={el => { imageRefs.current[i] = el }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px) brightness(0.7)',
                transform: 'scale(1.04)',
                opacity: 0,
                zIndex: 1,
                willChange: 'opacity',
              }}
            />
          ))}

          {/* Grid + glow — ONLY on the green box (per user request) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
            <GridBackground color="#ECBD27" gridSize={60} opacity={0.09} isVisible={true} />
          </div>
        </div>

        {/* ── Label panel: transparent container, just positions milestone text ──
            Slides in identically to coverRef so labels align with the cover.
            holeRef inside boxRef has NO boxShadow — visuals are handled by coverRef.
        ──────────────────────────────────────────────────────────────────── */}
        <div
          ref={panelRef}
          className="absolute inset-0 overflow-visible pointer-events-none"
          style={{ zIndex: 30 }}
        >
          <div
            ref={boxRef}
            style={{
              position: 'absolute',
              top: '12%',
              height: '76%',
              width: '26%',
              left: '4%',
              overflow: 'visible',
              zIndex: 3,
            }}
          >
            {/* holeRef: transparent div used only so GSAP can animate skewX for clip-path tracking */}
            <div
              ref={holeRef}
              style={{ position: 'absolute', inset: 0, zIndex: 1 }}
            />

            {/* Milestone labels — positioned outside the box to left/right */}
            {MILESTONES.map((m, i) => {
              const isRight = SIDES[i] === 'right'
              return (
                <div
                  key={i}
                  ref={el => { mRefs.current[i] = el }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    ...(isRight
                      ? { left: 'calc(100% + 24px)', right: 'auto' }
                      : { right: 'calc(100% + 24px)', left: 'auto' }),
                    width: '22vw',
                    zIndex: 3,
                    opacity: 0,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isRight ? 'flex-start' : 'flex-end',
                    gap: 8,
                  }}>
                    <span style={{
                      fontFamily: "'Arial Black', sans-serif",
                      color: '#ECBD27',
                      fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                      fontWeight: 900,
                      lineHeight: 1,
                      textShadow: '0 2px 20px rgba(0,0,0,0.6)',
                    }}>
                      {m.year}
                    </span>
                    <p style={{
                      color: 'rgba(243,246,250,0.92)',
                      fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
                      lineHeight: 1.65,
                      textAlign: isRight ? 'left' : 'right',
                      textShadow: '0 1px 10px rgba(0,0,0,0.5)',
                    }}>
                      {m.event}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
