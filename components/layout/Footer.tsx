import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react'
import { NAV_ITEMS, SERVICES } from '@/lib/constants'

const socials = [
  {
    name: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/novatec.ink',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    name: 'TikTok',
    href: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@nova.tec56',
    icon: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z',
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[250px] bg-primary/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-chart-2/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container py-12 md:py-16 relative z-10">

        {/*
          Responsive grid:
          - Mobile  (< 640px)  : 1 col  — all sections stacked
          - Tablet  (640-1023px): 2 cols — brand spans 2 cols (full row), then links+services+contact as 2+1
          - Desktop (≥ 1024px) : 5 cols — brand takes 2, others 1 each
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">

          {/* ── Brand: full on mobile, full on tablet row 1, 2/5 on desktop ── */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <Image
                src="/logo.svg"
                alt="NovaTec"
                width={40}
                height={40}
                className="group-hover:scale-105 transition-transform duration-200"
              />
              <span className="text-xl font-bold font-heading">
                Nova<span className="text-gradient">Tec</span>
              </span>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Transformamos ideas en software excepcional. Tu socio estratégico en
              tecnología, creando soluciones que impulsan el crecimiento de tu negocio.
            </p>

            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/30 hover:shadow-sm transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-900 mb-4">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="h-3 w-3 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-900 mb-4">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/servicios#${service.id}`}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="h-3 w-3 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact: spans 2 on tablet so email fits, 1 on desktop ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-900 mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Senati Cajamarca, Perú</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="https://wa.me/51918146783"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +51 918 146 783
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <a
                  href="mailto:NovaTec.Empresarial@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  NovaTec.Empresarial<wbr />@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-slate-100 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-slate-400 text-xs order-2 sm:order-1">
            © {currentYear} NovaTec. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 order-1 sm:order-2">
            <Link href="/politicas" className="text-slate-400 text-xs hover:text-primary transition-colors whitespace-nowrap">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-slate-400 text-xs hover:text-primary transition-colors whitespace-nowrap">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
