import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { FAQSchema, ReviewSchema } from '@/components/seo/SchemaMarkup'
import { FAQ_ITEMS } from '@/lib/constants'

// Above-the-fold: load immediately
import { ClientLogos } from '@/components/home/ClientLogos'
import { Stats } from '@/components/home/Stats'
import { TechBanner } from '@/components/home/TechBanner'
import { Services } from '@/components/home/Services'

// Below-the-fold: lazy load to reduce initial JS bundle
const WhyUs        = dynamic(() => import('@/components/home/WhyUs').then(m => ({ default: m.WhyUs })))
const Process      = dynamic(() => import('@/components/home/Process').then(m => ({ default: m.Process })))
const CaseStudies  = dynamic(() => import('@/components/home/CaseStudies').then(m => ({ default: m.CaseStudies })))
const Portfolio    = dynamic(() => import('@/components/home/Portfolio').then(m => ({ default: m.Portfolio })))
const Testimonials = dynamic(() => import('@/components/home/Testimonials').then(m => ({ default: m.Testimonials })))
const Pricing      = dynamic(() => import('@/components/home/Pricing').then(m => ({ default: m.Pricing })))
const PlanComparator = dynamic(() => import('@/components/home/PlanComparator').then(m => ({ default: m.PlanComparator })))
const ROICalculator  = dynamic(() => import('@/components/home/ROICalculator').then(m => ({ default: m.ROICalculator })))
const BlogPreview  = dynamic(() => import('@/components/home/BlogPreview').then(m => ({ default: m.BlogPreview })))
const FAQ          = dynamic(() => import('@/components/home/FAQ').then(m => ({ default: m.FAQ })))
const Newsletter   = dynamic(() => import('@/components/home/Newsletter').then(m => ({ default: m.Newsletter })))
const Contact      = dynamic(() => import('@/components/home/Contact').then(m => ({ default: m.Contact })))
const MapLocation  = dynamic(() => import('@/components/home/MapLocation').then(m => ({ default: m.MapLocation })))
const CTA          = dynamic(() => import('@/components/home/CTA').then(m => ({ default: m.CTA })))
const WhatsAppButton = dynamic(() => import('@/components/ui/whatsapp-button').then(m => ({ default: m.WhatsAppButton })), { ssr: false })
const ScrollToTop  = dynamic(() => import('@/components/ui/scroll-to-top').then(m => ({ default: m.ScrollToTop })), { ssr: false })
const ExitIntent   = dynamic(() => import('@/components/ui/exit-intent').then(m => ({ default: m.ExitIntent })), { ssr: false })
const FeedbackWidget = dynamic(() => import('@/components/ui/feedback-widget').then(m => ({ default: m.FeedbackWidget })), { ssr: false })

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
