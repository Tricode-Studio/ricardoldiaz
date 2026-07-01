import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './VentasParticulares.module.css'
import { useCmsContent } from '../../cms/CmsContentContext'
import { formatUsd } from '../../lib/format'

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

function usePerPage() {
  const [perPage, setPerPage] = useState(3)
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 600) setPerPage(1)
      else if (window.innerWidth < 960) setPerPage(2)
      else setPerPage(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return perPage
}

export function VentasParticulares() {
  const { ventasParticulares } = useCmsContent()
  const perPage = usePerPage()
  const hasVentas = ventasParticulares.length > 0
  const total = Math.max(ventasParticulares.length, 1)
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const needsControls = hasVentas && totalPages > 1
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback(
    (p: number) => setPage(((p % totalPages) + totalPages) % totalPages),
    [totalPages]
  )

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages - 1))
  }, [totalPages])

  useEffect(() => {
    if (paused || !needsControls) return
    timerRef.current = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages)
    }, 4000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused, totalPages, needsControls])

  const translateX = -((page * perPage) / total) * 100

  return (
    <section className={`block ${styles.section}`} id="ventas-particulares" aria-labelledby="ventas-particulares-heading" style={{ paddingTop: 'clamp(20px, 2.5vw, 32px)' }}>
      <div className="wrap">
        <div className={`sec-head reveal ${styles.head}`}>
          <span className="eyebrow">Venta Directa · Hacienda</span>
          <h2 id="ventas-particulares-heading">Ventas Particulares</h2>
          <p>Operaciones directas entre productores, gestionadas con total transparencia.
            <br />
            Conectamos comprador y vendedor de forma ágil y segura.</p>
        </div>

        {hasVentas && (
          <>
            <div
              className={styles.carouselWrap}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div
                className={styles.track}
                style={{
                  transform: `translateX(${translateX}%)`,
                  ['--per-page' as string]: perPage,
                  ['--total' as string]: total,
                }}
              >
                {ventasParticulares.map((venta) => (
                  <article key={venta.id} className={styles.card}>
                    <div className={styles.imgWrap}>
                      {venta.image ? (
                        <img src={venta.image} alt={`${venta.ref} — ${venta.category}`} loading="lazy" />
                      ) : (
                        <div className={styles.imgFallback} aria-hidden="true" />
                      )}
                      <div className={`${styles.badge} ${venta.status === 'vendido' ? styles.badgeSold : styles.badgeAvail}`}>
                        {venta.status === 'vendido' ? 'Vendido' : 'Disponible'}
                        {formatUsd(venta.price) && <span>{formatUsd(venta.price)}</span>}
                      </div>
                      <div className={styles.imgMeta}>
                        <span>
                          <PinIcon />
                          {venta.location}
                        </span>
                        <span>
                          <CalendarIcon />
                          {venta.date}
                        </span>
                      </div>
                    </div>

                    <div className={styles.body}>
                      <p className={styles.loteNum}>{venta.ref}</p>
                      <h3 className={styles.category}>{venta.category}</h3>
                      <div className={styles.specs}>
                        <div className={styles.spec}>
                          <span className={styles.specVal}>{venta.heads}</span>
                          <span className={styles.specLabel}>cabezas</span>
                        </div>
                        <div className={styles.specDivider} aria-hidden="true" />
                        <div className={styles.spec}>
                          <span className={styles.specVal}>{venta.weightAvg} kg</span>
                          <span className={styles.specLabel}>peso promedio</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {needsControls && (
              <div className={styles.controls}>
                <button
                  className={styles.arrow}
                  onClick={() => goTo(page - 1)}
                  aria-label="Ventas anteriores"
                >
                  <ChevronLeft />
                </button>

                <div className={styles.dots} role="tablist" aria-label="Páginas del carrusel">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === page}
                      aria-label={`Página ${i + 1}`}
                      className={`${styles.dot} ${i === page ? styles.dotActive : ''}`}
                      onClick={() => goTo(i)}
                    />
                  ))}
                </div>

                <button
                  className={styles.arrow}
                  onClick={() => goTo(page + 1)}
                  aria-label="Ventas siguientes"
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
