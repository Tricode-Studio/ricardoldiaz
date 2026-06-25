import { useEffect } from 'react'

/**
 * Inyecta Google Analytics 4 y/o Meta Pixel en runtime, leyendo el ID
 * configurado en el CMS de Tricode (sin redeploy de este sitio).
 *
 * Fuente: GET {API_BASE_URL}/public/{TENANT_SLUG}/tracking-config
 * Si el tenant no configuró ningún ID, no se inyecta nada.
 *
 * Corre solo en el navegador (useEffect no se ejecuta durante el
 * renderToString del prerender), así que nunca interfiere con el build.
 */

const API_BASE_URL =
  import.meta.env.VITE_TRICODE_PUBLIC_API_BASE_URL ??
  import.meta.env.VITE_TRICODE_API_BASE_URL ??
  'https://cms.tricode.studio/api/v1'

const TENANT_SLUG = import.meta.env.VITE_TRICODE_TENANT_SLUG ?? 'ricardo-l-diaz'

type TrackingConfig = {
  ga4Id?: string
  metaPixelId?: string
}

type TrackingConfigResponse = {
  config?: TrackingConfig
}

type GtagFn = (...args: unknown[]) => void
type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue?: unknown[]
  push?: FbqFn
  loaded?: boolean
  version?: string
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GtagFn
    fbq?: FbqFn
    _fbq?: FbqFn
  }
}

function injectGa4(ga4Id: string) {
  const selector = `script[src*="googletagmanager.com/gtag/js?id=${ga4Id}"]`
  if (document.querySelector(selector)) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer ?? []
  window.gtag =
    window.gtag ??
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }
  window.gtag('js', new Date())
  window.gtag('config', ga4Id)
}

function injectMetaPixel(pixelId: string) {
  if (!window.fbq) {
    const fbq: FbqFn = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args)
      else fbq.queue!.push(args)
    }
    fbq.queue = []
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.push = fbq
    window.fbq = fbq
    window._fbq = window._fbq ?? fbq

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript?.parentNode?.insertBefore(script, firstScript)
  }

  window.fbq!('init', pixelId)
  window.fbq!('track', 'PageView')
}

export function TrackingScript() {
  useEffect(() => {
    const base = API_BASE_URL.replace(/\/+$/, '')
    const slug = TENANT_SLUG.trim()
    if (!base || !slug) return

    let cancelled = false

    fetch(`${base}/public/${encodeURIComponent(slug)}/tracking-config`)
      .then((res) => (res.ok ? (res.json() as Promise<TrackingConfigResponse>) : null))
      .then((data) => {
        if (cancelled || !data?.config) return

        const ga4Id = (data.config.ga4Id ?? '').trim()
        if (ga4Id) injectGa4(ga4Id)

        const metaPixelId = (data.config.metaPixelId ?? '').trim()
        if (metaPixelId) injectMetaPixel(metaPixelId)
      })
      .catch(() => {
        // Tracking es opcional -- si falla el fetch (offline, CMS caído, etc.)
        // la página debe seguir funcionando con normalidad.
      })

    return () => {
      cancelled = true
    }
  }, [])

  return null
}
