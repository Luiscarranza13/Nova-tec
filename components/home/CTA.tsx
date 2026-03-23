'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-chart-2/10" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
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

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/contacto">
              <Button size="xl" className="group shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 min-w-[220px]">
                Iniciar mi Proyecto
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="https://calendly.com/novatec" target="_blank" rel="noopener noreferrer">
              <Button size="xl" variant="outline" className="group min-w-[220px] border-border/60 hover:border-primary/40">
                <Calendar className="mr-2 h-5 w-5 text-chart-2" />
                Agendar Reunión
              </Button>
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
            {[
              'Sin compromiso inicial',
              'Respuesta en menos de 24h',
              'Consulta gratuita',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
