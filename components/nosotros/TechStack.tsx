'use client'

import { motion } from 'framer-motion'

const categories = [
  {
    label: 'Frontend',
    icon: '🎨',
    techs: [
      { name: 'React',        level: 'Expert' },
      { name: 'Next.js',      level: 'Expert' },
      { name: 'Vue.js',       level: 'Avanzado' },
      { name: 'Angular',      level: 'Avanzado' },
      { name: 'TypeScript',   level: 'Expert' },
      { name: 'Tailwind CSS', level: 'Expert' },
      { name: 'Framer Motion',level: 'Avanzado' },
      { name: 'Three.js',     level: 'Intermedio' },
    ],
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    glow: 'hover:shadow-[0_0_30px_hsl(217_91%_60%/0.15)]',
    bar: 'bg-blue-500',
  },
  {
    label: 'Backend',
    icon: '⚙️',
    techs: [
      { name: 'Node.js',    level: 'Expert' },
      { name: 'NestJS',     level: 'Avanzado' },
      { name: 'Python',     level: 'Avanzado' },
      { name: 'Go',         level: 'Intermedio' },
      { name: 'GraphQL',    level: 'Avanzado' },
      { name: 'REST APIs',  level: 'Expert' },
      { name: 'tRPC',       level: 'Avanzado' },
      { name: 'WebSockets', level: 'Avanzado' },
    ],
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    glow: 'hover:shadow-[0_0_30px_hsl(160_84%_39%/0.15)]',
    bar: 'bg-emerald-500',
  },
  {
    label: 'Mobile',
    icon: '📱',
    techs: [
      { name: 'React Native', level: 'Expert' },
      { name: 'Flutter',      level: 'Avanzado' },
      { name: 'Expo',         level: 'Expert' },
      { name: 'Swift',        level: 'Intermedio' },
      { name: 'Kotlin',       level: 'Intermedio' },
      { name: 'PWA',          level: 'Avanzado' },
    ],
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    glow: 'hover:shadow-[0_0_30px_hsl(263_70%_50%/0.15)]',
    bar: 'bg-violet-500',
  },
  {
    label: 'Cloud & DevOps',
    icon: '☁️',
    techs: [
      { name: 'AWS',        level: 'Avanzado' },
      { name: 'GCP',        level: 'Avanzado' },
      { name: 'Azure',      level: 'Intermedio' },
      { name: 'Docker',     level: 'Expert' },
      { name: 'Kubernetes', level: 'Avanzado' },
      { name: 'CI/CD',      level: 'Expert' },
      { name: 'Terraform',  level: 'Avanzado' },
      { name: 'Vercel',     level: 'Expert' },
    ],
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    glow: 'hover:shadow-[0_0_30px_hsl(38_92%_50%/0.15)]',
    bar: 'bg-amber-500',
  },
  {
    label: 'Bases de Datos',
    icon: '🗄️',
    techs: [
      { name: 'PostgreSQL', level: 'Expert' },
      { name: 'MongoDB',    level: 'Avanzado' },
      { name: 'MySQL',      level: 'Expert' },
      { name: 'Redis',      level: 'Avanzado' },
      { name: 'Supabase',   level: 'Expert' },
      { name: 'Firebase',   level: 'Avanzado' },
      { name: 'Prisma',     level: 'Expert' },
      { name: 'Drizzle',    level: 'Avanzado' },
    ],
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
    glow: 'hover:shadow-[0_0_30px_hsl(347_77%_50%/0.15)]',
    bar: 'bg-rose-500',
  },
  {
    label: 'IA & Machine Learning',
    icon: '🤖',
    techs: [
      { name: 'OpenAI API',   level: 'Avanzado' },
      { name: 'LangChain',    level: 'Avanzado' },
      { name: 'TensorFlow',   level: 'Intermedio' },
      { name: 'Hugging Face', level: 'Intermedio' },
      { name: 'Pinecone',     level: 'Avanzado' },
      { name: 'Vercel AI SDK',level: 'Avanzado' },
    ],
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
    glow: 'hover:shadow-[0_0_30px_hsl(330_81%_60%/0.15)]',
    bar: 'bg-pink-500',
  },
  {
    label: 'Testing & QA',
    icon: '🧪',
    techs: [
      { name: 'Jest',       level: 'Expert' },
      { name: 'Vitest',     level: 'Expert' },
      { name: 'Playwright', level: 'Avanzado' },
      { name: 'Cypress',    level: 'Avanzado' },
      { name: 'Storybook',  level: 'Avanzado' },
      { name: 'Testing Library', level: 'Expert' },
    ],
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/20',
    glow: 'hover:shadow-[0_0_30px_hsl(172_66%_50%/0.15)]',
    bar: 'bg-teal-500',
  },
  {
    label: 'Herramientas',
    icon: '🛠️',
    techs: [
      { name: 'Git',    level: 'Expert' },
      { name: 'Figma',  level: 'Expert' },
      { name: 'Jira',   level: 'Avanzado' },
      { name: 'Notion', level: 'Avanzado' },
      { name: 'Linear', level: 'Avanzado' },
      { name: 'Slack',  level: 'Expert' },
      { name: 'GitHub Actions', level: 'Expert' },
      { name: 'Turborepo', level: 'Avanzado' },
    ],
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    glow: 'hover:shadow-[0_0_30px_hsl(189_94%_43%/0.15)]',
    bar: 'bg-cyan-500',
  },
]

const levelColor: Record<string, string> = {
  Expert:      'text-emerald-400',
  Avanzado:    'text-blue-400',
  Intermedio:  'text-amber-400',
}

// Flat list for the marquee strip
const allTechs = categories.flatMap((c) => c.techs.map((t) => ({ name: t.name, color: c.color, bg: c.bg })))

export function TechStack() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-6"
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

        {/* Level legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6 mb-12 text-xs"
        >
          {Object.entries(levelColor).map(([level, color]) => (
            <span key={level} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${color.replace('text-', 'bg-')}`} />
              <span className="text-muted-foreground">{level}</span>
            </span>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className={`rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-5 hover:border-primary/20 transition-all duration-300 group ${cat.glow}`}
            >
              {/* Card header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{cat.icon}</span>
                <span className={`text-xs font-bold uppercase tracking-widest ${cat.color}`}>
                  {cat.label}
                </span>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-1.5">
                {cat.techs.map((tech) => (
                  <span
                    key={tech.name}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border ${cat.bg} ${cat.color}`}
                  >
                    {tech.name}
                    <span className={`text-[10px] font-normal ${levelColor[tech.level]} opacity-80`}>
                      · {tech.level}
                    </span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm py-4"
        >
          {/* fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex animate-marquee whitespace-nowrap gap-3">
            {[...allTechs, ...allTechs].map((tech, i) => (
              <span
                key={i}
                className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full border ${tech.bg} ${tech.color} shrink-0`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
