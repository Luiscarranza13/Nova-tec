'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Mail, CheckCircle, MoreHorizontal, Trash2, Loader2, MessageSquare, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import type { Mensaje } from '@/lib/supabase/types'

export default function MensajesPage() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const cargar = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('mensajes').select('*').order('creado_en', { ascending: false })
    if (error) toast.error('Error al cargar mensajes')
    else setMensajes(data || [])
    setLoading(false)
  }

  useEffect(() => { cargar() }, [])

  const marcarLeido = async (id: string) => {
    const { error } = await supabase.from('mensajes').update({ leido: true }).eq('id', id)
    if (error) toast.error('Error al actualizar')
    else { toast.success('Marcado como leído'); cargar() }
  }

  const marcarResuelto = async (id: string) => {
    const { error } = await supabase.from('mensajes').update({ resuelto: true, leido: true }).eq('id', id)
    if (error) toast.error('Error al actualizar')
    else { toast.success('Marcado como resuelto'); cargar() }
  }

  const eliminar = async (id: string) => {
    const { error } = await supabase.from('mensajes').delete().eq('id', id)
    if (error) toast.error('Error al eliminar')
    else { toast.success('Mensaje eliminado'); cargar() }
  }

  const filtrados = mensajes.filter(m =>
    m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.asunto || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const nuevos = mensajes.filter(m => !m.leido).length
  const pendientes = mensajes.filter(m => !m.resuelto).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading tracking-tight">Mensajes</h2>
          <p className="text-muted-foreground mt-1">Mensajes de contacto recibidos</p>
        </div>
        <div className="flex items-center gap-2">
          {nuevos > 0 && <Badge className="bg-primary/10 text-primary border-primary/20">{nuevos} nuevos</Badge>}
          {pendientes > 0 && <Badge variant="outline">{pendientes} pendientes</Badge>}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total', value: mensajes.length, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Sin leer', value: nuevos, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
          { label: 'Resueltos', value: mensajes.filter(m => m.resuelto).length, color: 'text-green-500', bg: 'bg-green-500/10' },
        ].map(s => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${s.bg}`}><MessageSquare className={`h-4 w-4 ${s.color}`} /></div>
              <div><p className="text-2xl font-bold">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* List */}
      <Card className="border-border/50">
        <div className="p-4 border-b border-border/50">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar mensajes..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-muted/30" />
          </div>
        </div>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : filtrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 rounded-full bg-muted/50 mb-4"><MessageSquare className="h-8 w-8 text-muted-foreground" /></div>
              <p className="font-medium">No hay mensajes{searchTerm ? ' que coincidan' : ' aún'}</p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {filtrados.map((m, i) => (
                <motion.div key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className={`flex items-start gap-4 px-5 py-4 hover:bg-muted/20 transition-colors group ${!m.leido ? 'bg-primary/5' : ''}`}>
                  <Avatar className="h-10 w-10 shrink-0 mt-0.5">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-sm">
                      {m.nombre.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <p className="font-semibold text-sm">{m.nombre}</p>
                      {!m.leido && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                      <Badge variant={m.resuelto ? 'outline' : 'secondary'} className="text-xs">
                        {m.resuelto ? 'Resuelto' : 'Pendiente'}
                      </Badge>
                    </div>
                    {m.asunto && <p className="text-sm font-medium text-foreground/80 mb-1">{m.asunto}</p>}
                    <p className="text-sm text-muted-foreground line-clamp-2">{m.mensaje}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{m.correo}</span>
                      <span>{new Date(m.creado_en).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      {!m.leido && (
                        <DropdownMenuItem onClick={() => marcarLeido(m.id)}>
                          <Eye className="mr-2 h-4 w-4" />Marcar como leído
                        </DropdownMenuItem>
                      )}
                      {!m.resuelto && (
                        <DropdownMenuItem onClick={() => marcarResuelto(m.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />Marcar como resuelto
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => eliminar(m.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
