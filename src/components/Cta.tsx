import { motion } from 'framer-motion'

interface CtaProps {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  isDark?: boolean
}

export default function Cta({
  title = 'Ready to Work With Us?',
  subtitle = 'Get in touch with our team to discuss your needs and discover how we can help your business grow.',
  buttonText = 'Request a Quote',
  buttonLink = '#contact',
  isDark = true,
}: CtaProps) {
  const bgColor = isDark ? '#0E5F13' : '#F3F6FA'
  const subtitleColor = 'rgba(243,246,250,0.7)'

  return (
    <section
      className="relative overflow-hidden py-20"
      style={{ background: bgColor }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute"
          style={{
            top: '-10%',
            right: '-5%',
            width: '40%',
            height: '40%',
            background: isDark
              ? 'radial-gradient(ellipse, rgba(236,189,39,0.1) 0%, transparent 65%)'
              : 'radial-gradient(ellipse, rgba(236,189,39,0.08) 0%, transparent 65%)',
            borderRadius: '50%',
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '-5%',
            left: '-10%',
            width: '35%',
            height: '35%',
            background: isDark
              ? 'radial-gradient(ellipse, rgba(236,189,39,0.08) 0%, transparent 65%)'
              : 'radial-gradient(ellipse, rgba(236,189,39,0.06) 0%, transparent 65%)',
            borderRadius: '50%',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="uppercase leading-none mb-4"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
              color: '#ECBD27',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ color: subtitleColor }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>

          {/* Button */}
          <motion.a
            href={buttonLink}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-10 py-4 rounded-full font-black text-sm uppercase tracking-wide transition-all"
            style={{
              background: '#ECBD27',
              color: '#0E5F13',
              boxShadow: '0 8px 24px rgba(236,189,39,0.3)',
            }}
          >
            {buttonText}
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

