import { useState } from 'react'
import styles from './NewsletterStrip.module.css'

export function NewsletterStrip() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className={styles.strip} id="news" aria-label="Suscripción a alertas">
      <div className="wrap">
        <div className={styles.inner}>
          <div>
            <h3>Alertas de remates y mercado</h3>
            <p>Recibí catálogos, resultados y precios de referencia antes que nadie.</p>
          </div>
          {submitted ? (
            <p className={styles.ok}>¡Suscripto correctamente! Te avisamos antes del próximo remate.</p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Correo electrónico"
              />
              <button type="submit" className="btn btn-solid">
                Suscribirme
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
