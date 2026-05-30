import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hls from 'hls.js'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Footer from '../components/Footer'
import GridBackground from '../components/GridBackground'

const HLS_SRC = 'https://stream.mux.com/kF01v9aKFlY63i2GkQKQGDv5Y9PbMGdtQD92j5qJCYWU.m3u8'
const LOOP_END_OFFSET = 4 // seconds before end to restart loop

function NovaOrb({ size = 500, x = '50%', y = '50%', color1 = '#ECBD27', color2 = '#0E5F13', opacity = 0.15, duration = 9, delay = 0 }: {
  size?: number; x?: string; y?: string; color1?: string; color2?: string; opacity?: number; duration?: number; delay?: number
}) {
  return (
    <motion.div className="absolute pointer-events-none"
      style={{
        width: size, height: size, left: x, top: y, transform: 'translate(-50%,-50%)', borderRadius: '50%',
        background: `radial-gradient(circle at 40% 40%, ${color1}, ${color2} 50%, transparent 70%)`,
        filter: 'blur(60px)', opacity, zIndex: 0
      }}
      animate={{ scale: [1, 1.15, 0.95, 1.1, 1], x: [0, 30, -20, 15, 0], y: [0, -20, 25, -10, 0] }}
      transition={{ duration, ease: 'easeInOut', repeat: Infinity, delay }}
    />
  )
}

const inquiryTypes = ['General', 'Import', 'Export', 'Manufacturing', 'Transportation', 'Hospitality']

const contactInfo = [
  { icon: '📍', label: 'Head Office', value: 'Selam City Mall, Office #601, 602, 603\nAddis Ababa, Ethiopia', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' },
  { icon: '📞', label: 'Phone', value: '+251 911 761 855', image: 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&q=80&w=800' },
  { icon: '✉️', label: 'Email', value: 'yhaenuplc@gmail.com\nyhaenu2016@gmail.com', image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=800' },
  // { icon: '🌐', label: 'Website', value: 'www.yhaenuplc.com', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800' },
]

const socialLinks = [
  { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/company/yhaenu-plc/', handle: 'yhaenu-plc' },
  { icon: '📸', label: 'Instagram', href: 'https://instagram.com/yhaenu_coffee', handle: '@yhaenu_coffee' },
  { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/251911761855', handle: '+251 911 761 855' },
]

function ContactList() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.contact-item', {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2
    })
  }, { scope: containerRef })

  const handleEnter = (i: number) => {
    gsap.to(`.contact-content-${i}`, { height: 'auto', duration: 0.6, ease: 'power4.out' })
    gsap.to(`.contact-bg-${i}`, { scaleY: 1, duration: 0.5, ease: 'power3.out' })
    gsap.to(`.contact-icon-${i}`, { x: 10, duration: 0.4, ease: 'power2.out' })
  }
  const handleLeave = (i: number) => {
    gsap.to(`.contact-content-${i}`, { height: 0, duration: 0.5, ease: 'power3.inOut' })
    gsap.to(`.contact-bg-${i}`, { scaleY: 0, duration: 0.4, ease: 'power3.inOut' })
    gsap.to(`.contact-icon-${i}`, { x: 0, duration: 0.4, ease: 'power2.out' })
  }

  return (
    <div ref={containerRef} className="flex flex-col mb-10 border-t border-[rgba(14,95,19,0.2)]">
      {contactInfo.map((info, i) => (
        <div key={i}
          className="contact-item group relative border-b border-[rgba(14,95,19,0.2)] cursor-pointer overflow-hidden"
          onMouseEnter={() => handleEnter(i)}
          onMouseLeave={() => handleLeave(i)}>

          <div className={`contact-bg-${i} absolute inset-0 bg-[#0E5F13] origin-bottom scale-y-0`} />

          <div className="relative z-10 py-6 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">{info.icon}</span>
                <p className="font-black uppercase text-2xl sm:text-3xl transition-colors duration-500 text-[#0E5F13] group-hover:text-[#ECBD27]"
                  style={{ fontFamily: "'Arial Black', sans-serif", letterSpacing: '-0.02em' }}>
                  {info.label}
                </p>
              </div>
              <span className={`contact-icon-${i} text-[#0E5F13] group-hover:text-[#ECBD27] transition-colors duration-500 opacity-0 group-hover:opacity-100`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div>

            <div className={`contact-content-${i} h-0 overflow-hidden`}>
              <div className="pt-6 pb-2 flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-1">
                  <p className="text-lg leading-relaxed whitespace-pre-line font-medium text-[rgba(14,95,19,0.9)] group-hover:text-[rgba(243,246,250,0.9)] transition-colors duration-500">
                    {info.value}
                  </p>
                </div>
                <div className="w-full sm:w-56 h-36 rounded-xl overflow-hidden shadow-2xl relative border border-[rgba(255,255,255,0.1)]">
                  <div className="absolute inset-0 bg-[#0E5F13] mix-blend-overlay opacity-20 group-hover:opacity-0 transition-opacity duration-500 z-10" />
                  <img src={info.image} alt={info.label} className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700 ease-out" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function InputField({ label, required = false, children, isTextarea = false }: { label: string, required?: boolean, children: React.ReactNode, isTextarea?: boolean }) {
  return (
    <div className={`group relative flex flex-col sm:flex-row ${isTextarea ? 'sm:items-start pt-5 pb-6' : 'sm:items-center py-5'} border-b border-[rgba(14,95,19,0.3)]`}>
      <label className={`sm:w-1/3 font-bold text-[#0E5F13] mb-2 sm:mb-0 text-[1.1rem] transition-colors duration-300 group-focus-within:text-[#ECBD27] ${isTextarea ? 'pt-1' : ''}`}>
        {label} {required && '*'}
      </label>
      <div className="flex-1 w-full">
        {children}
      </div>
      <div className="absolute bottom-[-1px] left-0 w-0 h-[2px] bg-[#ECBD27] transition-all duration-500 ease-out group-focus-within:w-full z-10" />
    </div>
  )
}

function CustomSelect({ value, onChange, options, name }: { value: string, onChange: (e: any) => void, options: string[], name: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className="flex items-center justify-between cursor-pointer py-1"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <span className="text-[1.1rem] text-[#0E5F13]">{value}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0E5F13]">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-3 w-full bg-white shadow-2xl rounded-xl z-50 border border-[rgba(14,95,19,0.1)] overflow-hidden"
          >
            {options.map((opt) => (
              <div
                key={opt}
                className="px-5 py-3 hover:bg-[#F3F6FA] cursor-pointer text-[#0E5F13] transition-colors"
                onClick={() => {
                  onChange({ target: { name, value: opt } } as any)
                  setIsOpen(false)
                }}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', inquiry: 'General', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const setupHls = () => {
      if (Hls.isSupported()) {
        const hls = new Hls({
          lowLatencyMode: false,
          maxBufferLength: 120,
          maxMaxBufferLength: 240,
          backBufferLength: 0,
        })
        hlsRef.current = hls
        hls.loadSource(HLS_SRC)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => { })
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = HLS_SRC
        video.play().catch(() => { })
      }
    }

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - LOOP_END_OFFSET) {
        video.currentTime = 0
        video.play().catch(() => { })
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    setupHls()

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      hlsRef.current?.destroy()
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden flex flex-col justify-end" style={{ minHeight: '70vh', background: '#0E5F13' }}>
        {/* Background video */}
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.6 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,95,19,0.8) 0%, rgba(14,95,19,0.4) 50%, rgba(14,95,19,0.1) 100%)' }} />
        <GridBackground color="#ECBD27" gridSize={60} opacity={0.08} isVisible={true} />

        <NovaOrb size={600} x="80%" y="50%" color1="#ECBD27" color2="#0E5F13" opacity={0.15} duration={10} />
        <NovaOrb size={350} x="10%" y="60%" color1="#ECBD27" color2="#0a3d0a" opacity={0.1} duration={7} delay={2} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-20 w-full">
          <motion.p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#ECBD27', fontFamily: 'monospace' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Get In Touch
          </motion.p>
          <motion.h1 className="font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#F3F6FA', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Contact <span style={{ color: '#ECBD27' }}>Us</span>
          </motion.h1>
          <motion.p className="text-lg max-w-xl" style={{ color: 'rgba(243,246,250,0.75)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            Reach out to our team for inquiries about import, export, manufacturing, or any of our services.
          </motion.p>
          {/* Spacer to match the height of the "Request a Quote" button on the Products page */}
          <div style={{ height: 74 }} aria-hidden="true" />
        </div>
      </section>

      {/* ── Contact Info + Form ── */}
      <section className="relative overflow-hidden py-20" style={{ background: '#F3F6FA' }}>
        <NovaOrb size={500} x="90%" y="20%" color1="#ECBD27" color2="#F3F6FA" opacity={0.2} duration={9} delay={1} />
        <NovaOrb size={400} x="5%" y="80%" color1="#0E5F13" color2="#F3F6FA" opacity={0.1} duration={11} delay={3} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
          {/* Left — info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-8 bg-[#ECBD27]" />
              <span className="text-xs tracking-[0.4em] uppercase font-bold" style={{ color: '#ECBD27', fontFamily: 'monospace' }}>Our Details</span>
            </div>
            <h2 className="font-black uppercase leading-none mb-10"
              style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0E5F13', letterSpacing: '-0.02em' }}>
              We'd Love to<br /><span style={{ color: '#ECBD27' }}>Hear From You</span>
            </h2>

            <ContactList />

            {/* Social */}
            <div className="mt-8">
              <p className="font-black uppercase text-xs mb-5" style={{ fontFamily: "'Arial Black', sans-serif", color: '#0E5F13' }}>Follow Us</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full px-5 py-3 transition-all group overflow-hidden relative"
                    style={{ background: '#fff', border: '1px solid rgba(14,95,19,0.2)', textDecoration: 'none' }}>
                    <div className="absolute inset-0 bg-[#0E5F13] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="text-lg relative z-10 group-hover:scale-110 transition-transform duration-300">{s.icon}</span>
                    <p className="font-black uppercase text-xs relative z-10 group-hover:text-[#ECBD27] transition-colors duration-300" style={{ fontFamily: "'Arial Black', sans-serif", color: '#0E5F13' }}>{s.label}</p>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:pt-[4.5rem]">
            <div>
              {submitted ? (
                <motion.div className="text-center py-12" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <span className="text-6xl block mb-4">✅</span>
                  <h3 className="font-black uppercase text-xl mb-2" style={{ fontFamily: "'Arial Black', sans-serif", color: '#0E5F13' }}>Message Sent!</h3>
                  <p style={{ color: 'rgba(14,95,19,0.7)' }}>We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <div className='text-xl mb-10 font-bold capitalize text-[#0E5F13]'>Send Us A Message</div>


                  <div className="border-t border-[rgba(14,95,19,0.3)]">
                    <InputField label="Full Name" required>
                      <input name="name" required value={form.name} onChange={handleChange} placeholder="Full name"
                        className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)]" />
                    </InputField>

                    <InputField label="Email" required>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Your email"
                        className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)]" />
                    </InputField>

                    <InputField label="Phone">
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Your phone"
                        className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)]" />
                    </InputField>

                    <InputField label="Inquiry Type">
                      <CustomSelect name="inquiry" value={form.inquiry} onChange={handleChange} options={inquiryTypes} />
                    </InputField>

                    <InputField label="Subject" required>
                      <input name="subject" required value={form.subject} onChange={handleChange} placeholder="What is this about?"
                        className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)]" />
                    </InputField>

                    <InputField label="Message" required isTextarea>
                      <textarea name="message" required rows={3} value={form.message} onChange={handleChange} placeholder="Your message..."
                        className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)] resize-none" />
                    </InputField>
                  </div>

                  <div className="mt-8 flex">
                    <button type="submit"
                      className="group flex items-stretch border border-[rgba(14,95,19,0.4)] hover:border-[#0E5F13] bg-[rgba(14,95,19,0.02)] hover:bg-[#0E5F13] transition-all duration-300">
                      <span className="px-8 py-4 font-bold text-[1.1rem] text-[#0E5F13] group-hover:text-[#ECBD27] transition-colors duration-300">
                        Send Message
                      </span>
                      <span className="flex items-center justify-center px-5 border-l border-[rgba(14,95,19,0.4)] group-hover:border-[#0E5F13] text-[#0E5F13] group-hover:text-[#ECBD27] transition-all duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="relative overflow-hidden" style={{ background: '#0E5F13', height: 450 }}>
        <iframe
          src="https://maps.google.com/maps?q=Selam%20City%20Mall,%20Addis%20Ababa,%20Ethiopia&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        />
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ background: 'rgba(14,95,19,0.1)' }} />
      </section>

      <Footer />
    </>
  )
}
