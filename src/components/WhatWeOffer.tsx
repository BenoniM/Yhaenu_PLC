import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import productsVideo from '../assets/products/13962252_3840_2160_60fps (1).mp4'
import DOMPurify from 'dompurify'
import { Loader2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

import exportImg from '../assets/about/export.jpg'
import manufacturingImg from '../assets/about/manufacturing.jpg'
import transportationImg from '../assets/about/transportation2.jpg'
import hospitalityImg from '../assets/about/hospitality.jpg'

export interface ProductLocation {
  address: string
}

export interface ProductData {
  id: string
  title: string
  subtitle: string | null
  description: string
  category: string
  subcategory: string
  location: ProductLocation[]
  images?: string[]
  image_url?: string
  created_at: string
  updated_at: string
}

const imageMap: Record<string, string> = {
  'Green Coffee Beans': exportImg,
  'Oilseeds & Pulses': '/products2.jpeg',
  'Cardboard Packaging': manufacturingImg,
  'Transportation Fleet': transportationImg,
  'South Star International Hotel': hospitalityImg
}

export default function WhatWeOffer() {
  const [products, setProducts] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeProduct, setActiveProduct] = useState<ProductData | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // ── Fetch Data ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_LINK}/products`)
        if (!res.ok) throw new Error('Failed to fetch products')
        const data = await res.json()
        
        // Sort by created_at ascending to match original order
        const sorted = data.sort((a: ProductData, b: ProductData) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        
        setProducts(sorted)
      } catch (err) {
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // ── GSAP image-swap ScrollTrigger ──────────────────────────────────────────
  useEffect(() => {
    if (loading || products.length === 0) return

    let raf1: number
    let raf2: number

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const ctx = gsap.context(() => {
          const imageEls = gsap.utils.toArray<HTMLElement>('.prod-img-wrap')
          const itemEls  = gsap.utils.toArray<HTMLElement>('.prod-item')

          if (imageEls.length === 0 || itemEls.length === 0) return

          // Initial states
          gsap.set(imageEls[0], { clipPath: 'inset(0 0 0% 0)' })
          const img0 = imageEls[0].querySelector('img')
          if (img0) gsap.set(img0, { scale: 1 })

          imageEls.slice(1).forEach((wrap) => {
            gsap.set(wrap, { clipPath: 'inset(0 0 100% 0)' })
            const imgEl = wrap.querySelector('img')
            if (imgEl) gsap.set(imgEl, { scale: 1.15 })
          })

          itemEls.forEach((item, i) =>
            gsap.set(item, { opacity: i === 0 ? 1 : 0.25 })
          )

          // Activate helper — sets both text opacity and image clip instantly
          const activateProduct = (activeIdx: number) => {
            itemEls.forEach((el, i) => {
              gsap.to(el, {
                opacity: i === activeIdx ? 1 : 0.25,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto',
              })
            })

            imageEls.forEach((wrap, i) => {
              const imgEl = wrap.querySelector('img')
              const isPast        = i < activeIdx
              const isActiveOrPast = i <= activeIdx
              const isFuture      = i > activeIdx

              gsap.to(wrap, {
                clipPath: isActiveOrPast
                  ? 'inset(0% 0% 0% 0%)'
                  : 'inset(0% 0% 100% 0%)',
                duration: 0.4,
                ease: 'power2.inOut',
                overwrite: 'auto',
              })

              if (imgEl) {
                gsap.to(imgEl, {
                  scale:  isFuture ? 1.15 : isPast ? 0.95 : 1,
                  filter: isPast ? 'brightness(0.5)' : 'brightness(1)',
                  duration: 0.4,
                  ease: 'power2.inOut',
                  overwrite: 'auto',
                })
              }
            })
          }

          // Single master ScrollTrigger on the left column — drives both
          // text opacity AND image swap from the same scroll position
          let lastActive = 0
          const leftCol = sectionRef.current?.querySelector('.prod-left-col')
          if (leftCol) {
            ScrollTrigger.create({
              trigger: leftCol,
              start: 'top top',
              end: 'bottom bottom',
              onUpdate: (self) => {
                const p = self.progress
                const n = itemEls.length
                // Map progress to product index based on exactly how many 100vh blocks we've scrolled
                const idx = Math.min(n - 1, Math.max(0, Math.round(p * (n - 1))))
                if (idx !== lastActive) {
                  lastActive = idx
                  activateProduct(idx)
                }
              },
              invalidateOnRefresh: true,
            })
          }

          ScrollTrigger.refresh()
        }, sectionRef)

        return () => ctx.revert()
      })
    })

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [loading, products])

  const getProductImage = (product: ProductData) => {
    if (product.images && product.images.length > 0) return product.images[0]
    if (product.image_url) return product.image_url
    return imageMap[product.title] || '/products2.jpeg'
  }

  if (loading) {
    return (
      <section className="bg-[#0E5F13] min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#ECBD27]" />
      </section>
    )
  }

  return (
    <>
    <section id="products" ref={sectionRef} className="bg-[#0E5F13]">
      {/* ── Section header ───────────────────────────────────── */}
      <div className="px-6 md:px-8 lg:px-10 xl:px-12 pt-20 pb-0">
        <p className="text-[#ECBD27] text-xl font-black tracking-[0.25em] uppercase mb-4 font-['Arial_Black']">
          What We Offer
        </p>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-[#F3F6FA] max-w-3xl font-['Arial_Black'] uppercase">
          Our{' '}
          <span className="text-[#ECBD27]">Products</span>
        </h2>
      </div>

      {/* ── Desktop split layout ───────────────────────────────────────── */}
      <div className="hidden md:flex items-start">
        {/* LEFT: one card per product, each exactly 100vh tall */}
        <div className="prod-left-col w-1/2 pl-6 md:pl-8 lg:pl-10 xl:pl-12 pr-10 lg:pr-16">
          {products.map((product, i) => (
            <div
              key={product.id || i}
              className="prod-item h-screen flex flex-col justify-center
                         border-t border-white/[0.08] last:border-b
                         group cursor-default"
            >
              {/* Number + tag */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-[15px] font-black tracking-[0.25em] text-[#ECBD27] uppercase font-['Arial_Black']">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[14px] font-bold tracking-[0.2em] text-[#F3F6FA]/60 uppercase px-3 py-1 rounded-full border border-white/10">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-3xl lg:text-4xl font-black text-[#F3F6FA] leading-tight tracking-tight mt-5 mb-2 group-hover:text-[#ECBD27] transition-colors duration-300 uppercase font-['Arial_Black']">
                {product.title}
              </h3>

              {/* Badge + Detail */}
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-[#ECBD27] text-[#0E5F13] text-[10px] font-black uppercase tracking-widest px-3 py-1 font-['Arial_Black']">
                  {product.subcategory}
                </span>
                <span className="text-[11px] text-[#ECBD27]/70 uppercase tracking-[0.2em] font-mono">
                  {product.location?.map(l => l.address).join(' · ')}
                </span>
              </div>

              {/* Description & Features (Rich Text) */}
              <div 
                className="text-[#F3F6FA]/75 text-[15px] leading-relaxed font-light max-w-sm mb-8
                           [&>p]:mb-4 [&>ul]:space-y-2 [&>ul>li]:flex [&>ul>li]:items-center [&>ul>li]:gap-2 
                           [&>ul>li]:text-[13px] [&>ul>li]:text-[#F3F6FA]/60 [&>ul>li]:before:content-[''] 
                           [&>ul>li]:before:w-1.5 [&>ul>li]:before:h-1.5 [&>ul>li]:before:rounded-full 
                           [&>ul>li]:before:bg-[#ECBD27]/50 [&>ul>li]:before:shrink-0"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
              />

              {/* Explore button */}
              <button
                onClick={() => setActiveProduct(product)}
                className="group/btn relative overflow-hidden rounded-full border border-[#ECBD27] w-max px-8 py-3 text-center"
              >
                <div className="absolute inset-0 bg-[#ECBD27] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 text-[#ECBD27] group-hover/btn:text-[#0E5F13] font-black text-xs uppercase tracking-widest transition-colors duration-300 font-['Arial_Black']">
                  Explore More →
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT: CSS sticky image panel */}
        <div className="w-1/2 sticky top-0 h-screen overflow-hidden">
          <div className="relative w-full h-full">
            {/* Background video layer (always visible beneath image stack) */}
            <div className="absolute inset-0 z-0">
              <video
                src={productsVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-30"
              />
            </div>

            {/* Stacked image layers */}
            {products.map((product, i) => (
              <div
                key={product.id || i}
                className="prod-img-wrap absolute inset-0"
                style={{
                  zIndex: i + 1,
                  clipPath: i === 0 ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
                }}
              >
                <img
                  src={getProductImage(product)}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0E5F13]/20 via-transparent to-black/30" />

                {/* Counter label */}
                <div className="absolute bottom-8 right-8 text-white text-[11px] font-bold tracking-[0.2em] uppercase font-['Arial_Black']">
                  {String(i + 1).padStart(2, '0')} /{' '}
                  {String(products.length).padStart(2, '0')}
                </div>

                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{
                    background: 'linear-gradient(to bottom, #ECBD27, #f5d657)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile layout (stacked cards) ─────────────────── */}
      <div className="flex flex-col md:hidden px-5 pt-8 gap-10 pb-12">
        {products.map((product, i) => (
          <div key={product.id || i} className="flex flex-col">
            {/* Image */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 shadow-sm border border-[#ECBD27]/10">
              <img
                src={getProductImage(product)}
                alt={product.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Number + type pill */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-black tracking-[0.25em] text-[#ECBD27] uppercase font-['Arial_Black']">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-bold tracking-[0.15em] text-[#F3F6FA]/60 uppercase px-3 py-1.5 rounded-full border border-white/10 leading-none">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-black text-[#F3F6FA] leading-tight tracking-tight mb-2 uppercase font-['Arial_Black']">
              {product.title}
            </h3>

            {/* Badge */}
            <span className="inline-block w-max bg-[#ECBD27] text-[#0E5F13] text-[10px] font-black uppercase tracking-widest px-3 py-1 mb-4 font-['Arial_Black']">
              {product.subcategory}
            </span>

            {/* Description & Features */}
            <div 
              className="text-[#F3F6FA]/75 text-[14px] leading-relaxed font-light mb-6
                         [&>p]:mb-4 [&>ul]:space-y-3 [&>ul>li]:flex [&>ul>li]:items-center [&>ul>li]:gap-3 
                         [&>ul>li]:text-[14px] [&>ul>li]:text-[#F3F6FA]/60 [&>ul>li]:before:content-[''] 
                         [&>ul>li]:before:w-1.5 [&>ul>li]:before:h-1.5 [&>ul>li]:before:rounded-full 
                         [&>ul>li]:before:bg-[#ECBD27]/40 [&>ul>li]:before:shrink-0"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
            />

            {/* Explore button */}
            <button
              onClick={() => setActiveProduct(product)}
              className="group relative overflow-hidden rounded-full border border-[#ECBD27] w-full py-3 text-center"
            >
              <div className="absolute inset-0 bg-[#ECBD27] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 text-[#ECBD27] group-hover:text-[#0E5F13] font-black text-xs uppercase tracking-widest transition-colors duration-300 font-['Arial_Black']">
                Explore More →
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>

    {/* ── Detail Panel Overlay ── */}
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ${
        activeProduct ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500" 
        onClick={() => setActiveProduct(null)}
      />

      <div
        className={`absolute top-0 right-0 h-full w-full md:w-[75%] bg-[#0E5F13] shadow-[-20px_0_60px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-y-auto overflow-x-hidden ${
          activeProduct ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(145deg, #0c4a10 0%, #0E5F13 50%, #0a3d0e 100%)',
        }}
      >
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
                  {activeProduct.subcategory}
                </span>

                <h2 className="text-[#F3F6FA] text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[1.1] mb-6 font-['Arial_Black']">
                  {activeProduct.title}
                </h2>

                <div className="w-full h-px bg-[#ECBD27]/30 mb-6" />

                {/* Description & Features */}
                <div 
                  className="text-[#F3F6FA]/90 text-sm md:text-base leading-relaxed mb-10
                             [&>p]:mb-6 [&>ul]:space-y-3 [&>ul]:mt-8 [&>ul>li]:flex [&>ul>li]:items-center 
                             [&>ul>li]:text-[#F3F6FA]/80 [&>ul>li]:text-sm [&>ul>li]:before:content-[''] 
                             [&>ul>li]:before:w-1.5 [&>ul>li]:before:h-1.5 [&>ul>li]:before:rounded-full 
                             [&>ul>li]:before:bg-[#ECBD27] [&>ul>li]:before:mr-4 [&>ul>li]:before:shrink-0"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(activeProduct.description) }}
                />

                <button className="w-full md:w-max px-12 bg-[#ECBD27] hover:bg-[#F3F6FA] text-[#0E5F13] transition-colors duration-300 font-black text-sm uppercase tracking-widest py-4 rounded-full font-['Arial_Black'] shadow-lg mt-auto">
                  Inquire Now
                </button>
              </div>

              {/* Right Side: Image */}
              <div className="w-full md:w-1/2 h-[30vh] md:h-[70%] md:sticky md:top-28 relative rounded-2xl overflow-hidden border border-[#ECBD27]/20 flex-shrink-0 shadow-2xl">
                <img 
                  src={getProductImage(activeProduct)} 
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
    </>
  )
}
