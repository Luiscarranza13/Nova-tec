'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Search, Mail, CheckCircle, MoreHorizontal, Reply, Trash2, Clock, Loader2, RefreshCw, Inbox, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { formatDate } from '@/lib/utils'
import { supabase } from '@/lib/supabase/client'
import type { Mensaje } from '@/lib/supabase/types'

// ── Datos ficticios de respaldo ──────────────────────────────────
const MOCK: Mensaje[] = [
  { id: '1', nombre: 'Juan Pérez',      correo: 'juan@empresa.com',    asunto: 'Consulta sobre desarrollo web',   mensaje: 'Hola, me gustaría conocer los servicios de desarrollo web que ofrecen y sus costos aproximados para un proyecto e-commerce.',  leido: false, resuelto: false, creado_en: '2024-03-18 14:30' },
  { id: '2', nombre: 'Ana López',       correo: 'ana@techstart.io',    asunto: 'Cotización para app móvil',       mensaje: 'Necesito una cotización para una aplicación móvil de entrega a domicilio con seguimiento en tiempo real para iOS y Android.',   leido: true,  resuelto: false, creado_en: '2024-03-17 10:15' },
  { id: '3', nombre: 'Carlos García',   correo: 'carlos@fincorp.mx',   asunto: 'Reunión de seguimiento',          mensaje: 'Me gustaría agendar una reunión para revisar el avance del proyecto y definir los próximos pasos del desarrollo.',              leido: true,  resuelto: true,  creado_en: '2024-03-16 09:00' },
  { id: '4', nombre: 'María Rodríguez', correo: 'maria@retailmax.com', asunto: 'Nueva funcionalidad requerida',   mensaje: 'Quisiera agregar una nueva funcionalidad a nuestra plataforma de e-commerce para mejorar la experiencia de compra del usuario.', leido: false, resuelto: false, creado_en: '2024-03-15 16:45' },
  { id: '5', nombre: 'Roberto Silva',   correo: 'roberto@medicare.mx', asunto: 'Soporte técnico urgente',         mensaje: 'Estamos experimentando problemas con el módulo de reportes. Los datos no se están actualizando correctamente desde ayer.',        leido: false, resuelto: false, creado_en: '2024-03-14 08:20' },
  { id: '6', nombre: 'Sofía Mendoza',   correo: 'sofia@edutech.com',   asunto: 'Propuesta de colaboración',       mensaje: 'Somos una startup educativa y nos interesa explorar una posible colaboración para desarrollar nuestra plataforma de aprendizaje.', leido: true,  resuelto: true,  creado_en: '2024-03-13 11:30' },
]

const avatarColors = [
  'bg-blue-100 text-blue-700',
  'bg-violet-100 text-violet-700',
  'bg-emerald-100 text-emerald-700',
  'bg-rose-100 text-rose-700',
  'bg-amber-100 text-amber-700',
  'bg-cyan-100 text-cyan-700',
]

export default function MensajesPage() {
  const [mensajes, setMensajes] = useState<Mensaje[]>(MOCK)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchMensajes = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from('mensajes').select('*').order('creado_en', { ascending: false })
    if (!error && data && data.length > 0) setMensajes(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchMensajes() }, [fetchMensajes])

  const markAsRead = async (id: string) => {
    const { error } = await supabase.from('mensajes').update({ leido: true }).eq('id', id)
    if (error) { toast.error('Error al actualizar'); return }
    setMensajes(prev => prev.map(m => m.id === id ? { ...m, leido: true } : m))
    toast.success('Marcado como leído')
  }

  const markAsResolved = async (id: string) => {
    const { error } = await supabase.from('mensajes').update({ resuelto: true, leido: true }).eq('id', id)
    if (error) { toast.error('Error al actualizar'); return }
    setMensajes(prev => prev.map(m => m.id === id ? { ...m, resuelto: true, leido: true } : m))
    toast.success('Marcado como resuelto')
  }

  const deleteMensaje = async (id: string) => {
    const { error } = await supabase.from('mensajes').delete().eq('id', id)
    if (error) { toast.error('Error al eliminar'); return }
    setMensajes(prev => prev.filter(m => m.id !== id))
    toast.success('Mensaje eliminado')
  }

  const filtered = mensajes.filter(m =>
    m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.asunto ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const unread  = mensajes.filter(m => !m.leido).length
  const pending = mensajes.filter(m => !m.resuelto).length
  const resolved = mensajes.filter(m => m.resuelto).length

  const stats = [
    { label: 'Total mensajes', value: mensajes.length, icon: MessageCircle, bg: 'bg-blue-50 border-blue-100',    iconBg: 'bg-blue-100',    iconCls: 'text-blue-500'    },
    { label: 'Sin leer',       value: unread,           icon: Inbox,         bg: 'bg-violet-50 border-violet-100', iconBg: 'bg-violet-100',  iconCls: 'text-violet-500'  },
    { label: 'Pendientes',     value: pending,          icon: Clock,         bg: 'bg-amber-50 border-amber-100',  iconBg: 'bg-amber-100',   iconCls: 'text-amber-500'   },
    { label: 'Resueltos',      value: resolved,         icon: CheckCircle,   bg: 'bg-emerald-50 border-emerald-100', iconBg: 'bg-emerald-100', iconCls: 'text-emerald-500' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-7">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-7 bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-100 mb-1">Panel Admin</p>
            <h1 className="text-3xl font-bold text-white tracking-tight">Mensajes</h1>
            <p className="text-blue-100 mt-1 text-sm">Bandeja de entrada y gestión de leads</p>
          </div>
          <div className="flex items-center gap-3">
            {unread > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 border border-white/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span className="text-sm text-white font-medium">{unread} sin leer</span>
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={fetchMensajes}
              className="h-9 w-9 rounded-xl border border-white/30 text-white hover:bg-white/20">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <div className={`rounded-2xl p-5 border ${s.bg} bg-white flex items-center gap-4`}>
              <div className={`p-3 rounded-xl ${s.iconBg} shrink-0`}>
                <s.icon className={`h-5 w-5 ${s.iconCls}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input placeholder="Buscar por nombre, correo o asunto..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          className="pl-9 h-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl focus:border-blue-400" />
      </div>

      {/* List */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm divide-y divide-slate-100">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-7 w-7 text-slate-400 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Mail className="h-10 w-10 mb-3 opacity-30" />
            <p className="text-sm font-medium">No hay mensajes</p>
          </div>
        ) : (
          filtered.map((msg, i) => (
            <motion.div key={msg.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              className={`group flex items-start gap-4 px-6 py-5 hover:bg-slate-50 transition-colors ${!msg.leido ? 'border-l-4 border-blue-500' : 'border-l-4 border-transparent'}`}>

              <Avatar className="h-12 w-12 shrink-0 border-2 border-slate-100 shadow-sm">
                <AvatarFallback className={`${avatarColors[i % avatarColors.length]} text-sm font-bold`}>
                  {msg.nombre.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                  <span className={`font-semibold text-sm ${!msg.leido ? 'text-slate-900' : 'text-slate-700'}`}>{msg.nombre}</span>
                  {!msg.leido && (
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                    </span>
                  )}
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ml-auto ${msg.resuelto ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                    {msg.resuelto ? '✓ Resuelto' : 'Pendiente'}
                  </span>
                </div>
                {msg.asunto && <p className={`text-sm mb-1.5 ${!msg.leido ? 'font-semibold text-slate-800' : 'font-medium text-slate-600'}`}>{msg.asunto}</p>}
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{msg.mensaje}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{msg.correo}</span>
                  <span>{formatDate(msg.creado_en)}</span>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon"
                    className="h-8 w-8 shrink-0 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border-slate-200 text-slate-700 w-44">
                  {!msg.leido && (
                    <DropdownMenuItem onClick={() => markAsRead(msg.id)} className="hover:bg-slate-50 cursor-pointer">
                      <CheckCircle className="mr-2 h-4 w-4 text-blue-500" /> Marcar leído
                    </DropdownMenuItem>
                  )}
                  {!msg.resuelto && (
                    <DropdownMenuItem onClick={() => markAsResolved(msg.id)} className="hover:bg-slate-50 cursor-pointer">
                      <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" /> Marcar resuelto
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => { window.location.href = `mailto:${msg.correo}?subject=Re: ${msg.asunto ?? ''}` }}
                    className="hover:bg-slate-50 cursor-pointer">
                    <Reply className="mr-2 h-4 w-4 text-violet-500" /> Responder
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteMensaje(msg.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer">
                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}
