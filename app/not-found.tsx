import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative z-10 max-w-md">
        <p className="text-8xl font-bold font-heading text-gradient mb-4">404</p>
        <h1 className="text-2xl font-bold font-heading mb-3">Página no encontrada</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          La página que buscas no existe o fue movida. Vuelve al inicio y sigue explorando.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
