'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Check, X, ArrowRight, ArrowUpRight, Shield, Clock, HeadphonesIcon, Star, Zap, Building2, Rocket } from 'lucide-react'
import { PRICING_PLANS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'

const planConfig = [
  {
    icon: Zap,
    index: '01',
    gradient: 'from-slate-800/80 to-slate-900/80',
    border: 'border-slate-700/50',
    accentText: 'text-slate-300',
    accentBg: 'bg-slate-700/40',
    accentBorder: 'border-slate-600/40',
    glowColor: 'rgba(148,163,184,0.06)',
    checkColor: 'text-slate-300',
    tag: null,
    badgeStyle: '',
  },
  {
    icon: Rocket,
    index: '02',
    gradient: 'from-primary/20 to-violet-900/40',
    border: 'border-primary/50',
    accentText: 'text-primary',
    accentBg: 'bg-primary/15',
    accentBorder: 'border-primary/30',
    glowColor: 'rgba(99,102,241,0.12)',
    checkColor: 'text-primary',
    tag: 'Más Popular',
    badgeStyle: 'bg-primary/20 text-primary border-primary/40',
  },
  {
    icon: Building2,
    index: '03',
    gradient: 'from-violet-900/40 to-slate-900/80',
    border: 'border-violet-500/40',
    accentText: 'text-violet-400',
    accentBg: 'bg-violet-500/15',
    accentBorder: 'border-violet-500/30',
    glowColor: 'rgba(139,92,246,0.10)',
    checkColor: 'text-violet-400',
    tag: 'Premium',
    badgeStyle: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
  },
]

const featureComparison = [
  { feature: 'Diseño responsive',          s: true,  p: true,  e: true  },
  { feature: 'Formulario de contacto',     s: true,  p: true,  e: true  },
  { feature: 'SEO básico',                 s: false, p: true,  e: true  },
  { feature: 'Panel de administración',    s: false, p: true,  e: true  },
  { feature: 'Blog integrado',             s: false, p: true,  e: true  },
  { feature: 'Integraciones con terceros', s: false, p: false, e: true  },
  { feature: 'Desarrollo API',             s: false, p: false, e: true  },
  { feature: 'Funcionalidades a medida',   s: false, p: false, e: true  },
  { feature: 'Capacitación incluida',      s: false, p: false, e: true  },
]

const guarantees = [
  { icon: Shield,         title: 'Calidad garantizada', desc: 'Código limpio, documentado y probado en cada entrega.' },
  { icon: Clock,          title: 'Entregas puntuales',  desc: 'Cumplimos los tiempos acordados sin excepciones.' },
  { icon: HeadphonesIcon, title: 'Soporte dedicado',    desc: 'Acompañamiento real antes y después del lanzamiento.' },
  { icon: Star,           title: 'Sin costos ocultos',  desc: 'El precio acordado es el precio final, siempre.' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function PlanesPage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative min-h-[72vh] flex items-center justify-center pt-24">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/70 to-background" />
          {/* orbs */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-violet-600/6 rounded-full blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 container max-w-4xl mx-auto px-4 text-center py-24"
          >
            {/* eyebrow pill */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono font-semibold text-primary/90 uppercase tracking-[0.18em]">
                Planes & Precios
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-heading leading-[0.92] tracking-tight mb-7">
              <span className="block text-foreground/90">Elige el plan</span>
              <span className="block text-gradient">que impulsa</span>
              <span className="block text-foreground/90">tu negocio.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
              Tres planes diseñados para cada etapa de crecimiento.
              Pago único, sin mensualidades, sin sorpresas.
            </p>

            {/* quick stats row */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground/70">
              {['Pago único', 'Sin mensualidades', 'Soporte incluido', 'Entrega garantizada'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-primary/70" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground">scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" />
          </div>
        </section>

        {/* ── PRICING CARDS ────────────────────────────────────── */}
        <section className="py-20 relative">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {PRICING_PLANS.map((plan, i) => {
                const cfg = planConfig[i]
                const PlanIcon = cfg.icon
                return (
                  <motion.div
                    key={plan.name}
                    {...fadeUp(i * 0.1)}
                    className={`relative flex flex-col rounded-2xl border ${cfg.border} bg-gradient-to-b ${cfg.gradient} backdrop-blur-md overflow-hidden group
                      ${plan.popular ? 'shadow-2xl shadow-primary/15 scale-[1.02]' : ''}`}
                    style={{ boxShadow: plan.popular ? `0 0 60px ${cfg.glowColor}` : undefined }}
                  >
                    {/* top shimmer line */}
                    <div className={`absolute top-0 inset-x-0 h-[1px] ${plan.popular ? 'bg-gradient-to-r from-transparent via-primary to-transparent' : i === 2 ? 'bg-gradient-to-r from-transparent via-violet-500/60 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-500/40 to-transparent'}`} />

                    {/* header */}
                    <div className="px-7 pt-7 pb-5">
                      <div className="flex items-start justify-between mb-5">
                        <div className={`w-11 h-11 rounded-xl ${cfg.accentBg} border ${cfg.accentBorder} flex items-center justify-center`}>
                          <PlanIcon className={`h-5 w-5 ${cfg.accentText}`} />
                        </div>
                        {cfg.tag && (
                          <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${cfg.badgeStyle} tracking-wide`}>
                            {cfg.tag}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold font-heading">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-snug">{plan.description}</p>
                    </div>

                    {/* price block */}
                    <div className={`mx-7 mb-6 p-5 rounded-xl border ${cfg.accentBorder} ${cfg.accentBg}`}>
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-bold font-heading leading-none tracking-tight">
                          {formatCurrency(plan.price)}
                        </span>
                  <span className={`text-xs font-mono mb-1 ${cfg.accentText}`}>PEN</span>
                      </div>
                      <p className="text-xs text-muted-foreground/60 mt-2 font-mono">pago único · sin mensualidades</p>
                    </div>

                    {/* features */}
                    <ul className="px-7 pb-6 space-y-3 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${cfg.accentBg} border ${cfg.accentBorder}`}>
                            <Check className={`h-3 w-3 ${cfg.checkColor}`} />
                          </div>
                          <span className="text-sm text-muted-foreground leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* divider */}
                    <div className={`mx-7 h-px bg-gradient-to-r from-transparent ${plan.popular ? 'via-primary/30' : 'via-border/60'} to-transparent mb-6`} />

                    {/* cta */}
                    <div className="px-7 pb-7">
                      <Link href="/contacto">
                        <Button
                          className={`w-full h-12 text-sm font-semibold rounded-xl transition-all duration-300 group/btn
                            ${plan.popular
                              ? 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30'
                              : i === 2
                                ? 'bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-300 hover:text-violet-200'
                                : 'bg-white/5 hover:bg-white/10 border border-white/10 text-foreground'
                            }`}
                        >
                          {plan.cta}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </div>

                    {/* hover glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${cfg.glowColor} 0%, transparent 70%)` }}
                    />
                  </motion.div>
                )
              })}
            </div>

            <motion.p
              {...fadeUp(0.3)}
              className="text-center text-muted-foreground/50 text-sm mt-10 font-mono"
            >
              ¿Proyecto fuera de lo común?{' '}
              <Link href="/contacto" className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4">
                Solicita una cotización personalizada →
              </Link>
            </motion.p>
          </div>
        </section>

        {/* ── COMPARISON TABLE ─────────────────────────────────── */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="container relative z-10 max-w-5xl mx-auto px-4">

            <motion.div {...fadeUp()} className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-border/40 bg-card/40">
                <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">Comparativa</span>
              </div>
              <h2 className="text-4xl font-bold font-heading">¿Qué incluye cada plan?</h2>
              <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
                Compara las características de cada plan para elegir el que mejor se adapta a tu proyecto.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="rounded-2xl border border-border/40 overflow-hidden bg-card/30 backdrop-blur-sm">
              {/* table header */}
              <div className="grid grid-cols-4 border-b border-border/40 bg-card/50">
                <div className="py-5 px-6">
                  <span className="text-xs font-mono text-muted-foreground/50 uppercase tracking-wider">Característica</span>
                </div>
                {PRICING_PLANS.map((plan, i) => (
                  <div key={plan.name} className={`py-5 px-6 text-center border-l border-border/30 ${plan.popular ? 'bg-primary/5' : ''}`}>
                    <span className={`text-sm font-bold ${planConfig[i].accentText}`}>{plan.name}</span>
                  </div>
                ))}
              </div>

              {/* rows */}
              {featureComparison.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-4 border-b border-border/20 last:border-0 transition-colors hover:bg-white/[0.02] ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}
                >
                  <div className="py-4 px-6 flex items-center">
                    <span className="text-sm text-muted-foreground">{row.feature}</span>
                  </div>
                  {[row.s, row.p, row.e].map((has, j) => (
                    <div key={j} className={`py-4 px-6 flex items-center justify-center border-l border-border/20 ${PRICING_PLANS[j].popular ? 'bg-primary/[0.03]' : ''}`}>
                      {has
                        ? (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${planConfig[j].accentBg}`}>
                            <Check className={`h-3.5 w-3.5 ${planConfig[j].accentText}`} />
                          </div>
                        )
                        : <X className="h-4 w-4 text-muted-foreground/20" />
                      }
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── GUARANTEES ───────────────────────────────────────── */}
        <section className="py-24 relative">
          <div className="container max-w-5xl mx-auto px-4">
            <motion.div {...fadeUp()} className="mb-14 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-border/40 bg-card/40">
                <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">Nuestro compromiso</span>
              </div>
              <h2 className="text-4xl font-bold font-heading">Lo que siempre incluimos</h2>
              <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
                Sin importar el plan que elijas, estos son los estándares que nunca negociamos.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {guarantees.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  {...fadeUp(i * 0.08)}
                  className="group relative rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm p-6 hover:border-primary/30 hover:bg-card/70 transition-all duration-300 overflow-hidden text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/15 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-semibold font-heading text-sm mb-2">{title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────────────────── */}
        <section className="pb-28">
          <div className="container max-w-5xl mx-auto px-4">
            <motion.div
              {...fadeUp()}
              className="relative rounded-3xl overflow-hidden border border-primary/25 p-14 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(15,15,20,1) 50%, rgba(139,92,246,0.10) 100%)' }}
            >
              <div className="absolute inset-0 bg-grid opacity-15" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/12 rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-[300px] h-[150px] bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-mono font-semibold text-primary/90 uppercase tracking-[0.18em]">¿Tienes dudas?</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold font-heading mt-2 mb-4 leading-tight">
                  Hablemos antes<br />de decidir.
                </h2>
                <p className="text-muted-foreground mb-10 max-w-sm mx-auto text-sm leading-relaxed">
                  Una llamada de 30 minutos puede ahorrarte meses de trabajo en la dirección equivocada.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/contacto">
                    <Button size="lg" className="group h-12 px-8 rounded-xl shadow-lg shadow-primary/25">
                      Agendar llamada gratuita
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                  <Link href="/portafolio">
                    <Button size="lg" variant="outline" className="h-12 px-8 rounded-xl border-border/50 hover:border-primary/30">
                      Ver portafolio
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
