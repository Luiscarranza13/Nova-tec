'use client'

import { useEffect, useState } from 'react'
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
  DollarSign, Star, Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import type { Servicio } from '@/lib/supabase/types'
import { SERVICES } from '@/lib/constants'

// ─── Icon map ────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Smartphone, Code, Palette, Cloud, Lightbulb,
}

// ─── Static enrichment data (keyed by categoria) ─────────────────────────────

type EnrichData = {
  gradient: string
  iconBg: string
  iconColor: string
  border: string
  image: string
  techs: string[]
  features: string[]
  deliverables: string[]
  caseStudy: { project: string; metric: string; detail: string }
  testimonial: { name: string; role: string; quote: string }
  duration: string
}

const enrichByCat: Record<string, EnrichData> = {
  Desarrollo: {
    gradient: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-500/10', iconColor: 'text-blue-500',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
    techs: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'],
    features: ['Sitios web corporativos', 'E-commerce', 'Dashboards', 'PWA', 'APIs RESTful', 'SEO técnico'],
    deliverables: ['Código fuente completo', 'Documentación técnica', 'Deploy en producción', 'Soporte post-lanzamiento'],
    caseStudy: { project: 'E-commerce RetailMax', metric: '+65% conversiones', detail: 'Rediseño completo con Next.js y Stripe.' },
    testimonial: { name: 'María González', role: 'CEO, RetailMax', quote: 'NovaTec entregó exactamente lo que necesitábamos, a tiempo y con calidad excepcional.' },
    duration: '2 – 12 semanas',
  },
  Diseño: {
    gradient: 'from-pink-500 to-rose-500',
    iconBg: 'bg-pink-500/10', iconColor: 'text-pink-500',
    border: 'border-pink-500/20 hover:border-pink-500/40',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    techs: ['Figma', 'Adobe XD', 'Framer', 'Storybook', 'Zeplin', 'Maze'],
    features: ['UX Research', 'Wireframes', 'Prototipos interactivos', 'Design systems', 'Pruebas de usabilidad', 'Diseño responsive'],
    deliverables: ['Prototipo interactivo', 'Design system', 'Assets exportados', 'Guía de estilos'],
    caseStudy: { project: 'Dashboard MediCare+', metric: '+80% satisfacción UX', detail: 'Rediseño completo del panel de gestión médica.' },
    testimonial: { name: 'Ana Martínez', role: 'Fundadora, TechStart', quote: 'Aportaron ideas estratégicas que mejoraron nuestro producto final enormemente.' },
    duration: '2 – 8 semanas',
  },
  Infraestructura: {
    gradient: 'from-cyan-500 to-teal-500',
    iconBg: 'bg-cyan-500/10', iconColor: 'text-cyan-500',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    techs: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
    features: ['AWS / GCP / Azure', 'Migración a la nube', 'DevOps y CI/CD', 'Contenedores', 'Monitoreo 24/7', 'Optimización de costos'],
    deliverables: ['Infraestructura documentada', 'Pipelines CI/CD', 'Monitoreo activo', 'Runbooks operativos'],
    caseStudy: { project: 'Infra SaaS TechStart', metric: '-35% costos cloud', detail: 'Migración y optimización de infraestructura AWS.' },
    testimonial: { name: 'Carlos Ruiz', role: 'CTO, FinCorp', quote: 'La migración fue impecable. Cero downtime y mejor rendimiento desde el día uno.' },
    duration: '4 – 12 semanas',
  },
  Consultoría: {
    gradient: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-500/10', iconColor: 'text-amber-500',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    techs: ['Agile', 'Scrum', 'OKRs', 'TOGAF', 'ITIL', 'ISO 27001'],
    features: ['Auditorías técnicas', 'Arquitectura de software', 'Roadmap tecnológico', 'Code review', 'Selección de tecnologías', 'Mentoría a equipos'],
    deliverables: ['Informe de auditoría', 'Roadmap detallado', 'Plan de acción', 'Sesiones de seguimiento'],
    caseStudy: { project: 'Auditoría RetailMax', metric: '3x velocidad de entrega', detail: 'Rediseño de arquitectura y procesos de desarrollo.' },
    testimonial: { name: 'María González', role: 'CEO, RetailMax', quote: 'La consultoría nos ahorró meses de trabajo y nos puso en el camino correcto.' },
    duration: '1 – 4 semanas',
  },
}

const defaultEnrich: EnrichData = {
  gradient: 'from-primary to-indigo-500',
  iconBg: 'bg-primary/10', iconColor: 'text-primary',
  border: 'border-primary/20 hover:border-primary/40',
  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  techs: ['Node.js', 'Python', 'Go', 'NestJS', 'Docker', 'Kubernetes'],
  features: ['Sistemas ERP', 'Automatización', 'Integración de sistemas', 'Microservicios', 'Migración legacy', 'Soporte continuo'],
  deliverables: ['Sistema en producción', 'Manual de usuario', 'Capacitación', 'SLA de soporte'],
  caseStudy: { project: 'CRM SalesForce Pro', metric: '-40% tiempo operativo', detail: 'CRM con automatización de ventas y pipelines.' },
  testimonial: { name: 'Roberto Sánchez', role: 'Ops Manager, FastShip', quote: 'Optimizaron nuestras operaciones en un 40%. Soporte post-lanzamiento excelente.' },
  duration: '4 – 16 semanas',
}

// ─── Calculator ───────────────────────────────────────────────────────────────

const calcOptions = {
  type: [
    { label: 'Landing page', value: 1500 },
    { label: 'Sitio web corporativo', value: 3500 },
    { label: 'App móvil', value: 5500 },
    { label: 'Plataforma web / SaaS', value: 8000 },
    { label: 'Software a medida', value: 12000 },
  ],
  features: [
    { label: 'Panel de administración', value: 1500 },
    { label: 'Pasarela de pagos', value: 1000 },
    { label: 'Autenticación / usuarios', value: 800 },
    { label: 'Notificaciones push', value: 600 },
    { label: 'Integración con terceros', value: 1200 },
    { label: 'Reportes y analytics', value: 1000 },
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

  const [clientEmail, setClientEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const base = type.value + features.reduce((s, f) => s + f.value, 0)
  const total = Math.round(base * timeline.multiplier)
  const totalMax = Math.round(total * 1.4)

  const toggleFeature = (f: typeof calcOptions.features[0]) =>
    setFeatures((prev) =>
      prev.find((x) => x.label === f.label) ? prev.filter((x) => x.label !== f.label) : [...prev, f]
    )

  const handleQuoteRequest = async () => {
    if (!clientEmail) {
      alert('Por favor, ingresa tu correo para poder contactarte.')
      return
    }
    setSending(true)
    try {
      await fetch('https://formsubmit.co/ajax/carranzacortesluisarmando73@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `💰 Nueva Estimación de Proyecto: ${type.label}`,
          _template: 'box',
          Correo_del_Cliente: clientEmail,
          Tipo_de_Proyecto: type.label,
          Funcionalidades_Adicionales: features.map((f) => f.label).join(', ') || 'Ninguna',
          Nivel_de_Urgencia: timeline.label,
          Estimacion_Calculada: `S/ ${fmt(total)} - S/ ${fmt(totalMax)}`,
          _replyto: clientEmail,
          _autoresponse:
            '¡Hola! Hemos recibido tu estimación de proyecto en NovaTec. Muy pronto te enviaremos una cotización formal.',
        }),
      })
      setSent(true)
    } catch (e) {
      console.error(e)
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="container relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />Calculadora<span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading leading-tight mb-4">
            Estima el costo<br /><span className="text-gradient">de tu proyecto</span>
          </h2>
          <p className="text-muted-foreground text-base">
            Selecciona las opciones y obtén un rango de precio orientativo al instante.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 md:p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" />Tipo de proyecto
                </p>
                <div className="space-y-2">
                  {calcOptions.type.map((t) => (
                    <button
                      key={t.label}
                      onClick={() => setType(t)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-all duration-200 ${
                        type.label === t.label
                          ? 'border-primary/50 bg-primary/10 text-primary font-medium'
                          : 'border-border/50 hover:border-primary/30 text-muted-foreground'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />Urgencia
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {calcOptions.timeline.map((t) => (
                    <button
                      key={t.label}
                      onClick={() => setTimeline(t)}
                      className={`px-3 py-2.5 rounded-xl text-xs border text-center transition-all duration-200 ${
                        timeline.label === t.label
                          ? 'border-primary/50 bg-primary/10 text-primary font-medium'
                          : 'border-border/50 hover:border-primary/30 text-muted-foreground'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />Funcionalidades adicionales
                </p>
                <div className="space-y-2">
                  {calcOptions.features.map((f) => {
                    const active = !!features.find((x) => x.label === f.label)
                    return (
                      <button
                        key={f.label}
                        onClick={() => toggleFeature(f)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm border transition-all duration-200 ${
                          active
                            ? 'border-primary/50 bg-primary/10 text-primary font-medium'
                            : 'border-border/50 hover:border-primary/30 text-muted-foreground'
                        }`}
                      >
                        <span>{f.label}</span>
                        <span className="text-xs opacity-70">+S/ {fmt(f.value)}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-chart-2/5 p-6">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Estimado orientativo</p>
                <div className="text-3xl font-bold font-heading text-gradient mb-1">
                  S/ {fmt(total)} – S/ {fmt(totalMax)}
                </div>
                <p className="text-xs text-muted-foreground mb-5">PEN · El precio final depende del alcance detallado</p>

                {sent ? (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="text-emerald-500 text-sm font-medium text-center">
                      ¡Solicitud enviada!<br />Te contactaremos pronto.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="tucorreo@ejemplo.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-border/50 bg-background rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <Button onClick={handleQuoteRequest} disabled={sending} className="w-full group shadow-lg shadow-primary/20">
                      {sending ? 'Enviando...' : 'Solicitar cotización exacta'}
                      {!sending && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: '¿Cuánto tiempo toma desarrollar un proyecto?',
    a: 'Depende del alcance. Una landing page puede estar lista en 2 semanas, mientras que una plataforma compleja puede tomar 3-6 meses. En la fase de discovery definimos tiempos exactos.',
  },
  {
    q: '¿Cómo es el proceso de trabajo?',
    a: 'Trabajamos con metodología ágil en sprints de 2 semanas. Tendrás demos frecuentes, acceso a nuestro tablero de proyecto y comunicación directa con el equipo.',
  },
  {
    q: '¿Qué pasa después del lanzamiento?',
    a: 'Todos nuestros proyectos incluyen soporte post-lanzamiento. También ofrecemos planes de mantenimiento continuo para garantizar que tu producto siga funcionando perfectamente.',
  },
  {
    q: '¿Puedo ver el código fuente?',
    a: 'Sí, el código fuente es 100% tuyo. Al finalizar el proyecto te entregamos el repositorio completo con documentación técnica.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <span className="font-medium text-sm pr-4">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServiciosPage() {
  // ── Show static data immediately — no loading state ──────────────────────
  const buildStatic = () =>
    SERVICES.map((s, i) => ({
      id: s.id,
      nombre: s.name,
      descripcion: s.description,
      icono: s.icon,
      categoria: null as string | null,
      precio: null as number | null,
      activo: true,
      orden: i + 1,
      created_at: '',
      updated_at: '',
    } as Servicio))

  const [servicios, setServicios] = useState<Servicio[]>(buildStatic())
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Todos')

  useEffect(() => {
    // Try to enrich with live Supabase data (3s timeout, non-blocking)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)

    const cargar = async () => {
      try {
        const { data } = await supabase
          .from('servicios')
          .select('*')
          .eq('activo', true)
          .order('orden')
        if (data && data.length > 0) setServicios(data)
      } catch {
        // SSL / network error — static data already shown, no action needed
      } finally {
        clearTimeout(timeout)
      }
    }
    cargar()
    return () => { controller.abort(); clearTimeout(timeout) }
  }, [])

  const categories: string[] = [
    'Todos',
    ...Array.from(
      new Set(servicios.map((s) => s.categoria).filter((c) => c !== null) as string[])
    ),
  ]

  const filtered =
    activeCategory === 'Todos'
      ? servicios
      : servicios.filter((s) => s.categoria === activeCategory)

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="relative flex items-center justify-center overflow-hidden pt-20 pb-10">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-chart-2/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="container relative z-10 max-w-7xl mx-auto px-4 py-10 sm:py-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-4"
            >
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-medium text-primary">Lo que hacemos mejor</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading leading-[1.05] tracking-tight mb-3"
            >
              Servicios que<br /><span className="text-gradient">generan resultados</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-6"
            >
              Desde el diseño hasta el despliegue, cubrimos todo el ciclo de vida de tu producto digital.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto"
            >
              {[
                ['250+', 'Proyectos entregados'],
                ['120+', 'Clientes satisfechos'],
                ['8+', 'Años de experiencia'],
                ['6', 'Servicios especializados'],
              ].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="text-lg sm:text-xl font-bold font-heading text-gradient">{v}</p>
                  <p className="text-xs mt-0.5 text-muted-foreground">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Filter tabs ── */}
        <div className="sticky top-16 md:top-[4.5rem] z-40 bg-background/95 backdrop-blur-lg border-b border-border/40 shadow-sm">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Services ── */}
        <section className="py-10">
          <div className="container max-w-7xl mx-auto px-4">
            {loading ? (
              <div className="flex justify-center py-24">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-24">
                No hay servicios disponibles por el momento.
              </p>
            ) : (
              <AnimatePresence mode="wait">
                <div className="space-y-6">
                  {filtered.map((service, index) => {
                    const Icon = iconMap[service.icono || 'Code'] || Code
                    const enrich = enrichByCat[service.categoria || ''] || defaultEnrich
                    const isEven = index % 2 === 0

                    return (
                      <motion.div
                        key={service.id}
                        id={service.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, delay: index * 0.06 }}
                        className={`rounded-2xl border border-slate-200 shadow-sm overflow-hidden`}
                      >
                        <div className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? '' : 'lg:[direction:rtl]'}`}>
                          {/* ── Content column ── */}
                          <div className={`p-5 sm:p-7 lg:p-8 bg-white ${isEven ? '' : 'lg:[direction:ltr]'}`}>
                            {/* Icon + category */}
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className={`w-10 h-10 rounded-xl ${enrich.iconBg} flex items-center justify-center shrink-0`}
                              >
                                <Icon className={`h-5 w-5 ${enrich.iconColor}`} />
                              </div>
                              {service.categoria && (
                                <span className={`text-xs font-bold uppercase tracking-widest ${enrich.iconColor}`}>
                                  {service.categoria}
                                </span>
                              )}
                            </div>

                            {/* Name */}
                            <h2 className="text-xl sm:text-2xl font-bold font-heading mb-2">{service.nombre}</h2>

                            {/* Description */}
                            {service.descripcion && (
                              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.descripcion}</p>
                            )}

                            {/* Features grid */}
                            <div className="grid sm:grid-cols-2 gap-1.5 mb-5">
                              {enrich.features.map((f) => (
                                <div key={f} className="flex items-center gap-2">
                                  <CheckCircle2 className={`h-3.5 w-3.5 ${enrich.iconColor} shrink-0`} />
                                  <span className="text-xs text-muted-foreground">{f}</span>
                                </div>
                              ))}
                            </div>

                            {/* Case study */}
                            <div className="rounded-lg border border-border/50 bg-muted/30 p-3 mb-4">
                              <p className="text-xs font-semibold text-muted-foreground mb-1">Caso de éxito</p>
                              <p className="text-sm font-semibold">{enrich.caseStudy.project}</p>
                              <p className={`text-xs font-bold ${enrich.iconColor}`}>{enrich.caseStudy.metric}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{enrich.caseStudy.detail}</p>
                            </div>

                            {/* Testimonial */}
                            <div className="rounded-lg border border-border/50 bg-card/50 p-3 mb-5">
                              <p className="text-xs text-muted-foreground italic mb-2">
                                &ldquo;{enrich.testimonial.quote}&rdquo;
                              </p>
                              <div className="flex items-center gap-2">
                                <Star className={`h-3 w-3 ${enrich.iconColor} fill-current`} />
                                <span className="text-xs font-semibold">{enrich.testimonial.name}</span>
                                <span className="text-xs text-muted-foreground">· {enrich.testimonial.role}</span>
                              </div>
                            </div>

                            {/* Duration / price + CTA */}
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground border border-border/50">
                                <Clock className="h-3 w-3" />{enrich.duration}
                              </span>
                              {service.precio != null && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                  <DollarSign className="h-3 w-3" />Desde S/ {service.precio.toLocaleString('es-PE')}
                                </span>
                              )}
                            </div>

                            <Link href="/contacto">
                              <Button className="group shadow-sm shadow-primary/10">
                                Solicitar cotización
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </Link>
                          </div>

                          {/* ── Visual panel ── */}
                          <div className={`relative bg-gradient-to-br ${enrich.gradient} flex flex-col ${isEven ? '' : 'lg:[direction:ltr]'}`}>
                             {/* Image with direct img tag to avoid Next.js optimizer issues */}
                             <div className="relative h-40 sm:h-52 lg:h-56 overflow-hidden">
                               {/* eslint-disable-next-line @next/next/no-img-element */}
                               <img
                                 src={enrich.image}
                                 alt={service.nombre}
                                 className="w-full h-full object-cover opacity-70"
                                 loading="lazy"
                               />
                               <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />
                               {/* Service name overlay */}
                               <div className="absolute bottom-3 left-4">
                                 <span className="text-white text-sm font-semibold drop-shadow">{service.nombre}</span>
                               </div>
                             </div>

                            {/* Panel content */}
                            <div className="p-5 sm:p-6 flex-1 flex flex-col gap-4">
                              {/* Technologies */}
                              <div>
                                <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">
                                  Tecnologías
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {enrich.techs.map((tech) => (
                                    <span
                                      key={tech}
                                      className="text-xs px-2 py-1 rounded-full bg-white/15 text-white font-medium"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Deliverables */}
                              <div>
                                <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">
                                  Entregables
                                </p>
                                <div className="space-y-1.5">
                                  {enrich.deliverables.map((d, i) => (
                                    <div key={d} className="flex items-center gap-2">
                                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                                        {i + 1}
                                      </span>
                                      <span className="text-xs text-white/80">{d}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </AnimatePresence>
            )}
          </div>
        </section>

        {/* ── Calculator ── */}
        <Calculator />

        {/* ── FAQ ── */}
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/40 to-transparent" />
          <div className="container relative z-10 max-w-3xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-primary" />Preguntas frecuentes<span className="w-8 h-px bg-primary" />
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-heading leading-tight">
                Resolvemos tus<br /><span className="text-gradient">dudas</span>
              </h2>
            </motion.div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
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
