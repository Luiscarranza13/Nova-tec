import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto — Agencia de Software en Cajamarca, Perú | NovaTec',
  description:
    'Contáctanos por WhatsApp al +51 918 146 783. Somos NovaTec, agencia de desarrollo de software en Cajamarca, Perú. Respondemos en minutos. Primera consulta gratis.',
  keywords: [
    'contacto agencia software Cajamarca',
    'contratar desarrolladores web Perú',
    'cotizar página web Cajamarca',
    'NovaTec contacto WhatsApp',
    'agencia digital Cajamarca contacto',
  ],
  alternates: { canonical: '/contacto' },
  openGraph: {
    title: 'Contacto | NovaTec — Agencia de Software en Cajamarca',
    description:
      'Escríbenos por WhatsApp y recibe respuesta en minutos. Primera consulta gratis. NovaTec, Cajamarca, Perú.',
    url: '/contacto',
  },
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
