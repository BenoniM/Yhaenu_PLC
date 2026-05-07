import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Services', href: '#products' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Import & Export', href: '#products' },
        { label: 'Manufacturing', href: '#products' },
        { label: 'Transportation', href: '#products' },
        { label: 'Hospitality', href: '#products' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#0E5F13' }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute"
          style={{
            top: '-20%',
            right: '-10%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(ellipse, rgba(236,189,39,0.05) 0%, transparent 65%)',
            borderRadius: '50%',
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '-15%',
            left: '-5%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(ellipse, rgba(236,189,39,0.04) 0%, transparent 65%)',
            borderRadius: '50%',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 py-16">
        {/* Main footer content */}
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand section */}
          <motion.div variants={itemVariants}>
            <img
              src="/logo.png"
              alt="YHAENU PLC"
              style={{ height: 48, width: 'auto', objectFit: 'contain', marginBottom: '1rem' }}
            />
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(243,246,250,0.6)' }}
            >
              A family-owned company with over 20 years of experience in Import, Export, Manufacturing, Transportation, and Hospitality.
            </p>
          </motion.div>

          {/* Links sections */}
          {footerLinks.map((section, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <h4
                className="font-black text-sm uppercase mb-4 tracking-wide"
                style={{
                  fontFamily: "'Arial Black', sans-serif",
                  color: '#ECBD27',
                }}
              >
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-[#ECBD27]"
                      style={{ color: 'rgba(243,246,250,0.6)' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div
          className="h-[1px] mb-8"
          style={{ background: 'rgba(236,189,39,0.2)' }}
        />

        {/* Bottom section */}
        <motion.div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Copyright */}
          <p
            className="text-sm text-center md:text-left mb-4 md:mb-0"
            style={{ color: 'rgba(243,246,250,0.5)' }}
          >
            © {currentYear} YHAENU PLC. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-6">
            {[
              { icon: 'facebook', href: '#' },
              { icon: 'twitter', href: '#' },
              { icon: 'linkedin', href: '#' },
              { icon: 'instagram', href: '#' },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(236,189,39,0.1)',
                  border: '1px solid rgba(236,189,39,0.2)',
                }}
                whileHover={{
                  background: '#ECBD27',
                  borderColor: '#ECBD27',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: '#ECBD27' }}
                >
                  {social.icon === 'facebook' && (
                    <path d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h3v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1h3z" />
                  )}
                  {social.icon === 'twitter' && (
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                  )}
                  {social.icon === 'linkedin' && (
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  )}
                  {social.icon === 'instagram' && (
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  )}
                </svg>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

