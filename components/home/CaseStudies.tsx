'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Zap, Award } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Users,
  Zap,
  Award,
}

export function CaseStudies() {
  return (
    <section id="casos-exito" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Casos de Éxito
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-4">
            Proyectos que
            <br />
            <span className="text-gradient">generaron impacto</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Descubre cómo ayudamos a empresas a lograr sus objetivos con soluciones tecnológicas innovadoras.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-all duration-300 p-8"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${study.client.includes('Logistics') ? 'from-amber-500/5 to-orange-500/5' : study.client.includes('FinCorp') ? 'from-emerald-500/5 to-teal-500/5' : 'from-blue-500/5 to-cyan-500/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                {/* Industry */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <span className="text-xs font-medium text-primary">{study.industry}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-primary transition-colors">
                  {study.title}
                </h3>

                {/* Client */}
                <p className="text-sm text-muted-foreground mb-4">{study.client}</p>

                {/* Challenge */}
                <p className="text-sm mb-6 text-muted-foreground">
                  <span className="font-semibold text-foreground">Reto: </span>
                  {study.challenge}
                </p>

                {/* Results */}
                <div className="space-y-2 mb-6">
                  {study.results.map((result, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm">
                        <span className="font-bold text-primary">{result.metric}</span>
                        <span className="text-muted-foreground"> {result.description}</span>
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {study.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-full bg-muted border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            ¿Tienes un proyecto similar? Queremos ayudarte a lograrlo.
          </p>
          <Link href="/contacto">
            <Button size="lg">
              Cuéntanos Tu Idea
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
