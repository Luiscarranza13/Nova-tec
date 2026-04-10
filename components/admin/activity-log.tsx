'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, User, Edit, Trash2, Plus, LogIn, Settings } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

type LogEntry = {
  id: string
  accion: string
  tabla: string
  descripcion: string
  usuario_email: string
  creado_en: string
}

const actionIcons: Record<string, React.ElementType> = {
  INSERT: Plus,
  UPDATE: Edit,
  DELETE: Trash2,
  LOGIN:  LogIn,
  CONFIG: Settings,
}

const actionColors: Record<string, string> = {
  INSERT: 'text-emerald-500 bg-emerald-500/10',
  UPDATE: 'text-blue-500 bg-blue-500/10',
  DELETE: 'text-red-500 bg-red-500/10',
  LOGIN:  'text-violet-500 bg-violet-500/10',
  CONFIG: 'text-amber-500 bg-amber-500/10',
}

export function ActivityLog({ limit = 20 }: { limit?: number }) {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('activity_log')
        .select('*')
        .order('creado_en', { ascending: false })
        .limit(limit)
      setLogs(data || [])
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel('activity-log-rt')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_log' }, (payload) => {
        setLogs(prev => [payload.new as LogEntry, ...prev].slice(0, limit))
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [limit])

  if (loading) return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-14 rounded-xl bg-muted/50 animate-pulse" />
      ))}
    </div>
  )

  if (!logs.length) return (
    <div className="text-center py-10 text-muted-foreground text-sm">
      No hay actividad registrada aún
    </div>
  )

  return (
    <div className="space-y-2">
      {logs.map((log, i) => {
        const Icon = actionIcons[log.accion] || Edit
        const colorCls = actionColors[log.accion] || 'text-muted-foreground bg-muted'
        return (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors"
          >
            <div className={`p-1.5 rounded-lg shrink-0 ${colorCls}`}>
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{log.descripcion}</p>
              <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User className="h-3 w-3" />{log.usuario_email}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />
                  {new Date(log.creado_en).toLocaleString('es-PE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground/50 shrink-0">{log.tabla}</span>
          </motion.div>
        )
      })}
    </div>
  )
}
