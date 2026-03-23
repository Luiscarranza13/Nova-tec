'use client'

import { motion } from 'framer-motion'
import { Zap, Heart, Star, Shield, Users, Lightbulb } from 'lucide-react'

const valores = [
  {
    icon: Zap,
    title: 'Excelencia',
    description: 'No entregamos "suficientemente bueno". Cada proyecto recibe nuestro máximo esfuerzo y atención al detalle.',
    gradient: 'from-yellow-500/20 to-amber-500/20',
    iconColor: 'text-yellow-500',
  },
  {
    icon: Heart,
    title: 'Pasión',
    description: 'Amamos lo que hacemos. Esa energía se traduce en productos que van más allá de las expectativas.',
    gradient: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-500',
  },
  {
    icon: Users,
    title: 'Colaboración',
    description: 'Trabajamos como una extensión de tu equipo, no como un proveedor externo. Tu éxito es nuestro éxito.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
  },
  {
    icon: Shield,
    title: 'Integridad',
    description: 'Transparencia total en cada etapa. Decimos lo que pensamos y cumplimos lo que prometemos.',
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-500',
  },
  {
    icon: Lightbulb,
    title: 'Innovación',
    description: 'Nos mantenemos a la vanguardia tecnológica para ofrecerte siempre las mejores soluciones del mercado.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-500',
  },
  {
    icon: Star,
    title: 'Compromiso',
    description: 'Nos involucramos de principio a fin. El proyecto no termina en el lanzamiento, te acompañamos siempre.',
    gradient: 'from-primary/20 to-indigo-500/20',
    iconColor: 'text-primary',
  },
]

export function Valores() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Nuestros Valores
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-4">
            Los principios que
            <br />
            <span className="text-gradient">guían cada decisión</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Más que reglas, son la cultura que define quiénes somos y cómo trabajamos.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {valores.map((v, index) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`group rounded-2xl border border-border/50 bg-gradient-to-br ${v.gradient} bg-card/50 backdrop-blur-sm p-7 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="w-11 h-11 rounded-xl bg-background/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`h-5 w-5 ${v.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold font-heading mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
