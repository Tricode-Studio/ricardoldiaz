import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { useScrollReveal } from './hooks/useScrollReveal'

import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { PhoneStrip } from './components/layout/PhoneStrip'
import { WhatsAppFab } from './components/layout/WhatsAppFab'

import { Hero } from './components/sections/Hero'
import { Trust } from './components/sections/Trust'
import { Nosotros } from './components/sections/Nosotros'
import { Servicios } from './components/sections/Servicios'
import { Remates } from './components/sections/Remates'
import { Lotes } from './components/sections/Lotes'
import { VentasParticulares } from './components/sections/VentasParticulares'
import { Mercado } from './components/sections/Mercado'
import { Equipo } from './components/sections/Equipo'
import { Contacto } from './components/sections/Contacto'
import { Historia } from './pages/Historia'
import { CmsContentProvider } from './cms/CmsContentContext'
import { Seo } from './components/seo/Seo'
import { ROUTE_SEO } from './seo/site'
import { TrackingScript } from './tracking/TrackingScript'

function Home() {
  useScrollReveal()
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
    return () => clearTimeout(timer)
  }, [hash])

  return (
    <>
      <Seo
        title={ROUTE_SEO['/'].title}
        description={ROUTE_SEO['/'].description}
        canonicalPath={ROUTE_SEO['/'].canonicalPath}
      />
      <Header />
      <main>
        <Hero />
        <Trust />
        <Nosotros />
        <Servicios />
        <Remates />
        <Lotes />
        <VentasParticulares />
        <Mercado />
        <Equipo />
        <Contacto />
      </main>
      <PhoneStrip />
      <Footer />
      <WhatsAppFab />
    </>
  )
}

export default function App() {
  return (
    <CmsContentProvider>
      <TrackingScript />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historia" element={<Historia />} />
      </Routes>
    </CmsContentProvider>
  )
}
