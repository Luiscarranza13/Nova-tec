'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import {
  Check, X, ArrowRight, Shield, Clock,
  HeadphonesIcon, Star, MessageCircle, Zap, Rocket, Building2,
} from 'lucide-react'
import { PRICING_PLANS } from '@/lib/constants'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

// ── Plan config ──────────────────────────────────────────────────────────────
const planConfig = [
  {
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    border: 'border-slate-200 hover:border-blue-300',
    badge: null,
    badgeCls: '',
  },
  {
    icon: Rocket,
    color: 'from-violet-500 to-indigo-500',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
    border: 'border-violet-400',
    badge: 'Más popular',
    badgeCls: 'bg-violet-500 text-white',
  },
  {
    icon: Building2,
    color: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
    border: 'border-slate-200 hover:border-amber-300',
    badge: 'Premium',
    badgeCls: 'bg-amber-500 text-white',
  },
]

const fmt = (n: number) =>
  new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    maximumFractionDigits: 0,
  }).format(n)

// ── Comparison table rows ────────────────────────────────────────────────────
const featureRows = [
  { label: 'Diseño responsive',          s: true,      p: true,       e: true },
  { label: 'Formulario de contacto',     s: true,      p: true,       e: true },
  { label: 'Integración WhatsApp',       s: true,      p: true,       e: true },
  { label: 'SEO optimizado',             s: 'Básico',  p: 'Avanzado', e: 'Premium' },
  { label: 'Panel de administración',    s: false,     p: true,       e: true },
  { label: 'Blog integrado',             s: false,     p: true,       e: true },
  { label: 'Google Analytics',           s: false,     p: true,       e: true },
  { label: 'Integraciones con terceros', s: false,     p: false,      e: true },
  { label: 'Backend / API propia',       s: false,     p: false,      e: true },
  { label: 'App móvil',                  s: false,     p: false,      e: true },
  { label: 'Capacitación al equipo',     s: false,     p: false,      e: true },
  { label: 'Soporte post-lanzamiento',   s: '30 días', p: '90 días',  e: '1 año' },
]

function CellValue({ value }: { value: boolean | string }) {
  if (value === true)  return <Check className="h-4 w-4 text-emerald-500 mx-auto" />
  if (value === false) return <X className="h-3.5 w-3.5 text-slate-300 mx-auto" />
  return <span className="text-xs text-muted-foreground text-center block leading-tight">{value}</span>
}

// ── Guarantees ───────────────────────────────────────────────────────────────
const guarantees = [
  { icon: Shield,         title: 'Calidad garantizada', desc: 'Código limpio, documentado y probado.' },
  { icon: Clock,          title: 'Entregas puntuales',  desc: 'Cumplimos los plazos acordados.' },
  { icon: HeadphonesIcon, title: 'Soporte real',        desc: 'Acompañamiento antes y después.' },
  { icon: Star,           title: 'Sin costos ocultos',  desc: 'El precio acordado es el final.' },
]

// ── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  { q: '¿Los precios incluyen IGV?', a: 'Los precios son referenciales. El precio final se define en la cotización según el alcance exacto de tu proyecto.' },
  { q: '¿Puedo pagar en cuotas?', a: 'Sí. Trabajamos con 50% al inicio y 50% a la entrega. Para proyectos grandes podemos acordar pagos por hitos.' },
  { q: '¿Qué pasa si necesito más funcionalidades?', a: 'Podemos personalizar cualquier plan. Contáctanos y te preparamos una cotización a medida sin compromiso.' },
  { q: '¿Cuánto tiempo tarda el desarrollo?', a: 'Starter: 2-3 semanas. Professional: 4-6 semanas. Enterprise: 8-16 semanas. Depende del alcance final.' },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-medium text-sm pr-4 text-slate-800">{q}</span>
        <span className={`text-primary text-xl font-light transition-transform duration-200 shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-slate-100 pt-3">
          {a}
        </div>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function PlanesPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* ── Hero ── */}
        <section className="relative pt-16 pb-8 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          <div className="section-container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/8 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Planes y Precios</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold font-heading leading-tight mb-2"
            >
              Inversión que genera{' '}
              <span className="text-gradient">resultados reales</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-4 leading-relaxed"
            >
              Precios accesibles para cada etapa de tu negocio. Pago único, sin mensualidades, sin sorpresas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs text-muted-foreground"
            >
              {['Pago único', 'Sin mensualidades', 'Soporte incluido', 'Entrega garantizada'].map(item => (
                <span key={item} className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-primary" />{item}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Pricing cards ── */}
        <section className="bg-white relative overflow-hidden py-6 sm:py-8">
          <div className="section-container">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {PRICING_PLANS.map((plan, i) => {
                const cfg = planConfig[i]
                const Icon = cfg.icon
                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`flex flex-col rounded-2xl border-2 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${cfg.border} ${plan.popular ? 'shadow-md shadow-violet-500/10' : 'shadow-sm'}`}
                  >
                    {/* Color accent bar */}
                    <div className={`h-1 w-full bg-gradient-to-r ${cfg.color}`} />

                    {/* Badge row — fixed height so all cards align */}
                    <div className="flex justify-end px-4 pt-3 h-8">
                      {cfg.badge && (
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full h-fit ${cfg.badgeCls}`}>
                          {cfg.badge}
                        </span>
                      )}
                    </div>

                    <div className="px-4 pb-5 flex flex-col flex-1">
                      {/* Icon + name */}
                      <div className={`w-10 h-10 rounded-xl ${cfg.iconBg} flex items-center justify-center mb-3`}>
                        <Icon className={`h-5 w-5 ${cfg.iconColor}`} />
                      </div>
                      <h3 className="text-base font-bold font-heading mb-1">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{plan.description}</p>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold font-heading">{fmt(plan.price)}</span>
                          <span className="text-xs text-muted-foreground">PEN</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">pago único · sin mensualidades</p>
                      </div>

                      {/* CTA */}
                      <Link
                        href={`https://wa.me/51918146783?text=${encodeURIComponent('Hola! Me interesa el plan ' + plan.name + ' (' + fmt(plan.price) + ' PEN). ¿Podemos hablar?')}`}
                        target="_blank"
                        className="mb-4 block"
                      >
                        <Button
                          className={`w-full h-10 rounded-xl text-sm font-semibold gap-2 ${plan.popular ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-500/20' : ''}`}
                          variant={plan.popular ? 'default' : 'outline'}
                        >
                          <MessageCircle className="h-4 w-4" />{plan.cta}
                        </Button>
                      </Link>

                      {/* Features list */}
                      <div className="border-t border-slate-100 pt-4 flex-1">
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Incluye:</p>
                        <ul className="space-y-2">
                          {plan.features.map(f => (
                            <li key={f} className="flex items-start gap-2 text-xs">
                              <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${cfg.color} flex items-center justify-center shrink-0 mt-0.5`}>
                                <Check className="h-2.5 w-2.5 text-white" />
                              </div>
                              <span className="text-muted-foreground leading-snug">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-muted-foreground">
                ¿Necesitas algo diferente?{' '}
                <Link href="/contacto" className="text-primary font-semibold hover:underline">
                  Solicita una cotización personalizada
                </Link>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section className="bg-slate-50/60 relative overflow-hidden py-6 sm:py-8">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-5"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                <span className="w-8 h-px bg-primary" />Comparativa<span className="w-8 h-px bg-primary" />
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading">¿Qué incluye cada plan?</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden max-w-2xl mx-auto"
            >
              {/* Mobile scroll hint */}
              <div className="flex items-center justify-center gap-2 py-1.5 bg-slate-50 border-b border-slate-100 sm:hidden">
                <span className="text-[11px] text-muted-foreground">← Desliza para comparar →</span>
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-[380px]">
                  {/* Header */}
                  <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200">
                    <div className="p-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Característica</div>
                    {PRICING_PLANS.map((plan, i) => (
                      <div key={plan.name} className={`p-2.5 text-center ${plan.popular ? 'bg-violet-50' : ''}`}>
                        <span className={`text-[11px] font-bold ${planConfig[i].iconColor}`}>{plan.name}</span>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{fmt(plan.price)}</p>
                      </div>
                    ))}
                  </div>
                  {/* Rows */}
                  {featureRows.map((row, i) => (
                    <div
                      key={row.label}
                      className={`grid grid-cols-4 border-b border-slate-100 last:border-0 ${i % 2 !== 0 ? 'bg-slate-50/40' : ''} hover:bg-slate-50 transition-colors`}
                    >
                      <div className="p-2.5 text-[11px] text-muted-foreground flex items-center">{row.label}</div>
                      {[row.s, row.p, row.e].map((val, j) => (
                        <div key={j} className={`p-2.5 flex items-center justify-center ${PRICING_PLANS[j].popular ? 'bg-violet-50/40' : ''}`}>
                          <CellValue value={val as boolean | string} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Guarantees ── */}
        <section className="bg-white relative overflow-hidden py-6 sm:py-8">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-7"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                <span className="w-8 h-px bg-primary" />Garantías<span className="w-8 h-px bg-primary" />
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading">Lo que siempre incluimos</h2>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {guarantees.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-xl border border-slate-200 bg-white p-4 text-center hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-slate-50/60 relative overflow-hidden py-6 sm:py-8">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-7"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                <span className="w-8 h-px bg-primary" />FAQ<span className="w-8 h-px bg-primary" />
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading">Preguntas frecuentes</h2>
            </motion.div>
            <div className="max-w-2xl mx-auto space-y-2.5">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <FAQItem q={faq.q} a={faq.a} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-white relative overflow-hidden py-6 sm:py-8">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/8 via-white to-chart-2/8 p-6 sm:p-10 text-center max-w-2xl mx-auto"
            >
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-xl sm:text-2xl font-bold font-heading mb-2">Hablemos de tu proyecto</h2>
                <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
                  Una consulta gratuita de 30 minutos puede definir el rumbo de tu negocio digital.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="https://wa.me/51918146783?text=Hola!%20Me%20interesa%20conocer%20más%20sobre%20sus%20planes%20y%20precios."
                    target="_blank"
                  >
                    <Button size="lg" className="gap-2 shadow-md shadow-primary/20 w-full sm:w-auto">
                      <MessageCircle className="h-4 w-4" />Consultar por WhatsApp
                    </Button>
                  </Link>
                  <Link href="/contacto">
                    <Button size="lg" variant="outline" className="border-slate-200 hover:border-primary/40 w-full sm:w-auto">
                      Ver más información <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
