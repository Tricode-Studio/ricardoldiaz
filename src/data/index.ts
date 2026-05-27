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
  LoteCard,
} from '../types'

export const NAV_LINKS: NavLink[] = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Remates', href: '#remates' },
  { label: 'Lotes', href: '#lotes' },
  { label: 'Mercado', href: '#mercado' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Contacto', href: '#contacto' },
]

export const STATS: Stat[] = [
  { value: '50+', label: 'Años de trayectoria', isCount: true, countTarget: 50, suffix: '+' },
  { value: 'Lote 21', label: 'Consorcio integrante' },
  { value: '1000+', label: 'Clientes satisfechos', isCount: true, countTarget: 1000, suffix: '+' },
  { value: 'UY', label: 'Alcance Nacional' },
]

export const SERVICES: ServiceCard[] = [
  {
    id: 'intermediacion',
    icon: 'intermediacion',
    title: 'Ventas Particulares',
    description:
      'Gestionamos la venta directa de su hacienda entre productores, con total transparencia y sin intermediarios innecesarios. Conectamos comprador y vendedor de forma ágil y segura.',
    cta: 'Consultar disponibilidad',
    ctaHref: '#equipo',
  },
  {
    id: 'remates',
    icon: 'remates',
    title: 'Remates en Vivo (Lote 21)',
    description:
      'Transmisión en vivo de cada remate a través de la plataforma Lote 21. Más alcance, más compradores y la comodidad de operar a distancia con respaldo profesional.',
    cta: 'Ver remates',
    ctaHref: 'https://www.youtube.com/@lote21tv/streams',
  },
  {
    id: 'Inscripción de lotes',
    icon: 'campos',
    title: 'Inscripción de Lotes',
    description:
      'Servicio especializado en la inscripción de lotes para remates, incluyendo manejo y cuidado del ganado antes de la venta.',
    cta: 'Saber más',
    ctaHref: '#contacto',
  },
  // {
  //   id: 'campos',
  //   icon: 'campos',
  //   title: 'Venta de Campos y Cabañas',
  //   description:
  //     'Comercialización de establecimientos ganaderos y propiedades rurales. Asesoramos a inversores locales e internacionales sobre rentabilidad y oportunidades de la zona.',
  //   cta: 'Explorar campos disponibles',
  //   ctaHref: '#campos',
  // },
  {
    id: 'asesoria',
    icon: 'asesoria',
    title: 'Embarques a Frigoríficos',
    description:
      'Coordinamos el envío de hacienda directamente a los principales frigoríficos del país. Gestionamos la logística, documentación y seguimiento para que el productor cobre en tiempo y forma.',
    cta: 'Coordinar embarque',
    ctaHref: '#contacto',
  },
]

export const AUCTIONS: AuctionItem[] = [
  {
    id: 'a1',
    day: '9',
    month: 'Jun',
    title: 'Remate · Lote 21',
    details: ['', 'Montevideo, Uruguay', '9:00 hs'],
    type: 'screen',
  },
  // {
  //   id: 'a2',
  //   day: '11',
  //   month: 'Jun',
  //   title: 'Feria Mensual de Hacienda General',
  //   details: ['Vacas, terneros y novillos', 'Local Feria Flores', '10:00 h'],
  //   type: 'feria',
  // },
  {
    id: 'a3',
    day: '10',
    month: 'Jun',
    title: 'Remate · Lote 21',
    details: ['', 'Montevideo, Uruguay', '9:00 hs'],
    type: 'screen',
  },
]

export const PRICES: PriceRow[] = [
  {
    category: 'Novillo',
    sub: 'Por kilo en cuarta balanza',
    value: '5,63',
    unit: 'US$/kg',
    change: '+0,06',
    direction: 'up',
    group: 'Ganado a Faena',
    prev: '5,57',
  },
  {
    category: 'Vaca',
    sub: 'Por kilo en cuarta balanza',
    value: '5,28',
    unit: 'US$/kg',
    change: '+0,03',
    direction: 'up',
    group: 'Ganado a Faena',
    prev: '5,25',
  },
  {
    category: 'Vaquillona',
    sub: 'Por kilo en cuarta balanza',
    value: '5,47',
    unit: 'US$/kg',
    change: '+0,04',
    direction: 'up',
    group: 'Ganado a Faena',
    prev: '5,43',
  },
  {
    category: 'Carne Bovina',
    sub: 'Precio móvil 30 días · Fuente: INAC – IMC',
    value: '6.078',
    unit: 'US$/ton PC',
    change: '',
    direction: 'up',
    group: 'Ganado a Faena',
  },
  {
    category: 'Ternero',
    sub: 'Por kilo en pie',
    value: '4,28',
    unit: 'US$/kg',
    change: '+0,03',
    direction: 'up',
    group: 'Reposición',
    prev: '4,25',
  },
  {
    category: 'Ternera',
    sub: 'Por kilo en pie',
    value: '4,02',
    unit: 'US$/kg',
    change: '+0,01',
    direction: 'up',
    group: 'Reposición',
    prev: '4,01',
  },
  {
    category: 'Vaca de Invernada',
    sub: 'Por kilo en pie',
    value: '2,44',
    unit: 'US$/kg',
    change: '+0,02',
    direction: 'up',
    group: 'Reposición',
    prev: '2,42',
  },
]

export const LOTES: LoteCard[] = [
  {
    id: 'l1',
    lote: 'Lote 6',
    category: 'Terneros de 140 a 180 kg',
    heads: 41,
    weightAvg: 175,
    location: 'Lavalleja',
    time: '09:20 hs',
    image: 'https://images.unsplash.com/photo-1590249426516-4ac3a513c4cd?w=700&q=80&fit=crop',
    status: 'vendido',
    price: 'US$ 4,02',
  },
  {
    id: 'l2',
    lote: 'Lote 13',
    category: 'Terneros más de 180 kg',
    heads: 55,
    weightAvg: 196,
    location: 'Treinta y Tres',
    time: '09:52 hs',
    image: 'https://images.unsplash.com/photo-1636300965325-83f9718b2ac2?w=700&q=80&fit=crop',
    status: 'vendido',
    price: 'US$ 4,12',
  },
  {
    id: 'l3',
    lote: 'Lote 17',
    category: 'Terneros más de 180 kg',
    heads: 48,
    weightAvg: 198,
    location: 'Rocha',
    time: '10:08 hs',
    image: 'https://images.unsplash.com/photo-1586113381167-c1e68e4b9507?w=700&q=80&fit=crop',
    status: 'vendido',
    price: 'US$ 4,05',
  },
  {
    id: 'l4',
    lote: 'Lote 22',
    category: 'Terneros más de 180 kg',
    heads: 60,
    weightAvg: 229,
    location: 'Maldonado',
    time: '10:28 hs',
    image: 'https://images.unsplash.com/photo-1603165022668-8502a0277471?w=700&q=80&fit=crop',
    status: 'vendido',
    price: 'US$ 4,12',
  },
  {
    id: 'l5',
    lote: 'Lote 31',
    category: 'Novillos de 1 a 2 años',
    heads: 54,
    weightAvg: 275,
    location: 'Maldonado',
    time: '11:04 hs',
    image: 'https://images.unsplash.com/photo-1658595152145-bdb556a1246c?w=700&q=80&fit=crop',
    status: 'vendido',
    price: 'US$ 3,40',
  },
  {
    id: 'l6',
    lote: 'Lote 42',
    category: 'Vacas de invernada',
    heads: 31,
    weightAvg: 375,
    location: 'Treinta y Tres',
    time: '11:44 hs',
    image: '/src/public/images/lote-1.jpg',
    status: 'vendido',
    price: 'US$ 2,44',
  },
]

export const FIELDS: FieldCard[] = [
  {
    id: 'f1',
    location: 'Artigas',
    title: 'Campo Ganadero · 550 ha',
    image:
      'https://images.unsplash.com/photo-1586113381167-c1e68e4b9507?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      'https://images.unsplash.com/photo-1603165022668-8502a0277471?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
  { id: 'm1', name: 'Federico Díaz', role: 'Director', initials: 'RD', whatsapp: 'https://wa.me/59899364509' },
  { id: 'm2', name: 'Alvaro  Diaz', role: 'Comercial', initials: 'AD', whatsapp: 'https://wa.me/59899364490' },
  { id: 'm3', name: 'Maximiliano Molina', role: 'Agente comercial', initials: 'MM', whatsapp: 'https://wa.me/59897769995' },
  { id: 'm4', name: 'Romina Fernandez', role: 'Administrativa', initials: 'RN', whatsapp: 'https://wa.me/59898334256' },
]

// Número Esctitorio 98334256

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
  // Comentado-meet-1
  // {
  //   heading: 'Legal',
  //   links: [
  //     { label: 'Aviso legal', href: '#' },
  //     { label: 'Privacidad', href: '#' },
  //     { label: 'Términos de uso', href: '#' },
  //   ],
  // },
]

export const WA_NUMBER = 'https://wa.me/59898334256'
