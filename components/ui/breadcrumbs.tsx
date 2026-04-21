'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { motion } from 'framer-motion'

const labels: Record<string, string> = {
  nosotros: 'Nosotros',
  servicios: 'Servicios',
  portafolio: 'Portafolio',
  planes: 'Planes',
  testimonios: 'Testimonios',
  contacto: 'Contacto',
  blog: 'Blog',
  politicas: 'Política de Privacidad',
  terminos: 'Términos y Condiciones',
  registro: 'Registro',
  login: 'Iniciar Sesión',
  'recuperar-password': 'Recuperar Contraseña',
}

export function Breadcrumbs() {
  const pathname = usePathname()
  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)
  const crumbs = [
    { label: 'Inicio', href: '/' },
    ...segments.map((seg, i) => ({
      label: labels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '),
      href: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-xs text-muted-foreground py-3"
    >
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/40" />}
          {i === 0 && <Home className="h-3 w-3" />}
          {i === crumbs.length - 1 ? (
            <span className="text-foreground font-medium">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-primary transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </motion.nav>
  )
}
