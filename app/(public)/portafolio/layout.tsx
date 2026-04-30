import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portafolio — Proyectos de Software',
  description:
    'Explora el portafolio de NovaTec: proyectos de desarrollo web, apps móviles y software a medida que han transformado negocios en Lima, Perú.',
  alternates: { canonical: '/portafolio' },
  openGraph: {
    title: 'Portafolio | NovaTec',
    description:
      'Proyectos de desarrollo web, apps móviles y software a medida. Descubre nuestro trabajo.',
    url: '/portafolio',
  },
}

export default function PortafolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
