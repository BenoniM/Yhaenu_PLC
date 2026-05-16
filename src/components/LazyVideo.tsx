import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface LazyVideoProps {
  src?: string
  poster?: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
  children?: React.ReactNode
  style?: React.CSSProperties
  opacity?: number
}

export default function LazyVideo({
  src,
  poster,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  children,
  style,
  opacity = 1,
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '200px' })

  return (
    <div ref={containerRef} className={className} style={{ ...style, position: 'relative' }}>
      {isInView ? (
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          transition={{ duration: 1 }}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          className="w-full h-full object-cover"
        >
          {children}
        </motion.video>
      ) : (
        // Placeholder with poster image while not in view
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: poster ? `url(${poster})` : 'none',
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}
        />
      )}
    </div>
  )
}
