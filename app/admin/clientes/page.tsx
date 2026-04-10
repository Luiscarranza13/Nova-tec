'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, MoreHorizontal, Mail, Phone, Building, Loader2, Users, Download } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { exportToCSV } from '@/lib/export'
import type { Cliente } from '@/lib/supabase/types'

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editando, setEditando] = useState<Cliente | null>(null)
  const [form, setForm] = useState({ nombre: '', correo: '', empresa: '', telefono: '', notas: '' })
  const [saving, setSaving] = useState(false)

  const cargar = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('clientes').select('*').order('creado_en', { ascending: false })
    if (error) toast.error('Error al cargar clientes')
    else setClientes(data || [])
    setLoading(false)
  }

  useEffect(() => { cargar() }, [])

  const abrirNuevo = () => {
    setEditando(null)
    setForm({ nombre: '', correo: '', empresa: '', telefono: '', notas: '' })
    setIsDialogOpen(true)
  }

  const abrirEditar = (c: Cliente) => {
    setEditando(c)
    setForm({ nombre: c.nombre, correo: c.correo, empresa: c.empresa || '', telefono: c.telefono || '', notas: c.notas || '' })
    setIsDialogOpen(true)
  }

  const guardar = async () => {
    if (!form.nombre || !form.correo) return toast.error('Nombre y correo son requeridos')
    setSaving(true)
    const payload = { nombre: form.nombre, correo: form.correo, empresa: form.empresa || null, telefono: form.telefono || null, notas: form.notas || null }
    const { error } = editando
      ? await supabase.from('clientes').update(payload).eq('id', editando.id)
      : await supabase.from('clientes').insert(payload)
    if (error) toast.error('Error al guardar cliente')
    else { toast.success(editando ? 'Cliente actualizado' : 'Cliente creado'); setIsDialogOpen(false); cargar() }
    setSaving(false)
  }

  const eliminar = async (id: string) => {
    const { error } = await supabase.from('clientes').delete().eq('id', id)
    if (error) toast.error('Error al eliminar cliente')
    else { toast.success('Cliente eliminado'); cargar() }
  }

  const filtrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.empresa || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">Clientes</h2>
          <p className="text-slate-500 mt-1 text-sm">Administra tu base de clientes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => exportToCSV(clientes, 'clientes')} className="gap-2 border-slate-200">
            <Download className="h-4 w-4" /> Exportar CSV
          </Button>
          <Button onClick={abrirNuevo} className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            <Plus className="h-4 w-4" /> Nuevo Cliente
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total clientes', value: clientes.length, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
          { label: 'Este mes', value: clientes.filter(c => new Date(c.creado_en).getMonth() === new Date().getMonth()).length, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
          { label: 'Con empresa', value: clientes.filter(c => c.empresa).length, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
        ].map(s => (
          <Card key={s.label} className={`border ${s.border} bg-white shadow-sm`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${s.bg}`}><Users className={`h-4 w-4 ${s.color}`} /></div>
              <div><p className="text-2xl font-bold text-slate-900">{s.value}</p><p className="text-xs text-slate-500">{s.label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Table */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Buscar por nombre, correo o empresa..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </div>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-indigo-600" /></div>
          ) : filtrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 rounded-full bg-slate-100 mb-4"><Users className="h-8 w-8 text-slate-400" /></div>
              <p className="font-medium text-slate-700">No hay clientes{searchTerm ? ' que coincidan' : ' aún'}</p>
              <p className="text-sm text-slate-400 mt-1">{searchTerm ? 'Intenta con otro término' : 'Crea tu primer cliente'}</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtrados.map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4 min-w-0">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold text-sm">
                        {c.nombre.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{c.nombre}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Mail className="h-3 w-3" />{c.correo}</span>
                        {c.empresa && <span className="text-xs text-slate-400 hidden sm:flex items-center gap-1"><Building className="h-3 w-3" />{c.empresa}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    {c.telefono && <span className="hidden md:flex items-center gap-1 text-sm text-slate-400"><Phone className="h-3 w-3" />{c.telefono}</span>}
                    <Badge variant="outline" className="hidden sm:flex text-xs border-slate-200 text-slate-600">{c.empresa || 'Sin empresa'}</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-slate-500 hover:text-slate-900 hover:bg-slate-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => abrirEditar(c)}><Edit className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => eliminar(c.id)}><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-xl font-bold text-slate-900">{editando ? 'Editar Cliente' : 'Nuevo Cliente'}</DialogTitle>
            <p className="text-sm text-slate-500">{editando ? 'Modifica los datos del cliente.' : 'Completa la información para registrar un nuevo cliente.'}</p>
          </DialogHeader>
          <Separator className="bg-slate-100" />
          <div className="grid gap-5 py-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Nombre <span className="text-red-500">*</span></Label>
                <Input value={form.nombre} onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))} placeholder="Nombre completo" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Correo <span className="text-red-500">*</span></Label>
                <Input type="email" value={form.correo} onChange={e => setForm(p => ({ ...p, correo: e.target.value }))} placeholder="email@empresa.com" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Empresa</Label>
                <Input value={form.empresa} onChange={e => setForm(p => ({ ...p, empresa: e.target.value }))} placeholder="Nombre de la empresa" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Teléfono</Label>
                <Input value={form.telefono} onChange={e => setForm(p => ({ ...p, telefono: e.target.value }))} placeholder="+52 55 1234 5678" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Notas</Label>
              <Textarea value={form.notas} onChange={e => setForm(p => ({ ...p, notas: e.target.value }))} placeholder="Información adicional sobre el cliente..." rows={3} className="resize-none" />
            </div>
          </div>
          <Separator className="bg-slate-100" />
          <DialogFooter className="pt-2 gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200 text-slate-700 hover:bg-slate-50">Cancelar</Button>
            <Button onClick={guardar} disabled={saving} className="gap-2 min-w-[120px] bg-indigo-600 hover:bg-indigo-700">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {saving ? 'Guardando...' : 'Guardar Cliente'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
