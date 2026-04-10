import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { ClientLogos } from '@/components/home/ClientLogos'
import { Stats } from '@/components/home/Stats'
import { TechBanner } from '@/components/home/TechBanner'
import { Services } from '@/components/home/Services'
import { WhyUs } from '@/components/home/WhyUs'
import { Process } from '@/components/home/Process'
import { CaseStudies } from '@/components/home/CaseStudies'
import { Portfolio } from '@/components/home/Portfolio'
import { Testimonials } from '@/components/home/Testimonials'
import { Pricing } from '@/components/home/Pricing'
import { PlanComparator } from '@/components/home/PlanComparator'
import { ROICalculator } from '@/components/home/ROICalculator'
import { BlogPreview } from '@/components/home/BlogPreview'
import { FAQ } from '@/components/home/FAQ'
import { Newsletter } from '@/components/home/Newsletter'
import { Contact } from '@/components/home/Contact'
import { MapLocation } from '@/components/home/MapLocation'
import { CTA } from '@/components/home/CTA'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { FAQSchema, ReviewSchema } from '@/components/seo/SchemaMarkup'
import { ExitIntent } from '@/components/ui/exit-intent'
import { FeedbackWidget } from '@/components/ui/feedback-widget'
import { FAQ_ITEMS } from '@/lib/constants'

export default function HomePage() {
  return (
    <>
      <FAQSchema items={FAQ_ITEMS} />
      <ReviewSchema
        itemName="NovaTec — Servicios de Desarrollo de Software"
        reviews={[
          { author: 'María González', rating: 5, text: 'NovaTec transformó completamente nuestra presencia digital.', date: '2024-03-01' },
          { author: 'Carlos Ruiz',    rating: 5, text: 'Metodología ágil y resultados excepcionales.', date: '2024-02-15' },
          { author: 'Ana Martínez',   rating: 5, text: 'El mejor partner tecnológico que hemos tenido.', date: '2024-01-20' },
        ]}
      />
      <Header />
      <main id="main-content">
        <div id="hero"><Hero /></div>
        <ClientLogos />
        <Stats />
        <TechBanner />
        <div id="servicios"><Services /></div>
        <WhyUs />
        <Process />
        <CaseStudies />
        <div id="portafolio"><Portfolio /></div>
        <div id="testimonios"><Testimonials /></div>
        <div id="planes"><Pricing /></div>
        <PlanComparator />
        <ROICalculator />
        <BlogPreview />
        <div id="faq"><FAQ /></div>
        <Newsletter />
        <div id="contacto"><Contact /></div>
        <MapLocation />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <ExitIntent />
      <FeedbackWidget />
    </>
  )
}
