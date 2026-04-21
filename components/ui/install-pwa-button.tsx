'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Smartphone, Star, Zap, Wifi } from 'lucide-react'
import Image from 'next/image'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [installing, setInstalling] = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    // No mostrar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) return

    // No mostrar si ya fue descartada recientemente
    const dismissed = localStorage.getItem('pwa-banner-dismissed')
    if (dismissed) {
      const dismissedAt = parseInt(dismissed)
      const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24)
      if (daysSince < 7) return // No mostrar por 7 días
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Mostrar banner después de 3 segundos
      setTimeout(() => setShowBanner(true), 3000)
    }

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => {
      setInstalled(true)
      setShowBanner(false)
    })

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    setInstalling(true)
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setInstalled(true)
      setShowBanner(false)
    }
    setInstalling(false)
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowBanner(false)
    localStorage.setItem('pwa-banner-dismissed', Date.now().toString())
  }

  if (!showBanner || installed) return null

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-3 right-3 z-50 md:left-auto md:right-6 md:bottom-6 md:w-[360px]"
        >
          <div className="relative rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">
            {/* Gradient top bar */}
            <div className="h-1 w-full bg-gradient-to-r from-primary via-chart-2 to-primary bg-[length:200%_100%] animate-gradient" />

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="p-5">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-border/50 bg-background flex items-center justify-center">
                    <Image src="/logo.svg" alt="NovaTec" width={36} height={36} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Download className="h-2.5 w-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight">Instalar NovaTec</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Acceso rápido desde tu pantalla</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { icon: Zap, label: 'Más rápido', color: 'text-amber-500 bg-amber-500/10' },
                  { icon: Wifi, label: 'Sin internet', color: 'text-blue-500 bg-blue-500/10' },
                  { icon: Star, label: 'Sin ads', color: 'text-violet-500 bg-violet-500/10' },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-muted/30">
                    <div className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium">{label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={handleInstall}
                disabled={installing}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-primary to-chart-2 text-white text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:opacity-95 transition-all disabled:opacity-70"
              >
                {installing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Instalando...
                  </>
                ) : (
                  <>
                    <Smartphone className="h-4 w-4" />
                    Agregar a pantalla de inicio
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-muted-foreground/60 mt-2">
                Gratis · Sin descargas · Funciona offline
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
