'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const features = [
  { label: 'Páginas incluidas',         starter: '1 (Landing)',  pro: 'Hasta 10',    enterprise: 'Ilimitadas' },
  { label: 'Diseño responsive',         starter: true,           pro: true,          enterprise: true },
  { label: 'Panel de administración',   starter: false,          pro: true,          enterprise: true },
  { label: 'Blog integrado',            starter: false,          pro: true,          enterprise: true },
  { label: 'E-commerce',                starter: false,          pro: false,         enterprise: true },
  { label: 'Integraciones API',         starter: false,          pro: 'Básicas',     enterprise: 'Avanzadas' },
  { label: 'SEO optimizado',            starter: 'Básico',       pro: 'Completo',    enterprise: 'Premium' },
  { label: 'Soporte post-lanzamiento',  starter: '30 días',      pro: '90 días',     enterprise: '1 año' },
  { label: 'Capacitación',              starter: false,          pro: false,         enterprise: true },
  { label: 'Dominio y hosting',         starter: false,          pro: false,         enterprise: true },
  { label: 'Revisiones de diseño',      starter: '2',            pro: '5',           enterprise: 'Ilimitadas' },
  { label: 'Tiempo de entrega',         starter: '4-6 semanas',  pro: '8-12 semanas',enterprise: '12-20 semanas' },
]

const plans = [
  { key: 'starter',    name: 'Starter',      price: 'S/ 15,000', color: 'from-blue-500 to-cyan-500',    popular: false },
  { key: 'pro',        name: 'Professional', price: 'S/ 45,000', color: 'from-violet-500 to-indigo-500', popular: true  },
  { key: 'enterprise', name: 'Enterprise',   price: 'S/ 120,000',color: 'from-amber-500 to-orange-500', popular: false },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true)  return <Check className="h-5 w-5 text-emerald-500 mx-auto" />
  if (value === false) return <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />
  return <span className="text-sm text-muted-foreground">{value}</span>
}

export function PlanComparator() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? features : features.slice(0, 6)

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
      <div className="container relative z-10 max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />Comparar Planes<span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">
            Elige el plan <span className="text-gradient">perfecto para ti</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden shadow-xl"
        >
          {/* Header row */}
          <div className="grid grid-cols-4 border-b border-border/50">
            <div className="p-5 border-r border-border/30">
              <p className="text-sm font-semibold text-muted-foreground">Características</p>
            </div>
            {plans.map(plan => (
              <div key={plan.key} className={`p-5 text-center relative ${plan.popular ? 'bg-primary/5' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-chart-2 text-white text-[10px] font-bold shadow-md">
                      <Sparkles className="h-2.5 w-2.5" />Popular
                    </span>
                  </div>
                )}
                <p className="font-bold font-heading text-sm mt-2">{plan.name}</p>
                <p className={`text-lg font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent mt-1`}>
                  {plan.price}
                </p>
              </div>
            ))}
          </div>

          {/* Feature rows */}
          <AnimatePresence>
            {visible.map((feat, i) => (
              <motion.div
                key={feat.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="grid grid-cols-4 border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors"
              >
                <div className="p-4 border-r border-border/30 flex items-center">
                  <span className="text-sm text-muted-foreground">{feat.label}</span>
                </div>
                {plans.map(plan => (
                  <div key={plan.key} className={`p-4 flex items-center justify-center ${plan.popular ? 'bg-primary/3' : ''}`}>
                    <Cell value={feat[plan.key as keyof typeof feat] as boolean | string} />
                  </div>
                ))}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Expand toggle */}
          <div className="p-4 border-t border-border/30 text-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {expanded ? <><ChevronUp className="h-4 w-4" />Ver menos</> : <><ChevronDown className="h-4 w-4" />Ver todas las características</>}
            </button>
          </div>

          {/* CTA row */}
          <div className="grid grid-cols-4 bg-muted/20 border-t border-border/50">
            <div className="p-5" />
            {plans.map(plan => (
              <div key={plan.key} className="p-4 flex justify-center">
                <a
                  href={`https://wa.me/51918146783?text=${encodeURIComponent(`¡Hola! 👋 Me interesa el *Plan ${plan.name}* (${plan.price}).\n\n¿Podrían brindarme más información sobre cómo empezar?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block"
                >
                  <Button
                    size="sm"
                    variant={plan.popular ? 'default' : 'outline'}
                    className="rounded-xl text-xs w-full"
                  >
                    Elegir {plan.name}
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
