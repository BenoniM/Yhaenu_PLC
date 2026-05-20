import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Footer from '../components/Footer'
import GridBackground from '../components/GridBackground'

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

const serviceOptions = [
  'Export — Green Coffee Beans',
  'Export — Oilseeds & Pulses',
  'Import — Industrial Materials',
  'Import — Machinery & Equipment',
  'Manufacturing — Cardboard Packaging',
  'Transportation & Logistics',
  'Hospitality — South Star Hotel',
  'Other',
]

const stepsData = [
  {
    num: '01',
    title: 'Fill the Form',
    desc: 'Provide your details and requirements.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop'
  },
  {
    num: '02',
    title: 'We Review',
    desc: 'Our team reviews your request within 24 hours.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop'
  },
  {
    num: '03',
    title: 'Get a Quote',
    desc: 'Receive a tailored quote for your needs.',
    image: 'https://images.pexels.com/photos/6950237/pexels-photo-6950237.jpeg'
  },
  {
    num: '04',
    title: 'Start Partnership',
    desc: 'Confirm and begin your business relationship.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop'
  },
]

function HowItWorksAccordion() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-[#0E5F13] flex items-center justify-center">

      {/* ── Mobile Global Tap to Expand Hint ── */}
      <AnimatePresence>
        {hoveredIndex === null && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none md:hidden w-max">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center bg-black/40 backdrop-blur-md px-8 py-5 rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            >
              <svg className="mb-2 text-[#ECBD27] animate-bounce" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
              <span className="text-white text-lg font-black uppercase tracking-widest text-center" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                Tap to Expand
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Title Overlay ── */}
      <div className="absolute top-12 left-10 md:top-16 md:left-16 z-20 pointer-events-none">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-8 bg-[#ECBD27]" />
          <span className="text-xs tracking-[0.4em] uppercase font-bold text-[#ECBD27]" style={{ fontFamily: 'monospace' }}>
            Our Process
          </span>
        </div>
        <h2 className="font-black text-3xl md:text-5xl uppercase text-white" style={{ fontFamily: "'Arial Black', sans-serif" }}>
          How It <span style={{ color: '#ECBD27' }}>Works</span>
        </h2>
      </div>

      <div
        className="absolute flex w-[140%] h-full left-1/2"
        style={{ transform: 'translateX(-50%) skewX(-12deg)' }}
        onMouseLeave={() => setHoveredIndex(null)}
      >

        {stepsData.map((item, i) => {
          const flexValue = hoveredIndex === null ? 1 : (hoveredIndex === i ? 3.5 : 1)
          const isHovered = hoveredIndex === i
          const isCompressed = hoveredIndex !== null && !isHovered

          return (
            <motion.div
              key={i}
              className="relative h-full overflow-hidden border-r border-black/30 cursor-pointer group"
              animate={{ flex: flexValue }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              onMouseEnter={() => setHoveredIndex(i)}
            >
              <div
                className="absolute top-0 h-full w-[100vw] flex flex-col items-center justify-end pb-20 pointer-events-none"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%) skewX(12deg)'
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ filter: isHovered ? 'grayscale(0%)' : 'grayscale(80%) brightness(0.6)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E5F13]/60 via-[#0E5F13]/20 to-transparent" />
                </div>

                {/* Text Content */}
                <motion.div
                  className="relative z-10 flex flex-col items-center text-center w-[85%] max-w-[450px]"
                  animate={{
                    y: isHovered ? 0 : (isCompressed ? 20 : 10),
                    opacity: isHovered ? 1 : 0,
                    scale: isCompressed ? 0.9 : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-[#ECBD27] font-black text-2xl md:text-4xl opacity-40 mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                    {item.num}
                  </span>
                  <h3
                    className="font-black text-xl md:text-3xl uppercase mb-2 text-white"
                    style={{ fontFamily: "'Arial Black', sans-serif", textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                  >
                    {item.title}
                  </h3>

                  <motion.p
                    className="text-white/90 text-sm md:text-base leading-relaxed font-bold tracking-wider uppercase"
                    initial={false}
                    animate={{
                      height: isHovered ? 'auto' : 0,
                      opacity: isHovered ? 1 : 0,
                      marginTop: isHovered ? 8 : 0
                    }}
                    style={{ overflow: 'hidden' }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.desc}
                  </motion.p>
                </motion.div>
              </div>

            </motion.div>
          )
        })}

      </div>
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

export default function RfqPage() {
  const [form, setForm] = useState({
    companyName: '', contactName: '', email: '', phone: '', country: '',
    service: serviceOptions[0], quantity: '', unit: '', deliveryDate: '',
    destination: '', additionalInfo: '', agreeToTerms: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement
    setForm({ ...form, [target.name]: target.type === 'checkbox' ? target.checked : target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden flex flex-col justify-end" style={{ minHeight: '50vh', background: '#0E5F13' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0E5F13 0%, rgba(14,95,19,0.5) 50%, rgba(14,95,19,0.2) 100%)' }} />
        <GridBackground color="#ECBD27" gridSize={60} opacity={0.08} isVisible={true} />

        <NovaOrb size={700} x="85%" y="40%" color1="#ECBD27" color2="#0E5F13" opacity={0.15} duration={10} />
        <NovaOrb size={400} x="5%" y="70%" color1="#ECBD27" color2="#0a3d0a" opacity={0.1} duration={7} delay={2} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 pb-16 w-full">
          <motion.p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#ECBD27', fontFamily: 'monospace' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Business Inquiry
          </motion.p>
          <motion.h1 className="font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#F3F6FA', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Request a <span style={{ color: '#ECBD27' }}>Quote</span>
          </motion.h1>
          <motion.p className="text-lg max-w-xl" style={{ color: 'rgba(243,246,250,0.75)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            Tell us about your requirements and we'll provide a tailored quote within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <HowItWorksAccordion />

      {/* ── RFQ Form ── */}
      <section className="relative overflow-hidden py-20" style={{ background: '#F3F6FA' }}>
        <NovaOrb size={600} x="90%" y="30%" color1="#ECBD27" color2="#F3F6FA" opacity={0.2} duration={9} delay={1} />
        <NovaOrb size={400} x="5%" y="70%" color1="#0E5F13" color2="#F3F6FA" opacity={0.1} duration={11} delay={3} />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div className="rounded-2xl p-8 md:p-12"
            style={{ background: '#fff', boxShadow: '0 8px 48px rgba(0,0,0,0.08)', border: '1px solid rgba(14,95,19,0.1)' }}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

            {submitted ? (
              <motion.div className="text-center py-16" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <span className="text-7xl block mb-6">🎉</span>
                <h3 className="font-black uppercase text-2xl mb-3" style={{ fontFamily: "'Arial Black', sans-serif", color: '#0E5F13' }}>
                  Quote Request Received!
                </h3>
                <p className="text-base mb-2" style={{ color: 'rgba(14,95,19,0.7)' }}>
                  Thank you for reaching out to Yhaenu PLC.
                </p>
                <p className="text-base" style={{ color: 'rgba(14,95,19,0.7)' }}>
                  Our team will review your request and get back to you within <strong>24 hours</strong>.
                </p>
                <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(14,95,19,0.06)' }}>
                  <p className="text-sm" style={{ color: '#0E5F13' }}>
                    📞 For urgent inquiries: <strong>+251 911 761 855</strong><br />
                    ✉️ Email: <strong>yhaenuplc@gmail.com</strong>
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div className='mb-10'>
                  <h2 className="font-black uppercase text-2xl mb-1" style={{ fontFamily: "'Arial Black', sans-serif", color: '#0E5F13' }}>
                    RFQ Form
                  </h2>
                  <p className="text-sm" style={{ color: 'rgba(14,95,19,0.6)' }}>Fields marked with * are required.</p>
                </div>

                <div className="border-t border-[rgba(14,95,19,0.3)]">
                  <p className="font-black uppercase text-sm mt-8 mb-4 text-[#ECBD27]" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                    Company Information
                  </p>

                  <InputField label="Company Name" required>
                    <input name="companyName" required value={form.companyName} onChange={handleChange} placeholder="Your company name" className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)]" />
                  </InputField>

                  <InputField label="Contact Person" required>
                    <input name="contactName" required value={form.contactName} onChange={handleChange} placeholder="Full name" className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)]" />
                  </InputField>

                  <InputField label="Email" required>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)]" />
                  </InputField>

                  <InputField label="Phone" required>
                    <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+1 234 567 8900" className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)]" />
                  </InputField>

                  <InputField label="Country / Region" required>
                    <input name="country" required value={form.country} onChange={handleChange} placeholder="e.g. United States, UAE, Germany" className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)]" />
                  </InputField>

                  <p className="font-black uppercase text-sm mt-12 mb-4 text-[#ECBD27]" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                    Product / Service Details
                  </p>

                  <InputField label="Service / Product" required>
                    <CustomSelect name="service" value={form.service} onChange={handleChange} options={serviceOptions} />
                  </InputField>

                  <InputField label="Quantity">
                    <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 10,000" className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)]" />
                  </InputField>

                  <InputField label="Unit">
                    <input name="unit" value={form.unit} onChange={handleChange} placeholder="e.g. kg, MT, units" className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)]" />
                  </InputField>

                  <InputField label="Required Delivery Date">
                    <input name="deliveryDate" type="date" value={form.deliveryDate} onChange={handleChange} className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)]" style={{ colorScheme: 'light' }} />
                  </InputField>

                  <InputField label="Destination Port / City">
                    <input name="destination" value={form.destination} onChange={handleChange} placeholder="e.g. Dubai, Rotterdam, New York" className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)]" />
                  </InputField>

                  <InputField label="Additional Requirements / Notes" isTextarea>
                    <textarea name="additionalInfo" rows={5} value={form.additionalInfo} onChange={handleChange}
                      placeholder="Describe any specific requirements, certifications needed, packaging preferences, etc."
                      className="w-full bg-transparent border-none outline-none text-[1.1rem] text-[#0E5F13] placeholder-[rgba(14,95,19,0.4)] resize-none" />
                  </InputField>
                </div>

                <div className="flex items-start gap-3 mt-8 mb-8">
                  <input type="checkbox" name="agreeToTerms" id="terms" required checked={form.agreeToTerms}
                    onChange={handleChange} className="mt-1 w-5 h-5 flex-shrink-0 cursor-pointer" style={{ accentColor: '#0E5F13' }} />
                  <label htmlFor="terms" className="text-[1.1rem] cursor-pointer text-[#0E5F13]">
                    I agree that Yhaenu PLC may contact me regarding this quote request. *
                  </label>
                </div>

                <div className="flex">
                  <button type="submit"
                    className="group flex items-stretch border border-[rgba(14,95,19,0.4)] hover:border-[#0E5F13] bg-[rgba(14,95,19,0.02)] hover:bg-[#0E5F13] transition-all duration-300 w-full sm:w-auto">
                    <span className="px-8 py-4 font-bold text-[1.1rem] text-[#0E5F13] group-hover:text-[#ECBD27] transition-colors duration-300 flex-1 text-center sm:text-left">
                      Submit Quote Request
                    </span>
                    <span className="flex items-center justify-center px-5 border-l border-[rgba(14,95,19,0.4)] group-hover:border-[#0E5F13] text-[#0E5F13] group-hover:text-[#ECBD27] transition-all duration-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </button>
                </div>

                <p className="text-xs text-center mt-8" style={{ color: 'rgba(14,95,19,0.5)' }}>
                  We respond within 24 hours · yhaenuplc@gmail.com · +251 911 761 855
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
