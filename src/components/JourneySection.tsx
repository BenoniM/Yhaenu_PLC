import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import journeyVideo from '../assets/journey/13844771_3840_2160_25fps (1).mp4'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  { year: '2003', event: 'Yhaenu PLC is founded in Addis Ababa, Ethiopia' },
  { year: '2007', event: 'Expansion into manufacturing — cardboard and carton products' },
  { year: '2012', event: 'Transportation division launched, growing the logistics fleet' },
  { year: '2016', event: 'South Star International Hotel opens in Hawassa' },
  { year: '2020', event: 'Entry into coffee farming and international export markets' },
  { year: '2024', event: 'Operations now span 15+ countries across Africa and beyond' },
]

// Items 0-2 on RIGHT of rect, items 3-5 on LEFT
const SIDES: ('right' | 'left')[] = ['right', 'right', 'right', 'left', 'left', 'left']

export default function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const panelRef   = useRef<HTMLDivElement>(null)
  const boxRef     = useRef<HTMLDivElement>(null)  // the moving container (rect + text)
  const mRefs      = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const video   = videoRef.current
    const title   = titleRef.current
    const panel   = panelRef.current
    const box     = boxRef.current
    if (!section || !video || !title || !panel || !box) return

    gsap.set(panel, { x: '-100%' })
    gsap.set(box,   { left: '4%' })
    mRefs.current.forEach(el => el && gsap.set(el, { opacity: 0, y: 10 }))

    const proxy = { t: 0 }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=520%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.8,
        },
      })

      // Phase 1 (0→10%): title out
      tl.to(title, { opacity: 0, y: -40, ease: 'none', duration: 0.10 }, 0)

      // Phase 2 (12→38%): panel slides in from left
      tl.fromTo(panel, { x: '-100%' }, { x: '0%', ease: 'none', duration: 0.26 }, 0.12)

      // Phase 3 (38→100%): video scrub
      tl.to(proxy, {
        t: 1, ease: 'none', duration: 0.62,
        onUpdate() { if (video.duration) video.currentTime = proxy.t * video.duration },
      }, 0.38)

      // ── Moving box: rect + text travel together ──────────────────────────
      // Rect width 26%. Screen center = (100-26)/2 = 37% → left edge at 37%
      // Left phase  (0.38→0.50): 4% → 37%  (rect reaches true center)
      tl.to(box, { left: '37%', ease: 'none', duration: 0.12 }, 0.38)
      // Center pause (0.50→0.78): held at 37%  ← BOTH item 3 (right) and item 4 (left) appear during this pause
      // Right phase  (0.78→1.0):  37% → 62%
      tl.to(box, { left: '62%', ease: 'none', duration: 0.22 }, 0.78)

      // Items 0-2: RIGHT side while rect moves left→center
      // Items 3-5: LEFT side while rect moves center→right
      // Switch happens at center pause (tl time 0.50-0.78)
      const F = 0.03
      const H = 0.05

      const schedule = [
        { idx: 0, start: 0.38 }, // RIGHT — appears with rect from the start
        { idx: 1, start: 0.46 }, // RIGHT — rect moving toward center
        { idx: 2, start: 0.54 }, // RIGHT — fully paused at center
        { idx: 3, start: 0.65 }, // LEFT  — STILL fully paused at center
        { idx: 4, start: 0.78 }, // LEFT  — rect resumes moving right WITH the fifth item
        { idx: 5, start: 0.89 }, // LEFT  — rect near right edge
      ]

      schedule.forEach(({ idx, start }) => {
        const el = mRefs.current[idx]
        if (!el) return
        tl.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: 'none', duration: F }, start)
        tl.to(el, { opacity: 0, ease: 'none', duration: F }, start + F + H)
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="h-screen overflow-hidden bg-black relative">

      <video ref={videoRef} src={journeyVideo} muted playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
      }} />

      {/* Title */}
      <div ref={titleRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <div className="flex items-center gap-3 mb-5">
          <span className="h-[2px] w-8 bg-[#ECBD27]" />
          <span className="text-[#ECBD27] text-xs tracking-[0.4em] uppercase font-bold"
            style={{ fontFamily: 'monospace' }}>Our Journey</span>
          <span className="h-[2px] w-8 bg-[#ECBD27]" />
        </div>
        <h2 className="font-black uppercase text-center text-white leading-[1.05]" style={{
          fontFamily: "'Arial Black', sans-serif",
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          letterSpacing: '-0.03em',
          textShadow: '0 2px 30px rgba(0,0,0,0.5)',
        }}>
          Building Ethiopia,<br />
          <span style={{ color: '#ECBD27' }}>One Milestone</span><br />
          at a Time
        </h2>
      </div>

      {/* Green panel — slides in from left */}
      <div ref={panelRef} className="absolute inset-0 z-30 overflow-hidden pointer-events-none">

        {/* ── Moving box: the rect window + text labels as ONE unit ── */}
        <div ref={boxRef} style={{
          position: 'absolute',
          top: '12%',
          height: '76%',
          width: '26%',
          left: '4%',
          overflow: 'visible',   // text extends outside the box bounds
          zIndex: 2,
        }}>
          {/* Transparent window — box-shadow creates the green cover */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'transparent',
            boxShadow: '0 0 0 200vmax #0E5F13',
            zIndex: 1,
          }} />

          {/* Milestone labels — stacked, one visible at a time */}
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
                  // Right: just outside right edge of box
                  // Left:  just outside left edge of box
                  ...(isRight
                    ? { left: 'calc(100% + 24px)', right: 'auto' }
                    : { right: 'calc(100% + 24px)', left: 'auto' }),
                  width: '22vw',        // constrained so text never clips off screen
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
  )
}
