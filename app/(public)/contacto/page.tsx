'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Zap, Shield, MessageCircle, Phone, Mail, MapPin, Star } from 'lucide-react'

const WHATSAPP_NUMBER = '51918146783'
const CONTACT_EMAIL   = 'NovaTec.Empresarial@gmail.com'
const CONTACT_ADDRESS = 'Senati Cajamarca, Perú'
const CONTACT_PHONE   = '+51 918 146 783'

const services = [
  { name: 'Desarrollo Web',    emoji: '🌐', desc: 'Sitios y apps web modernas' },
  { name: 'App Móvil',         emoji: '📱', desc: 'iOS y Android nativos' },
  { name: 'Software a Medida', emoji: '⚙️',  desc: 'Soluciones personalizadas' },
  { name: 'Diseño UI/UX',      emoji: '🎨', desc: 'Interfaces que enamoran' },
  { name: 'Soluciones Cloud',  emoji: '☁️',  desc: 'Infraestructura escalable' },
  { name: 'Consultoría Tech',  emoji: '💡', desc: 'Estrategia y arquitectura' },
]

const stats = [
  { value: '250+',  label: 'Proyectos' },
  { value: '120+',  label: 'Clientes' },
  { value: '<5min', label: 'Respuesta' },
  { value: '98%',   label: 'Satisfacción' },
]

const benefits = [
  { icon: Zap,           title: 'Respuesta rápida',     desc: 'Te respondemos en minutos.' },
  { icon: Clock,         title: 'Horario flexible',      desc: 'Lunes a sábado disponibles.' },
  { icon: Shield,        title: 'Sin compromiso',        desc: 'Primera consulta gratis.' },
  { icon: MessageCircle, title: 'Trato personalizado',   desc: 'Hablas directo con el equipo.' },
]

const chatMessages = [
  { from: 'user', text: '¡Hola! Necesito una app para mi negocio 👋' },
  { from: 'bot',  text: '¡Hola! Con gusto te ayudamos 😊 Cuéntanos más.' },
  { from: 'user', text: 'Quiero algo moderno y rápido' },
  { from: 'bot',  text: 'Perfecto, somos especialistas. ¿Empezamos? 🚀' },
]

function buildUrl(service?: string) {
  const msg = service
    ? `¡Hola! 👋 Me comunico desde el sitio web de *NovaTec*.\n\nEstoy interesado en el servicio de *${service}*.\n\n📋 *Datos de contacto:*\n• Nombre: \n• Empresa: \n\n¿Podrían brindarme más información? 🙏`
    : `¡Hola! 👋 Me comunico desde el sitio web de *NovaTec*.\n\nMe interesa conocer más sobre sus servicios de desarrollo de software.\n\n📋 *Datos de contacto:*\n• Nombre: \n• Empresa: \n• Servicio de interés: \n\n¿Podrían brindarme más información? 🙏`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

function WAIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ChatMockup() {
  const [visible, setVisible] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    chatMessages.forEach((msg, i) => {
      const base = i * 1400
      if (msg.from === 'bot') {
        timers.push(setTimeout(() => setTyping(true), base))
        timers.push(setTimeout(() => { setTyping(false); setVisible(i + 1) }, base + 900))
      } else {
        timers.push(setTimeout(() => setVisible(i + 1), base + 200))
      }
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      <div className="rounded-[2rem] border-[5px] border-white/10 bg-card shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
            <WAIcon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold leading-none">NovaTec</p>
            <p className="text-[#25D366] text-[11px] mt-0.5">en línea ahora</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        </div>

        {/* Messages */}
        <div className="bg-[#E5DDD5] min-h-[260px] p-3 space-y-2 flex flex-col justify-end">
          <AnimatePresence>
            {chatMessages.slice(0, visible).map((msg, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[78%] px-3 py-2 rounded-xl text-[12px] leading-relaxed shadow-sm ${
                  msg.from === 'user'
                    ? 'bg-[#DCF8C6] text-gray-800 rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none'
                }`}>
                  {msg.text}
                  <span className="block text-right text-[9px] text-gray-400 mt-0.5 leading-none">
                    {msg.from === 'bot' ? '✓✓' : '✓'}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-start">
                <div className="bg-white rounded-xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400"
                      animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2">
          <div className="flex-1 bg-white rounded-full px-4 py-2 text-[11px] text-gray-400">Escribe un mensaje...</div>
          <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
      <div className="absolute -inset-6 bg-[#25D366]/15 rounded-[3rem] blur-3xl -z-10" />
    </div>
  )
}

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center pt-20">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/6 w-[600px] h-[500px] bg-[#25D366]/8 rounded-full blur-[140px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 right-1/6 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] pointer-events-none"
          />

          <div className="container relative z-10 max-w-6xl mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left */}
              <div>
                <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#25D366]/25 bg-[#25D366]/8 backdrop-blur-sm mb-8">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-sm font-semibold text-[#25D366]">Respondemos en minutos</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.02] tracking-tight mb-6">
                  Hablemos de<br />
                  <span className="text-gradient">tu proyecto</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
                  Sin formularios complicados. Un mensaje por WhatsApp es todo lo que necesitas para empezar a construir algo increíble.
                </motion.p>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 mb-10">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">+120 clientes satisfechos</span>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
                  className="flex flex-col sm:flex-row gap-4">
                  <a href={buildUrl()} target="_blank" rel="noopener noreferrer">
                    <Button size="lg"
                      className="bg-[#25D366] hover:bg-[#20b858] text-white shadow-2xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 h-14 px-8 text-base rounded-2xl group transition-all duration-300 w-full sm:w-auto">
                      <WAIcon className="w-5 h-5 mr-2.5" />
                      Escribir por WhatsApp
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                  <a href="#servicios">
                    <Button variant="outline" size="lg"
                      className="h-14 px-8 text-base rounded-2xl border-border/60 hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all duration-300 w-full sm:w-auto">
                      Ver servicios
                    </Button>
                  </a>
                </motion.div>
              </div>

              {/* Right — chat mockup */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="hidden lg:flex justify-center">
                <ChatMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────── */}
        <section className="py-12 border-y border-border/40 bg-card/30 backdrop-blur-sm">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <p className="text-3xl font-bold font-heading text-gradient">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ─────────────────────────────────────── */}
        <section className="py-24">
          <div className="container max-w-5xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-primary" />Por qué elegirnos<span className="w-8 h-px bg-primary" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading">La forma más fácil de<br /><span className="text-gradient">empezar tu proyecto</span></h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {benefits.map((b, i) => (
                <motion.div key={b.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-7 text-center group hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center mx-auto mb-5 transition-colors">
                    <b.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-semibold mb-2">{b.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICIOS ────────────────────────────────────── */}
        <section id="servicios" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
          <div className="container relative z-10 max-w-5xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-primary" />Nuestros servicios<span className="w-8 h-px bg-primary" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading">¿En qué podemos<br /><span className="text-gradient">ayudarte hoy?</span></h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s, i) => (
                <motion.a key={s.name} href={buildUrl(s.name)} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group flex items-start gap-4 p-6 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-[#25D366]/40 hover:bg-[#25D366]/5 hover:shadow-xl hover:shadow-[#25D366]/8 transition-all duration-300">
                  <span className="text-3xl leading-none mt-0.5">{s.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold mb-1 group-hover:text-[#25D366] transition-colors">{s.name}</p>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[#25D366] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────── */}
        <section className="py-24">
          <div className="container max-w-4xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-[#25D366]/20 bg-gradient-to-br from-[#25D366]/10 via-card/80 to-primary/10 backdrop-blur-sm p-10 md:p-14 text-center">
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#25D366]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

              <div className="relative z-10">
                <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#25D366]/15 border-2 border-[#25D366]/30 mb-8 mx-auto">
                  <WAIcon className="w-10 h-10 text-[#25D366]" />
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">¿Listo para empezar?</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
                  Un mensaje es todo lo que necesitas. Te respondemos rápido y sin rodeos.
                </p>

                <a href={buildUrl()} target="_blank" rel="noopener noreferrer">
                  <Button size="lg"
                    className="bg-[#25D366] hover:bg-[#20b858] text-white shadow-2xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 h-14 px-10 text-base rounded-2xl group transition-all duration-300">
                    <WAIcon className="w-5 h-5 mr-2.5" />
                    Escribir por WhatsApp
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>

                {/* Contact info */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-10 pt-8 border-t border-border/40">
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#25D366] transition-colors">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    {CONTACT_PHONE}
                  </a>
                  <a href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    {CONTACT_EMAIL}
                  </a>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    {CONTACT_ADDRESS}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  )
}
