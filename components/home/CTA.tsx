'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Calendar, CheckCircle2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

const stats = [
  { value: '250+', label: 'Proyectos entregados' },
  { value: '120+', label: 'Clientes satisfechos' },
  { value: '8+', label: 'Años de experiencia' },
]

export function CTA() {
  const [particles, setParticles] = useState<{id: number, x: number, y: number, size: number, delay: number, duration: number}[]>([])

  useEffect(() => {
    setParticles(Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 3,
    })))
  }, [])

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-slate-50 opacity-50" />
      <div className="absolute inset-0 bg-grid opacity-10" />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20 pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.4, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="container relative z-10 max-w-5xl mx-auto px-4">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-medium text-slate-600">Disponibles para nuevos proyectos</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-slate-900 leading-tight mb-8"
          >
            ¿Listo para llevar tu
            <br />
            negocio al <span className="text-primary">siguiente nivel?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Únete a más de 120 empresas que ya confían en NovaTec para transformar
            sus ideas en productos digitales de alto impacto.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/contacto" className="w-full sm:w-auto">
              <Button size="xl" className="w-full sm:min-w-[220px] shadow-lg shadow-primary/30">
                <Zap className="mr-2 h-5 w-5" />
                Iniciar Proyecto
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="https://calendly.com/novatec" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="xl" variant="outline" className="w-full sm:min-w-[220px] border-slate-200">
                <Calendar className="mr-2 h-5 w-5 text-slate-400" />
                Agendar Reunión
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 border-t border-slate-100">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-bold text-slate-900">{s.value}</p>
                <p className="text-sm text-slate-400 mt-1 uppercase tracking-widest font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
