'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, Phone } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CommandPalette } from '@/components/ui/command-palette'
import { AnnouncementBanner } from '@/components/ui/announcement-banner'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/constants'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setIsMobileMenuOpen(false) }, [pathname])

  return (
    <>
      <ScrollProgress />
      <AnnouncementBanner />
      <header
        className={cn(
          'sticky top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'glass-nav shadow-sm' : 'bg-transparent'
        )}
      >
        <div className="container max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-between h-16 md:h-18 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <Image
                src="/logo.svg" alt="NovaTec" width={36} height={36}
                className="group-hover:scale-105 transition-transform duration-200"
              />
              <span className="text-xl font-bold font-heading">
                Nova<span className="text-gradient">Tec</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-3.5 py-2 text-sm font-medium transition-all duration-200 rounded-lg',
                    pathname === item.href
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-gradient-to-r from-primary to-chart-2 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <CommandPalette />

              {/* WhatsApp quick */}
              <a
                href="https://wa.me/51918146783"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-[#25D366]/30 bg-[#25D366]/5 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/15 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <Phone className="h-4 w-4" />
              </a>

              <Link href="/contacto">
                <Button size="sm" className="shadow-md shadow-primary/20 rounded-lg">
                  Contactar
                </Button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="h-5 w-5" /></motion.div>
                  : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="h-5 w-5" /></motion.div>
                }
              </AnimatePresence>
            </button>
          </nav>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-md"
              >
                <div className="py-6 space-y-4 px-4 h-[calc(100vh-4rem)] flex flex-col justify-between">
                  <div className="space-y-1">
                    {NAV_ITEMS.map((item, i) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center justify-between py-4 px-5 text-lg font-semibold rounded-2xl transition-all active:scale-[0.98]',
                            pathname === item.href
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground/80 hover:bg-muted'
                          )}
                        >
                          {item.label}
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <Menu className="h-4 w-4 opacity-30 rotate-[-90deg]" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-3 pb-8">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-5 mb-2">Contacto Directo</p>
                    <Link href="/contacto">
                      <Button size="xl" className="w-full rounded-2xl shadow-lg shadow-primary/20 text-md font-bold h-14">
                        Empezar Proyecto
                      </Button>
                    </Link>
                    <a href="https://wa.me/51918146783" target="_blank" rel="noopener noreferrer">
                      <Button size="xl" variant="outline" className="w-full rounded-2xl border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 h-14 font-semibold">
                        <Phone className="h-5 w-5 mr-3" />
                        Hablar por WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>
    </>
  )
}
