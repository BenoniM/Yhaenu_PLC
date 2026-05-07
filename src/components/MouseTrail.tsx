import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
  life: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
}

function parseColor(col: string): { r: number; g: number; b: number } {
  if (col.startsWith('#')) {
    let hex = col.slice(1)
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    }
  }
  if (col.startsWith('rgb')) {
    const m = col.match(/\d+/g)
    return m ? { r: +m[0], g: +m[1], b: +m[2] } : { r: 0, g: 0, b: 0 }
  }
  return { r: 0, g: 0, b: 0 }
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailPointsRef = useRef<Point[]>([])
  const rafRef = useRef<number | null>(null)
  const timeRef = useRef(performance.now())

  // Config — brand colors
  const variant = 'particles'
  const trailColor = '#ECBD27'
  const trailColorEnd = '#0E5F13'
  const trailLength = 24
  const lineWidth = 2
  const fadeOut = true
  const smoothing = 0.3
  const particleCount = 5
  const particleSize = 3
  const spreadAngle = 40
  const drift = 0.3
  const autoFade = true
  const fadeDuration = 1.5
  const fillType = 'gradient'

  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Resize canvas to full window
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    // Pointer tracking
    const handlePointerMove = (e: PointerEvent) => {
      const points = trailPointsRef.current
      const last = points[points.length - 1]
      const s = Math.max(0.001, 1 - smoothing)
      const sx = last ? last.x + (e.clientX - last.x) * s : e.clientX
      const sy = last ? last.y + (e.clientY - last.y) * s : e.clientY

      points.push({ x: sx, y: sy, life: 1 })
      if (points.length > trailLength) points.splice(0, points.length - trailLength)

      // Spawn particles
      if (variant === 'particles' && last) {
        const dx = sx - last.x
        const dy = sy - last.y
        const speed = Math.hypot(dx, dy)
        if (speed > 2) {
          const angle = Math.atan2(dy, dx)
          const spread = spreadAngle * Math.PI / 180
          for (let i = 0; i < particleCount; i++) {
            const a = angle + (Math.random() - 0.5) * spread
            const v = speed * 0.1 + Math.random() * 2
            particlesRef.current.push({
              x: sx, y: sy,
              vx: Math.cos(a) * v,
              vy: Math.sin(a) * v,
              life: 0.8 + Math.random() * 0.4,
              size: particleSize + Math.random() * 1.5,
            })
          }
        }
      }
    }

    document.addEventListener('pointermove', handlePointerMove, { passive: true })

    // Animation loop
    const rgbStart = parseColor(trailColor)
    const rgbEnd = parseColor(trailColorEnd)

    const rgba = (a: number, t: number) => {
      if (fillType === 'gradient') {
        const r = rgbStart.r + (rgbEnd.r - rgbStart.r) * t
        const g = rgbStart.g + (rgbEnd.g - rgbStart.g) * t
        const b = rgbStart.b + (rgbEnd.b - rgbStart.b) * t
        return `rgba(${r | 0},${g | 0},${b | 0},${Math.max(0, Math.min(1, a))})`
      }
      return `rgba(${rgbStart.r},${rgbStart.g},${rgbStart.b},${Math.max(0, Math.min(1, a))})`
    }

    const indexAlpha = (i: number, n: number) => {
      if (!fadeOut) return 1
      const t = n <= 1 ? 1 : i / (n - 1)
      return 1 - (1 - t) * (1 - t)
    }

    const animate = () => {
      const now = performance.now()
      let dt = (now - timeRef.current) / 1000
      dt = Math.max(0, Math.min(dt, 0.05))
      timeRef.current = now

      const ctx = canvas.getContext('2d')
      if (!ctx) { rafRef.current = requestAnimationFrame(animate); return }

      const dpr = window.devicePixelRatio || 1
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const points = trailPointsRef.current

      // Age points
      if (autoFade && points.length) {
        const decay = dt / Math.max(0.001, fadeDuration)
        for (let i = points.length - 1; i >= 0; i--) {
          points[i].life -= decay
          if (points[i].life <= 0) points.splice(i, 1)
        }
      }

      // Particles
      const particles = particlesRef.current
      const damping = Math.pow(0.98, dt * 60)
      const g = drift * 60 * 0.001 * dt * 60
      const decayP = 1.6 * dt

      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i]
        pt.x += pt.vx * dt * 60
        pt.y += pt.vy * dt * 60
        pt.vx *= damping
        pt.vy = pt.vy * damping + g
        pt.life -= decayP
        if (pt.life <= 0) {
          particles[i] = particles[particles.length - 1]
          particles.pop()
        } else {
          ctx.fillStyle = rgba(pt.life, 1 - pt.life)
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, pt.size * pt.life, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Connecting lines between trail points
      if (points.length > 1) {
        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1]
          const p2 = points[i]
          const lifeFactor = autoFade ? points[i].life : 1
          const a = 0.15 * indexAlpha(i, points.length) * lifeFactor
          ctx.strokeStyle = rgba(a, i / (points.length - 1 || 1))
          ctx.lineWidth = Math.max(1, lineWidth * 0.5 * a)
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('pointermove', handlePointerMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      aria-hidden="true"
    />
  )
}
