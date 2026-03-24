import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios — Desarrollo Web, Móvil y Software a Medida',
  description:
    'Descubre todos los servicios de NovaTec: desarrollo web, apps móviles, software a medida, diseño UI/UX, soluciones cloud y consultoría tecnológica en Cajamarca, Perú.',
  alternates: { canonical: '/servicios' },
  openGraph: {
    title: 'Servicios | NovaTec',
    description:
      'Desarrollo web, apps móviles, software a medida, diseño UI/UX y más. Soluciones tecnológicas premium en Lima, Perú.',
    url: '/servicios',
  },
}

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
