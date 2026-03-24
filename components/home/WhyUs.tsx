'use client'

import { motion } from 'framer-motion'
import { Users, Shield, Headphones, Zap, CheckCircle2 } from 'lucide-react'
import { WHY_US } from '@/lib/constants'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, Shield, Headphones, Agile: Zap,
}

const cardColors = [
  { icon: 'text-blue-400', bg: 'bg-blue-500/10 group-hover:bg-blue-500/20', border: 'hover:border-blue-500/20' },
  { icon: 'text-violet-400', bg: 'bg-violet-500/10 group-hover:bg-violet-500/20', border: 'hover:border-violet-500/20' },
  { icon: 'text-amber-400', bg: 'bg-amber-500/10 group-hover:bg-amber-500/20', border: 'hover:border-amber-500/20' },
  { icon: 'text-emerald-400', bg: 'bg-emerald-500/10 group-hover:bg-emerald-500/20', border: 'hover:border-emerald-500/20' },
]

const highlights = [
  'Código limpio y documentado',
  'Arquitectura escalable',
  'Seguridad de primer nivel',
  'Optimización de rendimiento',
  'Integración continua',
  'Monitoreo 24/7',
]

export function WhyUs() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-primary" />
              ¿Por qué elegirnos?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-6">
              Tu socio de confianza
              <br />
              en{' '}
              <span className="text-gradient">transformación digital</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Nos diferencia nuestro compromiso con la excelencia técnica y la
              satisfacción del cliente. Cada proyecto es una oportunidad de superar expectativas.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground group cursor-default"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-foreground transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {WHY_US.map((item, index) => {
              const Icon = iconMap[item.icon] || Users
              const colors = cardColors[index]
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 hover:shadow-lg transition-all duration-300 ${colors.border} ${index === 1 ? 'mt-6' : ''} ${index === 3 ? '-mt-6' : ''}`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${colors.bg}`}>
                    <Icon className={`h-5 w-5 ${colors.icon}`} />
                  </div>
                  <h3 className="font-semibold font-heading mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
