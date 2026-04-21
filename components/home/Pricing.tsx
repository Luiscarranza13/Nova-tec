'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PRICING_PLANS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

export function Pricing() {
  return (
    <section id="planes" className="py-16 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/40 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Planes y Precios
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold font-heading leading-tight mb-4">
            Inversión que
            <br />
            <span className="text-gradient">genera retorno</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Planes diseñados para adaptarse a las necesidades de tu negocio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-5 lg:p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-primary/10 to-primary/5 border-2 border-primary/40 shadow-xl shadow-primary/10 scale-[1.02]'
                  : 'border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/20 hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-chart-2 text-white text-xs font-semibold shadow-lg">
                    <Sparkles className="h-3 w-3" />
                    Más Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl lg:text-4xl font-bold font-heading">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-sm text-muted-foreground">PEN</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.popular ? 'bg-primary/20' : 'bg-muted'}`}>
                      <Check className={`h-3 w-3 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contacto">
                <Button
                  className="w-full group"
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm mt-10"
        >
          ¿Necesitas un proyecto personalizado?{' '}
          <Link href="/contacto" className="text-primary hover:underline font-medium">
            Contáctanos para una cotización
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
