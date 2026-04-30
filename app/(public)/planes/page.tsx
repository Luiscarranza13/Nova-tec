'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Check, X, ArrowRight, Shield, Clock, HeadphonesIcon, Star, MessageCircle, Zap, Rocket, Building2, Timer } from 'lucide-react'
import { PRICING_PLANS } from '@/lib/constants'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const planConfig = [
  { icon: Zap,       color: 'from-blue-500 to-cyan-500',     iconBg: 'bg-blue-500/10',   iconColor: 'text-blue-500',   border: 'border-blue-500/20',  badge: null,          badgeCls: '' },
  { icon: Rocket,    color: 'from-violet-500 to-indigo-500', iconBg: 'bg-violet-500/10', iconColor: 'text-violet-500', border: 'border-violet-500',   badge: 'Mas popular', badgeCls: 'bg-violet-500 text-white' },
  { icon: Building2, color: 'from-amber-500 to-orange-500',  iconBg: 'bg-amber-500/10',  iconColor: 'text-amber-500',  border: 'border-amber-500/20', badge: 'Premium',     badgeCls: 'bg-amber-500 text-white' },
]

const fmt = (n: number) =>
  new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', maximumFractionDigits: 0 }).format(n)

function CellValue({ value }: { value: boolean | string }) {
  if (value === true)  return <Check className="h-5 w-5 text-emerald-500 mx-auto" />
  if (value === false) return <X className="h-4 w-4 text-muted-foreground/25 mx-auto" />
  return <span className="text-xs text-muted-foreground text-center block">{value}</span>
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border/50 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors">
        <span className="font-medium text-sm pr-4">{q}</span>
        <span className={`text-primary text-xl font-light transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-4">{a}</div>}
    </div>
  )
}

const featureRows = [
  { label: 'Diseno responsive',          s: true,      p: true,       e: true },
  { label: 'Formulario de contacto',     s: true,      p: true,       e: true },
  { label: 'Integracion WhatsApp',       s: true,      p: true,       e: true },
  { label: 'SEO optimizado',             s: 'Basico',  p: 'Avanzado', e: 'Premium' },
  { label: 'Panel de administracion',    s: false,     p: true,       e: true },
  { label: 'Blog integrado',             s: false,     p: true,       e: true },
  { label: 'Google Analytics',           s: false,     p: true,       e: true },
  { label: 'Integraciones con terceros', s: false,     p: false,      e: true },
  { label: 'Backend / API propia',       s: false,     p: false,      e: true },
  { label: 'App movil',                  s: false,     p: false,      e: true },
  { label: 'Capacitacion al equipo',     s: false,     p: false,      e: true },
  { label: 'Soporte post-lanzamiento',   s: '30 dias', p: '90 dias',  e: '1 ano' },
]

const guarantees = [
  { icon: Shield,         title: 'Calidad garantizada', desc: 'Codigo limpio, documentado y probado.' },
  { icon: Clock,          title: 'Entregas puntuales',  desc: 'Cumplimos los plazos acordados.' },
  { icon: HeadphonesIcon, title: 'Soporte real',        desc: 'Acompanamiento antes y despues.' },
  { icon: Star,           title: 'Sin costos ocultos',  desc: 'El precio acordado es el final.' },
]

const faqs = [
  { q: 'Los precios incluyen IGV?', a: 'Los precios son referenciales. El precio final se define en la cotizacion segun el alcance exacto de tu proyecto.' },
  { q: 'Puedo pagar en cuotas?', a: 'Si. Trabajamos con 50% al inicio y 50% a la entrega. Para proyectos grandes podemos acordar pagos por hitos.' },
  { q: 'Que pasa si necesito mas funcionalidades?', a: 'Podemos personalizar cualquier plan. Contactanos y te preparamos una cotizacion a medida sin compromiso.' },
  { q: 'Cuanto tiempo tarda el desarrollo?', a: 'Starter: 2-3 semanas. Professional: 4-6 semanas. Enterprise: 8-16 semanas. Depende del alcance final.' },
]

export default function PlanesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="container relative z-10 max-w-4xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8 backdrop-blur-sm mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Planes y Precios</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-6">
              Inversion que genera<br /><span className="text-gradient">resultados reales</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Precios accesibles para cada etapa de tu negocio. Pago unico, sin mensualidades, sin sorpresas.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {['Pago unico', 'Sin mensualidades', 'Soporte incluido', 'Entrega garantizada'].map(item => (
                <span key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{item}</span>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 items-start">
              {PRICING_PLANS.map((plan, i) => {
                const cfg = planConfig[i]
                const Icon = cfg.icon
                return (
                  <motion.div key={plan.name}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className={`relative rounded-3xl border-2 bg-card overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${cfg.border} ${plan.popular ? 'shadow-xl shadow-violet-500/10' : ''}`}>
                    {cfg.badge && (
                      <div className={`absolute top-5 right-5 text-[11px] font-bold px-3 py-1 rounded-full ${cfg.badgeCls}`}>{cfg.badge}</div>
                    )}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${cfg.color}`} />
                    <div className="p-7">
                      <div className={`w-12 h-12 rounded-2xl ${cfg.iconBg} flex items-center justify-center mb-5`}>
                        <Icon className={`h-6 w-6 ${cfg.iconColor}`} />
                      </div>
                      <h3 className="text-2xl font-bold font-heading mb-1">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{plan.description}</p>
                      <div className="mb-6">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-4xl font-bold font-heading">{fmt(plan.price)}</span>
                          <span className="text-sm text-muted-foreground">PEN</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">pago unico sin mensualidades</p>
                        {(plan as any).delivery && (
                          <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                            <Timer className="h-3.5 w-3.5" />Entrega en {(plan as any).delivery}
                          </div>
                        )}
                      </div>
                      <Link href={`https://wa.me/51918146783?text=${encodeURIComponent('Hola! Me interesa el plan ' + plan.name + ' (' + fmt(plan.price) + ' PEN). Podemos hablar?')}`} target="_blank">
                        <Button className={`w-full h-12 rounded-xl font-semibold gap-2 mb-6 ${plan.popular ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25' : 'bg-foreground text-background hover:bg-foreground/90'}`}>
                          <MessageCircle className="h-4 w-4" />{plan.cta}
                        </Button>
                      </Link>
                      <div className="border-t border-border/50 pt-6">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Incluye:</p>
                        <ul className="space-y-3">
                          {plan.features.map(f => (
                            <li key={f} className="flex items-start gap-3 text-sm">
                              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${cfg.color} flex items-center justify-center shrink-0 mt-0.5`}>
                                <Check className="h-3 w-3 text-white" />
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
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                Necesitas algo diferente?{' '}
                <Link href="/contacto" className="text-primary font-semibold hover:underline">Solicita una cotizacion personalizada</Link>
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-muted/20">
          <div className="container max-w-5xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading">Que incluye cada plan?</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="rounded-2xl border border-border/50 overflow-hidden bg-card shadow-sm">
              <div className="grid grid-cols-4 bg-muted/40 border-b border-border/50">
                <div className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Caracteristica</div>
                {PRICING_PLANS.map((plan, i) => (
                  <div key={plan.name} className={`p-4 text-center ${plan.popular ? 'bg-primary/5' : ''}`}>
                    <span className={`text-sm font-bold ${planConfig[i].iconColor}`}>{plan.name}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{fmt(plan.price)}</p>
                  </div>
                ))}
              </div>
              {featureRows.map((row, i) => (
                <div key={row.label} className={`grid grid-cols-4 border-b border-border/30 last:border-0 ${i % 2 === 0 ? '' : 'bg-muted/10'} hover:bg-muted/20 transition-colors`}>
                  <div className="p-4 text-sm text-muted-foreground flex items-center">{row.label}</div>
                  {[row.s, row.p, row.e].map((val, j) => (
                    <div key={j} className={`p-4 flex items-center justify-center ${PRICING_PLANS[j].popular ? 'bg-primary/3' : ''}`}>
                      <CellValue value={val as boolean | string} />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-5xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Lo que siempre incluimos</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {guarantees.map(({ icon: Icon, title, desc }, i) => (
                <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="group rounded-2xl border border-border/50 bg-card p-6 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/20">
          <div className="container max-w-3xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Preguntas frecuentes</h2>
            </motion.div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <FAQItem q={faq.q} a={faq.a} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container max-w-4xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-chart-2/10 p-12 md:p-16 text-center">
              <div className="absolute inset-0 bg-grid opacity-10" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Hablemos de tu proyecto</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                  Una consulta gratuita de 30 minutos puede definir el rumbo de tu negocio digital.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="https://wa.me/51918146783?text=Hola!%20Me%20interesa%20conocer%20mas%20sobre%20sus%20planes%20y%20precios." target="_blank">
                    <Button size="lg" className="gap-2 shadow-lg shadow-primary/20 h-12 px-8">
                      <MessageCircle className="h-5 w-5" />Consultar por WhatsApp
                    </Button>
                  </Link>
                  <Link href="/contacto">
                    <Button size="lg" variant="outline" className="h-12 px-8 border-border/60 hover:border-primary/40">
                      Ver mas informacion <ArrowRight className="ml-2 h-4 w-4" />
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