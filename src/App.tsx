import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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
import { Mercado } from './components/sections/Mercado'
import { Equipo } from './components/sections/Equipo'
import { Contacto } from './components/sections/Contacto'
import { Historia } from './pages/Historia'

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
      <Header />
      <main>
        <Hero />
        <Trust />
        <Nosotros />
        <Servicios />
        <Remates />
        <Lotes />
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/historia" element={<Historia />} />
    </Routes>
  )
}
