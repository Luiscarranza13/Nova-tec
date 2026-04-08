'use client'

import { motion } from 'framer-motion'
import { Users, Shield, Headphones, Zap, CheckCircle2, TrendingUp, Clock, Award } from 'lucide-react'
import { WHY_US } from '@/lib/constants'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, Shield, Headphones, Agile: Zap,
}

const highlights = [
  'Código limpio y documentado',
  'Arquitectura escalable',
  'Seguridad de primer nivel',
  'Optimización de rendimiento',
  'Integración continua',
  'Monitoreo 24/7',
]

const metrics = [
  { icon: TrendingUp, value: '98%', label: 'Proyectos exitosos', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { icon: Clock, value: '< 24h', label: 'Tiempo de respuesta', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: Award, value: '8+', label: 'Años de experiencia', color: 'text-amber-500', bg: 'bg-amber-500/10' },
]

export function WhyUs() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

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
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Nos diferencia nuestro compromiso con la excelencia técnica y la
              satisfacción del cliente. Cada proyecto es una oportunidad de superar expectativas.
            </p>

            {/* Metrics row */}
            <div className="flex gap-4 mb-10">
              {metrics.map(({ icon: Icon, value, label, color, bg }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-4 text-center"
                >
                  <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mx-auto mb-2`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <p className={`text-xl font-bold font-heading ${color}`}>{value}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - staggered cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {WHY_US.map((item, index) => {
              const Icon = iconMap[item.icon] || Users
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`group rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-default ${index === 1 ? 'mt-8' : ''} ${index === 3 ? '-mt-8' : ''}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold font-heading mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>

                  {/* Bottom accent line */}
                  <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-chart-2 rounded-full transition-all duration-500" />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
