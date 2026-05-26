import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} id="inicio" aria-label="Inicio">
      {/* CSS scenery fallback */}
      <div className={styles.scene} aria-hidden="true" />

      {/* Photo background */}
      <div className={styles.bg} aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2000&auto=format&fit=crop"
          alt="Campo y ganado en la pradera uruguaya al atardecer"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Live pill */}
      <div className={styles.livePill} aria-live="polite">
        <span className={styles.dot} aria-hidden="true" />
        Próximo remate por pantalla · 28 de mayo
      </div>

      <div className={styles.content}>
        <span className="eyebrow" style={{ color: 'var(--beige)' }}>
          Est. 1973 · Trinidad, Flores · Uruguay
        </span>

        <h1>
          Negocios rurales con{' '}
          <em>raíz, palabra</em> y trayectoria.
        </h1>

        <p className={styles.lede}>
          Más de cincuenta años acompañando al productor en la comercialización de ganado,
          remates por pantalla y venta de campos. Confianza local, alcance internacional.
        </p>

        <div className={styles.actions}>
          <a href="#contacto" className="btn btn-solid">
            Consultar con un asesor
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a href="#remates" className={`btn ${styles.ghostLight}`}>
            Ver próximos remates
          </a>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        Desplazar <span className={styles.bar} />
      </div>
    </section>
  )
}
