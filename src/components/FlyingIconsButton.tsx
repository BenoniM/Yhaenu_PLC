import { useState, useRef, startTransition } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface FlyingIcon {
  id: number
  // absolute page coords
  startX: number
  startY: number
  angle: number
  speed: number
  rotation: number
}

interface Props {
  label?: string
  href?: string
  buttonColor?: string
  hoverButtonColor?: string
  textColor?: string
  hoverTextColor?: string
  iconColor?: string
  iconSize?: number
  flySpeed?: number
  fadeSpeed?: number
  spreadDistance?: number
  borderRadius?: number
  paddingX?: number
  paddingY?: number
  fontSize?: string
  fontFamily?: string
}

export default function FlyingIconsButton({
  label = 'Get in Touch',
  href = '/contact',
  buttonColor = '#ECBD27',
  hoverButtonColor = '#0E5F13',
  textColor = '#0E5F13',
  hoverTextColor = '#ECBD27',
  iconColor = '#ECBD27',
  iconSize = 32,
  flySpeed = 0.9,
  fadeSpeed = 0.8,
  spreadDistance = 140,
  borderRadius = 999,
  paddingX = 36,
  paddingY = 18,
  fontSize = '0.8rem',
  fontFamily = "'Arial Black', sans-serif",
}: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const [icons, setIcons] = useState<FlyingIcon[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const iconIdCounter = useRef(0)
  const lastSpawnPos = useRef<{ x: number; y: number } | null>(null)
  const navigate = useNavigate()

  const handleMouseEnter = (_e: React.MouseEvent) => {
    startTransition(() => setIsHovered(true))

    // Burst all icons at once from button center
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    const burstCount = 10
    const newIcons: FlyingIcon[] = Array.from({ length: burstCount }, (_, i) => ({
      id: iconIdCounter.current++,
      startX: cx + (Math.random() - 0.5) * rect.width * 0.6,
      startY: cy + (Math.random() - 0.5) * rect.height * 0.6,
      angle: (i / burstCount) * 360 + (Math.random() - 0.5) * 30,
      speed: 0.7 + Math.random() * 0.4,
      rotation: (Math.random() - 0.5) * 540,
    }))

    startTransition(() => setIcons(newIcons))
  }

  const handleMouseMove = (_e: React.MouseEvent) => {
    // no-op — burst only on enter
  }

  const handleMouseLeave = () => {
    startTransition(() => {
      setIsHovered(false)
      setIcons([])
      lastSpawnPos.current = null
    })
  }

  const handleAnimationComplete = (id: number) => {
    startTransition(() => setIcons(prev => prev.filter(icon => icon.id !== id)))
  }

  const handleClick = () => {
    navigate(href)
  }

  return (
    <>
      <div
        style={{ position: 'relative', display: 'inline-block' }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <button
          ref={buttonRef}
          onClick={handleClick}
          style={{
            backgroundColor: isHovered ? hoverButtonColor : buttonColor,
            color: isHovered ? hoverTextColor : textColor,
            border: `2px solid #ECBD27`,
            padding: `${paddingY}px ${paddingX}px`,
            borderRadius,
            cursor: 'pointer',
            transition: 'background-color 0.25s ease, color 0.25s ease',
            fontSize,
            fontFamily,
            fontWeight: 900,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            boxShadow: '0 4px 20px rgba(236,189,39,0.3)',
          }}
        >
          {label}
        </button>
      </div>

      {/* Portal — renders icons at document.body level, escaping all overflow:hidden */}
      {createPortal(
        <>
          {icons.map(icon => {
            const radians = icon.angle * Math.PI / 180
            const distance = spreadDistance * 2.5
            const dx = Math.cos(radians) * distance
            const dy = Math.sin(radians) * distance

            return (
              <motion.div
                key={icon.id}
                initial={{ x: icon.startX, y: icon.startY, opacity: 1, scale: 1, rotate: 0 }}
                animate={{
                  x: icon.startX + dx,
                  y: icon.startY + dy,
                  opacity: 0,
                  scale: 0.4,
                  rotate: icon.rotation,
                }}
                transition={{
                  duration: flySpeed * icon.speed,
                  ease: 'easeOut',
                  opacity: { duration: fadeSpeed * icon.speed },
                }}
                onAnimationComplete={() => handleAnimationComplete(icon.id)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  pointerEvents: 'none',
                  zIndex: 99999,
                }}
              >
                {/* Mail icon — matching the Framer original */}
                <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={iconColor} xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
                </svg>
              </motion.div>
            )
          })}
        </>,
        document.body
      )}
    </>
  )
}
