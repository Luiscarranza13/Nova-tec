'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CTA } from '@/components/home/CTA'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { Button } from '@/components/ui/button'
import {
  Globe, Smartphone, Code, Palette, Cloud, Lightbulb,
  ArrowRight, CheckCircle2, ChevronDown, Zap, Clock,
  DollarSign, Star, ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = ['Todos', 'Web', 'Móvil', 'Software', 'Diseño', 'Cloud', 'Consultoría']

const services = [
  {
    id: 'desarrollo-web', name: 'Desarrollo Web', category: 'Web',
    tagline: 'Aplicaciones web modernas y escalables',
    description: 'Creamos sitios web y aplicaciones de alto rendimiento usando las tecnologías más modernas. Desde landing pages hasta plataformas SaaS complejas.',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
    gradient: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-500/10', iconColor: 'text-blue-500',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    duration: '2 – 12 semanas', priceFrom: '$15,000 MXN',
    features: ['Sitios web corporativos', 'E-commerce', 'Dashboards', 'PWA', 'APIs RESTful', 'SEO técnico'],
    techs: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'],
    deliverables: ['Código fuente completo', 'Documentación técnica', 'Deploy en producción', 'Soporte post-lanzamiento'],
    caseStudy: { project: 'E-commerce RetailMax', metric: '+65% conversiones', detail: 'Rediseño completo con Next.js y Stripe.' },
    testimonial: { name: 'María González', role: 'CEO, RetailMax', quote: 'NovaTec entregó exactamente lo que necesitábamos, a tiempo y con calidad excepcional.' },
  },
  {
    id: 'desarrollo-mobile', name: 'Desarrollo Móvil', category: 'Móvil',
    tagline: 'Apps nativas e híbridas para iOS y Android',
    description: 'Desarrollamos aplicaciones móviles con experiencia de usuario excepcional. Desde apps simples hasta plataformas con integraciones avanzadas.',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    gradient: 'from-violet-500 to-purple-500',
    iconBg: 'bg-violet-500/10', iconColor: 'text-violet-500',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    duration: '6 – 16 semanas', priceFrom: '$35,000 MXN',
    features: ['iOS nativo (Swift)', 'Android (Kotlin)', 'React Native', 'Flutter', 'Push notifications', 'Integración APIs'],
    techs: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Expo'],
    deliverables: ['App en App Store', 'App en Google Play', 'Panel admin', 'Analytics integrado'],
    caseStudy: { project: 'Banking App FinCorp', metric: '4.8★ en stores', detail: 'App de banca con biometría y transferencias.' },
    testimonial: { name: 'Carlos Ruiz', role: 'CTO, FinCorp', quote: 'La app superó nuestras expectativas. El equipo fue profesional y muy comunicativo.' },
  },
  {
    id: 'desarrollo-software', name: 'Software a Medida', category: 'Software',
    tagline: 'Soluciones personalizadas para tu negocio',
    description: 'Construimos software empresarial adaptado a tus procesos. Automatizamos flujos de trabajo y digitalizamos operaciones completas.',
    icon: Code,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    gradient: 'from-primary to-indigo-500',
    iconBg: 'bg-primary/10', iconColor: 'text-primary',
    border: 'border-primary/20 hover:border-primary/40',
    duration: '8 – 24 semanas', priceFrom: '$50,000 MXN',
    features: ['Sistemas ERP', 'Automatización', 'Integración de sistemas', 'Microservicios', 'Migración legacy', 'Soporte continuo'],
    techs: ['Node.js', 'Python', 'Go', 'NestJS', 'Docker', 'Kubernetes'],
    deliverables: ['Sistema en producción', 'Manual de usuario', 'Capacitación', 'SLA de soporte'],
    caseStudy: { project: 'CRM SalesForce Pro', metric: '-40% tiempo operativo', detail: 'CRM con automatización de ventas y pipelines.' },
    testimonial: { name: 'Roberto Sánchez', role: 'Ops Manager, FastShip', quote: 'Optimizaron nuestras operaciones en un 40%. Soporte post-lanzamiento excelente.' },
  },
  {
    id: 'ui-ux', name: 'Diseño UI/UX', category: 'Diseño',
    tagline: 'Interfaces que enamoran a tus usuarios',
    description: 'Diseñamos experiencias digitales centradas en el usuario. Combinamos estética y funcionalidad para crear productos que la gente ama usar.',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    gradient: 'from-pink-500 to-rose-500',
    iconBg: 'bg-pink-500/10', iconColor: 'text-pink-500',
    border: 'border-pink-500/20 hover:border-pink-500/40',
    duration: '2 – 8 semanas', priceFrom: '$12,000 MXN',
    features: ['UX Research', 'Wireframes', 'Prototipos interactivos', 'Design systems', 'Pruebas de usabilidad', 'Diseño responsive'],
    techs: ['Figma', 'Adobe XD', 'Framer', 'Storybook', 'Zeplin', 'Maze'],
    deliverables: ['Prototipo interactivo', 'Design system', 'Assets exportados', 'Guía de estilos'],
    caseStudy: { project: 'Dashboard MediCare+', metric: '+80% satisfacción UX', detail: 'Rediseño completo del panel de gestión médica.' },
    testimonial: { name: 'Ana Martínez', role: 'Fundadora, TechStart', quote: 'Aportaron ideas estratégicas que mejoraron nuestro producto final enormemente.' },
  },
  {
    id: 'cloud', name: 'Soluciones Cloud', category: 'Cloud',
    tagline: 'Infraestructura segura y escalable',
    description: 'Diseñamos e implementamos arquitecturas cloud robustas. Migramos tus sistemas y optimizamos costos sin sacrificar rendimiento.',
    icon: Cloud,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    gradient: 'from-cyan-500 to-teal-500',
    iconBg: 'bg-cyan-500/10', iconColor: 'text-cyan-500',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    duration: '4 – 12 semanas', priceFrom: '$25,000 MXN',
    features: ['AWS / GCP / Azure', 'Migración a la nube', 'DevOps y CI/CD', 'Contenedores', 'Monitoreo 24/7', 'Optimización de costos'],
    techs: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
    deliverables: ['Infraestructura documentada', 'Pipelines CI/CD', 'Monitoreo activo', 'Runbooks operativos'],
    caseStudy: { project: 'Infra SaaS TechStart', metric: '-35% costos cloud', detail: 'Migración y optimización de infraestructura AWS.' },
    testimonial: { name: 'Carlos Ruiz', role: 'CTO, FinCorp', quote: 'La migración fue impecable. Cero downtime y mejor rendimiento desde el día uno.' },
  },
  {
    id: 'consultoria', name: 'Consultoría Tech', category: 'Consultoría',
    tagline: 'Estrategia tecnológica para crecer',
    description: 'Asesoramos a empresas en su transformación digital. Auditamos sistemas, definimos roadmaps y acompañamos la implementación.',
    icon: Lightbulb,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    gradient: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-500/10', iconColor: 'text-amber-500',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    duration: '1 – 4 semanas', priceFrom: '$8,000 MXN',
    features: ['Auditorías técnicas', 'Arquitectura de software', 'Roadmap tecnológico', 'Code review', 'Selección de tecnologías', 'Mentoría a equipos'],
    techs: ['Agile', 'Scrum', 'OKRs', 'TOGAF', 'ITIL', 'ISO 27001'],
    deliverables: ['Informe de auditoría', 'Roadmap detallado', 'Plan de acción', 'Sesiones de seguimiento'],
    caseStudy: { project: 'Auditoría RetailMax', metric: '3x velocidad de entrega', detail: 'Rediseño de arquitectura y procesos de desarrollo.' },
    testimonial: { name: 'María González', role: 'CEO, RetailMax', quote: 'La consultoría nos ahorró meses de trabajo y nos puso en el camino correcto.' },
  },
]

const faqs = [
  { q: '¿Cuánto tiempo toma desarrollar un proyecto?', a: 'Depende del alcance. Una landing page puede estar lista en 2 semanas, mientras que una plataforma compleja puede tomar 3-6 meses. En la fase de discovery definimos tiempos exactos.' },
  { q: '¿Cómo es el proceso de trabajo?', a: 'Trabajamos con metodología ágil en sprints de 2 semanas. Tendrás demos frecuentes, acceso a nuestro tablero de proyecto y comunicación directa con el equipo.' },
  { q: '¿Qué pasa después del lanzamiento?', a: 'Todos nuestros proyectos incluyen soporte post-lanzamiento. También ofrecemos planes de mantenimiento continuo para garantizar que tu producto siga funcionando perfectamente.' },
  { q: '¿Puedo ver el código fuente?', a: 'Sí, el código fuente es 100% tuyo. Al finalizar el proyecto te entregamos el repositorio completo con documentación técnica.' },
]

// ─── Calculator ───────────────────────────────────────────────────────────────

const calcOptions = {
  type: [
    { label: 'Landing page', value: 15000 },
    { label: 'Sitio web corporativo', value: 35000 },
    { label: 'App móvil', value: 55000 },
    { label: 'Plataforma web / SaaS', value: 90000 },
    { label: 'Software a medida', value: 120000 },
  ],
  features: [
    { label: 'Panel de administración', value: 15000 },
    { label: 'Pasarela de pagos', value: 10000 },
    { label: 'Autenticación / usuarios', value: 8000 },
    { label: 'Notificaciones push', value: 6000 },
    { label: 'Integración con terceros', value: 12000 },
    { label: 'Reportes y analytics', value: 10000 },
  ],
  timeline: [
    { label: 'Estándar (sin prisa)', multiplier: 1 },
    { label: 'Acelerado (prioridad)', multiplier: 1.3 },
    { label: 'Urgente (fast-track)', multiplier: 1.6 },
  ],
}

function Calculator() {
  const [type, setType] = useState(calcOptions.type[0])
  const [features, setFeatures] = useState<typeof calcOptions.features>([])
  const [timeline, setTimeline] = useState(calcOptions.timeline[0])

  const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const base = type.value + features.reduce((s, f) => s + f.value, 0)
  const total = Math.round(base * timeline.multiplier)
  const totalMax = Math.round(total * 1.4)

  const toggleFeature = (f: typeof calcOptions.features[0]) =>
    setFeatures((prev) => prev.find((x) => x.label === f.label) ? prev.filter((x) => x.label !== f.label) : [...prev, f])

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="container relative z-10 max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Calculadora
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-4">
            Estima el costo
            <br /><span className="text-gradient">de tu proyecto</span>
          </h2>
          <p className="text-muted-foreground text-lg">Selecciona las opciones y obtén un rango de precio orientativo al instante.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-sm p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              {/* Type */}
              <div>
                <p className="text-sm font-semibold mb-3 flex items-center gap-2"><Code className="h-4 w-4 text-primary" />Tipo de proyecto</p>
                <div className="space-y-2">
                  {calcOptions.type.map((t) => (
                    <button key={t.label} onClick={() => setType(t)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-all duration-200 ${type.label === t.label ? 'border-primary/50 bg-primary/10 text-primary font-medium' : 'border-border/50 hover:border-primary/30 text-muted-foreground'}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-sm font-semibold mb-3 flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />Urgencia</p>
                <div className="grid grid-cols-3 gap-2">
                  {calcOptions.timeline.map((t) => (
                    <button key={t.label} onClick={() => setTimeline(t)}
                      className={`px-3 py-2.5 rounded-xl text-xs border text-center transition-all duration-200 ${timeline.label === t.label ? 'border-primary/50 bg-primary/10 text-primary font-medium' : 'border-border/50 hover:border-primary/30 text-muted-foreground'}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Features */}
              <div>
                <p className="text-sm font-semibold mb-3 flex items-center gap-2"><Zap className="h-4 w-4 text-primary" />Funcionalidades adicionales</p>
                <div className="space-y-2">
                  {calcOptions.features.map((f) => {
                    const active = !!features.find((x) => x.label === f.label)
                    return (
                      <button key={f.label} onClick={() => toggleFeature(f)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm border transition-all duration-200 ${active ? 'border-primary/50 bg-primary/10 text-primary font-medium' : 'border-border/50 hover:border-primary/30 text-muted-foreground'}`}>
                        <span>{f.label}</span>
                        <span className="text-xs opacity-70">+${fmt(f.value)}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Result */}
              <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-chart-2/5 p-6">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Estimado orientativo</p>
                <div className="text-3xl font-bold font-heading text-gradient mb-1">
                  ${fmt(total)} – ${fmt(totalMax)}
                </div>
                <p className="text-xs text-muted-foreground mb-5">MXN · El precio final depende del alcance detallado</p>
                <Link href="/contacto">
                  <Button className="w-full group shadow-lg shadow-primary/20">
                    Solicitar cotización exacta
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors">
        <span className="font-medium text-sm pr-4">{q}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServiciosPage() {
  const [activeCategory, setActiveCategory] = useState('Todos')

  const filtered = activeCategory === 'Todos'
    ? services
    : services.filter((s) => s.category === activeCategory)

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-chart-2/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="container relative z-10 max-w-7xl mx-auto px-4 py-24 text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-medium text-primary">Lo que hacemos mejor</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.05] tracking-tight mb-6">
              Servicios que
              <br /><span className="text-gradient">generan resultados</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Desde el diseño hasta el despliegue, cubrimos todo el ciclo de vida de tu producto digital.
            </motion.p>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              {[['250+', 'Proyectos entregados'], ['120+', 'Clientes satisfechos'], ['8+', 'Años de experiencia'], ['6', 'Servicios especializados']].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="text-2xl font-bold font-heading text-gradient">{v}</p>
                  <p className="text-xs mt-0.5">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Filter tabs */}
        <section className="sticky top-16 md:top-20 z-40 bg-background/80 backdrop-blur-lg border-b border-border/40">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-3">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4 space-y-10">
            <AnimatePresence mode="wait">
              {filtered.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div key={service.id} id={service.id}
                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className={`group rounded-3xl border ${service.border} bg-card/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-xl`}>

                    <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? '' : ''}`}>
                      {/* Content */}
                      <div className={`p-8 md:p-12 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                        <div className="flex items-start justify-between mb-6">
                          <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`h-7 w-7 ${service.iconColor}`} />
                          </div>
                          {/* Duration + price badges */}
                          <div className="flex flex-col gap-1.5 items-end">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground border border-border/50">
                              <Clock className="h-3 w-3" />{service.duration}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                              <DollarSign className="h-3 w-3" />Desde {service.priceFrom}
                            </span>
                          </div>
                        </div>

                        <span className={`text-xs font-bold uppercase tracking-widest ${service.iconColor} mb-2 block`}>{service.tagline}</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">{service.name}</h2>
                        <p className="text-muted-foreground mb-8 leading-relaxed">{service.description}</p>

                        <div className="grid sm:grid-cols-2 gap-2 mb-8">
                          {service.features.map((f) => (
                            <div key={f} className="flex items-center gap-2.5 text-sm">
                              <CheckCircle2 className={`h-4 w-4 ${service.iconColor} shrink-0`} />
                              <span className="text-muted-foreground">{f}</span>
                            </div>
                          ))}
                        </div>

                        {/* Case study */}
                        <div className="rounded-xl border border-border/50 bg-muted/30 p-4 mb-6">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Caso de éxito</p>
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold">{service.caseStudy.project}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{service.caseStudy.detail}</p>
                            </div>
                            <span className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${service.gradient} text-white`}>
                              {service.caseStudy.metric}
                            </span>
                          </div>
                        </div>

                        {/* Testimonial */}
                        <div className="rounded-xl border border-border/50 bg-card/50 p-4 mb-8">
                          <div className="flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                          </div>
                          <p className="text-sm text-muted-foreground italic mb-3">"{service.testimonial.quote}"</p>
                          <p className="text-xs font-semibold">{service.testimonial.name} · <span className="font-normal text-muted-foreground">{service.testimonial.role}</span></p>
                        </div>

                        <Link href="/contacto">
                          <Button className="group/btn shadow-md shadow-primary/10">
                            Solicitar cotización
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </Link>
                      </div>

                      {/* Visual panel */}
                      <div className={`relative flex flex-col bg-gradient-to-br ${service.gradient} border-l border-border/30 ${index % 2 === 1 ? 'lg:order-1 border-l-0 border-r border-border/30' : ''} overflow-hidden`}>
                        {/* Image */}
                        <div className="relative h-56 w-full shrink-0">
                          <Image
                            src={service.image}
                            alt={service.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-background/90`} />
                          {/* Category pill over image */}
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${service.gradient} text-white shadow-lg`}>
                              {service.category}
                            </span>
                          </div>
                        </div>

                        {/* Tech + deliverables */}
                        <div className="relative z-10 p-8 md:p-10 flex-1">
                          <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">Tecnologías</p>
                          <div className="flex flex-wrap gap-2 mb-8">
                            {service.techs.map((tech) => (
                              <span key={tech} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/30 bg-white/10 text-white backdrop-blur-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">Entregables</p>
                          <div className="space-y-2.5">
                            {service.deliverables.map((d, i) => (
                              <div key={d} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white text-[10px] font-bold shrink-0">{i + 1}</div>
                                <span className="text-sm text-white/80">{d}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* Calculator */}
        <Calculator />

        {/* FAQ */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/40 to-transparent" />
          <div className="container relative z-10 max-w-3xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-primary" />Preguntas frecuentes<span className="w-8 h-px bg-primary" />
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
                Resolvemos tus<br /><span className="text-gradient">dudas</span>
              </h2>
            </motion.div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <FAQItem q={faq.q} a={faq.a} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  )
}
