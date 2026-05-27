import styles from './Remates.module.css'
import { AUCTIONS } from '../../data'

export function Remates() {
  return (
    <section className={`block ${styles.remates}`} id="remates" aria-labelledby="remates-heading">
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
          {AUCTIONS.map((auction, i) => (
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

              {/* <span className={`${styles.tag} ${auction.type === 'screen' ? styles.tagScreen : styles.tagFeria}`}>
                {auction.type === 'screen' ? 'Por pantalla' : 'Feria física'}
              </span> */}

              <div className={styles.acts}>
                <a href="#contacto">Ver lotes</a>
                {/* <a href="#news">Alertas</a> */}
              </div>
            </li>
          ))}
        </ul>

        <a href="#news" className="btn btn-solid">
          Suscribirse a alertas de remates
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  )
}
