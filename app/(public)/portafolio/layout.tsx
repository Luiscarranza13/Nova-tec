import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portafolio de Proyectos Web y Software en Cajamarca, Perú | NovaTec',
  description:
    'Descubre los proyectos de NovaTec: páginas web corporativas, apps móviles y software a medida que han transformado empresas en Cajamarca y todo Perú. +250 proyectos entregados.',
  keywords: [
    'portafolio desarrollo web Cajamarca',
    'proyectos de software Perú',
    'ejemplos páginas web Cajamarca',
    'NovaTec proyectos',
    'casos de éxito desarrollo software Perú',
  ],
  alternates: { canonical: '/portafolio' },
  openGraph: {
    title: 'Portafolio de Proyectos | NovaTec Cajamarca, Perú',
    description:
      '+250 proyectos de desarrollo web, apps móviles y software a medida en Cajamarca y Perú.',
    url: '/portafolio',
  },
}

export default function PortafolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
