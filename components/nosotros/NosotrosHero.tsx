'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function NosotrosHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-chart-2/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-6"
            >
              <span className="w-8 h-px bg-primary" />
              Sobre Nosotros
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.05] tracking-tight mb-6">
              Somos{' '}
              <span className="text-gradient">NovaTec</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Una empresa de desarrollo de software fundada con la misión de transformar
              ideas en productos digitales que generan impacto real en los negocios.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contacto">
                <Button size="lg" className="group shadow-lg shadow-primary/20">
                  Trabajemos juntos
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/portafolio">
                <Button size="lg" variant="outline" className="border-border/60 hover:border-primary/40">
                  Ver nuestro trabajo
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right — visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-chart-2/20 rounded-3xl rotate-2" />
              <div className="relative rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl p-10 shadow-2xl">
                {/* Window bar */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <div className="ml-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Code2 className="h-3.5 w-3.5" />
                    novatec.mx
                  </div>
                </div>

                <div className="space-y-5 font-mono text-sm">
                  <div>
                    <span className="text-purple-400">const</span>
                    <span className="text-blue-400"> empresa</span>
                    <span className="text-foreground"> = </span>
                    <span className="text-yellow-400">{'{'}</span>
                  </div>
                  {[
                    { key: 'nombre', val: '"NovaTec"', color: 'text-green-400' },
                    { key: 'fundada', val: '2016', color: 'text-orange-400' },
                    { key: 'misión', val: '"Transformar ideas"', color: 'text-green-400' },
                    { key: 'equipo', val: '25', color: 'text-orange-400' },
                    { key: 'proyectos', val: '250', color: 'text-orange-400' },
                    { key: 'clientes', val: '120', color: 'text-orange-400' },
                  ].map(({ key, val, color }) => (
                    <div key={key} className="pl-6">
                      <span className="text-blue-300">{key}</span>
                      <span className="text-foreground/60">: </span>
                      <span className={color}>{val}</span>
                      <span className="text-foreground/40">,</span>
                    </div>
                  ))}
                  <div>
                    <span className="text-yellow-400">{'}'}</span>
                    <span className="text-foreground/40">;</span>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-2.5 shadow-lg border border-border/50"
                >
                  <p className="text-xs font-semibold">⭐ 4.9/5 rating</p>
                  <p className="text-[10px] text-muted-foreground">+120 clientes</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
