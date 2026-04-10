'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'

const INFO = [
  { icon: MapPin, label: 'Dirección',  value: 'Senati Cajamarca, Perú',          href: 'https://maps.google.com/?q=Senati+Cajamarca+Peru' },
  { icon: Phone,  label: 'Teléfono',   value: '+51 918 146 783',                  href: 'https://wa.me/51918146783' },
  { icon: Mail,   label: 'Email',      value: 'NovaTec.Empresarial@gmail.com',    href: 'mailto:NovaTec.Empresarial@gmail.com' },
  { icon: Clock,  label: 'Horario',    value: 'Lun–Vie, 9:00–18:00',             href: undefined },
]

export function MapLocation() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
      <div className="container relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />Dónde estamos<span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading">
            Encuéntranos en <span className="text-gradient">Cajamarca</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-2xl overflow-hidden border border-border/50 shadow-xl"
            style={{ minHeight: 360 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.123456789!2d-78.5001!3d-7.1638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b2a5b5b5b5b5b5%3A0x1234567890abcdef!2sSenati%20Cajamarca!5e0!3m2!1ses!2spe!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 360 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación NovaTec - Senati Cajamarca"
            />
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {INFO.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-5 hover:border-primary/30 transition-colors group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 group/link">
                        <span className="truncate">{value}</span>
                        {href.startsWith('http') && <ExternalLink className="h-3 w-3 shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity" />}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <a
              href="https://maps.google.com/?q=Senati+Cajamarca+Peru"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-primary/30 bg-primary/5 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors"
            >
              <MapPin className="h-4 w-4" />
              Abrir en Google Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
