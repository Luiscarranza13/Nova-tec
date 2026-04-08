'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '@/lib/constants'
import { TrendingUp, Users, Briefcase, Award } from 'lucide-react'

const icons = [Briefcase, Users, Award, TrendingUp]
const iconColors = [
  'text-blue-400 bg-blue-500/10 group-hover:bg-blue-500/20',
  'text-violet-400 bg-violet-500/10 group-hover:bg-violet-500/20',
  'text-amber-400 bg-amber-500/10 group-hover:bg-amber-500/20',
  'text-emerald-400 bg-emerald-500/10 group-hover:bg-emerald-500/20',
]
const glowColors = [
  'group-hover:shadow-[0_0_30px_hsl(217_91%_60%/0.12)]',
  'group-hover:shadow-[0_0_30px_hsl(263_70%_50%/0.12)]',
  'group-hover:shadow-[0_0_30px_hsl(38_92%_50%/0.12)]',
  'group-hover:shadow-[0_0_30px_hsl(160_84%_39%/0.12)]',
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
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/5" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS.map((stat, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative group rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 text-center hover:border-primary/20 transition-all duration-300 ${glowColors[index]}`}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 ${iconColors[index]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-4xl md:text-5xl font-bold font-heading text-gradient mb-1 tabular-nums">
                  <Counter value={stat.value} suffix={stat.suffix} active={inView} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
