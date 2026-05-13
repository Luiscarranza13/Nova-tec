import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios de Desarrollo Web, Apps y Software a Medida en Cajamarca, Perú',
  description:
    'NovaTec ofrece desarrollo web profesional, aplicaciones móviles iOS/Android, software a medida, diseño UI/UX y consultoría tecnológica en Cajamarca, Perú. Cotiza gratis.',
  keywords: [
    'servicios de desarrollo web Cajamarca',
    'desarrollo de software a medida Perú',
    'aplicaciones móviles Cajamarca',
    'diseño web profesional Perú',
    'consultoría tecnológica Cajamarca',
    'agencia digital Cajamarca',
    'NovaTec servicios',
  ],
  alternates: { canonical: '/servicios' },
  openGraph: {
    title: 'Servicios de Desarrollo Web y Software | NovaTec Cajamarca',
    description:
      'Desarrollo web, apps móviles, software a medida, diseño UI/UX y consultoría tecnológica en Cajamarca, Perú. Cotiza gratis con NovaTec.',
    url: '/servicios',
  },
}

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
