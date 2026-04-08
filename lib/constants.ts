export const APP_NAME = 'NovaTec'
export const APP_DESCRIPTION = 'Transformamos Ideas en Software Excepcional'
export const APP_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://novatec.pe'
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
    name: 'Desarrollo Web',
    description: 'Creamos sitios web y aplicaciones web modernas, rápidas y escalables utilizando las últimas tecnologías.',
    icon: 'Globe',
    features: ['Sitios web corporativos', 'E-commerce', 'Dashboards', 'PWA'],
  },
  {
    id: 'desarrollo-mobile',
    name: 'Desarrollo Móvil',
    description: 'Desarrollamos aplicaciones nativas e híbridas para iOS y Android con experiencia de usuario excepcional.',
    icon: 'Smartphone',
    features: ['iOS', 'Android', 'React Native', 'Flutter'],
  },
  {
    id: 'desarrollo-software',
    name: 'Desarrollo de Software',
    description: 'Construimos soluciones de software personalizadas adaptadas a las necesidades específicas de tu negocio.',
    icon: 'Code',
    features: ['Software a medida', 'APIs RESTful', 'Microservicios', 'Integraciones'],
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
    description: 'Perfecto para proyectos pequeños',
    price: 15000,
    features: [
      'Landing page profesional',
      'Diseño responsive',
      'Formulario de contacto',
      'Integración con redes sociales',
      'Soporte por 30 días',
    ],
    cta: 'Comenzar Proyecto',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'Ideal para empresas en crecimiento',
    price: 45000,
    features: [
      'Sitio web completo',
      'Hasta 10 páginas',
      'Panel de administración',
      'Blog integrado',
      'SEO básico',
      'Soporte por 90 días',
    ],
    cta: 'Comenzar Proyecto',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Solución completa para grandes empresas',
    price: 120000,
    features: [
      'Aplicación web completa',
      'Funcionalidades personalizadas',
      'Integraciones con terceros',
      'Desarrollo API',
      'Capacitación incluido',
      'Soporte prioritario por 1 año',
    ],
    cta: 'Contactar Ventas',
    popular: false,
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
