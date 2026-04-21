'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/lib/store'
import Link from 'next/link'

export function CookieConsent() {
  const { cookiesAccepted, acceptCookies, rejectCookies } = useUIStore()

  return (
    <AnimatePresence>
      {cookiesAccepted === null && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.4, delay: 2 }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[150]"
        >
          <div className="rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/20 p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Cookie className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Usamos cookies 🍪</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {' '}<Link href="/politicas#cookies" className="text-primary hover:underline">Más información <span className="sr-only">sobre nuestras cookies legales</span></Link>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={acceptCookies} className="flex-1 h-9 text-xs rounded-xl">
                Aceptar todas
              </Button>
              <Button size="sm" variant="outline" onClick={rejectCookies} className="flex-1 h-9 text-xs rounded-xl">
                Solo esenciales
              </Button>
              <Button size="sm" variant="ghost" onClick={rejectCookies} className="h-9 w-9 p-0 rounded-xl" aria-label="Cerrar">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
