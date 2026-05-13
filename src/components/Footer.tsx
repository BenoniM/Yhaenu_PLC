import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ftrVideo from '../assets/ftr-video/14610569_2160_3840_24fps.mp4'
import logoText from '../assets/logo/Logo-Text.svg'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Products', href: '/products' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Our Expertise',
      links: [
        { label: 'Import & Export', href: '/products' },
        { label: 'Manufacturing', href: '/products' },
        { label: 'Transportation', href: '/products' },
        { label: 'Hospitality', href: '/products' },
      ],
    },
  ]

  const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
  ]

  return (
    <footer className="relative min-h-[75vh] flex flex-col justify-between overflow-hidden text-[#F3F6FA] pt-24 pb-8 px-8 md:px-20" style={{ background: '#0E5F13' }}>
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50 grayscale-[0.2] brightness-[0.7]"
        >
          <source src={ftrVideo} type="video/mp4" />
        </video>
        {/* Soft greenish tint overlay */}
        <div 
          className="absolute inset-0 bg-[#0E5F13]/50 backdrop-blur-[0.5px]" 
        />
        {/* Subtle Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Top Section: 5-Column Grid */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-12 items-start">
          
          {/* 1. Newsletter - 4 cols */}
          <div className="md:col-span-4 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-light leading-[1.1] tracking-tight">
              Join our <br />
              <span className="italic">newsletter</span>
            </h2>
            <div className="relative group max-w-sm">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-transparent border-b border-white/20 py-3 pr-12 focus:outline-none focus:border-[#ECBD27] transition-all duration-500 placeholder:text-white/30 text-lg"
              />
              <button className="absolute right-0 bottom-3 text-2xl transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 duration-500">
                ↗
              </button>
            </div>
          </div>

          {/* 2. Contact - 2 cols */}
          <div className="md:col-span-2 space-y-6 md:pt-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#ECBD27] font-bold">Contact</p>
            <div className="space-y-4">
              <div className="space-y-1">
                <a href="mailto:info@yhaenu.com" className="block text-sm font-medium hover:text-[#ECBD27] transition-colors duration-300">info@yhaenu.com</a>
                <a href="tel:+251111111111" className="block text-sm font-medium hover:text-[#ECBD27] transition-colors duration-300">+251 11 111 1111</a>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-white/60 leading-relaxed font-light">
                  YHAENU PLC Building<br />
                  Bole Road, Addis Ababa
                </p>
              </div>
            </div>
          </div>

          {/* 3. Navigation - 2 cols */}
          <div className="md:col-span-2 space-y-6 md:pt-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#ECBD27] font-bold">Navigation</p>
            <div className="flex flex-col gap-3">
              {footerLinks[0].links.map((link, idx) => (
                <Link 
                  key={idx} 
                  to={link.href} 
                  className="text-sm font-light hover:text-[#ECBD27] transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* 4. Expertise - 2 cols */}
          <div className="md:col-span-2 space-y-6 md:pt-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#ECBD27] font-bold">Expertise</p>
            <div className="flex flex-col gap-3">
              {footerLinks[1].links.map((link, idx) => (
                <Link 
                  key={idx} 
                  to={link.href} 
                  className="text-sm font-light hover:text-[#ECBD27] transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* 5. Follow Us - 2 cols */}
          <div className="md:col-span-2 space-y-6 md:pt-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#ECBD27] font-bold">Follow Us</p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  className="text-sm font-light hover:text-[#ECBD27] transition-colors duration-300"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Massive Brand Reveal */}
      <div className="relative z-10 w-full mt-24 flex flex-col md:flex-row items-end justify-between border-t border-white/5 pt-8 pb-4">
        <div className="w-full md:w-[80%] lg:w-[75%]">
          <img 
            src={logoText} 
            alt="YHAENU" 
            className="w-full h-auto opacity-95 transition-opacity hover:opacity-100"
            style={{ 
              filter: 'brightness(0) saturate(100%) invert(86%) sepia(43%) saturate(1478%) hue-rotate(345deg) brightness(100%) contrast(92%)'
            }}
          />
        </div>
        
        {/* Interactive Logo Badge (No rotating text) */}
        <div className="mb-4 md:mb-0 group cursor-pointer">
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03] backdrop-blur-xl transition-all duration-1000 group-hover:border-[#ECBD27]/40 group-hover:scale-105">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-14 h-14 md:w-18 md:h-18 object-contain relative z-10 mix-blend-screen transition-transform duration-[2s] group-hover:rotate-[360deg]" 
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ECBD27]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>
        </div>
      </div>

      {/* Legal Bar */}
      <div className="relative z-10 w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/40">
        <p>© {currentYear} YHAENU PLC. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}

/*  */