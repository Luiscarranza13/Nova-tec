'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Compass } from 'lucide-react'

const items = [
  {
    icon: Target,
    label: 'Misión',
    title: 'Transformar ideas en impacto real',
    description:
      'Desarrollar soluciones de software innovadoras, escalables y de alta calidad que impulsen el crecimiento de nuestros clientes, siendo su socio estratégico de confianza en cada etapa del proceso.',
    gradient: 'from-primary/20 to-indigo-500/20',
    iconColor: 'text-primary',
    border: 'border-primary/20 hover:border-primary/40',
  },
  {
    icon: Eye,
    label: 'Visión',
    title: 'Liderar la transformación digital en Latinoamérica',
    description:
      'Ser la empresa de desarrollo de software más reconocida de la región por nuestra excelencia técnica, innovación constante y el impacto positivo que generamos en los negocios de nuestros clientes.',
    gradient: 'from-chart-2/20 to-cyan-500/20',
    iconColor: 'text-chart-2',
    border: 'border-chart-2/20 hover:border-chart-2/40',
  },
  {
    icon: Compass,
    label: 'Propósito',
    title: 'Tecnología con propósito humano',
    description:
      'Creemos que la tecnología debe servir a las personas. Cada línea de código que escribimos tiene el objetivo de hacer la vida más fácil, los negocios más eficientes y el mundo un poco mejor.',
    gradient: 'from-chart-3/20 to-violet-500/20',
    iconColor: 'text-chart-3',
    border: 'border-chart-3/20 hover:border-chart-3/40',
  },
]

export function MisionVision() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/40 to-transparent" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Lo que nos mueve
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
            Nuestra razón
            <br />
            <span className="text-gradient">de ser</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className={`group rounded-2xl border bg-gradient-to-br ${item.gradient} ${item.border} bg-card/50 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="w-12 h-12 rounded-xl bg-background/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${item.iconColor} mb-3 block`}>
                  {item.label}
                </span>
                <h3 className="text-xl font-bold font-heading mb-4 leading-snug">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
