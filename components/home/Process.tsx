'use client'

import { motion } from 'framer-motion'
import { Search, PenTool, Code2, Bug, Rocket } from 'lucide-react'
import { PROCESS_STEPS } from '@/lib/constants'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search, PenTool, Code2, Bug, Rocket,
}

const stepColors = [
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-purple-500',
  'from-primary to-indigo-500',
  'from-pink-500 to-rose-500',
  'from-amber-500 to-orange-500',
]

export function Process() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
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
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-border to-transparent" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent origin-left"
            />
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon] || Search
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Icon circle */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stepColors[index]} rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                    <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${stepColors[index]} p-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        <Icon className="h-8 w-8 text-foreground" />
                      </div>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br ${stepColors[index]} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
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
