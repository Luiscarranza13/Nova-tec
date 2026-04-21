'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, CheckCircle2, ChevronDown, Code2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const benefits = [
  'Equipo experto dedicado',
  'Metodología ágil probada',
  'Soporte continuo',
  'Entregas a tiempo',
]

const techStack = ['Next.js', 'React', 'Node.js', 'Flutter', 'AWS', 'TypeScript', 'Supabase', 'Docker']

const floatingCards = [
  { icon: '✅', title: 'Proyecto Entregado', sub: 'E-commerce Platform', delay: 0, pos: 'top-[10%] right-[-5%]' },
  { icon: '⚡', title: '+40% Rendimiento', sub: 'Optimización cloud', delay: 0.6, pos: 'bottom-[22%] right-[-4%]' },
  { icon: '⭐', title: '4.9 / 5 Rating', sub: '+120 clientes', delay: 1.2, pos: 'bottom-[6%] left-[4%]' },
]

const words = ['Ideas', 'Proyectos', 'Visiones', 'Negocios']

function TypewriterWord() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return (
    <span className="text-gradient inline-block min-w-[180px]">
      {displayed}
      <span className="animate-pulse text-primary">|</span>
    </span>
  )
}

export function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 20)
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 20)
  }

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-50"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Animated aurora blobs */}
      <motion.div
        animate={{ x: [0, 60, -40, 0], y: [0, -80, 40, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -50, 70, 0], y: [0, 60, -50, 0], scale: [1, 0.85, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-chart-2/10 blur-[100px] pointer-events-none"
      />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-20 items-center">

          {/* Left column */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/8 backdrop-blur-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-medium text-primary">Transformando negocios con tecnología</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading leading-[1.05] tracking-tight mb-6 text-slate-900"
            >
              Convertimos tus{' '}
              <br />
              <TypewriterWord />
              <br />
              <span className="text-slate-400">en Software</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-500 max-w-xl leading-relaxed mb-8"
            >
              Somos tu socio estratégico en tecnología. Creamos soluciones innovadoras,
              escalables y de alta calidad que impulsan el crecimiento de tu negocio.
            </motion.p>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-10">
              {benefits.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.07 }}
                  className="flex items-center gap-2 text-sm text-slate-500"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  {b}
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full lg:w-auto">
              <Link href="/contacto" className="w-full sm:w-auto">
                <Button size="xl" className="group shadow-lg shadow-primary/30 w-full sm:min-w-[200px]">
                  Iniciar Proyecto
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/portafolio" className="w-full sm:w-auto">
                <Button size="xl" variant="outline" className="group w-full sm:min-w-[200px] border-slate-200">
                  <Zap className="mr-2 h-5 w-5 text-amber-500" />
                  Ver Portafolio
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold"
                  >
                    User
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  <span className="font-bold text-slate-900">+120 clientes</span> satisfechos
                </p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ rotateX: springY, rotateY: springX }}
            className="hidden lg:block relative perspective-1000"
          >
            <div className="relative rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-8 shadow-2xl">
              {/* Window bar */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-slate-400 font-mono">novatec.pe — proyecto.tsx</span>
              </div>

              {/* Code snippet */}
              <div className="space-y-3 font-mono text-sm mb-8 text-slate-600">
                <p><span className="text-purple-500">const</span> <span className="text-blue-500">proyecto</span> = {'{'}</p>
                <p className="pl-6">cliente: <span className="text-emerald-600">"Tu Visión"</span>,</p>
                <p className="pl-6">tecnología: <span className="text-emerald-600">"Next.js"</span>,</p>
                <p className="pl-6">estado: <span className="text-amber-600">"🚀 En Marcha"</span></p>
                <p>{'}'}</p>
              </div>

              {/* Progress bars */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                {[
                  { label: 'Desarrollo', pct: 92, color: 'bg-primary' },
                  { label: 'Diseño UI', pct: 88, color: 'bg-amber-400' },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-tighter">
                      <span>{bar.label}</span>
                      <span className="text-slate-900">{bar.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${bar.pct}%` }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className={`h-full rounded-full ${bar.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: card.delay }}
                className={`absolute ${card.pos} bg-white rounded-xl px-4 py-3 shadow-xl border border-slate-100 min-w-[170px] hidden xl:block`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{card.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{card.title}</p>
                    <p className="text-[10px] text-slate-400">{card.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-300">
        <ChevronDown className="animate-bounce h-6 w-6" />
      </div>
    </section>
  )
}
