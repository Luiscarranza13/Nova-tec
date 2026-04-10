'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useUIStore } from '@/lib/store'

export function AnnouncementBanner() {
  const { bannerDismissed, dismissBanner } = useUIStore()

  return (
    <AnimatePresence>
      {!bannerDismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
          style={{ contain: 'layout' }}
        >
          <div className="bg-gradient-to-r from-primary via-violet-600 to-chart-2 text-white text-sm py-2.5 px-4 relative">
            <div className="container max-w-7xl mx-auto flex items-center justify-center gap-3">
              <Sparkles className="h-3.5 w-3.5 shrink-0 animate-pulse" />
              <p className="text-center">
                <span className="font-semibold">¡Consulta gratuita disponible!</span>
                {' '}Agenda una reunión y recibe un análisis de tu proyecto sin costo.
              </p>
              <Link
                href="/contacto"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold underline underline-offset-2 hover:no-underline whitespace-nowrap"
              >
                Agendar ahora <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <button
              onClick={dismissBanner}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/20 transition-colors"
              aria-label="Cerrar anuncio"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
