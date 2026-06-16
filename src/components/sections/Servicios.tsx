import type { ReactElement } from 'react'
import { useNavigate } from 'react-router'
import styles from './Servicios.module.css'
import type { ServiceCard } from '../../types'
import { useCmsContent } from '../../cms/CmsContentContext'

const icons: Record<ServiceCard['icon'], ReactElement> = {
  intermediacion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  remates: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  campos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <path d="M11 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
      <path d="M11 3v4h6" />
      <rect x="4" y="9" width="2.5" height="2.5" rx="0.4" />
      <path d="M8 10.25h5" />
      <rect x="4" y="13" width="2.5" height="2.5" rx="0.4" />
      <path d="M8 14.25h5" />
      <rect x="4" y="17" width="2.5" height="2.5" rx="0.4" />
      <path d="M8 18.25h3" />
      <circle cx="19" cy="19" r="4" />
      <path d="M17 19l1.5 1.5 3-3" />
    </svg>
  ),
  asesoria: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 5v3h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
}

export function Servicios() {
  const navigate = useNavigate()
  const { services } = useCmsContent()

  const handleContactCta = (e: React.MouseEvent, motivo: string) => {
    e.preventDefault()
    navigate(`/?motivo=${encodeURIComponent(motivo)}`)
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="block" id="servicios" style={{ background: 'var(--forest)' }} aria-labelledby="servicios-heading">
      <div className="wrap">
        <div className={`${styles.secHead} reveal`}>
          <span className={styles.eyebrow}>Nuestros servicios</span>
          <h2 id="servicios-heading">Soluciones integrales para el negocio ganadero.</h2>
          <p>
            Acompañamos cada etapa de la comercialización agropecuaria con experiencia local y una red de
            contactos que abarca gran parte de Uruguay.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <article
              key={service.id}
              className={`${styles.card} reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.ico}>{icons[service.icon]}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a
                href={service.ctaHref}
                className={styles.more}
                target={service.icon === 'remates' ? '_blank' : undefined}
                rel={service.icon === 'remates' ? 'noopener noreferrer' : undefined}
                onClick={service.motivo ? (e) => handleContactCta(e, service.motivo!) : undefined}
              >
                {service.cta}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
