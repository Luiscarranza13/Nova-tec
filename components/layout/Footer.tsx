import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone, ArrowRight, Clock, ExternalLink } from 'lucide-react'
import { NAV_ITEMS, SERVICES } from '@/lib/constants'

const socials = [
  { name: 'Twitter / X', href: '#', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { name: 'GitHub', href: '#', path: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z' },
  { name: 'LinkedIn', href: '#', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { name: 'Instagram', href: '#', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
]

const legal = [
  { label: 'Política de Privacidad', href: '/politicas' },
  { label: 'Términos y Condiciones', href: '/terminos' },
  { label: 'Cookies', href: '/politicas#cookies' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-chart-2/5 rounded-full blur-[100px]" />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Top CTA strip */}
        <div className="py-10 border-b border-border/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-lg font-bold font-heading">¿Tienes un proyecto en mente?</p>
            <p className="text-sm text-muted-foreground mt-0.5">Hablemos y hagámoslo realidad juntos.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/contacto"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Iniciar Proyecto
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://wa.me/51918146783" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/60 bg-card text-sm font-semibold hover:border-primary/30 hover:bg-primary/5 transition-colors">
              <ExternalLink className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <Image src="/logo.svg" alt="NovaTec" width={40} height={40}
                className="group-hover:scale-105 transition-transform duration-200" />
              <span className="text-xl font-bold font-heading">
                Nova<span className="text-gradient">Tec</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Transformamos Ideas en Software Excepcional. Somos tu socio estratégico en tecnología,
              creando soluciones innovadoras que impulsan el crecimiento de tu negocio.
            </p>

            {/* Socials */}
            <div className="flex gap-2">
              {socials.map((s) => (
                <a key={s.name} href={s.href}
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 hover:scale-110"
                  aria-label={`Síguenos en ${s.name}`}
                  rel="noopener noreferrer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Disponibles para nuevos proyectos
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-semibold text-sm mb-5">Navegación</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm mb-5">Servicios</h3>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={`/servicios#${s.id}`}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-5">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Senati Cajamarca, Perú</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="https://wa.me/51918146783" target="_blank" rel="noopener noreferrer"
                  className="hover:text-primary transition-colors">+51 918 146 783</a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:NovaTec.Empresarial@gmail.com"
                  className="hover:text-primary transition-colors break-all">NovaTec.Empresarial@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span>Lun–Vie, 9:00–18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/40 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © {year} NovaTec. Todos los derechos reservados. Hecho con ❤️ en Cajamarca, Perú.
          </p>
          <div className="flex gap-5">
            {legal.map((l) => (
              <Link key={l.href} href={l.href}
                className="text-muted-foreground text-xs hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
