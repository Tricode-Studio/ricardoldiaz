import type {
  NavLink,
  Stat,
  ServiceCard,
  AuctionItem,
  PriceRow,
  FieldCard,
  Testimonial,
  TeamMember,
  BlogPost,
  FooterColumn,
} from '../types'

export const NAV_LINKS: NavLink[] = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Remates', href: '#remates' },
  { label: 'Mercado', href: '#mercado' },
  { label: 'Campos', href: '#campos' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Contacto', href: '#contacto' },
]

export const STATS: Stat[] = [
  { value: '50+', label: 'Años de trayectoria', isCount: true, countTarget: 50, suffix: '+' },
  { value: 'Lote 21', label: 'Consorcio integrante' },
  { value: '100+', label: 'Destinos de exportación', isCount: true, countTarget: 100, suffix: '+' },
  { value: 'UY·AR·BR', label: 'Alcance regional' },
]

export const SERVICES: ServiceCard[] = [
  {
    id: 'intermediacion',
    icon: 'intermediacion',
    title: 'Intermediación Ganadera',
    description:
      'Conectamos a vendedores y compradores con agilidad y total transparencia. Negociamos las mejores condiciones aprovechando nuestra red y conocimiento del mercado.',
    cta: 'Vender sin moverse del campo',
    ctaHref: '#contacto',
  },
  {
    id: 'remates',
    icon: 'remates',
    title: 'Remates por Pantalla (Lote 21)',
    description:
      'Transmisión en vivo de cada remate a través de la plataforma Lote 21. Más alcance, más compradores y la comodidad de operar a distancia con respaldo profesional.',
    cta: 'Ver próximos remates',
    ctaHref: '#remates',
  },
  {
    id: 'campos',
    icon: 'campos',
    title: 'Venta de Campos y Cabañas',
    description:
      'Comercialización de establecimientos ganaderos y propiedades rurales. Asesoramos a inversores locales e internacionales sobre rentabilidad y oportunidades de la zona.',
    cta: 'Explorar campos disponibles',
    ctaHref: '#campos',
  },
  {
    id: 'asesoria',
    icon: 'asesoria',
    title: 'Asesoría Agropecuaria',
    description:
      'Orientación experta en categorías, momento de venta, precios de referencia y estrategias de comercialización para maximizar la rentabilidad de cada productor.',
    cta: 'Solicitar asesoría',
    ctaHref: '#contacto',
  },
]

export const AUCTIONS: AuctionItem[] = [
  {
    id: 'a1',
    day: '28',
    month: 'May',
    title: 'Remate por Pantalla · Lote 21',
    details: ['Reposición e invernada', 'Trinidad, Flores', '14:00 h'],
    type: 'screen',
  },
  {
    id: 'a2',
    day: '11',
    month: 'Jun',
    title: 'Feria Mensual de Hacienda General',
    details: ['Vacas, terneros y novillos', 'Local Feria Flores', '10:00 h'],
    type: 'feria',
  },
  {
    id: 'a3',
    day: '25',
    month: 'Jun',
    title: 'Remate Especial de Cría · Lote 21',
    details: ['Vientres preñados y entoradas', 'Por pantalla', '15:00 h'],
    type: 'screen',
  },
]

export const PRICES: PriceRow[] = [
  {
    category: 'Terneros',
    sub: 'Hasta 140 kg',
    value: 'US$ 2,95',
    unit: '/kg',
    change: '3,1%',
    direction: 'up',
  },
  {
    category: 'Novillos gordos',
    sub: 'Faena',
    value: 'US$ 2,42',
    unit: '/kg',
    change: '1,8%',
    direction: 'up',
  },
  {
    category: 'Vacas de invernada',
    sub: 'Reposición',
    value: 'US$ 2,18',
    unit: '/kg',
    change: '0,9%',
    direction: 'down',
  },
  {
    category: 'Vientres preñados',
    sub: 'Por cabeza',
    value: 'US$ 820',
    unit: '',
    change: '2,4%',
    direction: 'up',
  },
]

export const FIELDS: FieldCard[] = [
  {
    id: 'f1',
    location: 'Artigas',
    title: 'Campo Ganadero · 550 ha',
    image:
      'https://www.inac.uy/innovaportal/file/26981/1/campos.png',
    specs: [
      { label: 'Superficie', value: '550 ha' },
      { label: 'Aptitud', value: 'Ganadera' },
      { label: 'Aguadas', value: 'Sí' },
    ],
  },
  {
    id: 'f2',
    location: 'Flores',
    title: 'Establecimiento Mixto · 1.200 ha',
    image:
      'https://images.unsplash.com/photo-1761732941184-8f10e45409fb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    specs: [
      { label: 'Superficie', value: '1.200 ha' },
      { label: 'Aptitud', value: 'Agríc.-Gan.' },
      { label: 'Mejoras', value: 'Casco' },
    ],
  },
  {
    id: 'f3',
    location: 'Salto',
    title: 'Casa de Campo · 2 dormitorios',
    image:
      'https://images.unsplash.com/photo-1658595152145-bdb556a1246c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    specs: [
      { label: 'Dormit.', value: '2' },
      { label: 'Terreno', value: '5 ha' },
      { label: 'Estado', value: 'Excelente' },
    ],
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Vendimos 500 terneras logrando cotizar el 100% del lote a un 15% por encima del promedio de mercado. Profesionalismo y agilidad de principio a fin.',
    author: 'Juan Martín R.',
    role: 'Productor · Flores',
    initials: 'JM',
  },
  {
    id: 't2',
    quote:
      'El acompañamiento en la venta de nuestro campo fue impecable. Conocen la zona, conocen a la gente y eso se traduce en mejores negocios.',
    author: 'Carolina F.',
    role: 'Inversora agropecuaria',
    initials: 'CF',
  },
  {
    id: 't3',
    quote:
      'Llevamos años trabajando con el escritorio. La transparencia en los precios y la palabra cumplida son lo que nos hace volver remate tras remate.',
    author: 'Diego P.',
    role: 'Cabañero · Durazno',
    initials: 'DP',
  },
]

export const TEAM: TeamMember[] = [
  { id: 'm1', name: 'Ricardo L. Díaz', role: 'Director', initials: 'RD', whatsapp: 'https://wa.me/59800000000' },
  { id: 'm2', name: 'Alvaro  Diaz', role: 'Comercial', initials: 'AD', whatsapp: 'https://wa.me/59800000000' },
  { id: 'm3', name: 'Fernando Paredes', role: 'Agente de campo', initials: 'FP', whatsapp: 'https://wa.me/59800000000' },
  { id: 'm4', name: 'Maximiliano Molina', role: 'Administración', initials: 'MM', whatsapp: 'https://wa.me/59800000000' },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    image:
      'https://comercioyjusticia.info/wp-content/uploads/2022/06/remate-de-ganado-bovino-e1654896865924.jpg',
    category: 'Mercado',
    title: 'Cómo vender ganado en remates por pantalla',
    excerpt:
      'Una guía práctica para aprovechar al máximo la comercialización digital de hacienda en Uruguay.',
    readTime: '5 min de lectura',
  },
  {
    id: 'b2',
    image:
      'https://images.unsplash.com/photo-1590249426516-4ac3a513c4cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdhbmFkb3xlbnwwfDB8MHx8fDI%3D',
    category: 'Tendencias',
    title: 'Valor del ganado hoy: qué mueve los precios',
    excerpt:
      'La demanda de China, los ciclos de exportación regional y su impacto en el bolsillo del productor.',
    readTime: '7 min de lectura',
  },
  {
    id: 'b3',
    image:
      'https://images.unsplash.com/photo-1636300965325-83f9718b2ac2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Inversión',
    title: 'Invertir en campos en Uruguay: todo lo que debés saber',
    excerpt:
      'Marco legal, zonas de mayor retorno y cómo evaluar la rentabilidad antes de comprar.',
    readTime: '9 min de lectura',
  },
]

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Servicios',
    links: [
      { label: 'Intermediación ganadera', href: '#servicios' },
      { label: 'Remates por pantalla', href: '#remates' },
      { label: 'Venta de campos', href: '#campos' },
      { label: 'Asesoría agropecuaria', href: '#servicios' },
    ],
  },
  {
    heading: 'Empresa',
    links: [
      { label: 'Nosotros', href: '#nosotros' },
      { label: 'Equipo', href: '#equipo' },
      { label: 'Blog', href: '#blog' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Aviso legal', href: '#' },
      { label: 'Privacidad', href: '#' },
      { label: 'Términos de uso', href: '#' },
    ],
  },
]

export const WA_NUMBER = 'https://wa.me/59800000000'
