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

const GROUPS = ['Ganado a Faena', 'Reposición'] as const

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
            en pie.
            <br />
            • Datos de referencia del cierre semanal.
          </p>
          <div className={styles.badge}>
            <span className={styles.dot} aria-hidden="true" />
            Datos actualizados · Semana N°21 · 17/05/26 al 23/05/26
          </div>
        </div>

        <div className={styles.priceGroups}>
          {GROUPS.map((group) => {
            const rows = PRICES.filter((p) => p.group === group)
            return (
              <div key={group} className={`${styles.priceGroup} reveal`}>
                <h3 className={styles.groupTitle}>{group}</h3>
                {rows.map((row) => (
                  <div key={row.category} className={styles.priceRow}>
                    <div className={styles.cat}>
                      {row.category}
                      <small>{row.sub}</small>
                    </div>
                    <div className={styles.valBlock}>
                      <div className={styles.val}>
                        <span>{row.value}</span>
                        <small>{row.unit}</small>
                      </div>
                      {row.prev && (
                        <div className={styles.prev}>ant. {row.prev}</div>
                      )}
                    </div>
                    {row.change ? (
                      <span className={`${styles.chg} ${row.direction === 'up' ? styles.up : styles.down}`}>
                        {row.direction === 'up' ? <UpArrow /> : <DownArrow />}
                        {row.change}
                      </span>
                    ) : (
                      <span className={styles.chgEmpty} />
                    )}
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        <p className={styles.note}>
          * Valores orientativos con fines informativos. Fuente: ACG – Semana N°21. La ganadería es el
          principal rubro exportador de Uruguay, con cerca de US$&nbsp;2.647 millones en exportaciones de
          carne y casi 695.000 toneladas enviadas a unos 100 destinos.
        </p>
      </div>
    </section>
  )
}
