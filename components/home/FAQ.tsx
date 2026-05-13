'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { FAQ_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

type FAQCategory = 'todos' | 'proyecto' | 'precio' | 'tecnico' | 'soporte' | 'empresa'

export function FAQ() {
  const [active, setActive] = useState<string | null>(null)
  const [category, setCategory] = useState<FAQCategory>('todos')

  const categories = [
    { value: 'todos' as const, label: 'Todos' },
    { value: 'proyecto' as const, label: 'Proyecto' },
    { value: 'precio' as const, label: 'Precio' },
    { value: 'tecnico' as const, label: 'Técnico' },
    { value: 'soporte' as const, label: 'Soporte' },
  ]

  const filtered = category === 'todos'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(item => item.category === category)

  return (
    <section id="faq" className="home-section">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-transparent" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Preguntas Frecuentes
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading leading-tight mb-3">
            Resolvemos tus{' '}
            <span className="text-gradient">dudas</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setCategory(cat.value)
                setActive(null)
              }}
              className={cn(
                'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap',
                category === cat.value
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-white border border-slate-200 hover:border-primary/50 text-slate-600'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <button
                onClick={() => setActive(active === item.id ? null : item.id)}
                aria-expanded={active === item.id}
                aria-controls={`faq-answer-${item.id}`}
                className="w-full text-left p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: active === item.id ? 180 : 0 }}
                    className="text-primary flex-shrink-0"
                    aria-hidden="true"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {active === item.id && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 pt-4 border-t border-slate-100"
                    >
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}