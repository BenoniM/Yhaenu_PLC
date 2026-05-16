import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Hls from 'hls.js'
import Footer from '../components/Footer'
import GridBackground from '../components/GridBackground'

const HLS_SRC = 'https://stream.mux.com/kF01v9aKFlY63i2GkQKQGDv5Y9PbMGdtQD92j5qJCYWU.m3u8'
const LOOP_END_OFFSET = 4 // seconds before end to restart loop

function NovaOrb({ size = 500, x = '50%', y = '50%', color1 = '#ECBD27', color2 = '#0E5F13', opacity = 0.15, duration = 9, delay = 0 }: {
  size?: number; x?: string; y?: string; color1?: string; color2?: string; opacity?: number; duration?: number; delay?: number
}) {
  return (
    <motion.div className="absolute pointer-events-none"
      style={{ width: size, height: size, left: x, top: y, transform: 'translate(-50%,-50%)', borderRadius: '50%',
        background: `radial-gradient(circle at 40% 40%, ${color1}, ${color2} 50%, transparent 70%)`,
        filter: 'blur(60px)', opacity, zIndex: 0 }}
      animate={{ scale: [1, 1.15, 0.95, 1.1, 1], x: [0, 30, -20, 15, 0], y: [0, -20, 25, -10, 0] }}
      transition={{ duration, ease: 'easeInOut', repeat: Infinity, delay }}
    />
  )
}

const inquiryTypes = ['General', 'Import', 'Export', 'Manufacturing', 'Transportation', 'Hospitality']

const contactInfo = [
  { icon: '📍', label: 'Head Office', value: 'Selam City Mall, Office #601, 602, 603\nAddis Ababa, Ethiopia' },
  { icon: '📞', label: 'Phone', value: '+251 911 761 855' },
  { icon: '✉️', label: 'Email', value: 'yhaenuplc@gmail.com\nyhaenu2016@gmail.com' },
  { icon: '🌐', label: 'Website', value: 'www.yhaenuplc.com' },
]

const socialLinks = [
  { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/company/yhaenu-plc/', handle: 'yhaenu-plc' },
  { icon: '📸', label: 'Instagram', href: 'https://instagram.com/yhaenu_coffee', handle: '@yhaenu_coffee' },
  { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/251911761855', handle: '+251 911 761 855' },
]

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

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 12,
    border: '1px solid rgba(14,95,19,0.2)',
    background: '#fff',
    color: '#0E5F13',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'inherit',
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden flex flex-col justify-end" style={{ minHeight: '50vh', background: '#0E5F13' }}>
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
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 pb-16 w-full">
          <motion.p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#ECBD27', fontFamily: 'monospace' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Get In Touch
          </motion.p>
          <motion.h1 className="font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#F3F6FA', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Contact <span style={{ color: '#ECBD27' }}>Us</span>
          </motion.h1>
          <motion.p className="text-lg max-w-xl" style={{ color: 'rgba(243,246,250,0.75)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            Reach out to our team for inquiries about import, export, manufacturing, or any of our services.
          </motion.p>
        </div>
      </section>

      {/* ── Contact Info + Form ── */}
      <section className="relative overflow-hidden py-20" style={{ background: '#F3F6FA' }}>
        <NovaOrb size={500} x="90%" y="20%" color1="#ECBD27" color2="#F3F6FA" opacity={0.2} duration={9} delay={1} />
        <NovaOrb size={400} x="5%" y="80%" color1="#0E5F13" color2="#F3F6FA" opacity={0.1} duration={11} delay={3} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          {/* Left — info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-8 bg-[#ECBD27]" />
              <span className="text-xs tracking-[0.4em] uppercase font-bold" style={{ color: '#ECBD27', fontFamily: 'monospace' }}>Our Details</span>
            </div>
            <h2 className="font-black uppercase leading-none mb-8"
              style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0E5F13', letterSpacing: '-0.02em' }}>
              We'd Love to<br /><span style={{ color: '#ECBD27' }}>Hear From You</span>
            </h2>

            <div className="flex flex-col gap-5 mb-10">
              {contactInfo.map((info, i) => (
                <motion.div key={i} className="flex items-start gap-4 rounded-2xl p-5"
                  style={{ background: '#fff', border: '1px solid rgba(14,95,19,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}>
                  <span className="text-2xl flex-shrink-0">{info.icon}</span>
                  <div>
                    <p className="font-black uppercase text-xs mb-1" style={{ fontFamily: "'Arial Black', sans-serif", color: '#ECBD27' }}>{info.label}</p>
                    <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(14,95,19,0.8)' }}>{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="font-black uppercase text-xs mb-4" style={{ fontFamily: "'Arial Black', sans-serif", color: '#0E5F13' }}>Follow Us</p>
              <div className="flex flex-col gap-3">
                {socialLinks.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:scale-[1.02]"
                    style={{ background: '#0E5F13', color: '#ECBD27', textDecoration: 'none' }}>
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <p className="font-black uppercase text-xs" style={{ fontFamily: "'Arial Black', sans-serif" }}>{s.label}</p>
                      <p className="text-xs" style={{ color: 'rgba(243,246,250,0.7)' }}>{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="rounded-2xl p-8" style={{ background: '#fff', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', border: '1px solid rgba(14,95,19,0.1)' }}>
              {submitted ? (
                <motion.div className="text-center py-12" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <span className="text-6xl block mb-4">✅</span>
                  <h3 className="font-black uppercase text-xl mb-2" style={{ fontFamily: "'Arial Black', sans-serif", color: '#0E5F13' }}>Message Sent!</h3>
                  <p style={{ color: 'rgba(14,95,19,0.7)' }}>We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h3 className="font-black uppercase text-lg mb-2" style={{ fontFamily: "'Arial Black', sans-serif", color: '#0E5F13' }}>Send a Message</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle} />
                    </div>
                    <div>
                      <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+251..." style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Inquiry Type</label>
                    <select name="inquiry" value={form.inquiry} onChange={handleChange} style={inputStyle}>
                      {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Subject *</label>
                    <input name="subject" required value={form.subject} onChange={handleChange} placeholder="What is this about?" style={inputStyle} />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Message *</label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Tell us more about your inquiry..."
                      style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>

                  <motion.button type="submit"
                    className="w-full py-4 rounded-full font-black uppercase text-sm tracking-wide"
                    style={{ background: '#0E5F13', color: '#ECBD27', fontFamily: "'Arial Black', sans-serif", border: '2px solid #ECBD27' }}
                    whileHover={{ scale: 1.02, background: '#ECBD27', color: '#0E5F13' }}
                    whileTap={{ scale: 0.98 }}>
                    Send Message →
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Map placeholder ── */}
      <section className="relative overflow-hidden" style={{ background: '#0E5F13', height: 320 }}>
        <NovaOrb size={600} x="50%" y="50%" color1="#ECBD27" color2="#0a3d0a" opacity={0.1} duration={12} />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <span className="text-5xl block mb-3">📍</span>
            <p className="font-black uppercase text-sm" style={{ fontFamily: "'Arial Black', sans-serif", color: '#ECBD27' }}>Selam City Mall, Office #601–603</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(243,246,250,0.6)' }}>Addis Ababa, Ethiopia</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wide"
              style={{ background: '#ECBD27', color: '#0E5F13' }}>
              View on Map →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
