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
      className="border-b border-[rgba(236,189,39,0.15)] last:border-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={onClick}
        className="w-full py-7 flex items-center justify-between group hover:bg-white/5 transition-all px-6"
      >
        <h3
          className="text-left font-black text-lg md:text-xl uppercase tracking-wide transition-colors group-hover:text-white"
          style={{
            fontFamily: "'Arial Black', sans-serif",
            color: '#ECBD27',
          }}
        >
          {item.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-4"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#ECBD27]/20 transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ECBD27"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </motion.div>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-8">
          <p
            className="text-lg leading-relaxed max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}
          >
            {item.answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Faq() {
  const [openId, setOpenId] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden py-32"
      style={{ background: '#0E5F13' }}
    >
      {/* Decorative Parallax Accents */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute"
          style={{
            top: '0%',
            left: '-10%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(236,189,39,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '0%',
            right: '-5%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}
        />
      </motion.div>

      <div className="relative z-10 w-full px-6">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-[2px] w-12 bg-[#ECBD27]" />
            <span
              className="text-[#ECBD27] text-sm md:text-base tracking-[0.5em] uppercase font-bold"
              style={{ fontFamily: 'monospace' }}
            >
              Frequently Asked
            </span>
            <span className="h-[2px] w-12 bg-[#ECBD27]" />
          </div>
          
          <h2 
            className="text-white text-5xl md:text-6xl font-black uppercase tracking-tighter"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            Questions
          </h2>
        </motion.div>

        {/* ── FAQ Container ── */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div
            className="rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(236,189,39,0.15)',
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
          
          {/* Subheading below container */}
          <p
            className="text-center mt-12 text-lg italic opacity-60"
            style={{ color: 'white', fontWeight: 300 }}
          >
            Have more questions? Contact our team for personalized assistance.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
