import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { NosotrosHero } from '@/components/nosotros/NosotrosHero'
import { MisionVision } from '@/components/nosotros/MisionVision'
import { Historia } from '@/components/nosotros/Historia'
import { Valores } from '@/components/nosotros/Valores'
import { Equipo } from '@/components/nosotros/Equipo'
import { TechStack } from '@/components/nosotros/TechStack'
import { CTA } from '@/components/home/CTA'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import { ScrollToTop } from '@/components/ui/scroll-to-top'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros — Equipo de Desarrollo de Software en Cajamarca, Perú',
  description:
    'Conoce al equipo de NovaTec: agencia de desarrollo de software en Cajamarca, Perú. Nuestra misión, visión, historia, valores y los profesionales detrás de cada proyecto.',
  keywords: [
    'equipo desarrollo software Cajamarca',
    'NovaTec quiénes somos',
    'agencia tecnológica Cajamarca',
    'empresa de software Perú',
  ],
  alternates: { canonical: '/nosotros' },
  openGraph: {
    title: 'Nosotros | NovaTec — Agencia de Software en Cajamarca',
    description:
      'Conoce al equipo de NovaTec en Cajamarca, Perú: misión, visión, historia y valores.',
    url: '/nosotros',
  },
}

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main>
        <NosotrosHero />
        <MisionVision />
        <Historia />
        <Valores />
        <Equipo />
        <TechStack />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  )
}
