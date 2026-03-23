'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Code2, Bell, LogOut, User, Settings, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

export function AdminHeader() {
  const pathname = usePathname()
  const router = useRouter()

  const getPageTitle = () => {
    const path = pathname.split('/').pop() || 'Dashboard'
    const titles: Record<string, string> = {
      '': 'Dashboard',
      'clientes': 'Clientes',
      'proyectos': 'Proyectos',
      'servicios': 'Servicios',
      'cotizaciones': 'Cotizaciones',
      'testimonios': 'Testimonios',
      'mensajes': 'Mensajes',
      'configuracion': 'Configuración',
    }
    return titles[path] || 'Dashboard'
  }

  const handleLogout = () => {
    toast.success('Sesión cerrada', {
      description: 'Has cerrado sesión correctamente.',
    })
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex-1">
        <h1 className="text-lg font-semibold font-heading">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">AD</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block text-sm">Admin</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Administrador</p>
                <p className="text-xs text-muted-foreground">admin@novatec.mx</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <Link href="/admin/perfil">Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <Link href="/admin/configuracion">Configuración</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
