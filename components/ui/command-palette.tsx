'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Home, Briefcase, Globe, Users, MessageSquare,
  DollarSign, Star, Mail, Settings, LogIn, ArrowRight,
  Code2, Smartphone, Palette, Cloud, Lightbulb, FileText,
} from 'lucide-react'

const commands = [
  { group: 'Páginas', items: [
    { label: 'Inicio',        href: '/',           icon: Home,         keywords: 'home principal' },
    { label: 'Nosotros',      href: '/nosotros',   icon: Users,        keywords: 'equipo empresa about' },
    { label: 'Servicios',     href: '/servicios',  icon: Briefcase,    keywords: 'servicios oferta' },
    { label: 'Portafolio',    href: '/portafolio', icon: Globe,        keywords: 'proyectos trabajos' },
    { label: 'Planes',        href: '/planes',     icon: DollarSign,   keywords: 'precios planes pricing' },
    { label: 'Testimonios',   href: '/testimonios',icon: Star,         keywords: 'reviews opiniones' },
    { label: 'Contacto',      href: '/contacto',   icon: Mail,         keywords: 'contacto email whatsapp' },
  ]},
  { group: 'Servicios', items: [
    { label: 'Desarrollo Web',    href: '/servicios#desarrollo-web',    icon: Code2,      keywords: 'web next react' },
    { label: 'Apps Móviles',      href: '/servicios#desarrollo-mobile', icon: Smartphone, keywords: 'mobile ios android flutter' },
    { label: 'Diseño UI/UX',      href: '/servicios#ui-ux',             icon: Palette,    keywords: 'diseño figma ui ux' },
    { label: 'Soluciones Cloud',  href: '/servicios#cloud',             icon: Cloud,      keywords: 'aws cloud devops' },
    { label: 'Consultoría Tech',  href: '/servicios#consultoria',       icon: Lightbulb,  keywords: 'consultoria tech strategy' },
  ]},
  { group: 'Acciones', items: [
    { label: 'Iniciar Proyecto',  href: '/contacto',  icon: ArrowRight, keywords: 'proyecto nuevo empezar' },
    { label: 'Ver Blog',          href: '/blog',       icon: FileText,   keywords: 'blog articulos posts' },
  ]},
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  const toggle = useCallback(() => setOpen(o => !o), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggle()
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggle])

  const navigate = (href: string) => {
    setOpen(false)
    setQuery('')
    router.push(href)
  }

  const filtered = query.trim()
    ? commands.map(g => ({
        ...g,
        items: g.items.filter(i =>
          i.label.toLowerCase().includes(query.toLowerCase()) ||
          i.keywords.toLowerCase().includes(query.toLowerCase())
        ),
      })).filter(g => g.items.length > 0)
    : commands

  return (
    <>
      {/* Trigger hint */}
      <button
        onClick={toggle}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 bg-muted/30 text-muted-foreground text-xs hover:border-primary/30 hover:bg-primary/5 transition-all"
        aria-label="Abrir búsqueda (Ctrl+K)"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Buscar...</span>
        <kbd className="ml-2 px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono border border-border/50">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[201] w-full max-w-xl px-4"
            >
              <Command className="rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Command.Input
                    value={query}
                    onValueChange={setQuery}
                    placeholder="Buscar páginas, servicios, acciones..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    autoFocus
                  />
                  <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono border border-border/50 text-muted-foreground">ESC</kbd>
                </div>

                <Command.List className="max-h-80 overflow-y-auto p-2">
                  <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                    No se encontraron resultados para "{query}"
                  </Command.Empty>

                  {filtered.map(group => (
                    <Command.Group key={group.group} heading={group.group}
                      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider">
                      {group.items.map(item => (
                        <Command.Item
                          key={item.href}
                          value={item.label + ' ' + item.keywords}
                          onSelect={() => navigate(item.href)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm aria-selected:bg-primary/10 aria-selected:text-primary transition-colors hover:bg-muted/50"
                        >
                          <item.icon className="h-4 w-4 shrink-0 text-muted-foreground aria-selected:text-primary" />
                          <span className="flex-1">{item.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40" />
                        </Command.Item>
                      ))}
                    </Command.Group>
                  ))}
                </Command.List>

                <div className="px-4 py-2 border-t border-border/40 flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-muted border border-border/50 font-mono">↑↓</kbd> navegar</span>
                  <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-muted border border-border/50 font-mono">↵</kbd> abrir</span>
                  <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-muted border border-border/50 font-mono">ESC</kbd> cerrar</span>
                </div>
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
