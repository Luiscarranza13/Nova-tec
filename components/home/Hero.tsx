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

// Typewriter — fixed to not cause LCP penalty
function TypewriterWord() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('Ideas')
  const [deleting, setDeleting] = useState(true)
  const [started, setStarted] = useState(false)

  useEffect(() => { 
    const t = setTimeout(() => setStarted(true), 2500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!started) return
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
  }, [displayed, deleting, index, started])

  return (
    <span className="text-gradient inline-block min-w-[180px] sm:min-w-[240px] md:min-w-[320px] text-left" aria-label="Ideas en Software">
      {displayed}
      <span className="animate-pulse text-primary" aria-hidden="true">|</span>
    </span>
  )
}

// Progress bars removed per client request

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      {/* Static background — no JS animations for LCP */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />

      {/* CSS-only blobs — use will-change:transform for GPU compositing */}
      <div
        className="hidden md:block absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
        style={{ willChange: 'transform', animation: 'blob1 18s ease-in-out infinite' }}
        aria-hidden="true"
      />
      <div
        className="hidden md:block absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-chart-2/10 blur-[100px] pointer-events-none"
        style={{ willChange: 'transform', animation: 'blob2 22s ease-in-out infinite' }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80 pointer-events-none" aria-hidden="true" />

      <div className="container relative z-10 max-w-5xl mx-auto px-4 pt-32 pb-24 text-center flex flex-col items-center">
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
          <span className="text-sm font-medium text-primary">Agencia de Desarrollo de Software en Perú</span>
        </motion.div>

        {/* H1 */}
        <h1
          className="text-5xl md:text-7xl xl:text-[80px] font-bold font-heading leading-[1.05] tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
          style={{ animationDelay: '100ms' }}
        >
          Convertimos tus{' '}
              <br />
              <TypewriterWord />
              <br />
              <span className="text-foreground/70">en Software</span>
            </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
          style={{ animationDelay: '200ms' }}
        >
          Impulsamos empresas en todo el Perú con consultoría tecnológica, desarrollo de sistemas a medida y diseño de páginas web corporativas de alto impacto.
        </p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-14"
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
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <div className="flex items-center gap-5">
            <div className="flex -space-x-3" role="group" aria-label="Clientes satisfechos">
              {['A', 'B', 'C', 'D', 'E'].map((l, i) => (
                <div
                  key={l}
                  className="w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white shadow-md relative group"
                  style={{ background: `hsl(${243 + i * 22} 75% ${55 + i * 3}%)` }}
                  aria-hidden="true"
                >
                  <span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-card px-2 py-1 rounded text-[10px] text-foreground pointer-events-none transition-opacity whitespace-nowrap shadow-sm border border-border">Cliente TOP</span>
                  {l}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 mb-0.5" role="img" aria-label="5 estrellas">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-sm" aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">+120 clientes</span> satisfechos
              </p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-border/60" aria-hidden="true" />
          <div className="hidden sm:flex gap-8 text-sm text-muted-foreground">
            {[['250+', 'Proyectos'], ['8+', 'Años exp.'], ['25+', 'Expertos']].map(([v, l]) => (
              <div key={l} className="text-left">
                <p className="text-xl font-bold font-heading text-primary drop-shadow-sm">{v}</p>
                <p className="text-xs font-medium uppercase tracking-wider">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40" aria-hidden="true">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  )
}
