'use client'

import { useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { MessageSquare, FileText, Users, FolderKanban } from 'lucide-react'

const TABLES = [
  { table: 'mensajes',     event: 'INSERT', icon: MessageSquare, color: 'text-blue-500',   label: (r: any) => `Nuevo mensaje de ${r.nombre}` },
  { table: 'cotizaciones', event: 'INSERT', icon: FileText,      color: 'text-violet-500', label: (r: any) => `Nueva cotización creada` },
  { table: 'clientes',     event: 'INSERT', icon: Users,         color: 'text-emerald-500',label: (r: any) => `Nuevo cliente: ${r.nombre}` },
  { table: 'proyectos',    event: 'UPDATE', icon: FolderKanban,  color: 'text-amber-500',  label: (r: any) => `Proyecto actualizado: ${r.nombre}` },
]

export function RealtimeNotifications() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const channels = TABLES.map(({ table, event, icon: Icon, color, label }) =>
      supabase
        .channel(`rt-${table}-${event}`)
        .on('postgres_changes', { event: event as any, schema: 'public', table }, (payload) => {
          const record = payload.new as any
          toast(label(record), {
            icon: <Icon className={`h-4 w-4 ${color}`} />,
            duration: 5000,
            action: { label: 'Ver', onClick: () => window.location.href = `/admin/${table}` },
          })
        })
        .subscribe()
    )

    return () => { channels.forEach(c => supabase.removeChannel(c)) }
  }, [])

  return null
}
