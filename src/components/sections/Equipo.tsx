import { useState } from 'react'
import { Link } from 'react-router'
import styles from './Equipo.module.css'
import type { TeamMember } from '../../types'
import { TeamModal } from './TeamModal'
import { useCmsContent } from '../../cms/CmsContentContext'

export function Equipo() {
  const [selected, setSelected] = useState<TeamMember | null>(null)
  const { team } = useCmsContent()

  return (
    <section className="block" id="equipo" aria-labelledby="equipo-heading">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Nuestra gente</span>
          <h2 id="equipo-heading">Un equipo que conoce el campo.</h2>
          <p>
            Detrás de cada operación hay personas comprometidas con el productor.
            Escríbanos directo por WhatsApp.
          </p>
        </div>

        <div className={styles.grid}>
          {team.slice(0, 4).map((member, i) => (
            <div
              key={member.id}
              className={`${styles.member} reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`Ver perfil de ${member.name}`}
              onClick={() => setSelected(member)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelected(member)
              }}
            >
              <div className={styles.av} aria-hidden="true">
                {member.image ? (
                  <img src={member.image} alt={member.name} className={styles.photo} loading="lazy" decoding="async" />
                ) : (
                  <svg className={styles.avatarSvg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="36" r="16" fill="#2c3a2c" fillOpacity="0.55" />
                    <path d="M0 100 C0 68 22 57 50 57 C78 57 100 68 100 100 Z" fill="#2c3a2c" fillOpacity="0.42" />
                  </svg>
                )}
              </div>
              <h4>{member.name}</h4>
              <div className={styles.role}>{member.role}</div>
              <a
                className={styles.wa}
                href={member.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${member.name}`}
                onClick={(e) => e.stopPropagation()}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2z" />
                </svg>
                WhatsApp
              </a>
              <span className={styles.viewHint} aria-hidden="true">Ver perfil →</span>
            </div>
          ))}
        </div>

        {team.length > 4 && (
          <div className={styles.seeAll}>
            <Link to="/historia#equipo-hoy" className="btn btn-ghost">
              Conocer a todo el equipo
            </Link>
          </div>
        )}
      </div>

      {selected && (
        <TeamModal member={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
