import Cta from '../components/Cta'
import Footer from '../components/Footer'

export default function Aboutpage() {
  return (
    <>
      <main className="min-h-screen" style={{ background: '#F3F6FA' }}>
        {/* Hero banner */}
        <div
          className="w-full flex items-center justify-center py-32 px-6 text-center"
          style={{ background: '#0E5F13' }}
        >
          <div>
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: '#ECBD27', fontFamily: 'monospace' }}
            >
              Who We Are
            </p>
            <h1
              className="font-black uppercase leading-none"
              style={{
                fontFamily: "'Arial Black', sans-serif",
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                color: '#F3F6FA',
                letterSpacing: '-0.02em',
              }}
            >
              About{' '}
              <span style={{ color: '#ECBD27' }}>YHAENU</span>
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: '#0E5F13' }}
          >
            Yhaenu PLC is a family-owned company with over 20 years of experience in Import, Export,
            Manufacturing, Transportation, and Hospitality. Headquartered in Ethiopia, we've grown
            into a trusted name in both local and international markets.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{ color: '#0E5F13' }}
          >
            Our mission is simple: to be the bridge that links Ethiopia's potential to the global stage —
            delivering quality, precision, and excellence across every vertical we operate in.
          </p>
        </div>
      </main>

      <Cta />
      <Footer />
    </>
  )
}
