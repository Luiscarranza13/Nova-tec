'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
      setVisible(scrollTop > 400)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const r = 16
  const circ = 2 * Math.PI * r
  const dash = (progress / 100) * circ

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          aria-label="Volver arriba"
          className="fixed bottom-24 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-card border border-border/60 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all group"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
            <circle
              cx="22" cy="22" r={r} fill="none"
              stroke="hsl(var(--primary))" strokeWidth="2"
              strokeDasharray={`${dash} ${circ}`}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>
          <ArrowUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
