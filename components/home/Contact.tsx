'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Clock, Zap, Shield, ArrowRight, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

const WHATSAPP_NUMBER = '51918146783'

const services = [
  'Desarrollo Web', 'App Móvil', 'Software a Medida',
  'Diseño UI/UX', 'Soluciones Cloud', 'Consultoría Tech',
]

function buildWhatsAppUrl(service?: string) {
  const msg = service
    ? `¡Hola! 👋 Estoy interesado en *${service}*.\n\n¿Podrían brindarme más información?`
    : `¡Hola! 👋 Me interesa conocer más sobre sus servicios.\n\n¿Podrían brindarme más información?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

const contactInfo = [
  { icon: Phone,   label: 'Teléfono',  value: '+51 918 146 783', href: 'https://wa.me/51918146783' },
  { icon: Mail,    label: 'Email',     value: 'NovaTec.Empresarial@gmail.com', href: 'mailto:NovaTec.Empresarial@gmail.com' },
  { icon: MapPin,  label: 'Ubicación', value: 'Senati Cajamarca, Perú', href: '#' },
  { icon: Clock,   label: 'Horario',   value: 'Lun–Vie, 9:00–18:00', href: '#' },
]

export function Contact() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.mensaje) {
      toast.error('Completa todos los campos requeridos')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.from('mensajes').insert({
        nombre: form.nombre,
        email: form.email,
        asunto: form.asunto || 'Sin asunto',
        mensaje: form.mensaje,
        leido: false,
        creado_en: new Date().toISOString(),
      })
      if (error) throw error
      setSent(true)
      toast.success('¡Mensaje enviado! Te contactaremos pronto.')
      setForm({ nombre: '', email: '', asunto: '', mensaje: '' })
    } catch {
      toast.error('Error al enviar. Escríbenos por WhatsApp.')
    } finally {
      setLoading(false) }
  }

  return (
    <section id="contacto" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/40 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-chart-2/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />Contacto<span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-4">
            ¿Listo para transformar<br />
            <span className="text-gradient">tu idea en realidad?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Elige cómo prefieres contactarnos. Respondemos en menos de 24 horas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — info + whatsapp */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* WhatsApp CTA */}
            <div className="rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 rounded-xl bg-[#25D366]/15 flex items-center justify-center"
                >
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </motion.div>
                <div>
                  <p className="font-semibold">WhatsApp directo</p>
                  <p className="text-xs text-muted-foreground">Respuesta inmediata</p>
                </div>
              </div>
              <Link href={buildWhatsAppUrl()} target="_blank">
                <Button className="w-full bg-[#25D366] hover:bg-[#20b858] text-white gap-2 shadow-lg shadow-[#25D366]/20">
                  <MessageCircle className="w-4 h-4" />
                  Abrir WhatsApp
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Contact info */}
            <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick services */}
            <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                Escríbenos sobre...
              </p>
              <div className="space-y-2">
                {services.map((service) => (
                  <motion.a
                    key={service}
                    href={buildWhatsAppUrl(service)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-3 p-3 rounded-lg border border-border/40 hover:border-primary/30 bg-background/40 hover:bg-card/80 transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform shrink-0" />
                    <span className="text-sm font-medium flex-1">{service}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-8 h-full">
              <h3 className="text-xl font-bold font-heading mb-6">Envíanos un mensaje</h3>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </div>
                  <p className="text-xl font-bold">¡Mensaje enviado!</p>
                  <p className="text-muted-foreground">Te contactaremos en menos de 24 horas.</p>
                  <Button variant="outline" onClick={() => setSent(false)} className="mt-2">
                    Enviar otro mensaje
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-muted-foreground">Nombre *</label>
                      <Input
                        placeholder="Tu nombre"
                        value={form.nombre}
                        onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))}
                        className="h-11 rounded-xl bg-background/80"
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-muted-foreground">Email *</label>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        className="h-11 rounded-xl bg-background/80"
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-muted-foreground">Asunto</label>
                    <Input
                      placeholder="¿En qué podemos ayudarte?"
                      value={form.asunto}
                      onChange={e => setForm(p => ({ ...p, asunto: e.target.value }))}
                      className="h-11 rounded-xl bg-background/80"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-muted-foreground">Mensaje *</label>
                    <Textarea
                      placeholder="Cuéntanos sobre tu proyecto, idea o consulta..."
                      value={form.mensaje}
                      onChange={e => setForm(p => ({ ...p, mensaje: e.target.value }))}
                      rows={5}
                      className="rounded-xl bg-background/80 resize-none"
                      disabled={loading}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">* Campos requeridos</p>
                    <Button type="submit" disabled={loading} className="gap-2 px-8 shadow-lg shadow-primary/20">
                      {loading ? 'Enviando...' : <><Send className="h-4 w-4" />Enviar mensaje</>}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
