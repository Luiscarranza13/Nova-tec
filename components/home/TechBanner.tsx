'use client'

import { motion } from 'framer-motion'

const techs = [
  { name: 'Next.js', color: 'hover:text-white hover:border-white/30' },
  { name: 'React', color: 'hover:text-cyan-400 hover:border-cyan-400/30' },
  { name: 'TypeScript', color: 'hover:text-blue-400 hover:border-blue-400/30' },
  { name: 'Node.js', color: 'hover:text-green-400 hover:border-green-400/30' },
  { name: 'Flutter', color: 'hover:text-sky-400 hover:border-sky-400/30' },
  { name: 'AWS', color: 'hover:text-amber-400 hover:border-amber-400/30' },
  { name: 'PostgreSQL', color: 'hover:text-blue-300 hover:border-blue-300/30' },
  { name: 'Docker', color: 'hover:text-sky-300 hover:border-sky-300/30' },
  { name: 'GraphQL', color: 'hover:text-pink-400 hover:border-pink-400/30' },
  { name: 'Tailwind CSS', color: 'hover:text-teal-400 hover:border-teal-400/30' },
  { name: 'Supabase', color: 'hover:text-emerald-400 hover:border-emerald-400/30' },
  { name: 'Vercel', color: 'hover:text-white hover:border-white/30' },
]

const items = [...techs, ...techs]

export function TechBanner() {
  return (
    <div className="py-10 relative overflow-hidden border-y border-border/20 bg-card/10">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <p className="text-center text-[11px] font-semibold text-muted-foreground/40 uppercase tracking-[0.2em] mb-6">
        Stack tecnológico
      </p>

      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="flex gap-3 shrink-0"
        >
          {items.map((tech, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-card/40 backdrop-blur-sm shrink-0 text-muted-foreground/60 text-sm font-medium transition-all duration-200 cursor-default ${tech.color}`}
            >
              <span>{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
