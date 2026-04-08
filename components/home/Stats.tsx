'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '@/lib/constants'
import { TrendingUp, Users, Briefcase, Award } from 'lucide-react'

const icons = [Briefcase, Users, Award, TrendingUp]
const colors = [
  { text: 'text-blue-500', bg: 'bg-blue-500/10', glow: 'shadow-blue-500/20', gradient: 'from-blue-500/20 to-cyan-500/20' },
  { text: 'text-violet-500', bg: 'bg-violet-500/10', glow: 'shadow-violet-500/20', gradient: 'from-violet-500/20 to-purple-500/20' },
  { text: 'text-primary', bg: 'bg-primary/10', glow: 'shadow-primary/20', gradient: 'from-primary/20 to-indigo-500/20' },
  { text: 'text-amber-500', bg: 'bg-amber-500/10', glow: 'shadow-amber-500/20', gradient: 'from-amber-500/20 to-orange-500/20' },
]

function Counter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value, active])

  return <>{count}{suffix}</>
}

export function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/5" />
      <div className="absolute inset-0 bg-grid opacity-15" />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-1/4 w-[400px] h-[200px] bg-primary/8 rounded-full blur-[80px] pointer-events-none"
      />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, index) => {
            const Icon = icons[index]
            const color = colors[index]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative cursor-default"
              >
                {/* Card */}
                <div className={`relative rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 text-center hover:border-primary/30 hover:shadow-xl ${color.glow} transition-all duration-300 overflow-hidden`}>
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className={`w-11 h-11 rounded-xl ${color.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-5 w-5 ${color.text}`} />
                    </div>

                    <div className={`text-4xl md:text-5xl font-bold font-heading ${color.text} mb-1`}>
                      <Counter value={stat.value} suffix={stat.suffix} active={inView} />
                    </div>

                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
