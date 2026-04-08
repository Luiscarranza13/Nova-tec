import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testimonios — Clientes Satisfechos',
  description:
    'Lee lo que dicen nuestros clientes sobre NovaTec. Más de 120 empresas confían en nosotros para sus proyectos de desarrollo de software en Lima, Perú.',
  alternates: { canonical: '/testimonios' },
  openGraph: {
    title: 'Testimonios | NovaTec',
    description:
      'Más de 120 clientes satisfechos. Descubre por qué confían en NovaTec para sus proyectos tecnológicos.',
    url: '/testimonios',
  },
}

export default function TestimoniosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
