import styles from './Testimonials.module.css'
import { TESTIMONIALS } from '../../data'

export function Testimonials() {
  return (
    <section className={`block ${styles.results}`} aria-labelledby="testimonials-heading">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Resultados y testimonios</span>
          <h2 id="testimonials-heading">La prueba está en cada remate.</h2>
          <p>Operaciones reales, productores satisfechos. La confianza se construye con resultados.</p>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={t.id}
              className={`${styles.testi} reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.q} aria-hidden="true">"</div>
              <p>{t.quote}</p>
              <footer className={styles.who}>
                <div className={styles.av} aria-hidden="true">{t.initials}</div>
                <div>
                  <b>{t.author}</b>
                  <span>{t.role}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
