import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Cta from './components/Cta'
import Footer from './components/Footer'
import Aboutpage from './pages/Aboutpage'

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Faq />
      <Cta />
      <Footer />
    </>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutpage />} />
      </Routes>
    </>
  )
}

export default App
