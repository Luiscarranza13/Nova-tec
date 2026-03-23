'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Card } from '@/components/ui/card'

const testimonials = [
  {
    id: 1,
    name: 'María González',
    position: 'CEO',
    company: 'RetailMax',
    quote: 'NovaTec transformó completamente nuestra presencia digital. Su equipo entendió perfectamente nuestra visión y entregó un producto que superó nuestras expectativas. El equipo fue profesional, comunicativo y siempre buscó la excelencia.',
    rating: 5,
    avatar: 'MG',
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    position: 'Director de Tecnología',
    company: 'FinCorp',
    quote: 'Trabajar con NovaTec fue una experiencia excepcional. Su metodología ágil nos mantuvo informados en cada etapa del proyecto. La aplicación de banca que desarrollaron ha recibido elogios de nuestros usuarios.',
    rating: 5,
    avatar: 'CR',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    position: 'Fundadora',
    company: 'TechStart',
    quote: 'Necesitábamos un partner tecnológico que entendiera el ritmo startup. NovaTec no solo entregó código de calidad, sino que también aportó ideas estratégicas que mejoraron nuestro producto final.',
    rating: 5,
    avatar: 'AM',
  },
  {
    id: 4,
    name: 'Roberto Sánchez',
    position: 'Gerente de Operaciones',
    company: 'FastShip',
    quote: 'La aplicación de logística que desarrolló NovaTec optimizó nuestras operaciones en un 40%. Su equipo técnico es de primer nivel y el soporte post-lanzamiento ha sido excelente.',
    rating: 5,
    avatar: 'RS',
  },
]

export function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-card/50">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">TESTIMONIOS</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">
            Lo que Dicen
            <br />
            <span className="text-primary">Nuestros Clientes</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestro mayor logro.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6 relative">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
