import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card } from '@/components/ui/card'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'María González',
    position: 'CEO',
    company: 'RetailMax',
    quote: 'NovaTec transformó completamente nuestra presencia digital. Su equipo entendió perfectamente nuestra visión y entregó un producto que superó nuestras expectativas.',
    rating: 5,
    avatar: 'MG',
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    position: 'Director de Tecnología',
    company: 'FinCorp',
    quote: 'Trabajar con NovaTec fue una experiencia excepcional. Su metodología ágil nos mantuvo informados en cada etapa del proyecto.',
    rating: 5,
    avatar: 'CR',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    position: 'Fundadora',
    company: 'TechStart',
    quote: 'Necesitábamos un partner tecnológico que entendiera el ritmo startup. NovaTec no solo entregó código de calidad, sino que también aportó ideas estratégicas.',
    rating: 5,
    avatar: 'AM',
  },
  {
    id: 4,
    name: 'Roberto Sánchez',
    position: 'Gerente de Operaciones',
    company: 'FastShip',
    quote: 'La aplicación de logística que desarrolló NovaTec optimizó nuestras operaciones en un 40%. Su equipo técnico es de primer nivel.',
    rating: 5,
    avatar: 'RS',
  },
]

export const metadata = {
  title: 'Testimonios',
  description: 'Lo que dicen nuestros clientes sobre nuestro trabajo.',
}

export default function TestimoniosPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="py-24">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Lo que Dicen <span className="text-primary">Nuestros Clientes</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                La satisfacción de nuestros clientes es nuestro mayor logro.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="h-full p-6 relative">
                  <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-yellow-500 text-yellow-500"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <blockquote className="text-muted-foreground mb-6 relative z-10">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.position} @ {testimonial.company}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
