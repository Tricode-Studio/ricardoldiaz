import { useEffect } from 'react'
import {
  buildStructuredData,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
} from '../../seo/site'

type SeoProps = {
  title: string
  description: string
  canonicalPath?: string
  image?: string
  robots?: string
  type?: 'website' | 'article'
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value)
  })
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLLinkElement | null
  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value)
  })
}

function upsertJsonLd(id: string, payload: unknown) {
  let element = document.head.querySelector(`#${id}`) as HTMLScriptElement | null
  if (!element) {
    element = document.createElement('script')
    element.id = id
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }
  element.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': payload,
  })
}

export function Seo({
  title,
  description,
  canonicalPath = '/',
  image = DEFAULT_OG_IMAGE,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  type = 'website',
}: SeoProps) {
  useEffect(() => {
    const canonicalUrl = new URL(canonicalPath, `${SITE_URL}/`).toString()

    document.title = title

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: description,
    })
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: robots,
    })
    upsertMeta('meta[name="googlebot"]', {
      name: 'googlebot',
      content: robots,
    })
    upsertMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: type,
    })
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: title,
    })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    })
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl,
    })
    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: image,
    })
    upsertMeta('meta[property="og:image:secure_url"]', {
      property: 'og:image:secure_url',
      content: image,
    })
    upsertMeta('meta[property="og:image:width"]', {
      property: 'og:image:width',
      content: String(DEFAULT_OG_IMAGE_WIDTH),
    })
    upsertMeta('meta[property="og:image:height"]', {
      property: 'og:image:height',
      content: String(DEFAULT_OG_IMAGE_HEIGHT),
    })
    upsertMeta('meta[property="og:image:alt"]', {
      property: 'og:image:alt',
      content: 'Portada de Ricardo L. Díaz - Escritorio Rural',
    })
    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: SITE_NAME,
    })
    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    })
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: title,
    })
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    })
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: image,
    })
    upsertMeta('meta[name="twitter:image:alt"]', {
      name: 'twitter:image:alt',
      content: 'Portada de Ricardo L. Díaz - Escritorio Rural',
    })
    upsertMeta('meta[name="application-name"]', {
      name: 'application-name',
      content: SITE_NAME,
    })
    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl,
    })
    upsertLink('link[rel="alternate"][hreflang="es-UY"]', {
      rel: 'alternate',
      hreflang: 'es-UY',
      href: canonicalUrl,
    })
    upsertJsonLd('route-jsonld', buildStructuredData(canonicalPath))
  }, [canonicalPath, description, image, robots, title, type])

  return null
}
