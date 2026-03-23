'use client'

import { motion } from 'framer-motion'
import { Users, ListChecks, Shield, Headphones } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { WHY_US } from '@/lib/constants'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  ListChecks,
  Shield,
  Headphones,
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

export function WhyUs() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">¿POR QUÉ ELEGIRNOS?</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">
            Tu Socio de Confianza en
            <br />
            <span className="text-primary">Transformación Digital</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Nos diferencia nuestro compromiso con la excelencia y la satisfacción del cliente.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {WHY_US.map((item, index) => {
            const Icon = iconMap[item.icon] || Users
            return (
              <motion.div key={item.title} variants={itemVariants}>
                <Card className="h-full p-6 text-center group hover:border-primary/50 transition-all duration-300">
                  <div className="relative inline-flex mb-4">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold font-heading mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
