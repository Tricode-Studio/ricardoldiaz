import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Historia.module.css'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { PhoneStrip } from '../components/layout/PhoneStrip'
import { WhatsAppFab } from '../components/layout/WhatsAppFab'
import { TeamModal } from '../components/sections/TeamModal'
import { WA_NUMBER } from '../data'
import type { TeamMember } from '../types'
import { useCmsContent } from '../cms/CmsContentContext'

const VALORES = [
  {
    title: 'Palabra y confianza',
    desc: 'En el campo, la palabra vale tanto como cualquier contrato. Cada operación que cerramos es un compromiso que cumplimos.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: 'Conocimiento del campo',
    desc: 'Décadas recorriendo establecimientos nos dan una visión única del negocio ganadero y de las realidades del productor.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Servicio al productor',
    desc: 'El productor está siempre primero. Trabajamos para que cada operación sea lo más conveniente y segura posible.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Legado familiar',
    desc: 'Somos una empresa de familia que construye relaciones de largo plazo, no sólo operaciones. El vínculo con el productor dura décadas.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
]

export function Historia() {
  useScrollReveal()
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const { historiaHero, historiaTimeline, historiaGallery, team } = useCmsContent()
  const { hash } = useLocation()
  const visibleGallery = historiaGallery.filter((photo) => photo.src)

  useEffect(() => {
    document.title = 'Nuestra Historia — Ricardo L. Díaz · Escritorio Rural'
    if (!hash) {
      window.scrollTo(0, 0)
    } else {
      const timer = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      }, 120)
      return () => clearTimeout(timer)
    }
    return () => {
      document.title = 'Ricardo L. Díaz · Escritorio Rural'
    }
  }, [hash])

  return (
    <>
      <Header />

      <main>
        {/* ── HERO ── */}
        <section
          className={styles.hero}
          style={historiaHero.image ? { backgroundImage: `url(${historiaHero.image})` } : undefined}
        >
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            {/* <Link to="/" className={styles.back}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Volver al inicio
            </Link> */}
            <span className={styles.heroEyebrow}>{historiaHero.eyebrow || 'Desde 1972'}</span>
            <h1>{historiaHero.title || 'Nuestra Historia'}</h1>
            <p className={styles.heroSub}>
              {historiaHero.subtitle || 'Más de 50 años construyendo confianza en el campo uruguayo, operación a operación.'}
            </p>
            <span className={styles.heroScroll}>Descubrir</span>
          </div>
        </section>

        {/* ── INTRO / FOUNDING STORY ── */}
        <section className="block" style={{ background: 'var(--paper)' }}>
          <div className="wrap">
            <div className={styles.introGrid}>
              <div className={`${styles.introText} reveal`}>
                <span className="eyebrow">Los orígenes</span>
                <h2>Una historia de campo y confianza.</h2>
                <p>
                  En 1973, Ricardo Díaz fundó su escritorio rural en el departamento de Flores con una
                  convicción simple: que entre productores, lo que vale es la palabra, el conocimiento
                  del campo y el trato honesto.
                </p>
                <p>
                  Con el tiempo, ese principio se convirtió en la base de una de las redes de
                  comercialización ganadera más respetadas del sur uruguayo. Hoy, más de 50 años
                  después, la misma filosofía guía cada operación que cerramos.
                </p>
                <div className={styles.introStat}>
                  <span className={styles.introNum}>50+</span>
                  <span className={styles.introLabel}>años al servicio del productor</span>
                </div>
              </div>

              <div className={`${styles.introImg} reveal`} style={{ transitionDelay: '0.12s' }}>
                <img
                  src="/images/federico-1.png"
                  alt="Rematador"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="block" style={{ background: 'var(--bone-2)' }}>
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">Hitos</span>
              <h2>Un camino de más de cinco décadas.</h2>
              <p>Los momentos que definieron el escritorio y forjaron su carácter.</p>
            </div>

            <div className={styles.timeline}>
              {historiaTimeline.map((ev, i) => (
                <div
                  key={ev.year}
                  className={`${styles.event} reveal`}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className={styles.eventYear}>{ev.year}</div>
                  <div className={styles.eventLine} />
                  <div className={styles.eventBody}>
                    <h3>{ev.title}</h3>
                    <p>{ev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="block" style={{ background: 'var(--paper)' }}>
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">Archivo fotográfico</span>
              <h2>Imágenes que cuentan nuestra historia.</h2>
              <p>
                Una selección de momentos y paisajes que representan el espíritu del escritorio.
                Las fotos históricas serán incorporadas próximamente.
              </p>
            </div>

            <div className={styles.gallery}>
              {visibleGallery.map((photo, i) => (
                <div
                  key={photo.id}
                  className={`${styles.photoCard} ${photo.span === 'wide' ? styles.photoWide : ''} reveal`}
                  style={{ transitionDelay: `${i * 0.07}s` }}
                >
                  <img src={photo.src} alt={photo.caption} loading="lazy" />
                  <div className={styles.photoOverlay}>{photo.caption}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EQUIPO ── */}
        <section id="equipo-hoy" className="block" style={{ background: 'var(--bone)' }}>
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">El equipo hoy</span>
              <h2>Las personas detrás del escritorio.</h2>
              <p>
                Cada integrante comparte los mismos valores que dieron origen a esta historia.
                Escríbanos directo por WhatsApp.
              </p>
            </div>

            <div className={styles.teamGrid}>
              {team.map((member, i) => (
                <div
                  key={member.id}
                  className={`${styles.teamCard} reveal`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  aria-label={`Ver perfil de ${member.name}`}
                  onClick={() => setSelectedMember(member)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedMember(member)
                  }}
                >
                  <div className={styles.av}>
                    {member.image ? (
                      <img src={member.image} alt={member.name} className={styles.avImg} />
                    ) : (
                      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <circle cx="50" cy="36" r="16" fill="#2c3a2c" fillOpacity="0.55" />
                        <path
                          d="M0 100 C0 68 22 57 50 57 C78 57 100 68 100 100 Z"
                          fill="#2c3a2c"
                          fillOpacity="0.42"
                        />
                      </svg>
                    )}
                  </div>
                  <h4>{member.name}</h4>
                  <div className={styles.memberRole}>{member.role}</div>
                  <a
                    href={member.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.waLink}
                    aria-label={`WhatsApp ${member.name}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14} aria-hidden="true">
                      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2z" />
                    </svg>
                    WhatsApp
                  </a>
                  <span className={styles.viewHint} aria-hidden="true">Ver perfil →</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALORES ── */}
        <section className="block" style={{ background: 'var(--forest)' }}>
          <div className="wrap">
            <div className={`${styles.valHead} reveal`}>
              <span className={styles.valEyebrow}>Lo que nos define</span>
              <h2 className={styles.valH2}>Nuestros valores.</h2>
              <p className={styles.valP}>
                Los principios que guían cada trato, cada remate y cada relación con el productor.
              </p>
            </div>

            <div className={styles.valoresGrid}>
              {VALORES.map((v, i) => (
                <div
                  key={v.title}
                  className={`${styles.valorCard} reveal`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className={styles.valorIco}>{v.icon}</div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="block" style={{ background: 'var(--paper)' }}>
          <div className="wrap">
            <div className={`${styles.ctaBox} reveal`}>
              <h2>¿Listo para trabajar juntos?</h2>
              <p>Más de 50 años al servicio del productor. Estamos para ayudarle.</p>
              <div className={styles.ctaBtns}>
                <Link to="/#contacto" className="btn btn-solid">
                  Contactarnos
                </Link>
                <a
                  href={WA_NUMBER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {selectedMember && (
        <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}

      <PhoneStrip />
      <Footer />
      <WhatsAppFab />
    </>
  )
}
