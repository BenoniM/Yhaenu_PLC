import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Faq from './components/Faq'
import Cta from './components/Cta'
import Footer from './components/Footer'
import Aboutpage from './pages/Aboutpage'
import ProductsPage from './pages/ProductsPage'
import ContactPage from './pages/ContactPage'
import RfqPage from './pages/RfqPage'
import MouseTrail from './components/MouseTrail'
import About from './components/About'


if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Faq />
      <Cta />
      <Footer />
    </>
  )
}

function App() {
  return (
    <>
      <MouseTrail />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/rfq" element={<RfqPage />} />
      </Routes>
      <Navbar />
    </>
  )
}

export default App
