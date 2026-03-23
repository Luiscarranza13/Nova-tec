'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Sparkles, Zap, CheckCircle2, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = [
  'Equipo experto dedicado',
  'Metodología ágil probada',
  'Soporte continuo',
  'Entregas a tiempo'
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-chart-2/10 rounded-full blur-[120px]" />
      <div className="absolute top-[60%] left-[60%] w-[300px] h-[300px] bg-chart-3/8 rounded-full blur-[100px]" />
      
      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 glass-card"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Transformando negocios con tecnología de vanguardia
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading leading-[1.1]">
              Transforma tus{' '}
              <span className="text-gradient">Ideas</span>
              <br />
              en{' '}
              <span className="text-gradient">Software</span> Excepcional
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Somos tu socio estratégico en tecnología. Creamos soluciones de software 
              innovadoras, escalables y de alta calidad que impulsan el crecimiento exponencial de tu negocio.
            </p>

            <div className="flex flex-wrap gap-3">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  {benefit}
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/servicios">
                <Button size="xl" className="group shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30">
                  Descubrir Servicios
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contacto">
                <Button size="xl" variant="outline" className="group">
                  <Zap className="mr-2 h-5 w-5 text-chart-2" />
                  Agendar Reunión
                  <ChevronRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-2 border-2 border-background flex items-center justify-center text-xs font-bold text-white shadow-md"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="font-semibold text-foreground">+120 clientes</span> satisfechos
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-chart-2/20 rounded-3xl rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-br from-chart-3/10 to-primary/10 rounded-3xl -rotate-2" />
              <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-8 shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs text-muted-foreground">nova tec</span>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-500">const</span>
                    <span className="text-blue-500">novaTec</span>
                    <span className="text-foreground">=</span>
                    <span className="text-yellow-500">{'{'}</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-blue-400">mission</span>
                    <span className="text-foreground">:</span>
                    <span className="text-green-400"> "innovar"</span>
                    <span className="text-foreground">,</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-blue-400">vision</span>
                    <span className="text-foreground">:</span>
                    <span className="text-green-400"> "liderar"</span>
                    <span className="text-foreground">,</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-blue-400">quality</span>
                    <span className="text-foreground">:</span>
                    <span className="text-yellow-500">[</span>
                    <span className="text-green-400">"premium"</span>
                    <span className="text-foreground">,</span>
                    <span className="text-green-400">"scalable"</span>
                    <span className="text-yellow-500">]</span>
                  </div>
                  <div>
                    <span className="text-yellow-500">{'}'}</span>
                    <span className="text-foreground">;</span>
                  </div>
                  <div className="pt-4 flex items-center gap-2">
                    <span className="text-purple-500">await</span>
                    <span className="text-blue-500">buildFuture</span>
                    <span className="text-yellow-500">()</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">//</span>
                    <span className="text-gray-500">✨ Construyendo el mañana...</span>
                  </div>
                </div>
                
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-8 right-8 flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Code2 className="h-4 w-4 text-primary" />
                  <span>Escribiendo código...</span>
                </motion.div>
              </div>
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass-card rounded-xl p-4 shadow-lg border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Proyecto Entregado</p>
                    <p className="text-xs text-muted-foreground">E-commerce Platform</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-2 -left-4 glass-card rounded-xl p-3 shadow-lg border border-border/50"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">+40%</p>
                    <p className="text-[10px] text-muted-foreground">Rendimiento</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
