'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Calendar, CheckCircle2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 3,
}))

const stats = [
  { value: '250+', label: 'Proyectos entregados' },
  { value: '120+', label: 'Clientes satisfechos' },
  { value: '8+', label: 'Años de experiencia' },
]

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-chart-2/15" />
      <div className="absolute inset-0 bg-grid opacity-15" />

      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-chart-2/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/30 pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="container relative z-10 max-w-5xl mx-auto px-4">
        {/* Top stats bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-8 md:gap-16 mb-16"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold font-heading text-gradient">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/8 backdrop-blur-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-medium text-primary">Disponibles para nuevos proyectos</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6">
            ¿Listo para llevar tu
            <br />
            negocio al{' '}
            <span className="text-gradient">siguiente nivel?</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Únete a más de 120 empresas que ya confían en NovaTec para transformar
            sus ideas en productos digitales de alto impacto.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/contacto">
              <Button size="xl" className="group shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 min-w-[220px]">
                <Zap className="mr-2 h-5 w-5" />
                Iniciar mi Proyecto
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="https://calendly.com/novatec" target="_blank" rel="noopener noreferrer">
              <Button size="xl" variant="outline" className="group min-w-[220px] border-border/60 hover:border-primary/40 hover:bg-primary/5">
                <Calendar className="mr-2 h-5 w-5 text-chart-2 group-hover:scale-110 transition-transform" />
                Agendar Reunión
              </Button>
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            {[
              'Sin compromiso inicial',
              'Respuesta en menos de 24h',
              'Consulta gratuita',
              'Garantía de calidad',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
