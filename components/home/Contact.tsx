'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Clock, Zap, Shield, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const WHATSAPP_NUMBER = '51918146783'

const benefits = [
  { icon: Zap,           text: 'Respuesta en minutos' },
  { icon: Clock,         text: 'Lunes a sábado' },
  { icon: Shield,        text: 'Sin compromiso' },
  { icon: MessageCircle, text: 'Atención personalizada' },
]

function buildWhatsAppUrl(service?: string) {
  const msg = service
    ? `¡Hola! 👋 Me comunico desde el sitio web de *NovaTec*.\n\nEstoy interesado en el servicio de *${service}*.\n\n📋 *Datos de contacto:*\n• Nombre: \n• Empresa: \n\n¿Podrían brindarme más información? 🙏`
    : `¡Hola! 👋 Me comunico desde el sitio web de *NovaTec*.\n\nMe interesa conocer más sobre sus servicios de desarrollo de software.\n\n📋 *Datos de contacto:*\n• Nombre: \n• Empresa: \n• Servicio de interés: \n\n¿Podrían brindarme más información? 🙏`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

const services = [
  'Desarrollo Web',
  'App Móvil',
  'Software a Medida',
  'Diseño UI/UX',
  'Soluciones Cloud',
  'Consultoría Tech',
]

const WaIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export function Contact() {
  return (
    <section id="contacto" className="home-section">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/40 to-transparent pointer-events-none" />
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />Contacto<span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading leading-tight mb-4">
            ¿Listo para transformar{' '}
            <span className="text-gradient">tu idea en realidad?</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
            Escríbenos directamente por WhatsApp. Sin formularios, sin esperas.
          </p>
        </motion.div>

        {/* Grid: 1 col mobile → 2 col md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start max-w-4xl mx-auto">

          {/* WhatsApp CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-200 bg-white shadow-md p-6 lg:p-8 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#25D366]/10 border-2 border-[#25D366]/20 mb-5 mx-auto"
            >
              <WaIcon className="w-8 h-8 md:w-10 md:h-10 text-[#25D366]" />
            </motion.div>

            <h3 className="text-xl md:text-2xl font-bold font-heading mb-2">Chatea con nosotros</h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Un mensaje es todo lo que necesitas para empezar. Te respondemos rápido y sin rodeos.
            </p>

            <Link href="/contacto">
              <Button
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#20b858] text-white shadow-lg shadow-[#25D366]/25 transition-all group h-12"
              >
                <WaIcon className="w-5 h-5 mr-2" />
                Escribir por WhatsApp
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            {/* Benefits: 2x2 grid on mobile, row on larger */}
            <div className="grid grid-cols-2 gap-2 mt-6">
              {benefits.map((b) => (
                <div key={b.text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <b.icon className="h-3.5 w-3.5 text-primary shrink-0" />
                  {b.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Services quick-links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Escríbenos sobre...
            </p>
            <div className="space-y-3">
              {services.map((service, i) => (
                <motion.a
                  key={service}
                  href={buildWhatsAppUrl(service)}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all duration-200 group"
                >
                  <span className="text-sm font-medium">{service}</span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-[#25D366] transition-colors">
                    <WaIcon className="w-4 h-4" />
                    Consultar
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}