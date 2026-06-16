import { useLocation, Link } from 'react-router'
import styles from './Footer.module.css'
import { FOOTER_COLUMNS, WA_NUMBER } from '../../data'
import { useCmsContent } from '../../cms/CmsContentContext'

export function Footer() {
  const { pathname } = useLocation()
  const { logoImage } = useCmsContent()
  const isHome = pathname === '/'

  const resolveHref = (href: string) =>
    href.startsWith('#') && !isHome ? `/${href}` : href

  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href={resolveHref('#inicio')} className={styles.brandInner} aria-label="Inicio">
              {logoImage && <img src={logoImage} alt="Logo Ricardo L. Díaz" width={48} height={48} />}
              <div>
                <b>Ricardo L. Díaz</b>
                <span>Escritorio Rural</span>
              </div>
            </a>
            <p>
              Más de cincuenta años acompañando al productor ganadero en Uruguay.
            </p>
            <div className={styles.social}>
              <a href={WA_NUMBER} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17}>
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2z" />
                </svg>
              </a>
              {/* <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17}>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a> */}
              <a href="https://www.instagram.com/ricardo.l.diaz/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={17} height={17}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} className={styles.col}>
              <h5>{col.heading}</h5>
              {col.links.map((link) => {
                const href = resolveHref(link.href)
                return href.startsWith('/') && !href.startsWith('/#') ? (
                  <Link key={link.label} to={href}>{link.label}</Link>
                ) : (
                  <a key={link.label} href={href}>{link.label}</a>
                )
              })}
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Ricardo L. Díaz – Escritorio Rural. Trinidad, Flores, Uruguay.</span>
          {/* <span>RUT: 000000000000 · Inscripto en el MGAP</span> */}
          {/* Comentado-meet-1 */}
        </div>
        <p className={styles.seoLine}>
          Escritorio Rural · Remates ganaderos por pantalla · Lote 21 · Comercialización de ganado Uruguay ·
          Venta de campos Uruguay · Intermediación agropecuaria · Trinidad, Flores · UY · Desde 1973
        </p>
      </div>
    </footer>
  )
}
