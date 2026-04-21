'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lightbulb } from 'lucide-react'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'

interface OnboardingTooltipProps {
  id: string
  title: string
  description: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  children: React.ReactNode
}

export function OnboardingTooltip({
  id, title, description, position = 'bottom', delay = 1000, children,
}: OnboardingTooltipProps) {
  const [seen, setSeen] = useLocalStorage(`tooltip-${id}`, false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (seen) return
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [seen, delay])

  const dismiss = () => { setVisible(false); setSeen(true) }

  const posClasses = {
    top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left:   'right-full top-1/2 -translate-y-1/2 mr-2',
    right:  'left-full top-1/2 -translate-y-1/2 ml-2',
  }[position]

  return (
    <div className="relative inline-block">
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute z-50 w-64 ${posClasses}`}
          >
            <div className="rounded-xl border border-primary/30 bg-card/95 backdrop-blur-xl shadow-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Lightbulb className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold mb-0.5">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
                </div>
                <button onClick={dismiss} className="text-muted-foreground hover:text-foreground shrink-0">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-3 flex justify-end">
                <button onClick={dismiss} className="text-xs text-primary font-medium hover:underline">
                  Entendido
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
