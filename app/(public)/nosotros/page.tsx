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
  title: 'Nosotros — Equipo y Misión',
  description: 'Conoce al equipo de NovaTec: nuestra misión, visión, historia, valores y los profesionales detrás de cada proyecto de software en Lima, Perú.',
  alternates: { canonical: '/nosotros' },
  openGraph: {
    title: 'Nosotros | NovaTec',
    description: 'Conoce al equipo de NovaTec: misión, visión, historia y valores.',
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
