'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'María González',
    position: 'CEO',
    company: 'RetailMax',
    quote: 'NovaTec transformó completamente nuestra presencia digital. Su equipo entendió perfectamente nuestra visión y entregó un producto que superó nuestras expectativas.',
    rating: 5,
    avatar: 'MG',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-cyan-400',
    bgGlow: 'rgba(59,130,246,0.15)',
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    position: 'Director de Tecnología',
    company: 'FinCorp',
    quote: 'Trabajar con NovaTec fue una experiencia excepcional. Su metodología ágil nos mantuvo informados en cada etapa del proyecto.',
    rating: 5,
    avatar: 'CR',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-400',
    bgGlow: 'rgba(139,92,246,0.15)',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    position: 'Fundadora',
    company: 'TechStart',
    quote: 'Necesitábamos un partner tecnológico que entendiera el ritmo startup. NovaTec no solo entregó código de calidad, sino que también aportó ideas estratégicas.',
    rating: 5,
    avatar: 'AM',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-400',
    bgGlow: 'rgba(236,72,153,0.15)',
  },
  {
    id: 4,
    name: 'Roberto Sánchez',
    position: 'Gerente de Operaciones',
    company: 'FastShip',
    quote: 'La aplicación de logística que desarrolló NovaTec optimizó nuestras operaciones en un 40%. Su equipo técnico es de primer nivel.',
    rating: 5,
    avatar: 'RS',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-400',
    bgGlow: 'rgba(245,158,11,0.15)',
  },
]

const AUTOPLAY = 5000

export default function TestimoniosPage() {
  const [[current, dir], setCurrent] = useState([0, 0])
  const [paused, setPaused] = useState(false)

  const paginate = useCallback((d: number) => {
    setCurrent(([prev]) => [(prev + d + testimonials.length) % testimonials.length, d])
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => paginate(1), AUTOPLAY)
    return () => clearInterval(id)
  }, [paused, paginate])

  const t = testimonials[current]
  const prev = testimonials[(current - 1 + testimonials.length) % testimonials.length]
  const next = testimonials[(current + 1) % testimonials.length]

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen">
        <section className="relative overflow-hidden py-28">

          {/* Animated ambient glow */}
          <motion.div
            key={current}
            animate={{ background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${t.bgGlow}, transparent)` }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
          />

          {/* Floating orbs */}
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-16 left-[8%] w-72 h-72 rounded-full blur-3xl opacity-[0.07] pointer-events-none"
            style={{ background: t.color }}
          />
          <motion.div
            animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-10 right-[8%] w-56 h-56 rounded-full blur-3xl opacity-[0.07] pointer-events-none"
            style={{ background: t.color }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="container relative max-w-6xl mx-auto px-4">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-6"
              >
                <span className="w-12 h-px bg-gradient-to-r from-transparent to-primary" />
                Testimonios
                <span className="w-12 h-px bg-gradient-to-l from-transparent to-primary" />
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-5xl md:text-6xl font-bold font-heading leading-tight mb-6"
              >
                Lo que Dicen{' '}
                <span className="text-primary">Nuestros Clientes</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-xl text-muted-foreground leading-relaxed"
              >
                La satisfacción de nuestros clientes es nuestro mayor logro.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center gap-10 mt-12"
              >
                {[
                  { value: '100%', label: 'Satisfacción' },
                  { value: '50+', label: 'Proyectos' },
                  { value: '5★', label: 'Calificación' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Carousel */}
            <div
              className="relative flex items-center justify-center gap-5"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Prev ghost */}
              <motion.div
                key={`prev-${current}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="hidden xl:flex w-60 shrink-0 flex-col rounded-2xl border border-border/20 bg-card/15 backdrop-blur-sm p-6 cursor-pointer"
                onClick={() => paginate(-1)}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(prev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400/50 text-yellow-400/50" />
                  ))}
                </div>
                <p className="text-foreground/25 text-xs leading-relaxed line-clamp-4 italic flex-1">"{prev.quote}"</p>
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border/15">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${prev.gradient} flex items-center justify-center text-white text-[10px] font-bold opacity-60`}>
                    {prev.avatar}
                  </div>
                  <div>
                    <p className="text-foreground/25 text-xs font-medium">{prev.name}</p>
                    <p className="text-foreground/15 text-[10px]">{prev.company}</p>
                  </div>
                </div>
              </motion.div>

              {/* Main card */}
              <div className="flex-1 max-w-2xl relative">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={current}
                    custom={dir}
                    initial={{ opacity: 0, x: dir > 0 ? 120 : -120, scale: 0.94 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: dir > 0 ? -120 : 120, scale: 0.94 }}
                    transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative rounded-3xl border border-border/30 bg-card/70 backdrop-blur-2xl overflow-hidden shadow-2xl"
                  >
                    {/* Top glow line */}
                    <div
                      className="absolute top-0 inset-x-0 h-px"
                      style={{ background: `linear-gradient(90deg, transparent 5%, ${t.color}90 50%, transparent 95%)` }}
                    />
                    {/* Corner accent */}
                    <div
                      className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-[0.08]"
                      style={{ background: `radial-gradient(circle at top right, ${t.color}, transparent 70%)` }}
                    />

                    <div className="p-10 md:p-12">
                      {/* Quote icon */}
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                        className="mb-8"
                      >
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center"
                          style={{ background: `${t.color}18`, border: `1px solid ${t.color}30` }}
                        >
                          <Quote className="w-5 h-5" style={{ color: t.color }} />
                        </div>
                      </motion.div>

                      {/* Stars */}
                      <div className="flex gap-1.5 mb-7">
                        {[...Array(t.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2 + i * 0.07, type: 'spring', stiffness: 350 }}
                          >
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Quote */}
                      <motion.blockquote
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22, duration: 0.5 }}
                        className="text-foreground/85 text-xl md:text-2xl leading-relaxed italic font-light mb-10"
                      >
                        "{t.quote}"
                      </motion.blockquote>

                      {/* Divider */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.35, duration: 0.6 }}
                        className="h-px mb-8 origin-left"
                        style={{ background: `linear-gradient(90deg, ${t.color}50, transparent 60%)` }}
                      />

                      {/* Author */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-5"
                      >
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-base`}
                          style={{ boxShadow: `0 8px 32px ${t.color}35` }}
                        >
                          {t.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-base tracking-wide">{t.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {t.position}
                            <span className="mx-2 opacity-30">·</span>
                            <span style={{ color: t.color }} className="opacity-90 font-medium">{t.company}</span>
                          </p>
                        </div>
                        <div className="ml-auto text-right">
                          <span className="text-3xl font-bold tabular-nums" style={{ color: t.color }}>
                            0{current + 1}
                          </span>
                          <span className="text-muted-foreground/40 text-sm"> / 0{testimonials.length}</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 bg-border/20">
                      {!paused && (
                        <motion.div
                          key={`bar-${current}`}
                          className="h-full"
                          style={{ background: `linear-gradient(90deg, ${t.color}70, ${t.color})` }}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: AUTOPLAY / 1000, ease: 'linear' }}
                        />
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Nav buttons */}
                <button
                  onClick={() => paginate(-1)}
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-border/40 bg-background/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-110 hover:border-primary/40 transition-all duration-200 shadow-xl z-10"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-border/40 bg-background/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-110 hover:border-primary/40 transition-all duration-200 shadow-xl z-10"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Next ghost */}
              <motion.div
                key={`next-${current}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="hidden xl:flex w-60 shrink-0 flex-col rounded-2xl border border-border/20 bg-card/15 backdrop-blur-sm p-6 cursor-pointer"
                onClick={() => paginate(1)}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(next.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400/50 text-yellow-400/50" />
                  ))}
                </div>
                <p className="text-foreground/25 text-xs leading-relaxed line-clamp-4 italic flex-1">"{next.quote}"</p>
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border/15">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${next.gradient} flex items-center justify-center text-white text-[10px] font-bold opacity-60`}>
                    {next.avatar}
                  </div>
                  <div>
                    <p className="text-foreground/25 text-xs font-medium">{next.name}</p>
                    <p className="text-foreground/15 text-[10px]">{next.company}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent([i, i > current ? 1 : -1])}
                  aria-label={`Testimonio ${i + 1}`}
                >
                  <motion.div
                    animate={{ width: i === current ? 28 : 8, opacity: i === current ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                    className="h-2 rounded-full"
                    style={{ background: i === current ? t.color : 'currentColor' }}
                  />
                </button>
              ))}
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
