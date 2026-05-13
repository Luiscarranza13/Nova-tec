'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function NosotrosHero() {
  return (
    <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden bg-white pt-20">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-chart-2/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container py-16 md:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

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
              className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-5"
            >
              <span className="w-8 h-px bg-primary" />
              Sobre Nosotros
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading leading-[1.05] tracking-tight mb-5">
              Somos{' '}
              <span className="text-gradient">NovaTec</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Una empresa de desarrollo de software fundada con la misión de transformar
              ideas en productos digitales que generan impacto real en los negocios.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/contacto">
                <Button size="lg" className="group shadow-lg shadow-primary/20 w-full sm:w-auto">
                  Trabajemos juntos
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/portafolio">
                <Button size="lg" variant="outline" className="border-slate-200 hover:border-primary/40 w-full sm:w-auto">
                  Ver nuestro trabajo
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right — visual card (hidden on mobile, shown on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-chart-2/15 rounded-3xl rotate-2" />
              <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                {/* Window bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="ml-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Code2 className="h-3.5 w-3.5" />
                    novatec.pe
                  </div>
                </div>

                <div className="space-y-4 font-mono text-sm">
                  <div>
                    <span className="text-purple-500">const</span>
                    <span className="text-blue-500"> empresa</span>
                    <span className="text-slate-700"> = </span>
                    <span className="text-yellow-500">{'{'}</span>
                  </div>
                  {[
                    { key: 'nombre',   val: '"NovaTec"',          color: 'text-green-500' },
                    { key: 'fundada',  val: '2016',               color: 'text-orange-500' },
                    { key: 'misión',   val: '"Transformar ideas"', color: 'text-green-500' },
                    { key: 'equipo',   val: '25',                 color: 'text-orange-500' },
                    { key: 'proyectos',val: '250',                color: 'text-orange-500' },
                    { key: 'clientes', val: '120',                color: 'text-orange-500' },
                  ].map(({ key, val, color }) => (
                    <div key={key} className="pl-5">
                      <span className="text-blue-400">{key}</span>
                      <span className="text-slate-400">: </span>
                      <span className={color}>{val}</span>
                      <span className="text-slate-300">,</span>
                    </div>
                  ))}
                  <div>
                    <span className="text-yellow-500">{'}'}</span>
                    <span className="text-slate-300">;</span>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 rounded-xl px-4 py-2.5 shadow-lg border border-slate-200 bg-white"
                >
                  <p className="text-xs font-semibold text-slate-900">⭐ 4.9/5 rating</p>
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
