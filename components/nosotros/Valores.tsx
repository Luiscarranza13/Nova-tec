'use client'

import { motion } from 'framer-motion'
import { Zap, Heart, Star, Shield, Users, Lightbulb } from 'lucide-react'

const valores = [
  {
    icon: Zap,
    title: 'Excelencia',
    description: 'No entregamos "suficientemente bueno". Cada proyecto recibe nuestro máximo esfuerzo y atención al detalle.',
    iconColor: 'text-yellow-500',
    iconBg: 'bg-yellow-500/10',
  },
  {
    icon: Heart,
    title: 'Pasión',
    description: 'Amamos lo que hacemos. Esa energía se traduce en productos que van más allá de las expectativas.',
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-500/10',
  },
  {
    icon: Users,
    title: 'Colaboración',
    description: 'Trabajamos como una extensión de tu equipo, no como un proveedor externo. Tu éxito es nuestro éxito.',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
  },
  {
    icon: Shield,
    title: 'Integridad',
    description: 'Transparencia total en cada etapa. Decimos lo que pensamos y cumplimos lo que prometemos.',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-500/10',
  },
  {
    icon: Lightbulb,
    title: 'Innovación',
    description: 'Nos mantenemos a la vanguardia tecnológica para ofrecerte siempre las mejores soluciones del mercado.',
    iconColor: 'text-violet-500',
    iconBg: 'bg-violet-500/10',
  },
  {
    icon: Star,
    title: 'Compromiso',
    description: 'Nos involucramos de principio a fin. El proyecto no termina en el lanzamiento, te acompañamos siempre.',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
]

export function Valores() {
  return (
    <section className="home-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Nuestros Valores
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading leading-tight mb-3">
            Los principios que{' '}
            <span className="text-gradient">guían cada decisión</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Más que reglas, son la cultura que define quiénes somos y cómo trabajamos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {valores.map((v, index) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm p-5 md:p-6 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl ${v.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                  <Icon className={`h-5 w-5 ${v.iconColor}`} />
                </div>
                <h3 className="text-base font-bold font-heading mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{v.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
