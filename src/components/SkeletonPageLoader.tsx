import { useEffect, useState } from 'react'

export default function SkeletonPageLoader({ path }: { path: string }) {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Show skeleton, then trigger fade out transition
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true)
      const removeTimeout = setTimeout(() => {
        setVisible(false)
      }, 500) // 500ms fade transition
      return () => clearTimeout(removeTimeout)
    }, 700) // Keep visible for 700ms

    return () => clearTimeout(fadeTimeout)
  }, [path])

  if (!visible) return null

  // Render custom premium wireframes depending on the active page path
  const renderSkeleton = () => {
    switch (path) {
      case '/about':
        return (
          <div className="space-y-16 max-w-[1400px] mx-auto px-6 md:px-20 py-8">
            {/* About Page Hero Skeleton */}
            <div className="w-full h-[50vh] bg-neutral-100 rounded-3xl relative overflow-hidden animate-pulse flex flex-col justify-end p-8 md:p-16 border border-neutral-200/50">
              <div className="h-6 w-1/4 bg-neutral-200 rounded mb-4" />
              <div className="h-12 w-2/3 bg-neutral-200 rounded mb-6" />
              <div className="h-4 w-1/2 bg-neutral-200 rounded" />
            </div>
            
            {/* Journey Timeline Section Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-8">
              <div className="space-y-6">
                <div className="h-5 w-1/5 bg-[#0E5F13]/10 rounded animate-pulse" />
                <div className="h-10 w-5/6 bg-neutral-200 rounded animate-pulse" />
                <div className="space-y-3 pt-4">
                  <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-neutral-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="w-full h-80 bg-neutral-100 rounded-3xl border border-neutral-200/50 animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-neutral-200/60" />
              </div>
            </div>
          </div>
        )
      case '/products':
        return (
          <div className="space-y-12 max-w-[1400px] mx-auto px-6 md:px-20 py-8">
            {/* Search and Category Filters Skeleton */}
            <div className="space-y-6">
              <div className="h-12 w-1/3 bg-neutral-200 rounded-lg animate-pulse" />
              <div className="flex flex-wrap gap-3">
                <div className="h-10 w-24 bg-neutral-100 rounded-full border border-neutral-200/50 animate-pulse" />
                <div className="h-10 w-32 bg-neutral-100 rounded-full border border-neutral-200/50 animate-pulse" />
                <div className="h-10 w-28 bg-neutral-100 rounded-full border border-neutral-200/50 animate-pulse" />
                <div className="h-10 w-36 bg-neutral-100 rounded-full border border-neutral-200/50 animate-pulse" />
              </div>
            </div>

            {/* Premium Products Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-neutral-200/50 bg-white rounded-3xl p-5 space-y-5 shadow-sm">
                  <div className="w-full h-56 bg-neutral-100 rounded-2xl animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ECBD27]/5 to-transparent animate-shimmer" style={{ animation: 'shimmerHorizontal 1.8s infinite linear' }} />
                  </div>
                  <div className="h-6 w-3/4 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-4 w-1/3 bg-neutral-100 rounded animate-pulse" />
                  <div className="space-y-2.5 pt-2">
                    <div className="h-3.5 w-full bg-neutral-100/80 rounded animate-pulse" />
                    <div className="h-3.5 w-11/12 bg-neutral-100/80 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case '/contact':
      case '/rfq':
        return (
          <div className="max-w-[1400px] mx-auto px-6 md:px-20 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Info Side Skeleton */}
            <div className="lg:col-span-5 space-y-8">
              <div className="h-12 w-4/5 bg-neutral-200 rounded animate-pulse" />
              <div className="space-y-4">
                <div className="h-4 w-full bg-neutral-100 rounded animate-pulse" />
                <div className="h-4 w-11/12 bg-neutral-100 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-neutral-100 rounded animate-pulse" />
              </div>
              <div className="w-full h-72 bg-neutral-100 rounded-3xl border border-neutral-200/50 animate-pulse" />
            </div>

            {/* Input Form Card Skeleton */}
            <div className="lg:col-span-7 border border-neutral-200/60 bg-white rounded-[32px] p-8 md:p-12 space-y-8 shadow-sm">
              <div className="h-8 w-1/3 bg-neutral-200 rounded animate-pulse" />
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="h-4 w-16 bg-neutral-100 rounded animate-pulse" />
                    <div className="h-12 w-full bg-neutral-100/50 border border-neutral-200/50 rounded-xl animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-16 bg-neutral-100 rounded animate-pulse" />
                    <div className="h-12 w-full bg-neutral-100/50 border border-neutral-200/50 rounded-xl animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse" />
                  <div className="h-12 w-full bg-neutral-100/50 border border-neutral-200/50 rounded-xl animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-28 bg-neutral-100 rounded animate-pulse" />
                  <div className="h-32 w-full bg-neutral-100/50 border border-neutral-200/50 rounded-xl animate-pulse" />
                </div>
              </div>
              <div className="h-12 w-40 bg-[#0E5F13]/10 rounded-xl animate-pulse" />
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-8 max-w-[1400px] mx-auto px-6 md:px-20 py-12">
            <div className="h-12 w-1/2 bg-neutral-200 rounded animate-pulse" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-neutral-100 rounded animate-pulse" />
              <div className="h-4 w-full bg-neutral-100 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-neutral-100 rounded animate-pulse" />
            </div>
          </div>
        )
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        background: '#FFFFFF',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: fadeOut ? 'scale(0.985)' : 'scale(1)',
        pointerEvents: 'none',
        overflowY: 'auto',
        paddingTop: '96px', // space underneath the floating Navbar
      }}
    >
      <div className="relative w-full h-full">
        {renderSkeleton()}
        
        {/* Seamless Shimmering Brand Progress Bar Accent at the top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden bg-neutral-100">
          <div 
            className="h-full bg-gradient-to-r from-transparent via-[#ECBD27] to-transparent"
            style={{
              width: '40%',
              animation: 'shimmerHorizontal 1.6s infinite linear',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes shimmerHorizontal {
          0% { transform: translateX(-150%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  )
}
