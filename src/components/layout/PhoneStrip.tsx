import { useState } from 'react'
import styles from './PhoneStrip.module.css'

const MAXI_WA = 'https://wa.me/59897769995'

export function PhoneStrip() {
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleaned = phone.replace(/\s/g, '')
    if (!cleaned || cleaned.replace(/\D/g, '').length < 7) {
      setError('Ingresá un número de teléfono válido.')
      return
    }
    setError('')
    const msg = encodeURIComponent(
      `Hola, quisiera que me contacten. Mi número es: ${phone}`
    )
    window.open(`${MAXI_WA}?text=${msg}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
    setPhone('')
  }

  return (
    <section className={styles.strip} aria-label="Solicitar contacto">
      <div className="wrap">
        <div className={styles.inner}>
          <div>
            <h3>¿Hablamos?</h3>
            <p>Dejá tu número y nos pondremos en contacto a la brevedad.</p>
          </div>
          {submitted ? (
            <p className={styles.ok}>
              ¡Listo! Tu número fue enviado. Nos pondremos en contacto pronto.
            </p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.inputWrap}>
                <input
                  type="tel"
                  placeholder="Ej: 099 123 456"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    if (error) setError('')
                  }}
                  required
                  aria-label="Número de teléfono"
                  aria-describedby={error ? 'phone-error' : undefined}
                />
                {error && (
                  <span id="phone-error" className={styles.error} role="alert">
                    {error}
                  </span>
                )}
              </div>
              <button type="submit" className="btn btn-solid">
                Que me llamen
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
