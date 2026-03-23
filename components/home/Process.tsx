'use client'

import { motion } from 'framer-motion'
import { Search, PenTool, Code2, Bug, Rocket } from 'lucide-react'
import { PROCESS_STEPS } from '@/lib/constants'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  PenTool,
  Code2,
  Bug,
  Rocket,
}

export function Process() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">NUESTRO PROCESO</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">
            Metodología que Garantiza
            <br />
            <span className="text-primary">Resultados Excepcionales</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Seguimos un proceso estructurado y transparente en cada proyecto,
            manteniéndote informado en cada etapa.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon] || Search
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="lg:text-center">
                    <div className="relative inline-flex mb-4">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                      <div className="relative w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center shadow-lg">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {step.step}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold font-heading mb-2 lg:text-center">
                      {step.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm lg:text-center">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
