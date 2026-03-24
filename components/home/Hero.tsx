'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, CheckCircle2, ChevronDown, Code2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = [
  'Equipo experto dedicado',
  'Metodología ágil probada',
  'Soporte continuo',
  'Entregas a tiempo',
]

const techStack = ['Next.js', 'React', 'Node.js', 'Flutter', 'AWS', 'TypeScript']

const floatingCards = [
  { icon: '✅', title: 'Proyecto Entregado', sub: 'E-commerce Platform', delay: 0, pos: 'top-[12%] right-[-8%]' },
  { icon: '⚡', title: '+40% Rendimiento', sub: 'Optimización cloud', delay: 0.5, pos: 'bottom-[20%] right-[-6%]' },
  { icon: '⭐', title: '4.9 / 5 Rating', sub: '+120 clientes', delay: 1, pos: 'bottom-[8%] left-[5%]' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute top-1/4 left-0 w-[700px] h-[700px] bg-primary/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-chart-2/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left column ── */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-medium text-primary">Transformando negocios con tecnología</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold font-heading leading-[1.05] tracking-tight mb-6"
            >
              Convertimos tus{' '}
              <span className="text-gradient">Ideas</span>
              <br />en{' '}
              <span className="text-gradient">Software</span>
              <br />
              <span className="text-foreground/75">Excepcional</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-8"
            >
              Somos tu socio estratégico en tecnología. Creamos soluciones innovadoras,
              escalables y de alta calidad que impulsan el crecimiento de tu negocio.
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-x-6 gap-y-2 mb-10"
            >
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  {b}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="/contacto">
                <Button size="xl" className="group shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 min-w-[200px]">
                  Iniciar Proyecto
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/portafolio">
                <Button size="xl" variant="outline" className="group min-w-[200px] border-border/60 hover:border-primary/40">
                  <Zap className="mr-2 h-5 w-5 text-chart-2" />
                  Ver Portafolio
                </Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center gap-5"
            >
              <div className="flex -space-x-3">
                {['A', 'B', 'C', 'D', 'E'].map((l, i) => (
                  <div key={l} className="w-9 h-9 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white shadow-md"
                    style={{ background: `hsl(${243 + i * 20} 75% ${55 + i * 3}%)` }}>
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">+120 clientes</span> satisfechos
                </p>
              </div>
              <div className="hidden sm:block w-px h-8 bg-border" />
              <div className="hidden sm:flex gap-5 text-sm text-muted-foreground">
                {[['250+', 'Proyectos'], ['8+', 'Años'], ['25+', 'Expertos']].map(([v, l]) => (
                  <div key={l} className="text-center">
                    <p className="text-base font-bold font-heading text-foreground">{v}</p>
                    <p className="text-xs">{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right column — visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            className="hidden lg:block relative"
          >
            {/* Main card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-chart-2/20 rounded-3xl rotate-2 blur-sm" />
              <div className="relative rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl p-8 shadow-2xl">
                {/* Window bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <div className="ml-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Code2 className="h-3.5 w-3.5" />
                    <span>novatec.mx — proyecto.tsx</span>
                  </div>
                </div>

                {/* Code snippet */}
                <div className="space-y-3 font-mono text-sm mb-6">
                  <div><span className="text-purple-400">const</span> <span className="text-blue-400">proyecto</span> <span className="text-foreground/60">= {'{'}</span></div>
                  {[
                    ['cliente', '"Tu empresa"', 'text-green-400'],
                    ['tecnología', '"Next.js + AWS"', 'text-green-400'],
                    ['plazo', '"4 semanas"', 'text-orange-400'],
                    ['calidad', '"Premium"', 'text-green-400'],
                  ].map(([k, v, c]) => (
                    <div key={k} className="pl-6">
                      <span className="text-blue-300">{k}</span>
                      <span className="text-foreground/50">: </span>
                      <span className={c}>{v}</span>
                      <span className="text-foreground/30">,</span>
                    </div>
                  ))}
                  <div><span className="text-foreground/60">{'}'}</span></div>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-purple-400">await</span>
                    <span className="text-blue-400">NovaTec</span>
                    <span className="text-foreground/60">.</span>
                    <span className="text-yellow-400">build</span>
                    <span className="text-foreground/60">(proyecto)</span>
                  </div>
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <span className="text-green-400">✓</span>
                    <span>Compilando tu visión...</span>
                  </motion.div>
                </div>

                {/* Progress bars */}
                <div className="space-y-3 pt-4 border-t border-border/40">
                  {[
                    { label: 'Frontend', pct: 92, color: 'bg-blue-500' },
                    { label: 'Backend', pct: 88, color: 'bg-violet-500' },
                    { label: 'Deploy', pct: 76, color: 'bg-cyan-500' },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{bar.label}</span><span>{bar.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${bar.pct}%` }}
                          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                          className={`h-full rounded-full ${bar.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating cards */}
              {floatingCards.map((card, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, i % 2 === 0 ? -10 : 10, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
                  className={`absolute ${card.pos} glass-card rounded-xl px-4 py-3 shadow-xl border border-border/50 min-w-[160px]`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{card.icon}</span>
                    <div>
                      <p className="text-xs font-semibold leading-tight">{card.title}</p>
                      <p className="text-[10px] text-muted-foreground">{card.sub}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Service pills below card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-6 flex flex-wrap gap-2 justify-center"
            >
              {techStack.map((tech, i) => (
                <motion.span key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.06 }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm hover:border-primary/30 hover:text-primary transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
