'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, MoreHorizontal, Calendar, Loader2, FolderKanban } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { formatCurrency } from '@/lib/utils'
import type { Proyecto, Cliente } from '@/lib/supabase/types'

const estadoConfig: Record<string, { label: string; variant: string; dot: string }> = {
  pendiente:   { label: 'Pendiente',   variant: 'warning',     dot: 'bg-yellow-500' },
  en_progreso: { label: 'En Progreso', variant: 'info',        dot: 'bg-blue-500' },
  en_revision: { label: 'En Revisión', variant: 'secondary',   dot: 'bg-purple-500' },
  completado:  { label: 'Completado',  variant: 'success',     dot: 'bg-green-500' },
  cancelado:   { label: 'Cancelado',   variant: 'destructive', dot: 'bg-red-500' },
}

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<(Proyecto & { clientes: Cliente | null })[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [estadoFiltro, setEstadoFiltro] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editando, setEditando] = useState<Proyecto | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ nombre: '', cliente_id: '', estado: 'pendiente', presupuesto: '', progreso: '0', descripcion: '', fecha_inicio: '', fecha_fin: '' })

  const cargar = async () => {
    setLoading(true)
    const [{ data: p }, { data: c }] = await Promise.all([
      supabase.from('proyectos').select('*, clientes(*)').order('creado_en', { ascending: false }),
      supabase.from('clientes').select('*').order('nombre'),
    ])
    setProyectos((p as any) || [])
    setClientes(c || [])
    setLoading(false)
  }

  useEffect(() => { cargar() }, [])

  const abrirNuevo = () => {
    setEditando(null)
    setForm({ nombre: '', cliente_id: '', estado: 'pendiente', presupuesto: '', progreso: '0', descripcion: '', fecha_inicio: '', fecha_fin: '' })
    setIsDialogOpen(true)
  }

  const abrirEditar = (p: Proyecto) => {
    setEditando(p)
    setForm({ nombre: p.nombre, cliente_id: p.cliente_id || '', estado: p.estado, presupuesto: p.presupuesto?.toString() || '', progreso: p.progreso.toString(), descripcion: p.descripcion || '', fecha_inicio: p.fecha_inicio || '', fecha_fin: p.fecha_fin || '' })
    setIsDialogOpen(true)
  }

  const guardar = async () => {
    if (!form.nombre) return toast.error('El nombre es requerido')
    setSaving(true)
    const payload = { nombre: form.nombre, cliente_id: form.cliente_id || null, estado: form.estado, presupuesto: form.presupuesto ? parseFloat(form.presupuesto) : null, progreso: parseInt(form.progreso) || 0, descripcion: form.descripcion || null, fecha_inicio: form.fecha_inicio || null, fecha_fin: form.fecha_fin || null }
    const { error } = editando
      ? await supabase.from('proyectos').update(payload).eq('id', editando.id)
      : await supabase.from('proyectos').insert(payload)
    if (error) toast.error('Error al guardar proyecto')
    else { toast.success(editando ? 'Proyecto actualizado' : 'Proyecto creado'); setIsDialogOpen(false); cargar() }
    setSaving(false)
  }

  const eliminar = async (id: string) => {
    const { error } = await supabase.from('proyectos').delete().eq('id', id)
    if (error) toast.error('Error al eliminar')
    else { toast.success('Proyecto eliminado'); cargar() }
  }

  const filtrados = proyectos.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || (p.clientes?.nombre || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchEstado = estadoFiltro === 'all' || p.estado === estadoFiltro
    return matchSearch && matchEstado
  })

  const countByEstado = (e: string) => proyectos.filter(p => p.estado === e).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">Proyectos</h2>
          <p className="text-slate-500 mt-1 text-sm">Seguimiento y gestión de proyectos</p>
        </div>
        <Button onClick={abrirNuevo} className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
          <Plus className="h-4 w-4" /> Nuevo Proyecto
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'En Progreso', count: countByEstado('en_progreso'), dot: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
          { label: 'En Revisión', count: countByEstado('en_revision'), dot: 'bg-purple-500', bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
          { label: 'Completados', count: countByEstado('completado'), dot: 'bg-green-500', bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' },
          { label: 'Pendientes', count: countByEstado('pendiente'), dot: 'bg-yellow-500', bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-100' },
        ].map(s => (
          <Card key={s.label} className={`border ${s.border} bg-white shadow-sm`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${s.bg}`}><FolderKanban className={`h-4 w-4 ${s.text}`} /></div>
              <div><p className="text-2xl font-bold text-slate-900">{s.count}</p><p className="text-xs text-slate-500">{s.label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters + List */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Buscar proyectos..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Select value={estadoFiltro} onValueChange={setEstadoFiltro}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filtrar estado" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              {Object.entries(estadoConfig).map(([v, c]) => <SelectItem key={v} value={v}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-indigo-600" /></div>
          ) : filtrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 rounded-full bg-slate-100 mb-4"><FolderKanban className="h-8 w-8 text-slate-400" /></div>
              <p className="font-medium text-slate-700">No hay proyectos{searchTerm ? ' que coincidan' : ' aún'}</p>
              <p className="text-sm text-slate-400 mt-1">{searchTerm ? 'Intenta con otro término' : 'Crea tu primer proyecto'}</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtrados.map((p, i) => {
                const cfg = estadoConfig[p.estado]
                return (
                  <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-slate-900">{p.nombre}</p>
                          <Badge variant={cfg.variant as any} className="text-xs">{cfg.label}</Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                          {p.clientes && <span>{p.clientes.nombre}</span>}
                          {p.fecha_inicio && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{p.fecha_inicio}{p.fecha_fin ? ` → ${p.fecha_fin}` : ''}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      {p.presupuesto != null && (
                        <div className="hidden md:block text-right">
                          <p className="text-sm font-semibold text-slate-900">{formatCurrency(p.presupuesto)}</p>
                          <p className="text-xs text-slate-400">Presupuesto</p>
                        </div>
                      )}
                      <div className="w-28 hidden sm:block">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-400">Progreso</span>
                          <span className="font-medium text-slate-700">{p.progreso}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${p.progreso}%` }} />
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-slate-500 hover:text-slate-900 hover:bg-slate-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => abrirEditar(p)}><Edit className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => eliminar(p.id)}><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-xl font-bold text-slate-900">{editando ? 'Editar Proyecto' : 'Nuevo Proyecto'}</DialogTitle>
            <p className="text-sm text-slate-500">Completa los datos del proyecto.</p>
          </DialogHeader>
          <Separator className="bg-slate-100" />
          <div className="grid gap-5 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Nombre del Proyecto <span className="text-red-500">*</span></Label>
              <Input value={form.nombre} onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))} placeholder="Ej. E-commerce Platform" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Cliente</Label>
                <Select value={form.cliente_id} onValueChange={v => setForm(p => ({ ...p, cliente_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar cliente" /></SelectTrigger>
                  <SelectContent>{clientes.map(c => <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Estado</Label>
                <Select value={form.estado} onValueChange={v => setForm(p => ({ ...p, estado: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{Object.entries(estadoConfig).map(([v, c]) => <SelectItem key={v} value={v}>{c.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Presupuesto (MXN)</Label>
                <Input type="number" value={form.presupuesto} onChange={e => setForm(p => ({ ...p, presupuesto: e.target.value }))} placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Progreso (%)</Label>
                <Input type="number" min="0" max="100" value={form.progreso} onChange={e => setForm(p => ({ ...p, progreso: e.target.value }))} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Fecha de Inicio</Label>
                <Input type="date" value={form.fecha_inicio} onChange={e => setForm(p => ({ ...p, fecha_inicio: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Fecha de Fin</Label>
                <Input type="date" value={form.fecha_fin} onChange={e => setForm(p => ({ ...p, fecha_fin: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Descripción</Label>
              <Textarea value={form.descripcion} onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))} placeholder="Descripción del proyecto..." rows={3} className="resize-none" />
            </div>
          </div>
          <Separator className="bg-slate-100" />
          <DialogFooter className="pt-2 gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200 text-slate-700 hover:bg-slate-50">Cancelar</Button>
            <Button onClick={guardar} disabled={saving} className="gap-2 min-w-[130px] bg-indigo-600 hover:bg-indigo-700">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {saving ? 'Guardando...' : 'Guardar Proyecto'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
