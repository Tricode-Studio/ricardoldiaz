import type { ReactElement } from 'react'
import styles from './Servicios.module.css'
import { SERVICES } from '../../data'
import type { ServiceCard } from '../../types'

const icons: Record<ServiceCard['icon'], ReactElement> = {
  intermediacion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
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
      <path d="M3 11l9-7 9 7M5 9v11h14V9M9 20v-6h6v6" />
    </svg>
  ),
  asesoria: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <path d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M18 12h3M16.3 7.7l2.1-2.1M9 17a3 3 0 0 1 6 0v3H9v-3z" />
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
            contactos que abarca Uruguay, Argentina y Brasil.
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
              <a href={service.ctaHref} className={styles.more}>
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
