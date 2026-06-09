export interface NavLink {
  label: string
  href: string
}

export interface Stat {
  value: string
  label: string
  isCount?: boolean
  countTarget?: number
  suffix?: string
}

export interface ServiceCard {
  id: string
  icon: 'intermediacion' | 'remates' | 'campos' | 'asesoria'
  title: string
  description: string
  cta: string
  ctaHref: string
  motivo?: string
}

export interface AuctionItem {
  id: string
  day: string
  month: string
  title: string
  details: string[]
  type: 'screen' | 'feria'
}

export interface PriceRow {
  category: string
  sub: string
  value: string
  unit: string
  change: string
  direction: 'up' | 'down'
  group?: string
  prev?: string
}

export interface FieldCard {
  id: string
  location: string
  title: string
  image: string
  specs: { label: string; value: string }[]
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  initials: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  initials: string
  whatsapp: string
  image?: string
  bio?: string
  specialties?: string[]
  phone?: string
}

export interface BlogPost {
  id: string
  image: string
  category: string
  title: string
  excerpt: string
  readTime: string
}

export interface FooterColumn {
  heading: string
  links: { label: string; href: string }[]
}

export interface LoteCard {
  id: string
  lote: string
  category: string
  heads: number
  weightAvg: number
  location: string
  time: string
  image: string
  status: 'vendido' | 'disponible'
  price?: string
}

export interface VentaCard {
  id: string
  ref: string
  category: string
  heads: number
  weightAvg: number
  location: string
  date: string
  image: string
  status: 'vendido' | 'disponible'
  price?: string
}

export interface HistoriaEvent {
  year: string
  title: string
  description: string
}

export interface GalleryPhoto {
  id: string
  src: string
  caption: string
  span?: 'wide'
}

export interface HistoriaHeroContent {
  eyebrow?: string
  title?: string
  subtitle?: string
  image?: string
}
