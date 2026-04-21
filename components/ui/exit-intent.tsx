'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'

export function ExitIntent() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useLocalStorage('exit-intent-dismissed', false)

  useEffect(() => {
    if (dismissed) return

    let triggered = false
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !triggered) {
        triggered = true
        setTimeout(() => setShow(true), 200)
      }
    }

    // Mobile: back button / visibility change
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden' && !triggered) {
        triggered = true
        setShow(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [dismissed])

  const close = () => {
    setShow(false)
    setDismissed(true)
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[301] w-full max-w-md px-4"
          >
            <div className="rounded-3xl border border-border/60 bg-card shadow-2xl overflow-hidden">
              {/* Gradient top */}
              <div className="h-1.5 bg-gradient-to-r from-primary via-chart-2 to-primary" />

              <div className="p-8 text-center">
                <button aria-label="Cerrar popup" onClick={close}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>

                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                  <Zap className="h-8 w-8 text-primary" />
                </div>

                <h3 className="text-2xl font-bold font-heading mb-2">¡Espera un momento!</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Antes de irte, ¿sabías que ofrecemos una <span className="font-semibold text-primary">consulta gratuita</span> para tu proyecto?
                  Sin compromiso, sin costo.
                </p>

                <div className="flex flex-col gap-3">
                  <Link href="/contacto" onClick={close}>
                    <Button className="w-full gap-2 shadow-lg shadow-primary/20">
                      Quiero mi consulta gratis
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <button onClick={close} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    No gracias, ya tengo todo lo que necesito
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
