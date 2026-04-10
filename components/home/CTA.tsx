'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, CheckCircle2, Zap, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CalendlyWidget } from '@/components/home/CalendlyWidget'

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 3,
}))

const trust = [
  'Sin compromiso inicial',
  'Respuesta en menos de 24h',
  'Consulta gratuita',
  'Garantía de calidad',
]

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-chart-2/15" />
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-chart-2/10 rounded-full blur-[100px] pointer-events-none" />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/25 pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="container relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/8 backdrop-blur-sm mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-sm font-medium text-primary">Disponibles para nuevos proyectos</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6"
        >
          ¿Listo para llevar tu
          <br />
          negocio al{' '}
          <span className="text-gradient">siguiente nivel?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Únete a más de 120 empresas que ya confían en NovaTec para transformar
          sus ideas en productos digitales de alto impacto.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
        >
          <Link href="/contacto">
            <Button size="xl" className="group shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 min-w-[220px] relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Zap className="mr-2 h-5 w-5" />
              Iniciar mi Proyecto
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <CalendlyWidget />
          <Link href={`https://wa.me/51918146783?text=${encodeURIComponent('¡Hola! Me gustaría agendar una reunión.')}`} target="_blank">
            <Button size="xl" variant="outline" className="group min-w-[220px] border-border/60 hover:border-[#25D366]/40 hover:bg-[#25D366]/5">
              <MessageCircle className="mr-2 h-5 w-5 text-[#25D366] group-hover:scale-110 transition-transform" />
              Hablar por WhatsApp
            </Button>
          </Link>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
        >
          {trust.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
