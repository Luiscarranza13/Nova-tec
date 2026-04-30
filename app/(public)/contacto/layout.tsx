import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto — Escríbenos por WhatsApp',
  description:
    'Contáctanos por WhatsApp al +51 918 146 783 o escríbenos a NovaTec.Empresarial@gmail.com. Respondemos en minutos. NovaTec, desarrollo de software en Senati Cajamarca, Perú.',
  alternates: { canonical: '/contacto' },
  openGraph: {
    title: 'Contacto | NovaTec',
    description:
      'Escríbenos por WhatsApp y recibe respuesta en minutos. Primera consulta gratis.',
    url: '/contacto',
  },
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
