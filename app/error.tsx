'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('App error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold font-heading mb-2">Algo salió mal</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Ocurrió un error inesperado. Puedes intentar recargar la página o volver al inicio.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground/50 font-mono mb-6">ID: {error.digest}</p>
        )}
        <div className="flex gap-3 justify-center">
          <Button onClick={reset} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" /> Reintentar
          </Button>
          <Link href="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" /> Ir al inicio
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
