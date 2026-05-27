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

export default function App() {
  useScrollReveal()

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
