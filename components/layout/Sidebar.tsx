'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Wrench,
  FileText,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Code2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sidebarItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Clientes', href: '/admin/clientes', icon: Users },
  { label: 'Proyectos', href: '/admin/proyectos', icon: FolderKanban },
  { label: 'Servicios', href: '/admin/servicios', icon: Wrench },
  { label: 'Cotizaciones', href: '/admin/cotizaciones', icon: FileText },
  { label: 'Testimonios', href: '/admin/testimonios', icon: MessageSquare },
  { label: 'Mensajes', href: '/admin/mensajes', icon: MessageSquare },
  { label: 'Configuración', href: '/admin/configuracion', icon: Settings },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          'fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300 hidden md:block',
        )}
      >
        <div className="flex h-full flex-col">
          <div className={cn('flex h-16 items-center border-b px-4', collapsed ? 'justify-center' : 'justify-between')}>
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-chart-2 rounded-lg blur opacity-30" />
                    <div className="relative bg-gradient-to-r from-primary to-chart-2 p-1.5 rounded-lg">
                      <Code2 className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <span className="text-lg font-bold font-heading">
                    Nova<span className="text-gradient">Tec</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggle} 
              className={cn(
                'h-8 w-8 hover:bg-primary/10', 
                collapsed ? 'mx-auto' : ''
              )}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          <nav className="flex-1 space-y-1 p-2 overflow-y-auto scrollbar-thin">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    collapsed && 'justify-center px-2'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-200",
                    !isActive && "group-hover:scale-110"
                  )} />
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-card border rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                      {item.label}
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="border-t p-2">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-muted',
                collapsed && 'justify-center px-2'
              )}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!collapsed && <span>Cerrar Sesión</span>}
            </Button>
          </div>
        </div>
      </motion.aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50 md:hidden">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex items-center gap-2 p-4 border-b">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-chart-2 rounded-lg blur opacity-30" />
              <div className="relative bg-gradient-to-r from-primary to-chart-2 p-1.5 rounded-lg">
                <Code2 className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-lg font-bold font-heading">
              Nova<span className="text-gradient">Tec</span>
            </span>
          </div>
          <nav className="space-y-1 p-2 mt-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
            >
              <LogOut className="h-5 w-5" />
              Cerrar Sesión
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
