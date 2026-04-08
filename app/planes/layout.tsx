import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Planes y Precios — Desarrollo de Software',
  description:
    'Conoce los planes y precios de NovaTec para desarrollo web, apps móviles y software a medida. Pago único, sin mensualidades, con soporte incluido.',
  alternates: { canonical: '/planes' },
  openGraph: {
    title: 'Planes y Precios | NovaTec',
    description:
      'Planes de desarrollo de software con pago único. Starter, Professional y Enterprise.',
    url: '/planes',
  },
}

export default function PlanesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
