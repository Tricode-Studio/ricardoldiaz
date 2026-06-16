import styles from './Trust.module.css'
import { STATS } from '../../data'

function StatItem({ stat, delay }: { stat: (typeof STATS)[0]; delay: number }) {
  return (
    <div className={`${styles.stat} reveal`} style={{ transitionDelay: `${delay * 0.15}s` }}>
      <div className={styles.n}>{stat.value}</div>
      <div className={styles.l}>{stat.label}</div>
    </div>
  )
}

export function Trust() {
  return (
    <div className={styles.trust} aria-label="Estadísticas clave">
      <div className="wrap">
        <div className={styles.grid}>
          {STATS.map((stat, i) => (
            <StatItem key={stat.value} stat={stat} delay={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
