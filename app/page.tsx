import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { Services } from '@/components/home/Services'
import { WhyUs } from '@/components/home/WhyUs'
import { Process } from '@/components/home/Process'
import { Stats } from '@/components/home/Stats'
import { Portfolio } from '@/components/home/Portfolio'
import { Testimonials } from '@/components/home/Testimonials'
import { Pricing } from '@/components/home/Pricing'
import { Contact } from '@/components/home/Contact'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Stats />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
