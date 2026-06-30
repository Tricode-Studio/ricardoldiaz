import { useEffect, useState, type FormEvent } from 'react'
import styles from './Remates.module.css'
import { useCmsContent } from '../../cms/CmsContentContext'
import { submitAuctionAlertSubscription } from '../../cms/submitAuctionAlertSubscription'

export function Remates() {
  const { auctions } = useCmsContent()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const closeModal = () => {
    setIsModalOpen(false)
    setPhone('')
    setName('')
    setEmail('')
    setStatus('idle')
    setMessage('')
  }

  useEffect(() => {
    if (!isModalOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && status !== 'submitting') {
        closeModal()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen, status])

  const openModal = () => {
    setIsModalOpen(true)
    setStatus('idle')
    setMessage('')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 7) {
      setStatus('error')
      setMessage('Ingresá un número de teléfono válido.')
      return
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error')
      setMessage('Ingresá un correo válido o dejá el campo vacío.')
      return
    }

    setStatus('submitting')
    setMessage('')

    try {
      await submitAuctionAlertSubscription({ phone, name, email })
      setStatus('success')
      setMessage('Listo. Te sumamos al grupo de difusión de remates.')
      setPhone('')
      setName('')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'No se pudo registrar el número.')
    }
  }

  return (
    <section className={`block ${styles.remates}`} id="remates" aria-labelledby="remates-heading" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Agenda de remates</span>
          <h2 id="remates-heading">Próximos remates por pantalla.</h2>
          <p>
            Consulte los lotes, suscríbase a las alertas y participe desde donde esté. Calendario en
            coordinación con el consorcio Lote&nbsp;21.
          </p>
        </div>

        <ul className={styles.list} role="list">
          {auctions.map((auction, i) => (
            <li
              key={auction.id}
              className={`${styles.auction} reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.date} aria-label={`${auction.day} de ${auction.month}`}>
                <div className={styles.day}>{auction.day}</div>
                <div className={styles.month}>{auction.month}</div>
              </div>

              <div className={styles.info}>
                <h4>{auction.title}</h4>
                <div className={styles.meta}>
                  {auction.details.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </div>

              <span className={`${styles.tag} ${auction.type === 'screen' ? styles.tagScreen : styles.tagFeria}`}>
                {auction.type === 'screen' ? 'Por pantalla' : 'Feria física'}
              </span>

              <div className={styles.acts}>
                <a href={auction.ctaHref}>{auction.ctaLabel}</a>
                {/* <a href="#news">Alertas</a> */}
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="btn btn-solid"
          aria-haspopup="dialog"
          onClick={openModal}
        >
          Suscribirse a alertas de remates
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>

        {isModalOpen && (
          <div className={styles.modalOverlay} role="presentation" onMouseDown={closeModal}>
            <div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="auction-alert-title"
              aria-describedby="auction-alert-description"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className={styles.modalClose}
                onClick={closeModal}
                disabled={status === 'submitting'}
                aria-label="Cerrar"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <span className={styles.modalEyebrow}>Alertas de remates</span>
              <h3 id="auction-alert-title">Sumate al grupo de difusión.</h3>
              <p id="auction-alert-description" className={styles.modalText}>
                Dejanos tu teléfono y te agregamos a un grupo donde compartiremos las próximas fechas de
                remates, novedades importantes y avisos vinculados a la agenda.
              </p>

              <form id="auction-alert-form" className={styles.alertForm} onSubmit={handleSubmit} noValidate>
                <div className={`${styles.alertField} ${styles.alertFieldPrimary}`}>
                  <label htmlFor="auction-alert-phone">Teléfono</label>
                  <input
                    id="auction-alert-phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="Ej: 099 123 456"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value)
                      if (status === 'error') {
                        setStatus('idle')
                        setMessage('')
                      }
                    }}
                    disabled={status === 'submitting'}
                    aria-describedby={message ? 'auction-alert-message' : undefined}
                    autoComplete="tel"
                    autoFocus
                    required
                  />
                </div>

                <div className={styles.optionalGrid}>
                  <div className={styles.alertField}>
                    <label htmlFor="auction-alert-name">Nombre opcional</label>
                    <input
                      id="auction-alert-name"
                      type="text"
                      placeholder="Ej: Ricardo Díaz"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value)
                        if (status === 'error') {
                          setStatus('idle')
                          setMessage('')
                        }
                      }}
                      disabled={status === 'submitting'}
                      autoComplete="name"
                    />
                  </div>

                  <div className={styles.alertField}>
                    <label htmlFor="auction-alert-email">Correo opcional</label>
                    <input
                      id="auction-alert-email"
                      type="email"
                      inputMode="email"
                      placeholder="nombre@email.com"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                        if (status === 'error') {
                          setStatus('idle')
                          setMessage('')
                        }
                      }}
                      disabled={status === 'submitting'}
                      autoComplete="email"
                    />
                  </div>
                </div>
                <button type="submit" className={styles.alertSubmit} disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Enviando...' : 'Enviar solicitud'}
                </button>
                {message && (
                  <p
                    id="auction-alert-message"
                    className={status === 'success' ? styles.alertSuccess : styles.alertError}
                    role={status === 'error' ? 'alert' : 'status'}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
