import styles from './Mercado.module.css'
import { PRICES } from '../../data'

const UpArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path d="M7 14l5-5 5 5" />
  </svg>
)

const DownArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path d="M7 10l5 5 5-5" />
  </svg>
)

export function Mercado() {
  return (
    <section className={`block ${styles.market}`} id="mercado" aria-labelledby="mercado-heading">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow" style={{ color: 'var(--beige)' }}>
            Mercado ganadero
          </span>
          <h2 id="mercado-heading" style={{ color: 'var(--bone)' }}>
            Precios de referencia, actualizados.
          </h2>
          <p style={{ color: 'rgba(245,241,231,.7)' }}>
            Transparencia de mercado para tomar mejores decisiones. Valores orientativos en dólares por kilo
            en pie — datos de referencia del cierre semanal.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.priceRows} reveal`}>
            {PRICES.map((row) => (
              <div key={row.category} className={styles.priceRow}>
                <div className={styles.cat}>
                  {row.category}
                  <small>{row.sub}</small>
                </div>
                <div className={styles.val}>
                  <span>{row.value}</span>
                  {row.unit && <small>{row.unit}</small>}
                </div>
                <span className={`${styles.chg} ${row.direction === 'up' ? styles.up : styles.down}`}>
                  {row.direction === 'up' ? <UpArrow /> : <DownArrow />}
                  {row.change}
                </span>
              </div>
            ))}
          </div>

          <div className={`${styles.chart} reveal`} style={{ transitionDelay: '0.2s' }}>
            <h4>Promedio del novillo gordo</h4>
            <div className={styles.sub}>Últimos 8 meses · US$/kg en pie</div>
            <svg viewBox="0 0 320 180" preserveAspectRatio="none" aria-label="Gráfico evolución precio novillo">
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#D2C7B1" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#D2C7B1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g stroke="rgba(245,241,231,.1)" strokeWidth="1">
                <line x1="0" y1="45" x2="320" y2="45" />
                <line x1="0" y1="90" x2="320" y2="90" />
                <line x1="0" y1="135" x2="320" y2="135" />
              </g>
              <path
                d="M0,130 L45,118 L90,124 L135,96 L180,88 L225,70 L270,58 L320,40 L320,180 L0,180 Z"
                fill="url(#g)"
              />
              <path
                d="M0,130 L45,118 L90,124 L135,96 L180,88 L225,70 L270,58 L320,40"
                fill="none"
                stroke="#D2C7B1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="320" cy="40" r="4.5" fill="#fff" />
            </svg>
          </div>
        </div>

        <p className={styles.note}>
          * Valores orientativos con fines informativos. La ganadería es el principal rubro exportador de
          Uruguay, con cerca de US$&nbsp;2.647 millones en exportaciones de carne y casi 695.000 toneladas
          enviadas a unos 100 destinos.
        </p>
      </div>
    </section>
  )
}
