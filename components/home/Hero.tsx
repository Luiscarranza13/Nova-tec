'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, CheckCircle2, ChevronDown, Code2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const benefits = [
  'Equipo experto dedicado',
  'Metodología ágil probada',
  'Soporte continuo',
  'Entregas a tiempo',
]

const techStack = ['Next.js', 'React', 'Node.js', 'Flutter', 'AWS', 'TypeScript', 'Supabase', 'Docker']

const floatingCards = [
  { icon: '✅', title: 'Proyecto Entregado', sub: 'E-commerce Platform', delay: 0, pos: 'top-[10%] right-[-5%]' },
  { icon: '⚡', title: '+40% Rendimiento', sub: 'Optimización cloud', delay: 0.6, pos: 'bottom-[22%] right-[-4%]' },
  { icon: '⭐', title: '4.9 / 5 Rating', sub: '+120 clientes', delay: 1.2, pos: 'bottom-[6%] left-[4%]' },
]

const words = ['Ideas', 'Proyectos', 'Visiones', 'Negocios']

function TypewriterWord() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return (
    <span className="text-gradient inline-block min-w-[180px]">
      {displayed}
      <span className="animate-pulse text-primary">|</span>
    </span>
  )
}

export function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 20)
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 20)
  }

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ── Aurora background ── */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Animated aurora blobs */}
      <motion.div
        animate={{ x: [0, 60, -40, 0], y: [0, -80, 40, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -50, 70, 0], y: [0, 60, -50, 0], scale: [1, 0.85, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-chart-2/10 blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, 80, -30, 0], y: [0, -40, 80, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-chart-3/8 blur-[100px] pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80 pointer-events-none" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left column ── */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/8 backdrop-blur-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-medium text-primary">Transformando negocios con tecnología</span>
            </motion.div>

            {/* Headline with typewriter */}
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
              {benefits.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.07 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  {b}
                </motion.div>
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
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  Iniciar Proyecto
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/portafolio">
                <Button size="xl" variant="outline" className="group min-w-[200px] border-border/60 hover:border-primary/40 hover:bg-primary/5">
                  <Zap className="mr-2 h-5 w-5 text-chart-2 group-hover:scale-110 transition-transform" />
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
              <div className="flex -space-x-3">
                {['A', 'B', 'C', 'D', 'E'].map((l, i) => (
                  <div
                    key={l}
                    className="w-9 h-9 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white shadow-md"
                    style={{ background: `hsl(${243 + i * 22} 75% ${55 + i * 3}%)` }}
                  >
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

          {/* ── Right column — visual panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            style={{ rotateX: springY, rotateY: springX }}
            className="hidden lg:block relative perspective-1000"
          >
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-chart-2/30 rounded-3xl rotate-2 blur-xl opacity-60" />

              <div className="relative rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl p-8 shadow-2xl">
                {/* Window bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <div className="ml-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Code2 className="h-3.5 w-3.5" />
                    <span>novatec.mx — proyecto.tsx</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-green-400">live</span>
                  </div>
                </div>

                {/* Code snippet */}
                <div className="space-y-2.5 font-mono text-sm mb-6">
                  <div>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-blue-400">proyecto</span>{' '}
                    <span className="text-foreground/50">= {'{'}</span>
                  </div>
                  {[
                    ['cliente', '"Tu empresa"', 'text-emerald-400'],
                    ['tecnología', '"Next.js + AWS"', 'text-emerald-400'],
                    ['plazo', '"4 semanas"', 'text-amber-400'],
                    ['calidad', '"Premium ✨"', 'text-emerald-400'],
                  ].map(([k, v, c], i) => (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.15 }}
                      className="pl-6"
                    >
                      <span className="text-blue-300">{k}</span>
                      <span className="text-foreground/40">: </span>
                      <span className={c}>{v}</span>
                      <span className="text-foreground/25">,</span>
                    </motion.div>
                  ))}
                  <div><span className="text-foreground/50">{'}'}</span></div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="pt-1 flex items-center gap-2"
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
                  {[
                    { label: 'Frontend', pct: 92, color: 'from-blue-500 to-cyan-400' },
                    { label: 'Backend', pct: 88, color: 'from-violet-500 to-purple-400' },
                    { label: 'Deploy', pct: 76, color: 'from-cyan-500 to-teal-400' },
                  ].map((bar, i) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                        <span>{bar.label}</span>
                        <span className="font-medium">{bar.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted/60 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${bar.pct}%` }}
                          transition={{ duration: 1.4, delay: 0.9 + i * 0.15, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${bar.color}`}
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
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, y: [0, i % 2 === 0 ? -12 : 12, 0] }}
                  transition={{
                    opacity: { delay: 1.2 + i * 0.2, duration: 0.4 },
                    scale: { delay: 1.2 + i * 0.2, duration: 0.4 },
                    y: { duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: card.delay },
                  }}
                  className={`absolute ${card.pos} glass-card rounded-xl px-4 py-3 shadow-xl border border-border/60 min-w-[165px] backdrop-blur-md`}
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

            {/* Tech pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-6 flex flex-wrap gap-2 justify-center"
            >
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.06 }}
                  whileHover={{ scale: 1.08, borderColor: 'hsl(var(--primary) / 0.5)' }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm hover:text-primary transition-colors cursor-default"
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
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
