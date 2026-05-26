import { useScrollReveal } from './hooks/useScrollReveal'

import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { NewsletterStrip } from './components/layout/NewsletterStrip'
import { WhatsAppFab } from './components/layout/WhatsAppFab'

import { Hero } from './components/sections/Hero'
import { Trust } from './components/sections/Trust'
import { Nosotros } from './components/sections/Nosotros'
import { Servicios } from './components/sections/Servicios'
import { Remates } from './components/sections/Remates'
import { Mercado } from './components/sections/Mercado'
import { Campos } from './components/sections/Campos'
import { Testimonials } from './components/sections/Testimonials'
import { Equipo } from './components/sections/Equipo'
import { Blog } from './components/sections/Blog'
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
        <Mercado />
        <Campos />
        <Testimonials />
        <Equipo />
        <Blog />
        <Contacto />
      </main>

      <NewsletterStrip />
      <Footer />
      <WhatsAppFab />
    </>
  )
}
