import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { TeamMember } from '../../types'
import styles from './TeamModal.module.css'

interface Props {
  member: TeamMember
  onClose: () => void
}

export function TeamModal({ member, onClose }: Props) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Perfil de ${member.name}`}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Cerrar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={styles.inner}>
          <div className={styles.av}>
            {member.image ? (
              <img src={member.image} alt={member.name} className={styles.avImg} />
            ) : (
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={styles.avSvg}>
                <circle cx="50" cy="36" r="16" fill="#2c3a2c" fillOpacity="0.55" />
                <path d="M0 100 C0 68 22 57 50 57 C78 57 100 68 100 100 Z" fill="#2c3a2c" fillOpacity="0.42" />
              </svg>
            )}
          </div>

          <div className={styles.info}>
            <div>
              <h3 className={styles.name}>{member.name}</h3>
              <span className={styles.roleTag}>{member.role}</span>
            </div>

            {member.bio && <p className={styles.bio}>{member.bio}</p>}

            {member.specialties && member.specialties.length > 0 && (
              <div className={styles.specs}>
                {member.specialties.map((s) => (
                  <span key={s} className={styles.spec}>{s}</span>
                ))}
              </div>
            )}

            <div className={styles.actions}>
              <a
                href={member.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnWa}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2z" />
                </svg>
                WhatsApp
              </a>
              {member.phone && (
                <a href={`tel:${member.phone.replace(/\s/g, '')}`} className={styles.btnPhone}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 10.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17v-.08z" />
                  </svg>
                  Llamar
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
