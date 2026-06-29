import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { submitContactForm } from '../../cms/submitContactForm'
import styles from './Contacto.module.css'

type FormState = {
  nombre: string
  empresa: string
  email: string
  telefono: string
  motivo: string
  mensaje: string
}

const MOTIVOS = [
  'Inscripción de Lotes',
  'Compra de ganado',
  'Ventas Particulares',
  'Embarques a Frigoríficos',
  'Otro',
]

export function Contacto() {
  const [searchParams, setSearchParams] = useSearchParams()
  const motivoParam = searchParams.get('motivo') ?? ''
  const initialMotivo = MOTIVOS.includes(motivoParam) ? motivoParam : ''

  const [form, setForm] = useState<FormState>({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    motivo: initialMotivo,
    mensaje: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [errors, setErrors] = useState<Partial<FormState>>({})

  // Limpiar el query param de la URL una vez leído, sin afectar el historial
  useEffect(() => {
    if (motivoParam) setSearchParams({}, { replace: true })
  }, [])

  const validate = () => {
    const next: Partial<FormState> = {}
    if (!form.nombre.trim()) next.nombre = 'Requerido'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) next.email = 'Email inválido'
    if (!form.telefono.trim()) next.telefono = 'Requerido'
    if (!form.mensaje.trim()) next.mensaje = 'Requerido'
    return next
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setSubmitError('')
    setSubmitting(true)
    try {
      await submitContactForm(form)
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'No se pudo enviar el mensaje. Intente nuevamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <section className={`block ${styles.contact}`} id="contacto" aria-labelledby="contacto-heading">
      <div className="wrap">
        <div className={styles.grid}>
          {/* Info column */}
          <div className={`${styles.infoCol} reveal`}>
            <span className="eyebrow" style={{ color: 'var(--beige)' }}>
              Hablemos
            </span>
            <h2 id="contacto-heading">Estamos para ayudarlo.</h2>
            <p className={styles.intro}>
              Cuéntenos su necesidad y lo contactaremos a la brevedad. También puede escribirnos
              directamente por WhatsApp.
            </p>

            <address className={styles.contactInfo}>
              <div className={styles.ci}>
                <div className={styles.ic} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className={styles.t}>
                  <b>Dirección</b>
                  <span>Francisco Fondar 533, Trinidad, Flores — Uruguay</span>
                </div>
              </div>

              <div className={styles.ci}>
                <div className={styles.ic} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 10.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17v-.08z" />
                  </svg>
                </div>
                <div className={styles.t}>
                  <b>Teléfono</b>
                  <span>+598 98 334 256</span>
                </div>
              </div>

              {/* <div className={styles.ci}>
                <div className={styles.ic} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className={styles.t}>
                  <b>Email</b>
                  <span>contacto@ricardoldiaz.com</span>
                </div>
              </div> */}

              <div className={styles.ci}>
                <div className={styles.ic} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                </div>
                <div className={styles.t}>
                  <b>Horario de atención</b>
                  <span>Lunes a viernes · 8:00 – 18:00 h</span>
                </div>
              </div>
            </address>
          </div>

          {/* Form column */}
          <div className={`${styles.formWrap} reveal`} style={{ transitionDelay: '0.15s' }}>
            {submitted ? (
              <div className={styles.successMsg} role="alert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
                <h3>¡Mensaje enviado!</h3>
                <p>Lo contactaremos a la brevedad. Gracias por su consulta.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="nombre">Nombre *</label>
                    <input
                      id="nombre"
                      type="text"
                      placeholder="Su nombre completo"
                      value={form.nombre}
                      onChange={set('nombre')}
                      autoComplete="name"
                    />
                    {errors.nombre && <span className={styles.err}>{errors.nombre}</span>}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="empresa">Empresa / Establecimiento</label>
                    <input
                      id="empresa"
                      type="text"
                      placeholder="Opcional"
                      value={form.empresa}
                      onChange={set('empresa')}
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="su@correo.com"
                      value={form.email}
                      onChange={set('email')}
                      autoComplete="email"
                    />
                    {errors.email && <span className={styles.err}>{errors.email}</span>}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="telefono">Teléfono *</label>
                    <input
                      id="telefono"
                      type="tel"
                      placeholder="+598 09X XXX XXX"
                      value={form.telefono}
                      onChange={set('telefono')}
                      autoComplete="tel"
                    />
                    {errors.telefono && <span className={styles.err}>{errors.telefono}</span>}
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="motivo">Motivo de consulta</label>
                  <select id="motivo" value={form.motivo} onChange={set('motivo')}>
                    <option value="">Seleccionar…</option>
                    {MOTIVOS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    placeholder="Cuéntenos en qué podemos ayudarlo…"
                    value={form.mensaje}
                    onChange={set('mensaje')}
                    rows={4}
                  />
                  {errors.mensaje && <span className={styles.err}>{errors.mensaje}</span>}
                </div>

                {submitError && <span className={styles.err}>{submitError}</span>}

                <button type="submit" className={`btn btn-solid ${styles.submitBtn}`} disabled={submitting}>
                  {submitting ? 'Enviando…' : 'Enviar consulta'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
