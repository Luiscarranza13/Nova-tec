'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useAnalytics } from '@/lib/hooks/use-analytics'

const WHATSAPP = '51918146783'
const MSG = encodeURIComponent('¡Hola! 👋 Me interesa conocer más sobre sus servicios. ¿Podrían ayudarme?')

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [tooltip, setTooltip] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const { trackWhatsApp } = useAnalytics()

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000)
    const t2 = setTimeout(() => setTooltip(true), 5000)
    const t3 = setTimeout(() => setTooltip(false), 10000)
    return () => { clearTimeout(t); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && !dismissed && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                className="relative bg-card border border-border/60 rounded-2xl shadow-xl p-4 max-w-[220px]"
              >
                <button
                  onClick={() => setDismissed(true)}
                  aria-label="Cerrar tooltip"
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-muted/80"
                >
                  <X className="h-3 w-3 text-muted-foreground" />
                </button>
                <p className="text-xs font-semibold mb-0.5">¿Tienes alguna duda?</p>
                <p className="text-xs text-muted-foreground">Escríbenos por WhatsApp, respondemos en minutos.</p>
                {/* Arrow */}
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-card border-r border-b border-border/60 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.a
            href={`https://wa.me/${WHATSAPP}?text=${MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsApp('floating-button')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 flex items-center justify-center hover:shadow-xl hover:shadow-[#25D366]/50 transition-shadow"
            aria-label="Contactar por WhatsApp"
          >
            {/* Ping */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
            <MessageCircle className="h-7 w-7 text-white relative z-10" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
