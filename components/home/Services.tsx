'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, Smartphone, Code, Palette, Cloud, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/constants'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Smartphone, Code, Palette, Cloud, Lightbulb,
}

const colors = [
  'from-blue-500/20 to-cyan-500/20 border-blue-500/20 group-hover:border-blue-500/40',
  'from-violet-500/20 to-purple-500/20 border-violet-500/20 group-hover:border-violet-500/40',
  'from-primary/20 to-indigo-500/20 border-primary/20 group-hover:border-primary/40',
  'from-pink-500/20 to-rose-500/20 border-pink-500/20 group-hover:border-pink-500/40',
  'from-cyan-500/20 to-teal-500/20 border-cyan-500/20 group-hover:border-cyan-500/40',
  'from-amber-500/20 to-orange-500/20 border-amber-500/20 group-hover:border-amber-500/40',
]

const iconColors = [
  'text-blue-500', 'text-violet-500', 'text-primary',
  'text-pink-500', 'text-cyan-500', 'text-amber-500',
]

export function Services() {
  return (
    <section id="servicios" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Nuestros Servicios
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-4">
            Soluciones tecnológicas
            <br />
            <span className="text-gradient">para cada desafío</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Ofrecemos un espectro completo de servicios adaptados a las necesidades
            específicas de tu empresa.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] || Code
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className={`group relative h-full rounded-2xl border bg-gradient-to-br ${colors[index]} bg-card/50 backdrop-blur-sm p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[index]} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${iconColors[index]}`} />
                  </div>

                  <h3 className="text-lg font-semibold font-heading mb-2">
                    {service.name}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-1.5 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className={`w-1 h-1 rounded-full ${iconColors[index].replace('text-', 'bg-')}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/servicios#${service.id}`}
                    className={`inline-flex items-center gap-1 text-sm font-medium ${iconColors[index]} opacity-70 group-hover:opacity-100 transition-opacity`}
                  >
                    Más información
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 flex justify-center"
        >
          <Link href="/servicios">
            <Button variant="outline" size="lg" className="group border-border/60 hover:border-primary/40">
              Ver todos los servicios
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
