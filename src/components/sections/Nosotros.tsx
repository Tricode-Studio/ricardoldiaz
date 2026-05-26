import styles from './Nosotros.module.css'

const values = [
  { title: 'Confianza', text: 'Relaciones de largo plazo, no transacciones aisladas.' },
  { title: 'Transparencia', text: 'Precios claros y resultados verificables en cada remate.' },
  { title: 'Cercanía', text: 'Conocemos cada productor y cada campo de la zona.' },
]

export function Nosotros() {
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
            Hoy combinamos esa tradición con herramientas digitales —remates por pantalla, datos de mercado
            y asesoría integral— para que vender y comprar hacienda sea más simple, transparente y rentable.
          </p>

          <div className={styles.values}>
            {values.map((v) => (
              <div key={v.title} className={styles.value}>
                <div className={styles.vh}>{v.title}</div>
                <div className={styles.vp}>{v.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.media} reveal`} style={{ transitionDelay: '0.2s' }}>
          <div className={styles.photo}>
            <img
              src="https://images.unsplash.com/photo-1773606517379-098687ee08b2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Productor rural junto a su ganado"
              loading="lazy"
            />
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
