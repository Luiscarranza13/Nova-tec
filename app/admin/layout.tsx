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
    // ── 1. Verificar sesión activa ────────────────────────────────────────────
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) window.location.replace('/login')
    })

    // ── 2. Interceptar botón "atrás" ──────────────────────────────────────────
    window.history.pushState({ adminGuard: true }, '')

    const handlePopState = async () => {
      window.history.pushState({ adminGuard: true }, '')

      const result = await Swal.fire({
        title: '¿Salir del panel?',
        html: `<p style="color:#64748b;font-size:14px;line-height:1.6">
          Si sales, tu sesión se cerrará por seguridad.<br/>
          Necesitarás iniciar sesión nuevamente.
        </p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Quedarme aquí',
        confirmButtonColor: '#7c3aed',
        cancelButtonColor: '#64748b',
        reverseButtons: true,
        customClass: { popup: 'rounded-2xl shadow-2xl' },
      })

      if (result.isConfirmed) {
        await supabase.auth.signOut()
        window.location.replace('/login')
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      "bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
    )}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className={cn('transition-all duration-300', sidebarCollapsed ? 'md:pl-20' : 'md:pl-64')}>
        <AdminHeader />
        <main className="p-4 md:p-6 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
      <RealtimeNotifications />
      <AdminTour />
    </div>
  )
}

