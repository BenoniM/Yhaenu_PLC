import { useState } from 'react'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

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

const steps = [
  { num: '01', title: 'Fill the Form', desc: 'Provide your details and requirements.' },
  { num: '02', title: 'We Review', desc: 'Our team reviews your request within 24 hours.' },
  { num: '03', title: 'Get a Quote', desc: 'Receive a tailored quote for your needs.' },
  { num: '04', title: 'Start Partnership', desc: 'Confirm and begin your business relationship.' },
]

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
      <section className="relative overflow-hidden py-16" style={{ background: '#ECBD27' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={i} className="text-center"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}>
                <p className="font-black text-4xl mb-2" style={{ fontFamily: "'Arial Black', sans-serif", color: '#0E5F13', opacity: 0.3 }}>{step.num}</p>
                <p className="font-black uppercase text-sm mb-1" style={{ fontFamily: "'Arial Black', sans-serif", color: '#0E5F13' }}>{step.title}</p>
                <p className="text-xs" style={{ color: 'rgba(14,95,19,0.7)' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <h2 className="font-black uppercase text-xl mb-1" style={{ fontFamily: "'Arial Black', sans-serif", color: '#0E5F13' }}>
                    RFQ Form
                  </h2>
                  <p className="text-sm" style={{ color: 'rgba(14,95,19,0.6)' }}>Fields marked with * are required.</p>
                </div>

                {/* Company Info */}
                <div>
                  <p className="font-black uppercase text-xs mb-4 pb-2 border-b" style={{ fontFamily: "'Arial Black', sans-serif", color: '#ECBD27', borderColor: 'rgba(14,95,19,0.1)' }}>
                    Company Information
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Company Name *</label>
                      <input name="companyName" required value={form.companyName} onChange={handleChange} placeholder="Your company name" style={inputStyle} />
                    </div>
                    <div>
                      <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Contact Person *</label>
                      <input name="contactName" required value={form.contactName} onChange={handleChange} placeholder="Full name" style={inputStyle} />
                    </div>
                    <div>
                      <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Email *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} />
                    </div>
                    <div>
                      <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Phone *</label>
                      <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+1 234 567 8900" style={inputStyle} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Country / Region *</label>
                      <input name="country" required value={form.country} onChange={handleChange} placeholder="e.g. United States, UAE, Germany" style={inputStyle} />
                    </div>
                  </div>
                </div>

                {/* Product / Service */}
                <div>
                  <p className="font-black uppercase text-xs mb-4 pb-2 border-b" style={{ fontFamily: "'Arial Black', sans-serif", color: '#ECBD27', borderColor: 'rgba(14,95,19,0.1)' }}>
                    Product / Service Details
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Service / Product *</label>
                      <select name="service" value={form.service} onChange={handleChange} style={inputStyle}>
                        {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Quantity</label>
                      <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 10,000" style={inputStyle} />
                    </div>
                    <div>
                      <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Unit</label>
                      <input name="unit" value={form.unit} onChange={handleChange} placeholder="e.g. kg, MT, units" style={inputStyle} />
                    </div>
                    <div>
                      <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Required Delivery Date</label>
                      <input name="deliveryDate" type="date" value={form.deliveryDate} onChange={handleChange} style={inputStyle} />
                    </div>
                    <div>
                      <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Destination Port / City</label>
                      <input name="destination" value={form.destination} onChange={handleChange} placeholder="e.g. Dubai, Rotterdam, New York" style={inputStyle} />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <label className="text-xs uppercase font-bold mb-1 block" style={{ color: '#0E5F13', fontFamily: 'monospace' }}>Additional Requirements / Notes</label>
                  <textarea name="additionalInfo" rows={5} value={form.additionalInfo} onChange={handleChange}
                    placeholder="Describe any specific requirements, certifications needed, packaging preferences, etc."
                    style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input type="checkbox" name="agreeToTerms" id="terms" required checked={form.agreeToTerms}
                    onChange={handleChange} className="mt-1 w-4 h-4 flex-shrink-0" style={{ accentColor: '#0E5F13' }} />
                  <label htmlFor="terms" className="text-sm" style={{ color: 'rgba(14,95,19,0.7)' }}>
                    I agree that Yhaenu PLC may contact me regarding this quote request. *
                  </label>
                </div>

                <motion.button type="submit"
                  className="w-full py-5 rounded-full font-black uppercase text-sm tracking-wide"
                  style={{ background: '#0E5F13', color: '#ECBD27', fontFamily: "'Arial Black', sans-serif", border: '2px solid #ECBD27' }}
                  whileHover={{ scale: 1.02, background: '#ECBD27', color: '#0E5F13' }}
                  whileTap={{ scale: 0.98 }}>
                  Submit Quote Request →
                </motion.button>

                <p className="text-xs text-center" style={{ color: 'rgba(14,95,19,0.5)' }}>
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
