import { useEffect, useState } from 'react'

const PageLoader = () => {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const increment = prev < 60 ? 4 : prev < 85 ? 3 : 2
        return Math.min(prev + increment, 100)
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => setVisible(false), 600)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [progress])

  if (!visible) return null

  return (
    <div
      className={`page-loader ${fadeOut ? 'page-loader--fade-out' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: '#0E5F13',
        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? 'scale(1.05)' : 'scale(1)',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      {/* Ambient glow effects */}
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 189, 39, 0.15) 0%, transparent 70%)',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
          animation: 'loaderPulseGlow 2s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 189, 39, 0.08) 0%, transparent 70%)',
          bottom: '30%',
          right: '35%',
          filter: 'blur(50px)',
          animation: 'loaderPulseGlow 2.5s ease-in-out infinite reverse',
        }}
      />

      {/* Spinner */}
      <div
        style={{
          position: 'relative',
          width: '80px',
          height: '80px',
          marginBottom: '32px',
        }}
      >
        {/* Outer ring */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          style={{
            position: 'absolute',
            inset: 0,
            animation: 'loaderSpin 2s linear infinite',
          }}
        >
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="rgba(236, 189, 39, 0.12)"
            strokeWidth="3"
          />
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="url(#loaderGrad1)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="165 55"
          />
          <defs>
            <linearGradient id="loaderGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ECBD27" />
              <stop offset="100%" stopColor="#d4a520" />
            </linearGradient>
          </defs>
        </svg>

        {/* Inner ring */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          style={{
            position: 'absolute',
            inset: 0,
            animation: 'loaderSpin 1.5s linear infinite reverse',
          }}
        >
          <circle
            cx="40"
            cy="40"
            r="25"
            fill="none"
            stroke="rgba(236, 189, 39, 0.06)"
            strokeWidth="2"
          />
          <circle
            cx="40"
            cy="40"
            r="25"
            fill="none"
            stroke="url(#loaderGrad2)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="80 77"
          />
          <defs>
            <linearGradient id="loaderGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ECBD27" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f5d657" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center dot */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#ECBD27',
            boxShadow: '0 0 20px rgba(236, 189, 39, 0.5)',
            animation: 'loaderPulseGlow 1.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* Brand name */}
      <div
        style={{
          fontFamily: "'General Sans', sans-serif",
          fontSize: '18px',
          fontWeight: 600,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          background: 'linear-gradient(135deg, #ECBD27, #f5d657)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '24px',
        }}
      >
        Yhaenu PLC
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: '200px',
          height: '2px',
          background: 'rgba(236, 189, 39, 0.1)',
          borderRadius: '999px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #ECBD27, #f5d657, #ECBD27)',
            backgroundSize: '200% 100%',
            borderRadius: '999px',
            transition: 'width 0.15s ease-out',
            animation: 'loaderShimmer 1.5s linear infinite',
            boxShadow: '0 0 12px rgba(236, 189, 39, 0.4)',
          }}
        />
      </div>

      {/* Percentage */}
      <div
        style={{
          marginTop: '12px',
          fontFamily: "'General Sans', sans-serif",
          fontSize: '12px',
          fontWeight: 500,
          color: 'rgba(236, 189, 39, 0.4)',
          letterSpacing: '1px',
        }}
      >
        {progress}%
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes loaderSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes loaderPulseGlow {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes loaderShimmer {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}

export default PageLoader
