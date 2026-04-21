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
    <section ref={ref} className="py-24 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-50/50" />
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
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
                className="group relative"
              >
                <div className={`relative rounded-3xl border border-slate-100 bg-white p-6 md:p-10 text-center hover:border-primary/20 hover:shadow-2xl transition-all duration-500`}>
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${color.bg} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className={`h-6 w-6 md:h-8 md:w-8 ${color.text}`} />
                  </div>

                  <div className={`text-4xl md:text-6xl font-bold font-heading text-slate-900 mb-2`}>
                    <Counter value={stat.value} suffix={stat.suffix} active={inView} />
                  </div>

                  <p className="text-sm md:text-base font-medium text-slate-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
