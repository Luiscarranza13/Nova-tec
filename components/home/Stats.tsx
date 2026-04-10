'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { STATS } from '@/lib/constants'
import { TrendingUp, Users, Briefcase, Award } from 'lucide-react'

const icons = [Briefcase, Users, Award, TrendingUp]
const colors = [
  { text: 'text-blue-500',   bg: 'bg-blue-500/10',   gradient: 'from-blue-500/20 to-cyan-500/20' },
  { text: 'text-violet-500', bg: 'bg-violet-500/10', gradient: 'from-violet-500/20 to-purple-500/20' },
  { text: 'text-primary',    bg: 'bg-primary/10',    gradient: 'from-primary/20 to-indigo-500/20' },
  { text: 'text-amber-500',  bg: 'bg-amber-500/10',  gradient: 'from-amber-500/20 to-orange-500/20' },
]

function Counter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    const steps = 40
    const inc = value / steps
    let cur = 0
    const t = setInterval(() => {
      cur += inc
      if (cur >= value) { setCount(value); clearInterval(t) }
      else setCount(Math.floor(cur))
    }, 50)
    return () => clearInterval(t)
  }, [value, active])
  return <>{count}{suffix}</>
}

export function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/5" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid opacity-15" aria-hidden="true" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => {
            const Icon = icons[i]
            const color = colors[i]
            return (
              <div
                key={stat.label}
                className="group relative cursor-default"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                }}
              >
                <div className="relative rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 text-center hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden="true" />
                  <div className="relative z-10">
                    <div className={`w-11 h-11 rounded-xl ${color.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-5 w-5 ${color.text}`} aria-hidden="true" />
                    </div>
                    <div className={`text-4xl md:text-5xl font-bold font-heading ${color.text} mb-1`} aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>
                      <Counter value={stat.value} suffix={stat.suffix} active={inView} />
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
