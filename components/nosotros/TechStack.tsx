'use client'

import { motion } from 'framer-motion'

const categories = [
  {
    label: 'Frontend',
    techs: ['React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
    color: 'text-blue-500',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    label: 'Backend',
    techs: ['Node.js', 'NestJS', 'Python', 'Go', 'GraphQL', 'REST APIs'],
    color: 'text-green-500',
    bg: 'bg-green-500/10 border-green-500/20',
  },
  {
    label: 'Mobile',
    techs: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo'],
    color: 'text-violet-500',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    label: 'Cloud & DevOps',
    techs: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'],
    color: 'text-amber-500',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    label: 'Bases de Datos',
    techs: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Supabase', 'Firebase'],
    color: 'text-rose-500',
    bg: 'bg-rose-500/10 border-rose-500/20',
  },
  {
    label: 'Herramientas',
    techs: ['Git', 'Figma', 'Jira', 'Notion', 'Slack', 'Linear'],
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
]

export function TechStack() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Tecnologías
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-4">
            Nuestro stack
            <br />
            <span className="text-gradient">tecnológico</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Trabajamos con las herramientas más modernas y probadas del mercado
            para garantizar soluciones robustas y escalables.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <span className={`text-xs font-bold uppercase tracking-widest ${cat.color} mb-4 block`}>
                {cat.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${cat.bg} ${cat.color}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
