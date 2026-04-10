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
    <section id="faq" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />

      <div className="container relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Preguntas Frecuentes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-4">
            Resolvemos tus
            <br />
            <span className="text-gradient">dudas</span>
          </h2>
        </motion.div>

        {/* Filtros de categoría */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setCategory(cat.value)
                setActive(null)
              }}
              className={cn(
                'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
                category === cat.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border hover:border-primary/50'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
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
                className="w-full text-left p-6 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: active === item.id ? 180 : 0 }}
                    className="text-primary flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {active === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 pt-4 border-t border-border/50"
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
