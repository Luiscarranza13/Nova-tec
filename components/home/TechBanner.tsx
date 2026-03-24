'use client'

import { motion } from 'framer-motion'

const techs = [
  { name: 'Next.js', icon: '▲' },
  { name: 'React', icon: '⚛' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Node.js', icon: '⬡' },
  { name: 'Flutter', icon: '◆' },
  { name: 'AWS', icon: '☁' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'GraphQL', icon: '◈' },
  { name: 'Tailwind', icon: '🌊' },
]

// Duplicate for seamless loop
const items = [...techs, ...techs]

export function TechBanner() {
  return (
    <div className="py-12 relative overflow-hidden border-y border-border/30 bg-card/20">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="mb-4 text-center">
        <p className="text-xs font-semibold text-muted-foreground/50 uppercase tracking-widest">
          Tecnologías que dominamos
        </p>
      </div>

      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-8 shrink-0"
        >
          {items.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm shrink-0 hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-default"
            >
              <span className="text-lg leading-none">{tech.icon}</span>
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
