import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  AUCTIONS,
  HISTORIA_GALLERY,
  HISTORIA_TIMELINE,
  LOTES,
  PRICES,
  SERVICES,
  TEAM,
  VENTAS_PARTICULARES,
} from '../data'
import type {
  AuctionItem,
  GalleryPhoto,
  HistoriaEvent,
  HistoriaHeroContent,
  LoteCard,
  PriceRow,
  ServiceCard,
  TeamMember,
  VentaCard,
} from '../types'

type PublicEntry = {
  id?: string
  title?: string
  slug?: string
  data?: Record<string, unknown>
  updatedAt?: string
}

type PublicEntriesResponse = {
  items?: PublicEntry[]
}

type CmsContent = {
  services: ServiceCard[]
  auctions: AuctionItem[]
  lotes: LoteCard[]
  prices: PriceRow[]
  ventasParticulares: VentaCard[]
  team: TeamMember[]
  historiaTimeline: HistoriaEvent[]
  historiaGallery: GalleryPhoto[]
  historiaHero: HistoriaHeroContent
  heroPillLabel: string
  logoImage?: string
  homeHeroImage?: string
  mercadoUpdatedLabel?: string
  mercadoSourceNote?: string
}

const FALLBACK_CONTENT: CmsContent = {
  services: SERVICES,
  auctions: AUCTIONS,
  lotes: LOTES,
  prices: PRICES,
  ventasParticulares: VENTAS_PARTICULARES,
  team: TEAM,
  historiaTimeline: HISTORIA_TIMELINE,
  historiaGallery: HISTORIA_GALLERY,
  historiaHero: {
    eyebrow: 'Desde 1973',
    title: 'Nuestra Historia',
    subtitle: 'Más de 50 años construyendo confianza en el campo uruguayo, operación a operación.',
    image: '',
  },
  heroPillLabel: 'Consultar agenda',
  logoImage: '/favicon.jpg',
  homeHeroImage: '',
  mercadoUpdatedLabel: 'Datos actualizados · Semana N°21 · 17/05/26 al 23/05/26',
  mercadoSourceNote:
    '* Valores orientativos con fines informativos. Fuente: ACG – Semana N°21. La ganadería es el principal rubro exportador de Uruguay, con cerca de US$ 2.647 millones en exportaciones de carne y casi 695.000 toneladas enviadas a unos 100 destinos.',
}

const CmsContentContext = createContext<CmsContent>(FALLBACK_CONTENT)

const API_BASE_URL =
  (
    import.meta.env.VITE_TRICODE_PUBLIC_API_BASE_URL ??
    import.meta.env.VITE_TRICODE_API_BASE_URL ??
    'https://cms.tricode.studio/api/v1'
  ).replace(/\/+$/, '')
const TENANT_SLUG = import.meta.env.VITE_TRICODE_TENANT_SLUG ?? 'ricardo-l-diaz'

function asText(value: unknown) {
  return String(value ?? '').trim()
}

function asNumber(value: unknown, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function readData(data: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
      return data[key]
    }
  }
  return undefined
}

const MONTH_NAMES_ES: Record<string, string> = {
  ene: 'enero',
  feb: 'febrero',
  mar: 'marzo',
  abr: 'abril',
  may: 'mayo',
  jun: 'junio',
  jul: 'julio',
  ago: 'agosto',
  sep: 'septiembre',
  set: 'septiembre',
  oct: 'octubre',
  nov: 'noviembre',
  dic: 'diciembre',
}

function fullMonthNameEs(month: string) {
  const key = month.trim().toLowerCase().replace(/\.$/, '').slice(0, 3)
  return MONTH_NAMES_ES[key] || month
}

function parseEntryDate(data: Record<string, unknown>): Date | null {
  const raw = asText(data.date)
  if (!raw) return null
  const parsed = new Date(raw)
  return Number.isNaN(parsed.valueOf()) ? null : parsed
}

function deriveDayMonth(data: Record<string, unknown>) {
  const date = parseEntryDate(data)
  return {
    day: asText(data.day) || (date ? String(date.getUTCDate()) : ''),
    month:
      asText(data.month) ||
      (date ? date.toLocaleDateString('es-UY', { month: 'short', timeZone: 'UTC' }).replace(/\.$/, '') : ''),
  }
}

/** Entre todos los remates, el que tenga la fecha más próxima (hoy o futura) — no el primero por orden manual. */
function findNextAuctionEntry(items: PublicEntry[]) {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  const withDates = items
    .map((item) => ({ item, date: parseEntryDate(item.data ?? {}) }))
    .filter((entry): entry is { item: PublicEntry; date: Date } => entry.date !== null)

  const upcoming = withDates
    .filter((entry) => entry.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
  if (upcoming.length) return upcoming[0].item

  // Si no hay remates futuros, usar el más reciente como referencia en vez de no mostrar nada.
  if (withDates.length) {
    return withDates.sort((a, b) => b.date.getTime() - a.date.getTime())[0].item
  }

  return items[0]
}

function getNextAuctionLabel(items: PublicEntry[]) {
  const next = findNextAuctionEntry(items)
  if (!next) return ''
  const { day, month } = deriveDayMonth(next.data ?? {})
  if (!day || !month) return ''
  return `${day} de ${fullMonthNameEs(month)}`
}

function splitLines(value: unknown) {
  return asText(value)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function sortByPosition<T extends { data?: Record<string, unknown>; title?: string }>(items: T[]) {
  return [...items].sort((a, b) => {
    const posA = Number(a.data?.position)
    const posB = Number(b.data?.position)
    const safeA = Number.isFinite(posA) ? posA : 9999
    const safeB = Number.isFinite(posB) ? posB : 9999
    if (safeA !== safeB) return safeA - safeB
    return asText(a.title).localeCompare(asText(b.title))
  })
}

async function fetchSection(section: string) {
  const response = await fetch(
    `${API_BASE_URL}/public/${encodeURIComponent(TENANT_SLUG)}/content-types/${encodeURIComponent(section)}/entries?limit=48`,
    { headers: { Accept: 'application/json' } }
  )
  if (!response.ok) {
    throw new Error(`CMS ${section} ${response.status}`)
  }
  const payload = (await response.json()) as PublicEntriesResponse
  return sortByPosition(payload.items ?? [])
}

async function fetchOptionalSection(section: string) {
  return fetchSection(section).catch(() => [])
}

function mapServices(items: PublicEntry[]): ServiceCard[] {
  if (!items.length) return SERVICES
  return items.map((item, index) => {
    const data = item.data ?? {}
    const icon = asText(data.icon) as ServiceCard['icon']
    return {
      id: asText(item.slug) || asText(item.id) || `service-${index + 1}`,
      icon: ['intermediacion', 'remates', 'campos', 'asesoria'].includes(icon) ? icon : 'intermediacion',
      title: asText(data.title) || asText(item.title) || 'Servicio',
      description: asText(data.description),
      cta: asText(data.cta) || 'Consultar',
      ctaHref: asText(readData(data, 'ctaHref', 'ctahref')) || '#contacto',
      motivo: asText(data.motivo) || undefined,
    }
  })
}

function mapAuctions(items: PublicEntry[]): AuctionItem[] {
  if (!items.length) return AUCTIONS
  return items.map((item, index) => {
    const data = item.data ?? {}
    return {
      id: asText(item.slug) || asText(item.id) || `auction-${index + 1}`,
      ...deriveDayMonth(data),
      title: asText(data.title) || asText(item.title) || 'Remate',
      details: [data.details ? splitLines(data.details) : [], asText(data.location), asText(data.time)]
        .flat()
        .filter(Boolean),
      type: asText(data.type) === 'feria' ? 'feria' : 'screen',
    }
  })
}

function mapLotes(items: PublicEntry[]): LoteCard[] {
  if (!items.length) return LOTES
  return items.map((item, index) => {
    const data = item.data ?? {}
    return {
      id: asText(item.slug) || asText(item.id) || `lote-${index + 1}`,
      lote: asText(data.lote) || asText(item.title) || `Lote ${index + 1}`,
      category: asText(data.category),
      heads: asNumber(data.heads),
      weightAvg: asNumber(readData(data, 'weightAvg', 'weightavg')),
      location: asText(data.location),
      time: asText(data.time),
      image: asText(data.image),
      status: asText(data.status).toLowerCase() === 'disponible' ? 'disponible' : 'vendido',
      price: asText(data.price) || undefined,
    }
  })
}

function mapPrices(items: PublicEntry[]): PriceRow[] {
  if (!items.length) return PRICES
  return items.map((item) => {
    const data = item.data ?? {}
    return {
      category: asText(data.category) || asText(item.title) || 'Categoría',
      sub: asText(data.sub),
      value: asText(data.value),
      unit: asText(data.unit),
      change: asText(data.change),
      direction: asText(data.direction) === 'down' ? 'down' : 'up',
      group: asText(data.group) || 'Ganado a Faena',
      prev: asText(data.prev) || undefined,
    }
  })
}

function mapVentasParticulares(items: PublicEntry[]): VentaCard[] {
  if (!items.length) return VENTAS_PARTICULARES
  return items.map((item, index) => {
    const data = item.data ?? {}
    return {
      id: asText(item.slug) || asText(item.id) || `venta-${index + 1}`,
      ref: asText(readData(data, 'ref', 'reference', 'referencia')) || asText(item.title) || `VP · ${String(index + 1).padStart(2, '0')}`,
      category: asText(data.category) || asText(data.categoria) || 'Hacienda',
      heads: asNumber(readData(data, 'heads', 'cabezas')),
      weightAvg: asNumber(readData(data, 'weightAvg', 'weightavg', 'pesoPromedio', 'pesopromedio')),
      location: asText(data.location) || asText(data.ubicacion),
      date: asText(data.date) || asText(data.fecha),
      image: asText(data.image) || asText(data.imagen),
      status: asText(data.status).toLowerCase() === 'disponible' ? 'disponible' : 'vendido',
      price: asText(data.price) || asText(data.precio) || undefined,
    }
  })
}

function mapTeam(items: PublicEntry[]): TeamMember[] {
  if (!items.length) return TEAM
  return items.map((item, index) => {
    const data = item.data ?? {}
    const name = asText(data.name) || asText(item.title) || 'Integrante'
    return {
      id: asText(item.slug) || asText(item.id) || `member-${index + 1}`,
      name,
      role: asText(data.role),
      initials:
        asText(data.initials) ||
        name
          .split(' ')
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0]?.toUpperCase() ?? '')
          .join(''),
      whatsapp: asText(data.whatsapp),
      phone: asText(data.phone),
      image: asText(data.image),
      bio: asText(data.bio),
      specialties: splitLines(data.specialties),
    }
  })
}

function mapHistoria(items: PublicEntry[]) {
  if (!items.length) {
    return {
      historiaTimeline: HISTORIA_TIMELINE,
      historiaGallery: HISTORIA_GALLERY,
      historiaHero: FALLBACK_CONTENT.historiaHero,
    }
  }

  const byKind = (kind: string) =>
    items.filter((item) => asText(item.data?.kind).toLowerCase() === kind)

  const hero = byKind('hero')[0]
  const heroData = hero?.data ?? {}
  const timelineItems = byKind('timeline')
  const galleryItems = byKind('gallery')

  return {
    historiaTimeline: timelineItems.length
      ? timelineItems.map((item) => ({
          year: asText(item.data?.year),
          title: asText(item.data?.title) || asText(item.title),
          description: asText(item.data?.description) || asText(item.data?.subtitle),
        }))
      : HISTORIA_TIMELINE,
    historiaGallery: galleryItems.length
      ? galleryItems.map((item, index) => ({
          id: asText(item.slug) || asText(item.id) || `gallery-${index + 1}`,
          src: asText(item.data?.image),
          caption: asText(item.data?.caption) || asText(item.data?.title) || 'Historia',
          span: asText(item.data?.span) === 'wide' ? ('wide' as const) : undefined,
        }))
      : HISTORIA_GALLERY,
    historiaHero: {
      eyebrow: asText(heroData.year) || FALLBACK_CONTENT.historiaHero.eyebrow,
      title: asText(heroData.title) || FALLBACK_CONTENT.historiaHero.title,
      subtitle: asText(heroData.subtitle) || FALLBACK_CONTENT.historiaHero.subtitle,
      image: asText(heroData.image) || FALLBACK_CONTENT.historiaHero.image,
    },
  }
}

function mapHeroSection(items: PublicEntry[], auctionEntries: PublicEntry[]) {
  const hero = items[0]
  const data = hero?.data ?? {}
  return {
    heroPillLabel: getNextAuctionLabel(auctionEntries) || FALLBACK_CONTENT.heroPillLabel,
    homeHeroImage: asText(readData(data, 'image', 'homeHeroImage', 'homeheroimage')),
    logoImage: asText(readData(data, 'logoImage', 'logoimage', 'logo')),
  }
}

async function loadCmsContent(): Promise<CmsContent> {
  const [services, auctions, lotes, prices, ventasParticulares, team, historia, heroSection] = await Promise.all([
    fetchSection('servicios-rurales'),
    fetchSection('agenda-remates'),
    fetchSection('remate-lote-21'),
    fetchSection('mercado-ganadero'),
    fetchOptionalSection('ventas-particulares'),
    fetchSection('nuestra-gente'),
    fetchSection('historia'),
    fetchOptionalSection('hero-section'),
  ])

  const priceMeta = prices.find((item) =>
    asText(readData(item.data ?? {}, 'updatedLabel', 'updatedlabel')) ||
    asText(readData(item.data ?? {}, 'sourceNote', 'sourcenote'))
  )
  const historiaMapped = mapHistoria(historia)
  const mappedAuctions = mapAuctions(auctions)

  return {
    services: mapServices(services),
    auctions: mappedAuctions,
    lotes: mapLotes(lotes),
    prices: mapPrices(prices),
    ventasParticulares: mapVentasParticulares(ventasParticulares),
    team: mapTeam(team),
    ...historiaMapped,
    ...mapHeroSection(heroSection, auctions),
    mercadoUpdatedLabel:
      asText(readData(priceMeta?.data ?? {}, 'updatedLabel', 'updatedlabel')) ||
      FALLBACK_CONTENT.mercadoUpdatedLabel,
    mercadoSourceNote:
      asText(readData(priceMeta?.data ?? {}, 'sourceNote', 'sourcenote')) ||
      FALLBACK_CONTENT.mercadoSourceNote,
  }
}

export function CmsContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<CmsContent>(FALLBACK_CONTENT)

  useEffect(() => {
    let cancelled = false
    void loadCmsContent()
      .then((nextContent) => {
        if (!cancelled) setContent(nextContent)
      })
      .catch((error) => {
        console.warn('[cms] usando contenido estático', error)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => content, [content])
  return <CmsContentContext.Provider value={value}>{children}</CmsContentContext.Provider>
}

export function useCmsContent() {
  return useContext(CmsContentContext)
}
