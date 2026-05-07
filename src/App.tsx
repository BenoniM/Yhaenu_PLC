import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Faq from './components/Faq'
import Cta from './components/Cta'
import Footer from './components/Footer'
import Aboutpage from './pages/Aboutpage'
import ProductsPage from './pages/ProductsPage'
import ContactPage from './pages/ContactPage'
import RfqPage from './pages/RfqPage'
import MouseTrail from './components/MouseTrail'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/rfq" element={<RfqPage />} />
      </Routes>
    </>
  )
}

export default App
