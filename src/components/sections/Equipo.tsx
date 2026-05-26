import styles from './Equipo.module.css'
import { TEAM } from '../../data'

export function Equipo() {
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
          {TEAM.map((member, i) => (
            <div
              key={member.id}
              className={`${styles.member} reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.av} aria-hidden="true">
                <span className={styles.ini}>{member.initials}</span>
              </div>
              <h4>{member.name}</h4>
              <div className={styles.role}>{member.role}</div>
              <a
                className={styles.wa}
                href={member.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${member.name}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2z" />
                </svg>
                WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
