import { Link } from 'react-router-dom'
import styles from './Nosotros.module.css'
import { useCmsContent } from '../../cms/CmsContentContext'

const values = [
  { title: 'Confianza', text: 'Relaciones de largo plazo, no transacciones aisladas.' },
  { title: 'Transparencia', text: 'Precios claros y resultados verificables en cada remate.' },
  { title: 'Cercanía', text: 'Conocemos cada productor y cada campo de la zona.' },
]

export function Nosotros() {
  const { aboutImage, historiaIntroImage, team } = useCmsContent()
  const federicoImage = team.find((member) => member.name.toLowerCase().includes('federico'))?.image
  const photoUrl = aboutImage || historiaIntroImage || federicoImage

  return (
    <section className="block" id="nosotros" aria-labelledby="nosotros-heading">
      <div className={`wrap ${styles.about}`}>
        <div className={`${styles.copy} reveal`}>
          <span className="eyebrow">Quiénes somos</span>
          <h2 id="nosotros-heading">Un escritorio con sello de valor desde 1973.</h2>
          <p className={styles.big}>
            «Cada operación es un compromiso. Nuestra palabra vale tanto como el ganado que comercializamos.»
          </p>
          <p>
            Desde Trinidad, en el corazón de Flores, el Escritorio Ricardo L. Díaz participa activamente
            en los remates y en la comercialización de ganado a nivel nacional, como miembro del consorcio
            Lote&nbsp;21. Una trayectoria familiar construida sobre el conocimiento del campo y la cercanía
            con el productor.
          </p>
          <p>
            Hoy combinamos esa tradición con herramientas digitales como remates por pantalla, datos de mercado
            y asesoría integral para que vender y comprar hacienda sea más simple, transparente y rentable.
          </p>

          <div className={styles.values}>
            {values.map((v) => (
              <div key={v.title} className={styles.value}>
                <div className={styles.vh}>{v.title}</div>
                <div className={styles.vp}>{v.text}</div>
              </div>
            ))}
          </div>

          <Link to="/historia" className={styles.historiaBtn}>
            Conocer nuestra historia
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" width={16} height={16}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className={`${styles.media} reveal`} style={{ transitionDelay: '0.2s' }}>
          <div className={styles.photo}>
            {photoUrl && (
              <img
                src={photoUrl}
                alt="Rematador Ricardo L. Díaz"
                loading="lazy"
              />
            )}
          </div>
          <div className={styles.badge} aria-hidden="true">
            <b>+50</b>
            <span>años aportando valor al productor</span>
          </div>
        </div>
      </div>
    </section>
  )
}
