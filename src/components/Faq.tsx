import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const faqs = [
  {
    id: 1,
    question: 'What industries does Yhaenu PLC operate in?',
    answer:
      'Yhaenu PLC operates across multiple sectors including Import & Export, Manufacturing (cardboard and carton products), Transportation, and Hospitality. Our diverse portfolio allows us to serve clients across various industries with tailored solutions.',
  },
  {
    id: 2,
    question: 'What types of coffees do you offer?',
    answer:
      'We specialize in sourcing and exporting premium Ethiopian coffees. Our coffee selection includes various grades and origins from different regions of Ethiopia, ensuring quality and consistency for our international partners.',
  },
  {
    id: 3,
    question: 'What packaging solutions do you offer?',
    answer:
      'We offer comprehensive packaging solutions including custom cardboard boxes, carton products, and specialized packaging for various industries. Our manufacturing facility produces high-quality packaging that meets international standards and specifications.',
  },
]

function FaqItem({ item, isOpen, onClick }: { item: typeof faqs[0]; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      className="border-b border-[rgba(236,189,39,0.2)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between group hover:bg-[rgba(236,189,39,0.05)] transition-colors px-4 rounded-lg"
      >
        <h3
          className="text-left font-black text-base md:text-lg uppercase tracking-wide"
          style={{
            fontFamily: "'Arial Black', sans-serif",
            color: '#0E5F13',
          }}
        >
          {item.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-4"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ECBD27"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p
          className="px-4 pb-6 text-base leading-relaxed"
          style={{ color: 'rgba(14,95,19,0.8)' }}
        >
          {item.answer}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function Faq() {
  const [openId, setOpenId] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden py-28"
      style={{ background: '#F3F6FA' }}
    >
      {/* Parallax blobs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute"
          style={{
            top: '5%',
            left: '-15%',
            width: '55%',
            height: '55%',
            background: 'radial-gradient(ellipse, rgba(236,189,39,0.07) 0%, transparent 65%)',
            borderRadius: '50%',
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '5%',
            right: '-10%',
            width: '45%',
            height: '45%',
            background: 'radial-gradient(ellipse, rgba(236,189,39,0.05) 0%, transparent 65%)',
            borderRadius: '50%',
          }}
        />
      </motion.div>

      <div className="relative z-10 w-full px-6">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#ECBD27]" />
            <span
              className="text-[#ECBD27] text-lg tracking-[0.4em] uppercase font-bold"
              style={{ fontFamily: 'monospace' }}
            >
              FAQ
            </span>
            <span className="h-[2px] w-8 bg-[#ECBD27]" />
          </div>
         
        </motion.div>

        {/* ── Subheading ── */}
        <motion.p
          className="text-center mb-12 max-w-2xl mx-auto text-base"
          style={{ color: 'rgba(14,95,19,0.7)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Find answers to common questions about our services, products, and operations.
        </motion.p>

        {/* ── FAQ Items ── */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(236,189,39,0.08) 0%, rgba(14,95,19,0.05) 100%)',
              border: '1px solid rgba(236,189,39,0.2)',
            }}
          >
            {faqs.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        
      </div>
    </section>
  )
}

