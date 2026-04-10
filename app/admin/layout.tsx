'use client'

import { useEffect } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { AdminHeader } from '@/components/layout/AdminHeader'
import { RealtimeNotifications } from '@/components/admin/realtime-notifications'
import { AdminTour } from '@/components/ui/guided-tour'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase/client'
import { useUIStore } from '@/lib/store'
import Swal from 'sweetalert2'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore()

  useEffect(() => {
    // 1. Forzar cierre de sesión al cargar el panel
    //    Esto garantiza que cada acceso requiera login
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.replace('/login')
        return
      }
    }
    checkSession()

    // 2. Interceptar botón "atrás" del navegador
    window.history.pushState({ adminGuard: true }, '')

    const handlePopState = async () => {
      // Re-empuja el estado para bloquear la navegación
      window.history.pushState({ adminGuard: true }, '')

      const result = await Swal.fire({
        title: '¿Deseas cerrar sesión?',
        html: `
          <p style="color:#64748b;font-size:14px;margin-top:4px">
            Si sales del panel, tu sesión se cerrará por seguridad.<br/>
            Tendrás que iniciar sesión nuevamente para acceder.
          </p>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Quedarme aquí',
        confirmButtonColor: '#7c3aed',
        cancelButtonColor: '#64748b',
        reverseButtons: true,
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          title: 'text-slate-900 font-bold text-lg',
        },
      })

      if (result.isConfirmed) {
        await supabase.auth.signOut()
        window.location.replace('/login')
      }
    }

    // 3. Cerrar sesión al cerrar/recargar la pestaña
    const handleBeforeUnload = async () => {
      await supabase.auth.signOut()
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f6fa]" style={{
      colorScheme: 'light',
      '--background': '0 0% 100%',
      '--foreground': '222.2 84% 4.9%',
      '--card': '0 0% 100%',
      '--card-foreground': '222.2 84% 4.9%',
      '--popover': '0 0% 100%',
      '--popover-foreground': '222.2 84% 4.9%',
      '--primary': '243 75% 59%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '210 40% 96.1%',
      '--secondary-foreground': '222.2 47.4% 11.2%',
      '--muted': '210 40% 96.1%',
      '--muted-foreground': '215.4 16.3% 46.9%',
      '--accent': '243 75% 59%',
      '--accent-foreground': '0 0% 100%',
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '214.3 31.8% 91.4%',
      '--input': '214.3 31.8% 91.4%',
      '--ring': '243 75% 59%',
    } as React.CSSProperties}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className={cn('transition-all duration-300', sidebarCollapsed ? 'md:pl-20' : 'md:pl-64')}>
        <AdminHeader />
        <main className="p-6 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
      <RealtimeNotifications />
      <AdminTour />
    </div>
  )
}
