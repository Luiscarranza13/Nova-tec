'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Calendar, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const trustItems = [
  'Sin compromiso inicial',
  'Respuesta en menos de 24h',
  'Consulta gratuita',
]

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-chart-2/10" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Animated orb */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary rounded-full blur-[100px] pointer-events-none"
      />

      <div className="container relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-medium text-primary">Empieza hoy mismo</span>
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/contacto">
              <Button size="xl" className="group shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 min-w-[220px] relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Iniciar mi Proyecto
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
          >
            {trustItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                {item}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
