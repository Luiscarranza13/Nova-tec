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
    <section id="servicios" className="py-24 md:py-32 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-slate-50/50" />
      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading leading-tight mb-6 text-slate-900">
            Soluciones tecnológicas
            <br />
            <span className="text-primary">para cada desafío</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Ofrecemos un espectro completo de servicios adaptados a las necesidades
            específicas de tu empresa con los más altos estándares de calidad.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                  <div className={`h-full rounded-2xl border border-slate-100 bg-white p-6 md:p-8 transition-all duration-500 hover:shadow-2xl hover:border-primary/20 group-hover:-translate-y-2`}>
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500`}>
                      <Icon className={`h-7 w-7 ${style.icon} group-hover:text-white`} />
                    </div>

                    <h3 className="text-xl font-bold font-heading mb-3 text-slate-900">{service.name}</h3>

                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2.5 mb-8">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-xs text-slate-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/servicios#${service.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-all uppercase tracking-tighter"
                    >
                      Más detalles
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { CheckCircle2 } from 'lucide-react'
