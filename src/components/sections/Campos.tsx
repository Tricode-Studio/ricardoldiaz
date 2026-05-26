import styles from './Campos.module.css'
import { FIELDS } from '../../data'

export function Campos() {
  return (
    <section className="block" id="campos" aria-labelledby="campos-heading">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Mercado inmobiliario rural</span>
          <h2 id="campos-heading">Campos y cabañas en venta.</h2>
          <p>
            Selección de establecimientos ganaderos y propiedades rurales. Solicite la ficha técnica
            completa de cada campo.
          </p>
        </div>

        <div className={styles.grid}>
          {FIELDS.map((field, i) => (
            <article
              key={field.id}
              className={`${styles.card} reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.img}>
                <span className={styles.pin}>{field.location}</span>
                <img src={field.image} alt={field.title} loading="lazy" />
              </div>
              <div className={styles.body}>
                <h4>{field.title}</h4>
                <div className={styles.specs}>
                  {field.specs.map((spec) => (
                    <div key={spec.label}>
                      {spec.label}
                      <b>{spec.value}</b>
                    </div>
                  ))}
                </div>
                <div className={styles.ln}>
                  <span className={styles.price}>Consultar valor</span>
                  <a href="#contacto">
                    Ver ficha
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      style={{ width: 14, height: 14 }}
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
