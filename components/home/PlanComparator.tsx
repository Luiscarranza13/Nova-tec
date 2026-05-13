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
    <section className="home-section">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />Comparar Planes<span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-3">
            Elige el plan <span className="text-gradient">perfecto para ti</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl"
        >
          {/* Mobile scroll hint — more visible */}
          <div className="flex items-center justify-center gap-2 py-2.5 bg-slate-50 border-b border-slate-200 sm:hidden">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
            <span className="text-xs text-slate-500 font-medium">Desliza para ver todos los planes</span>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>

          <div className="overflow-x-auto -mx-1 px-1">
            <div className="min-w-[520px]">

              {/* Header row */}
              <div className="grid grid-cols-4 border-b border-border/50">
                <div className="p-4 sm:p-5 border-r border-border/30 flex items-end">
                  <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Características</p>
                </div>
                {plans.map(plan => (
                  <div key={plan.key} className={`pt-3 pb-4 px-4 sm:px-5 text-center flex flex-col items-center justify-end ${plan.popular ? 'bg-primary/5' : ''}`}>
                    {plan.popular ? (
                      <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 rounded-full bg-gradient-to-r from-primary to-chart-2 text-white text-[9px] sm:text-[10px] font-bold shadow-md mb-2">
                        <Sparkles className="h-2 w-2 sm:h-2.5 sm:w-2.5" />Popular
                      </span>
                    ) : (
                      <span className="mb-2 h-[22px] block" />
                    )}
                    <p className="font-bold font-heading text-xs sm:text-sm">{plan.name}</p>
                    <p className={`text-sm sm:text-base font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent mt-0.5`}>
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
                    <div className="p-3 sm:p-4 border-r border-border/30 flex items-center">
                      <span className="text-xs sm:text-sm text-muted-foreground">{feat.label}</span>
                    </div>
                    {plans.map(plan => (
                      <div key={plan.key} className={`p-3 sm:p-4 flex items-center justify-center ${plan.popular ? 'bg-primary/3' : ''}`}>
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
                <div className="p-4 sm:p-5" />
                {plans.map(plan => (
                  <div key={plan.key} className="p-3 sm:p-4 flex justify-center">
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

            </div>{/* min-w wrapper */}
          </div>{/* overflow-x-auto */}
        </motion.div>
      </div>
    </section>
  )
}