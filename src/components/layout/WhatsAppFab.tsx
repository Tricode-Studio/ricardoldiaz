import styles from './WhatsAppFab.module.css'
import { WA_NUMBER } from '../../data'

export function WhatsAppFab() {
  return (
    <a
      href={WA_NUMBER}
      className={styles.fab}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width={28} height={28} aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.2c0 1.3 1 2.6 1.1 2.7s1.9 2.9 4.6 4c1.6.7 2.2.8 3 .6.5-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1-.2-.1-.4-.2z" />
      </svg>
    </a>
  )
}
