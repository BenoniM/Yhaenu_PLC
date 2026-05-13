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
  {
    id: 4,
    question: 'How can I partner with Yhaenu PLC for international trade?',
    answer:
      'We welcome partnerships with international distributors and suppliers. Contact our trade department through the contact form or via email to discuss potential collaborations and market opportunities.',
  },
  {
    id: 5,
    question: 'What is the production capacity of your manufacturing facility?',
    answer:
      'Our manufacturing unit is equipped with high-speed automated machinery for cardboard and carton production, allowing us to handle both small-batch custom orders and large-scale industrial requirements efficiently.',
  },
  {
    id: 6,
    question: 'Do you provide end-to-end logistics support?',
    answer:
      'Yes, through our dedicated transportation fleet, we offer comprehensive logistics solutions, ensuring your products are moved safely and on time across Ethiopia and beyond.',
  },
  {
    id: 7,
    question: 'How do you ensure the quality of your export products?',
    answer:
      'We maintain strict quality control measures at every stage, from sourcing to final packaging. Our products undergo rigorous inspections to ensure they meet international standards before export.',
  },
  {
    id: 8,
    question: 'Do you offer custom branding on packaging?',
    answer:
      'Yes, our cardboard and carton manufacturing facility is equipped to provide custom branding and printing services, ensuring your packaging perfectly represents your brand identity.',
  },
]

function FaqItem({
  item,
  isOpen,
  onClick,
  index,
  unskewClass
}: {
  item: typeof faqs[0];
  isOpen: boolean;
  onClick: () => void;
  index: number;
  unskewClass: string;
}) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      {/* Individual Card (No Skew Here, handled by container) */}
      <div
        className="relative bg-white border-b border-[#ECBD27]/50 last:border-none transition-all duration-500 group h-full flex flex-col justify-center"
      >
        {/* Interactive Hover Accent */}
        <div className="absolute inset-0 bg-[#ECBD27]/30 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />

        <div className={`transition-transform duration-500 ${unskewClass}`}>
          <button
            onClick={onClick}
            className="w-full py-6 px-8 md:px-20 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-5">
              <h3
                className="text-left font-bold text-lg md:text-xl capitalize tracking-tight"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: '#0E5F13',
                }}
              >
                {item.question}
              </h3>
            </div>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.4, ease: "backOut" }}
              className="flex-shrink-0 ml-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#ECBD27]/10 flex items-center justify-center group-hover:bg-[#ECBD27]/20 transition-colors border-2 border-[#ECBD27]/50">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0E5F13"
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
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 md:px-20 pb-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p
                  className="text-lg leading-relaxed max-w-2xl mx-auto text-center font-medium"
                  style={{ color: 'rgba(14, 95, 19, 0.7)' }}
                >
                  {item.answer}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
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
      className="relative overflow-hidden py-16"
      style={{ background: '#FFFFFF' }}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#0E5F13 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Decorative Parallax Accents */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute"
          style={{
            top: '0%',
            left: '-10%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(14, 95, 19, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '0%',
            right: '-5%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(circle, rgba(14, 95, 19, 0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}
        />
      </motion.div>

      <div className="relative z-10 w-full px-6">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[2px] w-12 bg-[#0E5F13]/20" />
            <span
              className="text-[#0E5F13] text-sm md:text-base tracking-[0.5em] uppercase font-bold"
              style={{ fontFamily: 'monospace' }}
            >
              Frequently Asked
            </span>
            <span className="h-[2px] w-12 bg-[#0E5F13]/20" />
          </div>

          <h2
            className="text-[#0E5F13] text-4xl md:text-5xl font-bold capitalize tracking-tighter"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Questions
          </h2>
        </motion.div>

        {/* ── FAQ Container ── */}
        <div className="max-w-6xl mx-auto pb-20 flex flex-col items-center">

          {/* Top Row: Left and Right Arms (Tip to Tip Touching) */}
          <div className="flex flex-col md:flex-row justify-center w-full gap-4">

            {/* Top Left Arm (2 items) */}
            <div className="w-full md:w-[45%] origin-bottom-right md:skew-x-[20deg] flex flex-col">
              <div className="border border-[#ECBD27]/50 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                {faqs.slice(0, 2).map((item, index) => (
                  <FaqItem
                    key={item.id}
                    item={item}
                    index={index}
                    isOpen={openId === item.id}
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    unskewClass="md:-skew-x-[20deg]"
                  />
                ))}
              </div>
            </div>

            {/* Top Right Arm (2 items) */}
            <div className="w-full md:w-[45%] origin-bottom-left md:-skew-x-[20deg] flex flex-col">
              <div className="border border-[#ECBD27]/50 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                {faqs.slice(2, 4).map((item, index) => (
                  <FaqItem
                    key={item.id}
                    item={item}
                    index={index + 2}
                    isOpen={openId === item.id}
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    unskewClass="md:skew-x-[20deg]"
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Row: Stem (4 items) */}
          <div className="flex flex-col md:flex-row justify-center w-full mt-6">

            {/* Spacer to push stem to the right side, aligning with Top Right arm */}
            <div className="hidden md:block w-[45%]" />

            {/* Bottom Stem aligned with Top Right diagonal */}
            {/* The 16px (gap-4) horizontal separation mathematically cancels out the left shift needed for the 24px vertical drop, resulting in perfect alignment without negative margins */}
            <div className="w-full md:w-[45%] origin-top-left md:-skew-x-[20deg] flex flex-col">
              <div className="border border-[#ECBD27]/50 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                {faqs.slice(4, 8).map((item, index) => (
                  <FaqItem
                    key={item.id}
                    item={item}
                    index={index + 4}
                    isOpen={openId === item.id}
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    unskewClass="md:skew-x-[20deg]"
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
