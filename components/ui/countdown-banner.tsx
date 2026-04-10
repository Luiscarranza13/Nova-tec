'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'

interface CountdownBannerProps {
  endDate: Date
  message: string
  ctaLabel?: string
  ctaHref?: string
  storageKey?: string
}

export function CountdownBanner({
  endDate,
  message,
  ctaLabel = 'Aprovechar oferta',
  ctaHref = '/contacto',
  storageKey = 'countdown-banner',
}: CountdownBannerProps) {
  const [dismissed, setDismissed] = useLocalStorage(storageKey, false)
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const calc = () => {
      const diff = endDate.getTime() - Date.now()
      if (diff <= 0) { setExpired(true); return }
      setTimeLeft({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff % 86_400_000) / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1000),
      })
    }
    calc()
    const t = setInterval(calc, 1000)
    return () => clearInterval(t)
  }, [endDate])

  if (dismissed || expired) return null

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white"
      >
        <div className="container max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Clock className="h-4 w-4 shrink-0 animate-pulse" />
            <p className="text-sm font-medium truncate">{message}</p>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-1 shrink-0">
            {[
              { v: timeLeft.d, l: 'd' },
              { v: timeLeft.h, l: 'h' },
              { v: timeLeft.m, l: 'm' },
              { v: timeLeft.s, l: 's' },
            ].map(({ v, l }, i) => (
              <span key={l} className="flex items-center gap-0.5">
                {i > 0 && <span className="text-white/60 text-xs">:</span>}
                <span className="bg-black/20 rounded px-1.5 py-0.5 text-xs font-mono font-bold min-w-[28px] text-center">
                  {pad(v)}<span className="text-white/60 font-normal">{l}</span>
                </span>
              </span>
            ))}
          </div>

          <Link href={ctaHref}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors shrink-0">
            {ctaLabel} <ArrowRight className="h-3 w-3" />
          </Link>

          <button onClick={() => setDismissed(true)}
            className="p-1 rounded hover:bg-white/20 transition-colors shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
