'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, CheckCircle2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = [
  'Equipo experto dedicado',
  'Metodología ágil probada',
  'Soporte continuo',
  'Entregas a tiempo',
]

const techStack = ['Next.js', 'React', 'Node.js', 'Flutter', 'AWS', 'TypeScript']

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-chart-2/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-chart-3/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-6 mb-20"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {['A', 'B', 'C', 'D', 'E'].map((l, i) => (
                  <div
                    key={l}
                    className="w-9 h-9 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white shadow-md"
                    style={{
                      background: `hsl(${243 + i * 20} 75% ${55 + i * 3}%)`,
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">+120 clientes</span> satisfechos
                </p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-border" />

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="text-center">
                <p className="text-xl font-bold font-heading text-foreground">250+</p>
                <p className="text-xs">Proyectos</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold font-heading text-foreground">8+</p>
                <p className="text-xs">Años exp.</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold font-heading text-foreground">25+</p>
                <p className="text-xs">Expertos</p>
              </div>
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-full"
          >
            <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-4">
              Tecnologías que dominamos
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  className="px-4 py-1.5 rounded-full text-xs font-medium border border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm hover:border-primary/30 hover:text-primary transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
