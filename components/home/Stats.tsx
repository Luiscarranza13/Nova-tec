'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { STATS } from '@/lib/constants'
import { TrendingUp, Users, Briefcase, Award } from 'lucide-react'

// Lazy load Framer Motion
const motion = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion })), { ssr: false })
const useInView = dynamic(() => import('framer-motion').then(mod => ({ default: mod.useInView })), { ssr: false }) as any

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
    <section ref={ref} className="home-section">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-chart-2/3" />
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
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
                <div className={`relative rounded-2xl border border-slate-200 bg-white shadow-sm p-4 md:p-6 text-center hover:border-primary/30 hover:shadow-xl ${color.glow} transition-all duration-300 overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className={`w-9 h-9 lg:w-11 lg:h-11 rounded-xl ${color.bg} flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-4 w-4 lg:h-5 lg:w-5 ${color.text}`} />
                    </div>

                    <div className={`text-2xl sm:text-3xl lg:text-5xl font-bold font-heading ${color.text} mb-1`}>
                      <Counter value={stat.value} suffix={stat.suffix} active={inView} />
                    </div>

                    <p className="text-xs lg:text-sm text-muted-foreground">{stat.label}</p>
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