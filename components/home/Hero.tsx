'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, CheckCircle2, ChevronDown, Code2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const benefits = [
  'Equipo experto dedicado',
  'Metodología ágil probada',
  'Soporte continuo',
  'Entregas a tiempo',
]

const words = ['Ideas', 'Proyectos', 'Visiones', 'Negocios']

// Typewriter — no hydration issues because it starts empty
function TypewriterWord() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const word = words[index]
    let t: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < word.length) {
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === word.length) {
      t = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex(i => (i + 1) % words.length)
    }
    return () => clearTimeout(t)
  }, [displayed, deleting, index, mounted])

  return (
    <span className="text-gradient inline-block min-w-[180px]" aria-label="Ideas en Software">
      {mounted ? displayed : 'Ideas'}
      <span className="animate-pulse text-primary" aria-hidden="true">|</span>
    </span>
  )
}

// Static code lines — no random, no hydration issues
const codeLines = [
  { key: 'cliente',    val: '"Tu empresa"',   cls: 'text-emerald-400' },
  { key: 'tecnología', val: '"Next.js + AWS"', cls: 'text-emerald-400' },
  { key: 'plazo',      val: '"4 semanas"',     cls: 'text-amber-400' },
  { key: 'calidad',    val: '"Premium ✨"',    cls: 'text-emerald-400' },
]

const progressBars = [
  { label: 'Frontend', pct: 92, color: 'from-blue-500 to-cyan-400' },
  { label: 'Backend',  pct: 88, color: 'from-violet-500 to-purple-400' },
  { label: 'Deploy',   pct: 76, color: 'from-cyan-500 to-teal-400' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      {/* Static background — no JS animations for LCP */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />

      {/* CSS-only blobs — use will-change:transform for GPU compositing */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
        style={{ willChange: 'transform', animation: 'blob1 18s ease-in-out infinite' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-chart-2/10 blur-[100px] pointer-events-none"
        style={{ willChange: 'transform', animation: 'blob2 22s ease-in-out infinite' }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80 pointer-events-none" aria-hidden="true" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left column */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/8 backdrop-blur-sm mb-8"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-primary">Transformando negocios con tecnología</span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl xl:text-7xl font-bold font-heading leading-[1.05] tracking-tight mb-6"
            >
              Convertimos tus{' '}
              <br />
              <TypewriterWord />
              <br />
              <span className="text-foreground/70">en Software</span>
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
              className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-10"
            >
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
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
                <Button size="xl" className="group shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 min-w-[200px] relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" aria-hidden="true" />
                  Iniciar Proyecto
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/portafolio">
                <Button size="xl" variant="outline" className="group min-w-[200px] border-border/60 hover:border-primary/40 hover:bg-primary/5">
                  <Zap className="mr-2 h-5 w-5 text-chart-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  Ver Portafolio
                </Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center gap-5 flex-wrap"
            >
              <div className="flex -space-x-3" aria-label="Clientes satisfechos">
                {['A', 'B', 'C', 'D', 'E'].map((l, i) => (
                  <div
                    key={l}
                    className="w-9 h-9 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white shadow-md"
                    style={{ background: `hsl(${243 + i * 22} 75% ${55 + i * 3}%)` }}
                    aria-hidden="true"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5" aria-label="5 estrellas">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">+120 clientes</span> satisfechos
                </p>
              </div>
              <div className="hidden sm:block w-px h-8 bg-border" aria-hidden="true" />
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

          {/* Right column — code panel (hidden on mobile for performance) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:block relative"
            aria-hidden="true"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-chart-2/30 rounded-3xl rotate-2 blur-xl opacity-60" />
              <div className="relative rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl p-8 shadow-2xl">
                {/* Window bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <div className="ml-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Code2 className="h-3.5 w-3.5" />
                    <span>novatec.pe — proyecto.tsx</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-green-400">live</span>
                  </div>
                </div>

                {/* Code */}
                <div className="space-y-2.5 font-mono text-sm mb-6">
                  <div>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-blue-400">proyecto</span>{' '}
                    <span className="text-foreground/50">= {'{'}</span>
                  </div>
                  {codeLines.map(({ key, val, cls }, i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.12 }}
                      className="pl-6"
                    >
                      <span className="text-blue-300">{key}</span>
                      <span className="text-foreground/40">: </span>
                      <span className={cls}>{val}</span>
                      <span className="text-foreground/25">,</span>
                    </motion.div>
                  ))}
                  <div><span className="text-foreground/50">{'}'}</span></div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="pt-1"
                  >
                    <span className="text-purple-400">await</span>{' '}
                    <span className="text-blue-400">NovaTec</span>
                    <span className="text-foreground/40">.</span>
                    <span className="text-yellow-400">build</span>
                    <span className="text-foreground/40">(proyecto)</span>
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2 text-xs"
                  >
                    <span className="text-green-400">✓</span>
                    <span className="text-green-400/80">Compilando tu visión...</span>
                  </motion.div>
                </div>

                {/* Progress bars */}
                <div className="space-y-3 pt-4 border-t border-border/30">
                  {progressBars.map((bar, i) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                        <span>{bar.label}</span>
                        <span className="font-medium">{bar.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted/60 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${bar.pct}%` }}
                          transition={{ duration: 1.2, delay: 0.7 + i * 0.12, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${bar.color}`}
                          style={{ willChange: 'width' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating cards — CSS animation instead of JS */}
              <div className="absolute top-[10%] right-[-5%] glass-card rounded-xl px-4 py-3 shadow-xl border border-border/60 min-w-[165px] backdrop-blur-md"
                style={{ animation: 'float 3.5s ease-in-out infinite' }}>
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="text-xs font-semibold leading-tight">Proyecto Entregado</p>
                    <p className="text-[10px] text-muted-foreground">E-commerce Platform</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[22%] right-[-4%] glass-card rounded-xl px-4 py-3 shadow-xl border border-border/60 min-w-[165px] backdrop-blur-md"
                style={{ animation: 'float 4s ease-in-out infinite reverse' }}>
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">⚡</span>
                  <div>
                    <p className="text-xs font-semibold leading-tight">+40% Rendimiento</p>
                    <p className="text-[10px] text-muted-foreground">Optimización cloud</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech pills */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {['Next.js', 'React', 'Node.js', 'Flutter', 'AWS', 'TypeScript', 'Supabase', 'Docker'].map(tech => (
                <span key={tech}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm hover:text-primary hover:border-primary/30 transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40" aria-hidden="true">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  )
}
