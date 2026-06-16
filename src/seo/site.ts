export const SITE_URL = 'https://www.ricardoldiaz.com'
export const SITE_NAME = 'Ricardo L. Díaz - Escritorio Rural'
export const SITE_SHORT_NAME = 'Ricardo L. Díaz'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/portada-2.png`
export const DEFAULT_OG_IMAGE_WIDTH = 1083
export const DEFAULT_OG_IMAGE_HEIGHT = 864
export const LOGO_IMAGE = `${SITE_URL}/favicon.jpg`
export const LOGO_IMAGE_WIDTH = 640
export const LOGO_IMAGE_HEIGHT = 640

export type RouteSeo = {
  title: string
  description: string
  canonicalPath: string
  type?: 'website' | 'article'
}

export const ROUTE_SEO: Record<string, RouteSeo> = {
  '/': {
    title: 'Ricardo L. Díaz - Escritorio Rural | Negocios Rurales en Uruguay desde 1973',
    description:
      'Ricardo L. Díaz - Escritorio Rural en Trinidad, Flores. Mas de 50 anos en remates por pantalla, comercializacion ganadera, venta de campos y asesoramiento agropecuario en Uruguay.',
    canonicalPath: '/',
    type: 'website',
  },
  '/historia': {
    title: 'Nuestra Historia | Ricardo L. Díaz - Escritorio Rural',
    description:
      'Conozca la historia de Ricardo L. Díaz - Escritorio Rural: mas de cinco decadas de trayectoria, confianza y trabajo junto al productor ganadero uruguayo.',
    canonicalPath: '/historia',
    type: 'website',
  },
}

export function getRouteSeo(pathname: string): RouteSeo {
  return ROUTE_SEO[pathname] ?? ROUTE_SEO['/']
}

type JsonLd = Record<string, unknown>

export function buildStructuredData(pathname: string): JsonLd[] {
  const route = getRouteSeo(pathname)
  const canonicalUrl = new URL(route.canonicalPath, `${SITE_URL}/`).toString()

  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    url: `${SITE_URL}/`,
    description:
      'Negocios rurales, remates ganaderos por pantalla, comercializacion de ganado, venta de campos y asesoramiento agropecuario.',
    foundingDate: '1973',
    telephone: '+59898334256',
    sameAs: ['https://www.instagram.com/ricardo.l.diaz/'],
    logo: {
      '@type': 'ImageObject',
      url: LOGO_IMAGE,
      width: LOGO_IMAGE_WIDTH,
      height: LOGO_IMAGE_HEIGHT,
    },
    image: LOGO_IMAGE,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Francisco Fondar 533',
      addressLocality: 'Trinidad',
      addressRegion: 'Flores',
      addressCountry: 'UY',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Uruguay',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+59898334256',
        contactType: 'customer service',
        areaServed: 'UY',
        availableLanguage: ['es'],
      },
    ],
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    inLanguage: 'es-UY',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  }

  const professionalService = {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description:
      'Remates ganaderos por pantalla, comercializacion de ganado, ventas particulares, embarques a frigorificos y asesoramiento rural en Uruguay.',
    image: LOGO_IMAGE,
    foundingDate: '1973',
    telephone: '+59898334256',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Francisco Fondar 533',
      addressLocality: 'Trinidad',
      addressRegion: 'Flores',
      addressCountry: 'UY',
    },
    areaServed: 'UY',
    sameAs: ['https://www.instagram.com/ricardo.l.diaz/'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
  }

  const webPage = {
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: route.title,
    description: route.description,
    inLanguage: 'es-UY',
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#service`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: DEFAULT_OG_IMAGE,
      width: DEFAULT_OG_IMAGE_WIDTH,
      height: DEFAULT_OG_IMAGE_HEIGHT,
    },
  }

  const graph: JsonLd[] = [organization, website, professionalService, webPage]

  if (pathname === '/historia') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Nuestra Historia',
          item: canonicalUrl,
        },
      ],
    })
  }

  return graph
}
