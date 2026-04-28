import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CallButton from './components/CallButton'
import WhatsAppButton from './components/WhatsAppButton'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import Menu from './pages/Menu'
import ChiSiamo from './pages/ChiSiamo'
import Contatti from './pages/Contatti'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CookiePolicy from './pages/CookiePolicy'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <CallButton />
      <CookieBanner />
    </div>
  )
}

export default App
