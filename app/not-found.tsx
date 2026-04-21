import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-32 px-4">
        <div className="text-center max-w-lg">
          {/* 404 visual */}
          <div className="relative mb-8">
            <p className="text-[120px] md:text-[160px] font-bold font-heading leading-none text-gradient opacity-20 select-none">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Search className="h-12 w-12 text-primary/60" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold font-heading mb-3">Página no encontrada</h1>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            La página que buscas no existe o fue movida. Verifica la URL o regresa al inicio.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                <Home className="h-5 w-5" /> Ir al inicio
              </Button>
            </Link>
            <Link href="/contacto">
              <Button size="lg" variant="outline" className="gap-2">
                <ArrowLeft className="h-5 w-5" /> Contactar soporte
              </Button>
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-12 pt-8 border-t border-border/40">
            <p className="text-sm text-muted-foreground mb-4">Quizás buscabas:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: 'Servicios', href: '/servicios' },
                { label: 'Portafolio', href: '/portafolio' },
                { label: 'Planes', href: '/planes' },
                { label: 'Blog', href: '/blog' },
                { label: 'Nosotros', href: '/nosotros' },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="px-4 py-2 rounded-xl border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
