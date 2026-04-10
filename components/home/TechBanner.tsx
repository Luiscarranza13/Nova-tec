'use client'

import { motion } from 'framer-motion'

const techs = [
  { name: 'Next.js', color: '#fff' },
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js', color: '#68A063' },
  { name: 'Flutter', color: '#54C5F8' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'GraphQL', color: '#E10098' },
  { name: 'Tailwind', color: '#38BDF8' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Vercel', color: '#fff' },
  { name: 'Firebase', color: '#FFCA28' },
  { name: 'Redis', color: '#DC382D' },
  { name: 'Stripe', color: '#635BFF' },
]

const doubled = [...techs, ...techs]

export function TechBanner() {
  return (
    <section className="py-16 relative overflow-hidden border-y border-border/30">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />

      <div className="mb-8 text-center">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Stack tecnológico que usamos
        </span>
      </div>

      <div className="flex overflow-hidden gap-0">
        {/* Row 1 — left to right */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4 shrink-0"
        >
          {doubled.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border/40 bg-card/50 backdrop-blur-sm whitespace-nowrap hover:border-primary/40 transition-colors group cursor-default"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0 group-hover:scale-125 transition-transform"
                style={{ backgroundColor: tech.color, boxShadow: `0 0 6px ${tech.color}60` }}
              />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 — right to left */}
      <div className="flex overflow-hidden gap-0 mt-4">
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4 shrink-0"
        >
          {[...doubled].reverse().map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border/40 bg-card/50 backdrop-blur-sm whitespace-nowrap hover:border-primary/40 transition-colors group cursor-default"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0 group-hover:scale-125 transition-transform"
                style={{ backgroundColor: tech.color, boxShadow: `0 0 6px ${tech.color}60` }}
              />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
