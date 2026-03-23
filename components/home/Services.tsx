'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, Smartphone, Code, Palette, Cloud, Lightbulb } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/constants'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Smartphone,
  Code,
  Palette,
  Cloud,
  Lightbulb,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Services() {
  return (
    <section id="servicios" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">NUESTROS SERVICIOS</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">
            Soluciones Tecnológicas
            <br />
            <span className="text-primary">Completas para tu Negocio</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Ofrecemos un amplio espectro de servicios de desarrollo de software
            adaptados a las necesidades específicas de tu empresa.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] || Code
            return (
              <motion.div key={service.id} variants={itemVariants}>
                <Card className="group h-full p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold font-heading mb-3">
                    {service.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={`/servicios#${service.id}`} className="inline-flex items-center text-primary font-medium text-sm hover:underline">
                    Más información
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/servicios">
            <Button variant="outline" size="lg">
              Ver Todos los Servicios
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
