import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './Lotes.module.css'
import { useCmsContent } from '../../cms/CmsContentContext'

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
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

const EmptyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M3 11h18M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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

export function Lotes() {
  const { lotes } = useCmsContent()
  const perPage = usePerPage()
  const hasLotes = lotes.length > 0
  const total = Math.max(lotes.length, 1)
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const needsControls = hasLotes && totalPages > 1
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

  // translateX as % of track width: -(page * perPage / TOTAL * 100)
  const translateX = -((page * perPage) / total) * 100

  return (
    <section className={`block ${styles.section}`} id="lotes" aria-labelledby="lotes-heading" style={{ paddingTop: 'clamp(36px, 4.5vw, 64px)', paddingBottom: 'clamp(20px, 2.5vw, 32px)' }}>
      <div className="wrap">
        <div className={`sec-head reveal ${styles.head}`}>
          <span className="eyebrow">Remate · Lote 21</span>
          <h2 id="lotes-heading">Lotes por pantalla</h2>
          <p>Resultados de los últimos y próximos remates en pantalla.
            <br />
            Todos los lotes cotizados con transparencia.</p>
        </div>

        {hasLotes ? (
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
                {lotes.map((lote) => (
                  <article key={lote.id} className={styles.card}>
                    <div className={styles.imgWrap}>
                      {lote.image ? (
                        <img src={lote.image} alt={`${lote.lote} — ${lote.category}`} loading="lazy" />
                      ) : (
                        <div className={styles.imgFallback} aria-hidden="true" />
                      )}
                      <div className={`${styles.badge} ${lote.status === 'vendido' ? styles.badgeSold : styles.badgeAvail}`}>
                        {lote.status === 'vendido' ? 'Vendido' : 'Disponible'}
                        {lote.price && <span>{lote.price}</span>}
                      </div>
                      <div className={styles.imgMeta}>
                        <span>
                          <PinIcon />
                          {lote.location}
                        </span>
                        <span>
                          <ClockIcon />
                          {lote.time}
                        </span>
                      </div>
                    </div>

                    <div className={styles.body}>
                      <p className={styles.loteNum}>{lote.lote}</p>
                      <h3 className={styles.category}>{lote.category}</h3>
                      <div className={styles.specs}>
                        <div className={styles.spec}>
                          <span className={styles.specVal}>{lote.heads}</span>
                          <span className={styles.specLabel}>cabezas</span>
                        </div>
                        <div className={styles.specDivider} aria-hidden="true" />
                        <div className={styles.spec}>
                          <span className={styles.specVal}>{lote.weightAvg} kg</span>
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
                  aria-label="Lotes anteriores"
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
                  aria-label="Lotes siguientes"
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.empty} role="status">
            <EmptyIcon />
            <p className={styles.emptyTitle}>No hay lotes disponibles por el momento</p>
            <p className={styles.emptyText}>
              Estamos preparando los próximos lotes para remate. Volvé a consultar pronto o suscribite a
              la agenda de remates para enterarte en cuanto se publiquen.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
