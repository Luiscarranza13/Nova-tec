'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PRICING_PLANS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

export function Pricing() {
  return (
    <section id="planes" className="home-section">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Planes y Precios
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading leading-tight mb-3">
            Inversión que{' '}
            <span className="text-gradient">genera retorno</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Planes diseñados para adaptarse a las necesidades de tu negocio.
          </p>
        </motion.div>

        {/*
          Cards grid:
          - Mobile (< 640px): 1 column, stacked
          - Tablet (≥ 640px): 3 columns side-by-side, all equal width
          - The popular badge lives INSIDE the card as the first element (no absolute positioning)
            so it doesn't affect alignment between cards
        */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-primary/10 to-primary/5 border-2 border-primary/40 shadow-xl shadow-primary/10'
                  : 'border border-slate-200 bg-white shadow-sm hover:border-primary/20 hover:shadow-lg'
              }`}
            >
              {/* Badge row — always rendered, hidden when not popular, keeps card height equal */}
              <div className="flex justify-center mb-4 h-7">
                {plan.popular && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-chart-2 text-white text-xs font-semibold shadow-md whitespace-nowrap">
                    <Sparkles className="h-3 w-3" />
                    Más Popular
                  </span>
                )}
              </div>

              {/* Plan info */}
              <div className="mb-4">
                <h3 className="text-xl font-bold font-heading mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground leading-snug">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl lg:text-4xl font-bold font-heading">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-sm text-muted-foreground">PEN</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.popular ? 'bg-primary/20' : 'bg-slate-100'}`}>
                      <Check className={`h-3 w-3 ${plan.popular ? 'text-primary' : 'text-slate-500'}`} />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`https://wa.me/51918146783?text=${encodeURIComponent(`¡Hola! 👋 Me interesa el *Plan ${plan.name}* (S/ ${plan.price}).\n\n¿Podrían brindarme más información sobre cómo empezar?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent.selectPlan(plan.name)
                  trackEvent.requestQuote(`Plan ${plan.name}`)
                }}
                className="w-full block mt-auto"
              >
                <Button
                  className="w-full group"
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
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