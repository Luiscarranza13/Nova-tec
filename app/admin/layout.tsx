'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()

  useEffect(() => {
    // Empuja un estado extra al historial para poder detectar "atrás"
    window.history.pushState({ adminGuard: true }, '')

    const handlePopState = async (e: PopStateEvent) => {
      // Vuelve a empujar el estado para que el botón atrás no navegue
      window.history.pushState({ adminGuard: true }, '')

      const result = await Swal.fire({
        title: '¿Cerrar sesión?',
        text: 'Si sales del panel, tu sesión se cerrará.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#7c3aed',
        cancelButtonColor: '#64748b',
        reverseButtons: true,
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          title: 'text-slate-900 font-semibold',
          htmlContainer: 'text-slate-500',
        },
      })

      if (result.isConfirmed) {
        await supabase.auth.signOut()
        // Limpia el historial y redirige
        window.location.replace('/login')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
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
