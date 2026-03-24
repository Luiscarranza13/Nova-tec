'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative z-10 max-w-md">
        <p className="text-6xl font-bold font-heading text-destructive mb-4">¡Oops!</p>
        <h2 className="text-2xl font-bold font-heading mb-3">Algo salió mal</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Ocurrió un error inesperado. Intenta recargar la página.
        </p>
        <Button onClick={reset} className="shadow-lg shadow-primary/20">
          Intentar de nuevo
        </Button>
      </div>
    </div>
  )
}
