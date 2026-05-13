import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Planes y Precios de Desarrollo Web y Software en Perú | NovaTec',
  description:
    'Planes de desarrollo web y software a medida en Cajamarca, Perú. Pago único sin mensualidades. Starter desde S/ 1,500, Professional y Enterprise. Soporte incluido. Cotiza gratis.',
  keywords: [
    'precios desarrollo web Perú',
    'planes de software Cajamarca',
    'cuánto cuesta una página web Perú',
    'precio app móvil Perú',
    'NovaTec planes precios',
  ],
  alternates: { canonical: '/planes' },
  openGraph: {
    title: 'Planes y Precios de Desarrollo Web | NovaTec Cajamarca',
    description:
      'Planes de desarrollo web y software con pago único en Cajamarca, Perú. Sin mensualidades, con soporte incluido.',
    url: '/planes',
  },
}

export default function PlanesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
