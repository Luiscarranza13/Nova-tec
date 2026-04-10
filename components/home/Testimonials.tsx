'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'María González',
    position: 'CEO',
    company: 'RetailMax',
    quote: 'NovaTec transformó completamente nuestra presencia digital. Su equipo entendió perfectamente nuestra visión y entregó un producto que superó nuestras expectativas en tiempo récord.',
    rating: 5,
    avatar: 'MG',
    gradient: 'from-blue-500 to-cyan-500',
    color: '#3b82f6',
    result: '+180% ventas online',
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    position: 'Director de Tecnología',
    company: 'FinCorp',
    quote: 'Trabajar con NovaTec fue una experiencia excepcional. Su metodología ágil nos mantuvo informados en cada etapa. La app de banca ha recibido elogios de nuestros usuarios.',
    rating: 5,
    avatar: 'CR',
    gradient: 'from-violet-500 to-purple-500',
    color: '#8b5cf6',
    result: '4.9★ en App Store',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    position: 'Fundadora',
    company: 'TechStart',
    quote: 'Necesitábamos un partner tecnológico que entendiera el ritmo startup. NovaTec no solo entregó código de calidad, sino que también aportó ideas estratégicas valiosas.',
    rating: 5,
    avatar: 'AM',
    gradient: 'from-pink-500 to-rose-500',
    color: '#ec4899',
    result: 'Lanzamiento en 6 semanas',
  },
  {
    id: 4,
    name: 'Roberto Sánchez',
    position: 'Gerente de Operaciones',
    company: 'FastShip',
    quote: 'La app de logística optimizó nuestras operaciones en un 40%. Su equipo técnico es de primer nivel y el soporte post-lanzamiento ha sido excelente.',
    rating: 5,
    avatar: 'RS',
    gradient: 'from-amber-500 to-orange-500',
    color: '#f59e0b',
    result: '-40% costos operativos',
  },
  {
    id: 5,
    name: 'Laura Vega',
    position: 'Product Manager',
    company: 'MediCare+',
    quote: 'El dashboard que desarrollaron para nosotros es increíblemente intuitivo. Nuestro equipo médico lo adoptó de inmediato y la productividad aumentó notablemente.',
    rating: 5,
    avatar: 'LV',
    gradient: 'from-emerald-500 to-teal-500',
    color: '#10b981',
    result: '+60% productividad',
  },
]

const AUTOPLAY = 5000

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent((c) => (c + 1) % testimonials.length)
  }

  const t = testimonials[current]

  return (
    <section id="testimonios" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-[10%] w-64 h-64 rounded-full blur-3xl opacity-[0.06]"
        style={{ background: t.color }}
      />
      <motion.div
        animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-20 right-[10%] w-48 h-48 rounded-full blur-3xl opacity-[0.06]"
        style={{ background: t.color }}
      />

      <div className="container relative z-10 max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scaleX: 0.5 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-6"
          >
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-primary" />
            Testimonios
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-primary" />
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-5">
            Lo que dicen{' '}
            <span className="text-gradient">nuestros clientes</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            La satisfacción de nuestros clientes es nuestro mayor logro.
          </p>
        </motion.div>

        {/* Main carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-sm min-h-[280px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="p-10 md:p-14"
              >
                {/* Quote icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.gradient} opacity-20 flex items-center justify-center mb-8`}>
                  <Quote className="h-6 w-6 text-foreground" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl font-medium text-foreground/85 leading-relaxed mb-10">
                  "{t.quote}"
                </blockquote>

                {/* Author + result */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.position} · {t.company}</p>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${t.gradient} bg-opacity-10 border border-border/50`}>
                    <span className="text-sm font-semibold text-foreground">{t.result}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-8 h-2 bg-primary'
                      : 'w-2 h-2 bg-border hover:bg-muted-foreground'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-border/50 bg-card/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-border/50 bg-card/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mini cards below */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-12 max-w-4xl mx-auto">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              onClick={() => go(i)}
              className={`rounded-xl p-3 border transition-all duration-200 text-left ${
                i === current
                  ? 'border-primary/40 bg-primary/5'
                  : 'border-border/40 bg-card/40 hover:border-border hover:bg-card/60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white text-[9px] font-bold shrink-0`}>
                  {item.avatar}
                </div>
                <p className="text-xs font-medium truncate">{item.name}</p>
              </div>
              <p className="text-[10px] text-muted-foreground truncate">{item.company}</p>
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
