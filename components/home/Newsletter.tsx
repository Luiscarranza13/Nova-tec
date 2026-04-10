'use client'

import { motion } from 'framer-motion'
import { Mail, Send, Sparkles, CheckCircle2, Bell, BookOpen, Zap } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

const perks = [
  { icon: BookOpen, text: 'Tips de desarrollo semanales' },
  { icon: Zap,      text: 'Novedades tech antes que nadie' },
  { icon: Bell,     text: 'Alertas de nuevos proyectos' },
]

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Ingresa un email válido')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase
        .from('newsletter')
        .upsert({ email, suscrito_en: new Date().toISOString() }, { onConflict: 'email' })
      if (error) throw error
      setDone(true)
      toast.success('¡Suscripción exitosa!')
      setEmail('')
    } catch {
      toast.error('Error al suscribirse. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-chart-2/8" />
      <div className="absolute inset-0 bg-dots opacity-20" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary rounded-full blur-[100px] pointer-events-none"
      />

      <div className="container relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-10 md:p-14 text-center shadow-2xl shadow-primary/5"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6 mx-auto">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">Newsletter Gratuito</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">
            Mantente al día con
            <br />
            <span className="text-gradient">las últimas tendencias tech</span>
          </h2>
          <p className="text-muted-foreground text-base mb-8 max-w-xl mx-auto">
            Únete a más de 500 profesionales que reciben contenido exclusivo sobre desarrollo, diseño y tecnología.
          </p>

          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4 text-primary shrink-0" />
                {text}
              </div>
            ))}
          </div>

          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-4"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-emerald-500" />
              </div>
              <p className="font-semibold text-foreground">¡Ya estás suscrito!</p>
              <p className="text-sm text-muted-foreground">Revisa tu bandeja de entrada.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">Tu correo electrónico</label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 rounded-xl bg-background/80"
                disabled={loading}
                aria-label="Correo electrónico para newsletter"
              />
              <Button type="submit" disabled={loading} className="h-12 px-6 rounded-xl gap-2 whitespace-nowrap shadow-lg shadow-primary/20">
                {loading ? 'Suscribiendo...' : <><Send className="h-4 w-4" aria-hidden="true" />Suscribirme</>}
              </Button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-5">
            Sin spam · Desuscríbete cuando quieras · 100% gratuito
          </p>
        </motion.div>
      </div>
    </section>
  )
}
