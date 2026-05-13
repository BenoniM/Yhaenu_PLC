import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
// Removed lucide-react import due to resolution issues

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
  buttonText = 'Get in Touch',
  buttonLink = '/contact',
  isDark = true,
}: CtaProps) {
  const [isHovered, setIsHovered] = useState(false)
  const bgColor = isDark ? '#0E5F13' : '#F3F6FA' // Standard greenish brand color
  const textColor = isDark ? '#F3F6FA' : '#0E5F13'
  const accentColor = '#ECBD27'

  return (
    <section 
      className="relative w-full py-12 md:py-16 overflow-hidden" // Significantly smaller height
      style={{ backgroundColor: bgColor }}
    >
      {/* Background Ripple Effects - Centered behind button */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="container mx-auto px-6 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center">
            <div className="lg:col-span-5 hidden lg:block"></div>
            <div className="lg:col-span-7 flex flex-col justify-center pt-4 lg:pt-0">
              {/* Hidden Title spacer to match content layout height */}
              <div className="opacity-0 lg:text-right select-none" aria-hidden="true">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-tight">
                  {title}
                </h2>
              </div>
              
              <div className="flex flex-col items-center lg:items-start mt-8 lg:mt-4 relative">
                <div className="w-40 h-40 md:w-48 md:h-48 flex items-center justify-center relative">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border border-[#ECBD27]/40"
                      style={{ width: '100%', height: '100%' }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isHovered ? {
                        scale: [0, 12], // Propagate outward
                        opacity: [0.8, 0],
                      } : { scale: 0, opacity: 0 }}
                      transition={{
                        duration: 3,
                        delay: i * 0.6, // Balanced spacing
                        ease: "easeOut",
                        repeat: isHovered ? Infinity : 0,
                        repeatDelay: 0.5
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Featured Image */}
          <motion.div 
            className="lg:col-span-5 relative aspect-video rounded-sm overflow-hidden shadow-xl" // Reduced height via aspect ratio
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img 
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop" 
              alt="Global Logistics and Import Export"
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
          </motion.div>

          {/* Right: Content Area */}
          <div className="lg:col-span-7 flex flex-col justify-center relative pt-4 lg:pt-0">
            
            {/* Top Right: Title */}
            <motion.div 
              className="lg:text-right"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 
                className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-tight"
                style={{ color: textColor, fontFamily: "'Inter', sans-serif" }}
              >
                {title}
              </h2>
            </motion.div>

            {/* Middle: Circle Button and Description */}
            <div className="flex flex-col items-center lg:items-start mt-8 lg:mt-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link 
                  to={buttonLink}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48 flex-shrink-0 aspect-square rounded-full border border-white/30 transition-all duration-500 overflow-hidden"
                  style={{ borderColor: isHovered ? accentColor : 'rgba(255,255,255,0.3)' }}
                >
                  {/* Full Yellowish Fill on Hover */}
                  <div 
                    className={`absolute inset-0 transition-transform duration-500 rounded-full ${isHovered ? 'scale-100' : 'scale-0'}`}
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  
                  <div className="relative z-10 flex flex-col items-center gap-1 text-center px-4">
                    <span 
                      className="text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-500"
                      style={{ color: isHovered ? '#0E5F13' : textColor }}
                    >
                      {buttonText}
                    </span>
                    <svg 
                      className="w-5 h-5 transition-all duration-500 group-hover:translate-x-2" 
                      style={{ color: isHovered ? '#0E5F13' : accentColor }}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
              </motion.div>

              <motion.p 
                className="mt-6 text-base md:text-lg font-light leading-relaxed max-w-md lg:text-left text-center"
                style={{ color: 'rgba(243, 246, 250, 0.9)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {subtitle}
              </motion.p>
            </div>

            {/* Bottom Right: Small Image */}
            <motion.div 
              className="hidden lg:block absolute bottom-0 right-0 w-48 aspect-video rounded-sm overflow-hidden shadow-lg border border-white/10"
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800&auto=format&fit=crop" 
                alt="Transportation Truck"
                className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden opacity-10">
        <div 
          className="absolute inset-0"
          style={{ 
            background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)`,
          }}
        />
      </div>
    </section>
  )
}
