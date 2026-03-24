'use client'

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

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
    bgGlow: 'rgba(59,130,246,0.12)',
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    position: 'Director de Tecnología',
    company: 'FinCorp',
    quote: 'Trabajar con NovaTec fue una experiencia excepcional. Su metodología ágil nos mantuvo informados en cada etapa. La app de banca ha recibido elogios de nuestros usuarios.',
    rating: 5,
    avatar: 'CR',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-400',
    bgGlow: 'rgba(139,92,246,0.12)',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    position: 'Fundadora',
    company: 'TechStart',
    quote: 'Necesitábamos un partner tecnológico que entendiera el ritmo startup. NovaTec no solo entregó código de calidad, sino que también aportó ideas estratégicas valiosas.',
    rating: 5,
    avatar: 'AM',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-400',
    bgGlow: 'rgba(236,72,153,0.12)',
  },
  {
    id: 4,
    name: 'Roberto Sánchez',
    position: 'Gerente de Operaciones',
    company: 'FastShip',
    quote: 'La app de logística optimizó nuestras operaciones en un 40%. Su equipo técnico es de primer nivel y el soporte post-lanzamiento ha sido excelente.',
    rating: 5,
    avatar: 'RS',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-400',
    bgGlow: 'rgba(245,158,11,0.12)',
  },
]

const AUTOPLAY = 5000

export function Testimonials() {
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
    <section id="testimonios" className="py-32 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />
      <motion.div
        key={current}
        animate={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${t.bgGlow}, transparent)` }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
      />

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

        {/* Carousel area */}
        <div
          className="relative flex items-center justify-center gap-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Prev ghost card */}
          <motion.div
            key={`prev-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-64 shrink-0 rounded-2xl border border-border/20 bg-card/20 backdrop-blur-sm p-6 cursor-pointer select-none"
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.02, opacity: 0.9 }}
          >
            <div className="flex gap-1 mb-3">
              {[...Array(prev.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400/60 text-yellow-400/60" />
              ))}
            </div>
            <p className="text-foreground/30 text-xs leading-relaxed line-clamp-3 italic">"{prev.quote}"</p>
            <div className="flex items-center gap-2 mt-4">
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${prev.gradient} flex items-center justify-center text-white text-[10px] font-bold`}>
                {prev.avatar}
              </div>
              <p className="text-foreground/30 text-xs font-medium">{prev.name}</p>
            </div>
          </motion.div>

          {/* Main card */}
          <div className="flex-1 max-w-2xl relative">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                initial={{ opacity: 0, x: dir > 0 ? 100 : -100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir > 0 ? -100 : 100, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative rounded-3xl border border-border/30 bg-card/70 backdrop-blur-xl p-10 shadow-2xl"
              >
                {/* Glow border top */}
                <div
                  className="absolute top-0 left-12 right-12 h-px rounded-full opacity-70"
                  style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }}
                />

                {/* Corner glow */}
                <div
                  className="absolute -top-px -right-px w-32 h-32 rounded-tr-3xl opacity-10 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, ${t.color}, transparent 70%)` }}
                />

                {/* Large decorative quote mark */}
                <div
                  className="absolute top-4 right-8 text-[120px] font-serif leading-none select-none opacity-[0.06] pointer-events-none"
                  style={{ color: t.color }}
                >
                  "
                </div>

                {/* Stars */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex gap-1.5 mb-7"
                >
                  {[...Array(t.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2 + i * 0.06, type: 'spring', stiffness: 300 }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Quote */}
                <motion.blockquote
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-foreground/85 text-xl leading-relaxed italic mb-10 font-light"
                >
                  "{t.quote}"
                </motion.blockquote>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="h-px mb-7 origin-left"
                  style={{ background: `linear-gradient(90deg, ${t.color}40, transparent)` }}
                />

                {/* Author */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className={`w-13 h-13 w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold shadow-lg`}
                    style={{ boxShadow: `0 0 20px ${t.color}40` }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold tracking-wide text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {t.position}
                      <span className="mx-2 opacity-40">·</span>
                      <span style={{ color: t.color }} className="opacity-80">{t.company}</span>
                    </p>
                  </div>
                </motion.div>

                {/* Bottom progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-px rounded-b-3xl overflow-hidden bg-border/20">
                  {!paused && (
                    <motion.div
                      key={`bar-${current}`}
                      className="h-full"
                      style={{ background: `linear-gradient(90deg, ${t.color}80, ${t.color})` }}
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
              className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border/40 bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:scale-110 transition-all duration-200 shadow-xl z-10"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border/40 bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:scale-110 transition-all duration-200 shadow-xl z-10"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Next ghost card */}
          <motion.div
            key={`next-${current}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-64 shrink-0 rounded-2xl border border-border/20 bg-card/20 backdrop-blur-sm p-6 cursor-pointer select-none"
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.02, opacity: 0.9 }}
          >
            <div className="flex gap-1 mb-3">
              {[...Array(next.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400/60 text-yellow-400/60" />
              ))}
            </div>
            <p className="text-foreground/30 text-xs leading-relaxed line-clamp-3 italic">"{next.quote}"</p>
            <div className="flex items-center gap-2 mt-4">
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${next.gradient} flex items-center justify-center text-white text-[10px] font-bold`}>
                {next.avatar}
              </div>
              <p className="text-foreground/30 text-xs font-medium">{next.name}</p>
            </div>
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => setCurrent([i, i > current ? 1 : -1])}
              aria-label={`Testimonio ${i + 1}`}
              className="relative flex items-center justify-center"
            >
              <motion.div
                animate={{
                  width: i === current ? 28 : 8,
                  opacity: i === current ? 1 : 0.35,
                }}
                transition={{ duration: 0.3 }}
                className="h-2 rounded-full"
                style={{ background: i === current ? t.color : 'currentColor' }}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
