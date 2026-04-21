'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, X, Clock, Video, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CALENDLY_URL = 'https://calendly.com/novatec'

const meetingTypes = [
  { id: 'discovery',   label: 'Discovery Call',      duration: '30 min', icon: '🔍', desc: 'Conocemos tu proyecto y necesidades' },
  { id: 'demo',        label: 'Demo del Producto',    duration: '45 min', icon: '🎯', desc: 'Te mostramos cómo trabajamos' },
  { id: 'consultoria', label: 'Consultoría Técnica',  duration: '60 min', icon: '💡', desc: 'Revisamos tu arquitectura o código' },
]

export function CalendlyWidget() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const openCalendly = (type: string) => {
    const url = `${CALENDLY_URL}/${type}`
    window.open(url, '_blank', 'width=800,height=700,scrollbars=yes')
    setOpen(false)
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="gap-2 border-border/60 hover:border-primary/40 hover:bg-primary/5"
      >
        <Calendar className="h-4 w-4" />
        Agendar reunión
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-full max-w-md px-4"
            >
              <div className="rounded-2xl border border-border/60 bg-card shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">Agendar reunión</h3>
                  </div>
                  <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6 space-y-3">
                  <p className="text-sm text-muted-foreground mb-4">Elige el tipo de reunión que necesitas:</p>

                  {meetingTypes.map(mt => (
                    <button
                      key={mt.id}
                      onClick={() => openCalendly(mt.id)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
                    >
                      <span className="text-2xl">{mt.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm group-hover:text-primary transition-colors">{mt.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{mt.desc}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                        <Clock className="h-3.5 w-3.5" />
                        {mt.duration}
                      </div>
                    </button>
                  ))}

                  <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                    <Video className="h-3.5 w-3.5 text-primary" />
                    <span>Reuniones por Google Meet o Zoom</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    <span>Sin costo · Sin compromiso</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
