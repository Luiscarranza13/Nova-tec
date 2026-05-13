'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'hero',          label: 'Inicio' },
  { id: 'servicios',     label: 'Servicios' },
  { id: 'portafolio',    label: 'Portafolio' },
  { id: 'testimonios',   label: 'Testimonios' },
  { id: 'planes',        label: 'Planes' },
  { id: 'faq',           label: 'FAQ' },
  { id: 'contacto',      label: 'Contacto' },
]

export function DotNavigation() {
  const [active, setActive] = useState('')
  const [visible, setVisible] = useState(false)
  const [hoveredDot, setHoveredDot] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.4, rootMargin: '-10% 0px -10% 0px' }
    )

    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          // Moved further right and only shown on xl+ to avoid overlapping WhatsApp/scroll-to-top
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5 hidden xl:flex"
          aria-label="Navegación por secciones"
        >
          {sections.map(s => (
            <div key={s.id} className="relative flex items-center justify-end gap-2">
              {/* Tooltip label on hover */}
              <AnimatePresence>
                {hoveredDot === s.id && (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    className="text-[11px] font-medium text-foreground/80 bg-card/95 backdrop-blur-sm border border-border/40 px-2 py-0.5 rounded shadow-sm whitespace-nowrap"
                  >
                    {s.label}
                  </motion.span>
                )}
              </AnimatePresence>

              <button
                onClick={() => scrollTo(s.id)}
                onMouseEnter={() => setHoveredDot(s.id)}
                onMouseLeave={() => setHoveredDot(null)}
                aria-label={`Ir a ${s.label}`}
                className="flex items-center justify-center w-4 h-4"
              >
                <motion.div
                  animate={{
                    width:  active === s.id ? 8 : 5,
                    height: active === s.id ? 8 : 5,
                    backgroundColor: active === s.id
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--muted-foreground) / 0.25)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full"
                />
              </button>
            </div>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
