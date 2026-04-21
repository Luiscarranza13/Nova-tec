'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Users, FolderKanban, Wrench,
  FileText, MessageSquare, Settings, ChevronLeft,
  ChevronRight, LogOut, Code2, Star, Globe, Menu,
  BookOpen, Image, Mail, BarChart2, Kanban,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import Swal from 'sweetalert2'

const sidebarItems = [
  { label: 'Panel de Control', href: '/admin',                icon: LayoutDashboard, tour: 'dashboard' },
  { label: 'Clientes',       href: '/admin/clientes',       icon: Users },
  { label: 'Proyectos',      href: '/admin/proyectos',      icon: FolderKanban,    tour: 'proyectos' },
  { label: 'Servicios',      href: '/admin/servicios',      icon: Wrench },
  { label: 'Propuestas',     href: '/admin/cotizaciones',   icon: FileText,        tour: 'cotizaciones' },
  { label: 'Testimonios',    href: '/admin/testimonios',    icon: Star },
  { label: 'Mensajes',       href: '/admin/mensajes',       icon: MessageSquare,   tour: 'mensajes' },
  { label: 'Blog',           href: '/admin/blog',           icon: BookOpen },
  { label: 'Portafolio',     href: '/admin/portafolio',     icon: Image },
  { label: 'Newsletter',     href: '/admin/newsletter',     icon: Mail },
  { label: 'Pipeline',       href: '/admin/pipeline',       icon: Kanban },
  { label: 'Métricas',       href: '/admin/analytics',      icon: BarChart2 },
  { label: 'Configuración',  href: '/admin/configuracion',  icon: Settings, tour: 'configuracion' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

function NavItem({ item, isActive, collapsed }: { item: typeof sidebarItems[0]; isActive: boolean; collapsed: boolean }) {
  return (
    <Link
      href={item.href}
      data-tour={item.tour}
      className={cn(
        'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group',
        isActive
          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        collapsed && 'justify-center px-0'
      )}
    >
      <item.icon className="h-[18px] w-[18px] shrink-0" />
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.15 }}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      {collapsed && (
        <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
          {item.label}
        </div>
      )}
    </Link>
  )
}
export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="fixed left-0 top-0 z-40 h-screen hidden md:block overflow-hidden"
      >
        <SidebarContent collapsed={collapsed} onToggle={onToggle} />
      </motion.aside>
    </>
  )
}

interface SidebarContentProps {
  collapsed?: boolean
  mobile?: boolean
  onToggle?: () => void
}

export function SidebarContent({ collapsed = false, mobile = false, onToggle }: SidebarContentProps) {
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Sesión cerrada')
    window.location.replace('/login')
  }

  const handleVerSitio = async () => {
    const result = await Swal.fire({
      title: '¿Salir del panel?',
      html: `<p style="color:#64748b;font-size:14px;line-height:1.6">
        Al ir al sitio web tu sesión se cerrará por seguridad.<br/>
        Necesitarás iniciar sesión nuevamente para volver al panel.
      </p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ir al sitio',
      cancelButtonText: 'Quedarme aquí',
      confirmButtonColor: '#7c3aed',
      cancelButtonColor: '#64748b',
      reverseButtons: true,
      customClass: { popup: 'rounded-2xl shadow-2xl' },
    })

    if (result.isConfirmed) {
      await supabase.auth.signOut()
      window.open('/', '_blank')
    }
  }

  return (
    <div className="flex h-full flex-col bg-white border-r border-slate-200">
      {/* Logo */}
      <div className={cn(
        'flex h-16 items-center border-b border-slate-100 px-4',
        collapsed && !mobile ? 'justify-center' : 'justify-between'
      )}>
        <AnimatePresence mode="wait">
          {(!collapsed || mobile) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2.5"
            >
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 p-1.5 rounded-lg shadow-sm">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-base font-bold text-slate-900 font-heading">
                Nova<span className="text-indigo-600">Tec</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        {!mobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn('h-8 w-8 text-slate-500 hover:text-slate-900 hover:bg-slate-100', collapsed && 'mx-auto')}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {sidebarItems.map(item => (
          <NavItem
            key={item.href}
            item={item}
            isActive={pathname === item.href}
            collapsed={collapsed && !mobile}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-100 p-3 space-y-0.5">
        <button
          onClick={handleVerSitio}
          className={cn(
            'w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors group relative',
            collapsed && !mobile && 'justify-center px-0'
          )}
        >
          <Globe className="h-[18px] w-[18px] shrink-0" />
          {(!collapsed || mobile) && <span>Ver Sitio Web</span>}
          {collapsed && !mobile && (
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
              Ver Sitio Web
            </div>
          )}
        </button>
        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors group relative',
            collapsed && !mobile && 'justify-center px-0'
          )}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          {(!collapsed || mobile) && <span>Cerrar Sesión</span>}
          {collapsed && !mobile && (
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
              Cerrar Sesión
            </div>
          )}
        </button>
      </div>
    </div>
  )
}
