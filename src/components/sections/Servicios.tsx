import type { ReactElement } from 'react'
import styles from './Servicios.module.css'
import { SERVICES } from '../../data'
import type { ServiceCard } from '../../types'

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
      <rect x="3" y="9" width="13" height="7" rx="2.5" />
      <circle cx="18" cy="13" r="2.5" />
      <path d="M17 11l-1-2.5M19 11l1-2" />
      <path d="M5 16v4M8 16v4M12 16v4M15 16v4" />
      <path d="M3 13c-2 0-2-3 0-3" />
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
  return (
    <section className="block" id="servicios" style={{ background: 'var(--paper)' }} aria-labelledby="servicios-heading">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Nuestros servicios</span>
          <h2 id="servicios-heading">Soluciones integrales para el negocio ganadero.</h2>
          <p>
            Acompañamos cada etapa de la comercialización agropecuaria con experiencia local y una red de
            contactos que abarca gran parte de Uruguay.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((service, i) => (
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
