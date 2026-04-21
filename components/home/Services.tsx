'use client'

import Link from 'next/link'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowRight, Globe, Smartphone, Code, Palette, Cloud, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/constants'
import { useRef } from 'react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Smartphone, Code, Palette, Cloud, Lightbulb,
}

const cardStyles = [
  { gradient: 'from-blue-500/15 to-cyan-500/15', border: 'hover:border-blue-500/40', icon: 'text-blue-500', glow: 'group-hover:shadow-blue-500/10' },
  { gradient: 'from-violet-500/15 to-purple-500/15', border: 'hover:border-violet-500/40', icon: 'text-violet-500', glow: 'group-hover:shadow-violet-500/10' },
  { gradient: 'from-primary/15 to-indigo-500/15', border: 'hover:border-primary/40', icon: 'text-primary', glow: 'group-hover:shadow-primary/10' },
  { gradient: 'from-pink-500/15 to-rose-500/15', border: 'hover:border-pink-500/40', icon: 'text-pink-500', glow: 'group-hover:shadow-pink-500/10' },
  { gradient: 'from-cyan-500/15 to-teal-500/15', border: 'hover:border-cyan-500/40', icon: 'text-cyan-500', glow: 'group-hover:shadow-cyan-500/10' },
  { gradient: 'from-amber-500/15 to-orange-500/15', border: 'hover:border-amber-500/40', icon: 'text-amber-500', glow: 'group-hover:shadow-amber-500/10' },
]

function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(200px circle at ${x}px ${y}px, hsl(var(--primary) / 0.08), transparent 70%)`
  )

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className={`relative ${className}`}>
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background }}
      />
      {children}
    </div>
  )
}

export function Services() {
  return (
    <section id="servicios" className="py-20 sm:py-32 relative overflow-hidden">
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
            const style = cardStyles[index % cardStyles.length]
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <SpotlightCard className="group h-full">
                  <div className={`h-full rounded-2xl border border-border/50 bg-gradient-to-br ${style.gradient} bg-card/50 backdrop-blur-sm p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ${style.border} ${style.glow}`}>
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.gradient} border border-border/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 ${style.icon}`} />
                    </div>

                    <h3 className="text-lg font-semibold font-heading mb-2">{service.name}</h3>

                    <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-1.5 mb-6">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full ${style.icon.replace('text-', 'bg-')} shrink-0`} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/servicios#${service.id}`}
                      className={`inline-flex items-center gap-1 text-sm font-medium ${style.icon} opacity-60 group-hover:opacity-100 transition-all group-hover:gap-2`}
                    >
                      Más información <span className="sr-only">sobre {service.name}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </SpotlightCard>
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
            <Button variant="outline" size="lg" className="group border-border/60 hover:border-primary/40 hover:bg-primary/5">
              Ver todos los servicios
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
