'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PRICING_PLANS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

export function Pricing() {
  return (
    <section id="planes" className="py-24">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">PLANES Y PRECIOS</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">
            Inversión que
            <br />
            <span className="text-primary">Genera Retorno</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Planes diseñados para adaptarse a las necesidades de tu negocio.
            Contactános para una cotización personalizada.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`h-full p-8 relative ${
                  plan.popular
                    ? 'border-primary shadow-lg shadow-primary/20'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                      Más Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold font-heading">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
                </div>
                
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold font-heading">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-muted-foreground text-sm"> MXN</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          ¿Necesitas un proyecto personalizado?{' '}
          <a href="/contacto" className="text-primary hover:underline">
            Contáctanos
          </a>
        </motion.p>
      </div>
    </section>
  )
}
