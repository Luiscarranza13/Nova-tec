'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, CheckCircle2, ChevronDown, Code2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

const benefits = [
  'Equipo experto dedicado',
  'Metodología ágil probada',
  'Soporte continuo',
  'Entregas a tiempo',
]

const techStack = [
  { name: 'Next.js', color: 'hover:border-white/40 hover:text-white' },
  { name: 'React', color: 'hover:border-cyan-400/40 hover:text-cyan-400' },
  { name: 'Node.js', color: 'hover:border-green-400/40 hover:text-green-400' },
  { name: 'Flutter', color: 'hover:border-blue-400/40 hover:text-blue-400' },
  { name: 'AWS', color: 'hover:border-amber-400/40 hover:text-amber-400' },
  { name: 'TypeScript', color: 'hover:border-blue-500/40 hover:text-blue-400' },
  { name: 'Supabase', color: 'hover:border-emerald-400/40 hover:text-emerald-400' },
  { name: 'Docker', color: 'hover:border-sky-400/40 hover:text-sky-400' },
]

const avatarColors = [
  'hsl(243 75% 59%)',
  'hsl(190 80% 45%)',
  'hsl(270 70% 60%)',
  'hsl(340 75% 55%)',
  'hsl(30 80% 55%)',
]

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Parallax orbs */}
      <motion.div style={{ y: orbY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-chart-2/10 rounded-full blur-[110px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-chart-3/6 rounded-full blur-[160px]" />
      </motion.div>

      {/* Floating code snippets decoration */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute left-8 top-1/3 hidden xl:block"
      >
        <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm p-4 text-xs font-mono text-muted-foreground/60 rotate-[-3deg]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-400/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
            <div className="w-2 h-2 rounded-full bg-green-400/60" />
          </div>
          <p><span className="text-primary/70">const</span> project = {'{'}</p>
          <p className="pl-3"><span className="text-chart-2/70">status</span>: <span className="text-green-400/70">&quot;success&quot;</span></p>
          <p><span className="text-primary/70">{'}'}</span></p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute right-8 top-2/5 hidden xl:block"
      >
        <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm p-4 text-xs font-mono text-muted-foreground/60 rotate-[3deg]">
          <div className="flex items-center gap-1.5 mb-2">
            <Code2 className="h-3 w-3 text-primary/60" />
            <span className="text-primary/60">deploy.ts</span>
          </div>
          <p><span className="text-chart-2/70">await</span> launch()</p>
          <p className="text-green-400/70">✓ Build successful</p>
        </div>
      </motion.div>

      <motion.div style={{ y: contentY }} className="container relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8 hover:border-primary/40 transition-colors cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-medium text-primary">
              Transformando negocios con tecnología de vanguardia
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-heading leading-[1.05] tracking-tight mb-6"
          >
            Convertimos tus{' '}
            <span className="relative inline-block">
              <span className="text-gradient">Ideas</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-chart-2 origin-left"
              />
            </span>
            <br />
            en{' '}
            <span className="text-gradient">Software</span>
            <br />
            <span className="text-foreground/80">Excepcional</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8"
          >
            Somos tu socio estratégico en tecnología. Creamos soluciones innovadoras,
            escalables y de alta calidad que impulsan el crecimiento de tu negocio.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link href="/contacto">
              <Button size="xl" className="group shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 min-w-[200px] relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Iniciar Proyecto
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-6 mb-20 px-6 py-4 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {['A', 'B', 'C', 'D', 'E'].map((l, i) => (
                  <div
                    key={l}
                    className="w-9 h-9 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white shadow-md"
                    style={{ background: avatarColors[i] }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">+120 clientes</span> satisfechos
                </p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-border" />

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              {[['250+', 'Proyectos'], ['8+', 'Años exp.'], ['25+', 'Expertos']].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="text-xl font-bold font-heading text-gradient">{v}</p>
                  <p className="text-xs">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-full"
          >
            <p className="text-xs text-muted-foreground/50 uppercase tracking-widest mb-4">
              Tecnologías que dominamos
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium border border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm transition-all duration-200 cursor-default ${tech.color}`}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
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
