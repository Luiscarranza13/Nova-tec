'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Code2, Bell, LogOut, User, Settings, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function AdminHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email || '')
    })
  }, [])

  const getPageTitle = () => {
    const path = pathname.split('/').pop() || ''
    const titles: Record<string, string> = {
      '': 'Dashboard', admin: 'Dashboard',
      clientes: 'Clientes', proyectos: 'Proyectos',
      servicios: 'Servicios', cotizaciones: 'Cotizaciones',
      testimonios: 'Testimonios', mensajes: 'Mensajes',
      configuracion: 'Configuración',
    }
    return titles[path] || 'Dashboard'
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Sesión cerrada')
    window.location.href = '/login'
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-6 shadow-sm">
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-slate-900 font-heading">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900 hover:bg-slate-100">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-indigo-600 text-[10px] text-white flex items-center justify-center font-medium">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-slate-100 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-indigo-100 text-indigo-700 text-sm font-semibold">AD</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block text-sm font-medium text-slate-700">Admin</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border-slate-200 shadow-lg">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-0.5">
                <p className="text-sm font-semibold text-slate-900">Administrador</p>
                <p className="text-xs text-slate-500">{userEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem className="text-slate-700 hover:bg-slate-50 cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <Link href="/admin/perfil">Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-700 hover:bg-slate-50 cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <Link href="/admin/configuracion">Configuración</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-50 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
