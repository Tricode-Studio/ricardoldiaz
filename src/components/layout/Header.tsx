import styles from './Header.module.css'
import { useScrolled } from '../../hooks/useScrolled'
import { useMobileMenu } from '../../hooks/useMobileMenu'
import { NAV_LINKS, WA_NUMBER } from '../../data'
import logo from '/logo.jpg'

export function Header() {
  const scrolled = useScrolled(60)
  const atTop = !scrolled
  const { open, toggle, close } = useMobileMenu()

  return (
    <>
      <header
        className={[
          styles.nav,
          scrolled ? styles.scrolled : '',
          atTop ? styles.heroMode : '',
        ]
          .filter(Boolean)
          .join(' ')}
        role="banner"
      >
        <div className={styles.inner}>
          <a href="#inicio" className={styles.brand} aria-label="Ricardo L. Díaz — inicio">
            <img src={logo} alt="Logo Ricardo L. Díaz" width={42} height={42} />
            <div className={styles.brandText}>
              <b>Ricardo L. Díaz</b>
              <span>Escritorio Rural</span>
            </div>
          </a>

          <nav className={styles.links} aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.cta}>
            <a href={WA_NUMBER} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.2c0 1.3 1 2.6 1.1 2.7s1.9 2.9 4.6 4c1.6.7 2.2.8 3 .6.5-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1-.2-.1-.4-.2z" />
              </svg>
              WhatsApp
            </a>
            <button
              className={styles.menuBtn}
              onClick={toggle}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className={open ? styles.spanOpen1 : ''} />
              <span className={open ? styles.spanOpen2 : ''} />
              <span className={open ? styles.spanOpen3 : ''} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={[styles.mobileMenu, open ? styles.mobileMenuOpen : ''].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <button className={styles.closeBtn} onClick={close} aria-label="Cerrar menú">
          &times;
        </button>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <a href={WA_NUMBER} className="btn btn-wa" target="_blank" rel="noopener noreferrer" onClick={close}>
          Consultar por WhatsApp
        </a>
      </div>

      {open && <div className={styles.backdrop} onClick={close} aria-hidden="true" />}
    </>
  )
}
