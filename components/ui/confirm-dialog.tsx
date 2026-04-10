'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => Promise<void> | void
  title?: string
  description?: string
  confirmLabel?: string
  variant?: 'danger' | 'warning' | 'default'
}

export function ConfirmDialog({
  open, onClose, onConfirm,
  title = '¿Estás seguro?',
  description = 'Esta acción no se puede deshacer.',
  confirmLabel = 'Confirmar',
  variant = 'danger',
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false)

  const handle = async () => {
    setLoading(true)
    try { await onConfirm() }
    finally { setLoading(false); onClose() }
  }

  const colors = {
    danger:  { icon: 'bg-red-100 text-red-600',    btn: 'bg-red-600 hover:bg-red-700 text-white' },
    warning: { icon: 'bg-amber-100 text-amber-600', btn: 'bg-amber-600 hover:bg-amber-700 text-white' },
    default: { icon: 'bg-primary/10 text-primary',  btn: 'bg-primary hover:bg-primary/90 text-primary-foreground' },
  }[variant]

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-full max-w-sm px-4"
          >
            <div className="rounded-2xl border border-border/60 bg-card shadow-2xl p-6">
              <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center mb-4`}>
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{description}</p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} className="flex-1" disabled={loading}>
                  Cancelar
                </Button>
                <button
                  onClick={handle}
                  disabled={loading}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${colors.btn} disabled:opacity-60`}
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? 'Procesando...' : confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
