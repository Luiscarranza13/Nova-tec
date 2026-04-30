export const APP_NAME = 'NovaTec'
export const APP_DESCRIPTION = 'Agencia de Desarrollo de Software y Sistemas en Perú'
export const APP_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://novatec.vercel.app').trim()
export const WHATSAPP_NUMBER = '51918146783'
export const CONTACT_EMAIL = 'NovaTec.Empresarial@gmail.com'
export const CONTACT_ADDRESS = 'Senati Cajamarca, Perú'
export const CONTACT_PHONE = '+51 918 146 783'

export const NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Portafolio', href: '/portafolio' },
  { label: 'Planes', href: '/planes' },
  { label: 'Testimonios', href: '/testimonios' },
  { label: 'Contacto', href: '/contacto' },
]

export const SERVICES = [
  {
    id: 'desarrollo-web',
    name: 'Desarrollo Web Corporativo',
    description: 'Creamos páginas web de alto impacto, plataformas e-commerce y portales B2B diseñados para maximizar ventas en el mercado peruano.',
    icon: 'Globe',
    features: ['Páginas web empresariales', 'Tiendas E-commerce', 'Landing Pages', 'Optimización SEO'],
  },
  {
    id: 'desarrollo-mobile',
    name: 'Aplicaciones Móviles',
    description: 'Desarrollo de apps ágiles para iOS y Android. Soluciones móviles corporativas para mantener a tu empresa en sintonía con la era digital.',
    icon: 'Smartphone',
    features: ['Apps Nativas iOS / Android', 'React Native y Flutter', 'Pasarelas de Pago', 'Soporte Continuo'],
  },
  {
    id: 'desarrollo-software',
    name: 'Sistemas a Medida',
    description: 'Ingeniería de software empresarial y sistemas ERP a la medida para automatizar operaciones, finanzas y logística.',
    icon: 'Code',
    features: ['Sistemas de Gestión (ERP)', 'Automatización de Procesos', 'Desarrollo Backend', 'Facturación Electrónica'],
  },
  {
    id: 'ui-ux',
    name: 'Diseño UI/UX',
    description: 'Creamos interfaces de usuario atractivas y experiencias de usuario fluidas que cautivan a tus clientes.',
    icon: 'Palette',
    features: ['Diseño de interfaces', 'Prototipado', 'Diseño responsive', 'Design systems'],
  },
  {
    id: 'cloud',
    name: 'Soluciones Cloud',
    description: 'Implementamos infraestructura en la nube segura y escalable utilizando AWS, GCP o Azure.',
    icon: 'Cloud',
    features: ['AWS', 'Azure', 'GCP', 'DevOps'],
  },
  {
    id: 'consultoria',
    name: 'Consultoría Tech',
    description: 'Asesoramos a empresas en su transformación digital y adopción de nuevas tecnologías.',
    icon: 'Lightbulb',
    features: ['Auditorías técnicas', 'Arquitectura', 'Tech strategy', 'Code review'],
  },
]

export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Discovery',
    description: 'Analizamos tus necesidades, objetivos y requisitos del proyecto.',
    icon: 'Search',
  },
  {
    step: 2,
    title: 'Diseño',
    description: 'Creamos prototipos y mockups visualmente atractivos y funcionales.',
    icon: 'PenTool',
  },
  {
    step: 3,
    title: 'Desarrollo',
    description: 'Implementamos tu solución con código limpio y mejores prácticas.',
    icon: 'Code2',
  },
  {
    step: 4,
    title: 'Testing',
    description: 'Realizamos pruebas exhaustivas para garantizar la calidad.',
    icon: 'Bug',
  },
  {
    step: 5,
    title: 'Despliegue',
    description: 'Lanzamos tu producto y te acompañamos en el mantenimiento.',
    icon: 'Rocket',
  },
]

export const WHY_US = [
  {
    title: 'Equipo Experto',
    description: 'Profesionales con más de 10 años de experiencia en tecnología.',
    icon: 'Users',
  },
  {
    title: 'Metodología Ágil',
    description: 'Entregas iterativas que te mantienen en control del proyecto.',
    icon: 'Agile',
  },
  {
    title: 'Calidad Garantizada',
    description: 'Código limpio, documentado y probado exhaustivamente.',
    icon: 'Shield',
  },
  {
    title: 'Soporte Continuo',
    description: 'Te acompañamos antes, durante y después del proyecto.',
    icon: 'Headphones',
  },
]

export const PRICING_PLANS = [
  {
    name: 'Starter',
    description: 'Ideal para emprendedores y negocios que recién inician',
    price: 1500,
    features: [
      'Landing page profesional',
      'Diseño responsive (móvil + desktop)',
      'Formulario de contacto',
      'Integración WhatsApp',
      'Optimización SEO básica',
      'Soporte por 30 días',
    ],
    cta: 'Empezar ahora',
    popular: false,
    badge: null,
    delivery: '2–3 semanas',
  },
  {
    name: 'Professional',
    description: 'Para empresas que quieren crecer con una presencia digital sólida',
    price: 3500,
    features: [
      'Sitio web completo (hasta 8 páginas)',
      'Panel de administración',
      'Blog integrado',
      'SEO avanzado + Google Analytics',
      'Integración redes sociales',
      'Formularios personalizados',
      'Soporte por 90 días',
    ],
    cta: 'Elegir Professional',
    popular: true,
    badge: 'Más popular',
    delivery: '4–6 semanas',
  },
  {
    name: 'Enterprise',
    description: 'Solución completa a medida para empresas con necesidades avanzadas',
    price: 8000,
    features: [
      'Aplicación web o móvil completa',
      'Funcionalidades 100% personalizadas',
      'Integraciones con terceros (APIs)',
      'Base de datos y backend propio',
      'Capacitación al equipo',
      'Soporte prioritario por 1 año',
      'Mantenimiento incluido 3 meses',
    ],
    cta: 'Hablar con ventas',
    popular: false,
    badge: 'Premium',
    delivery: '8–16 semanas',
  },
]

export const STATS = [
  { value: 250, suffix: '+', label: 'Proyectos Completados' },
  { value: 120, suffix: '+', label: 'Clientes Satisfechos' },
  { value: 8, suffix: '+', label: 'Años de Experiencia' },
  { value: 25, suffix: '+', label: 'Expertos en Equipo' },
]

export const PROJECT_STATUSES = [
  { value: 'pending', label: 'Pendiente', color: 'bg-yellow-500' },
  { value: 'in_progress', label: 'En Progreso', color: 'bg-blue-500' },
  { value: 'review', label: 'En Revisión', color: 'bg-purple-500' },
  { value: 'completed', label: 'Completado', color: 'bg-green-500' },
  { value: 'cancelled', label: 'Cancelado', color: 'bg-red-500' },
]

export const QUOTATION_STATUSES = [
  { value: 'draft', label: 'Borrador', color: 'bg-gray-500' },
  { value: 'sent', label: 'Enviada', color: 'bg-blue-500' },
  { value: 'accepted', label: 'Aceptada', color: 'bg-green-500' },
  { value: 'rejected', label: 'Rechazada', color: 'bg-red-500' },
]

export const FAQ_ITEMS = [
  {
    id: 'delivery-time',
    question: '¿Cuánto tiempo tarda en completarse un proyecto?',
    answer: 'Los tiempos varían según la complejidad. Un sitio web puede tardar 4-8 semanas, mientras que aplicaciones complejas pueden tardar 3-6 meses. Proporcionamos un timeline detallado en el discovery.',
    category: 'proyecto',
  },
  {
    id: 'cost-estimation',
    question: '¿Cómo se determina el costo del proyecto?',
    answer: 'El costo se basa en el alcance, complejidad, tecnologías requeridas y tiempo estimado. Proporcionamos un presupuesto detallado después del discovery sin compromisos financieros previos.',
    category: 'precio',
  },
  {
    id: 'technologies',
    question: '¿Qué tecnologías utilizan?',
    answer: 'Utilizamos tecnologías modernas como Next.js, React, Node.js, Flutter, TypeScript, AWS y Supabase. Recomendamos las tecnologías más adecuadas según tus necesidades específicas.',
    category: 'tecnico',
  },
  {
    id: 'support-after',
    question: '¿Ofrecen soporte después del lanzamiento?',
    answer: 'Sí, todos nuestros planes incluyen soporte post-lanzamiento. Desde mantenimiento básico hasta soporte prioritario 24/7, tenemos opciones adaptadas a tus necesidades.',
    category: 'soporte',
  },
  {
    id: 'agile-process',
    question: '¿Cómo funciona el proceso de desarrollo?',
    answer: 'Utilizamos metodología ágil con sprints de 2 semanas. Recibes actualizaciones regulares, feedback se integra rápidamente y ajustes son posibles durante el desarrollo.',
    category: 'proyecto',
  },
  {
    id: 'maintenance-cost',
    question: '¿Cuál es el costo de mantenimiento?',
    answer: 'El mantenimiento incluye actualizaciones de seguridad, parches, correcciones de bugs y optimización. Los costos varían entre 500-3000 PEN mensuales dependiendo de la complejidad.',
    category: 'soporte',
  },
  {
    id: 'remote-work',
    question: '¿Trabajan de forma remota?',
    answer: 'Trabajamos principalmente de forma remota, aunque estamos ubicados en Cajamarca. Usamos herramientas modernas de colaboración para una comunicación efectiva con nuestros clientes.',
    category: 'empresa',
  },
  {
    id: 'revision-process',
    question: '¿Cuántas revisiones están incluidas?',
    answer: 'La cantidad de revisiones varía por plan. Generalmente incluimos 2-3 rondas de revisiones. Revisiones adicionales se pueden solicitar según sea necesario.',
    category: 'proyecto',
  },
]

export const CASE_STUDIES = [
  {
    id: 1,
    title: 'RetailMax: E-commerce que triplicó sus ventas',
    client: 'RetailMax Perú',
    industry: 'E-commerce',
    challenge: 'Una tienda física necesitaba presencia digital pero no tenía experiencia en ventas online. Su sitio web anterior era lento y confuso.',
    solution: 'Desarrollamos una plataforma e-commerce completamente nueva con Next.js, integración de pasarela de pagos, panel de inventario y CRM.',
    results: [
      { metric: '+180%', description: 'aumento en ventas online' },
      { metric: '7s', description: 'tiempo de carga reducido a' },
      { metric: '4.8/5', description: 'calificación en Google' },
    ],
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Supabase'],
    image: 'retail-max',
  },
  {
    id: 2,
    title: 'FinCorp: App de banca móvil con +50k usuarios',
    client: 'FinCorp Corporation',
    industry: 'Fintech',
    challenge: 'Necesitaban una aplicación móvil segura para gestión de inversiones con autenticación biométrica y actualizaciones en tiempo real.',
    solution: 'Desarrollamos una app React Native con Firebase, autenticación biométrica, seguimiento de inversiones en tiempo real y push notifications.',
    results: [
      { metric: '50k+', description: 'descargas en App Store' },
      { metric: '4.9/5', description: 'rating en tiendas' },
      { metric: '95%', description: 'uptime garantizado' },
    ],
    technologies: ['React Native', 'Firebase', 'Node.js', 'AWS'],
    image: 'fincorp',
  },
  {
    id: 3,
    title: 'TechStart: MVP lanzado en 6 semanas',
    client: 'TechStart Ventures',
    industry: 'SaaS',
    challenge: 'Una startup necesitaba validar su idea rápidamente con presupuesto limitado. Requerían MVP funcional en menos de 2 meses.',
    solution: 'Implementamos metodología ágil acelerada, prototipado rápido, y una arquitectura escalable que permitía pivotes rápidos.',
    results: [
      { metric: '6 semanas', description: 'lanzamiento MVP' },
      { metric: '$250k', description: 'inversión seed levantada' },
      { metric: '1k+', description: 'usuarios en primer mes' },
    ],
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Vercel'],
    image: 'techstart',
  },
]

export const BLOG_POSTS = [
  {
    id: 1,
    title: '10 Errores Comunes al Desarrollar tu Primera App Móvil',
    excerpt: 'Evita estos errores comunes que cometen muchas empresas al desarrollar su primera aplicación móvil.',
    category: 'desarrollo',
    publishedAt: '2024-03-15',
    readTime: 8,
    featured: true,
  },
  {
    id: 2,
    title: 'Next.js 15: Novedades y Cómo Migrar tu App',
    excerpt: 'Análisis completo de las nuevas características de Next.js 15 y guía paso a paso para migración.',
    category: 'frontend',
    publishedAt: '2024-03-08',
    readTime: 12,
    featured: true,
  },
  {
    id: 3,
    title: 'Guía Completa de SEO para SaaS',
    excerpt: 'Estrategias específicas de SEO diseñadas para aplicaciones SaaS y cómo aumentar tu visibilidad.',
    category: 'marketing',
    publishedAt: '2024-02-28',
    readTime: 15,
    featured: false,
  },
]

export const FEATURES_HIGHLIGHT = [
  {
    title: 'Desarrollo Ágil',
    description: 'Sprints de 2 semanas con entregas continuas y feedback inmediato',
    icon: 'Zap',
  },
  {
    title: 'Garantía de Calidad',
    description: 'Testing exhaustivo, code reviews y métricas de calidad',
    icon: 'Shield',
  },
  {
    title: 'Escalabilidad',
    description: 'Arquitectura pensada para crecer con tu negocio',
    icon: 'TrendingUp',
  },
  {
    title: 'Seguridad Premium',
    description: 'Cumplimos estándares OWASP y prácticas de seguridad moderna',
    icon: 'Lock',
  },
]
