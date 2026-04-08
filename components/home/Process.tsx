'use client'

import { motion, useInView } from 'framer-motion'
import { Search, PenTool, Code2, Bug, Rocket } from 'lucide-react'
import { PROCESS_STEPS } from '@/lib/constants'
import { useRef } from 'react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search, PenTool, Code2, Bug, Rocket,
}

const stepColors = [
  { gradient: 'from-blue-500 to-cyan-500', glow: 'shadow-blue-500/30', text: 'text-blue-400' },
  { gradient: 'from-violet-500 to-purple-500', glow: 'shadow-violet-500/30', text: 'text-violet-400' },
  { gradient: 'from-primary to-indigo-500', glow: 'shadow-primary/30', text: 'text-primary' },
  { gradient: 'from-pink-500 to-rose-500', glow: 'shadow-pink-500/30', text: 'text-pink-400' },
  { gradient: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/30', text: 'text-amber-400' },
]

export function Process() {
  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once: true })

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-24"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Nuestro Proceso
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-4">
            Metodología que garantiza
            <br />
            <span className="text-gradient">resultados excepcionales</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Un proceso estructurado y transparente en cada proyecto,
            manteniéndote informado en cada etapa.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative" ref={lineRef}>
          {/* Animated connector line */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-border/50">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={lineInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.8, delay: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-primary to-amber-500 origin-left"
            />
            {/* Traveling dot */}
            {lineInView && (
              <motion.div
                initial={{ left: '0%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 1.8, delay: 0.3, ease: 'easeInOut' }}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-primary/50 border-2 border-primary"
                style={{ position: 'absolute' }}
              />
            )}
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon] || Search
              const color = stepColors[index]
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Icon circle */}
                  <div className="relative mb-6">
                    {/* Glow */}
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                      className={`absolute inset-0 bg-gradient-to-br ${color.gradient} rounded-full blur-xl`}
                    />
                    <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${color.gradient} p-0.5 shadow-lg ${color.glow} group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        <Icon className="h-8 w-8 text-foreground" />
                      </div>
                    </div>
                    {/* Step number badge */}
                    <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br ${color.gradient} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-base font-semibold font-heading mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
