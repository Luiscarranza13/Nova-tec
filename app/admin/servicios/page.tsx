'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, MoreHorizontal, Globe, Smartphone, Code, Palette, Cloud, Lightbulb, Loader2, Wrench } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { formatCurrency } from '@/lib/utils'
import type { Servicio } from '@/lib/supabase/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Globe, Smartphone, Code, Palette, Cloud, Lightbulb }
const categoriaColors: Record<string, string> = { Desarrollo: 'bg-blue-500/10 text-blue-500', Diseño: 'bg-pink-500/10 text-pink-500', Infraestructura: 'bg-orange-500/10 text-orange-500', Consultoría: 'bg-green-500/10 text-green-500' }

export default function ServiciosPage() {
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editando, setEditando] = useState<Servicio | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ nombre: '', categoria: 'Desarrollo', precio: '', descripcion: '', icono: 'Globe' })

  const cargar = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('servicios').select('*').order('orden')
    if (error) toast.error('Error al cargar servicios')
    else setServicios(data || [])
    setLoading(false)
  }

  useEffect(() => { cargar() }, [])

  const abrirNuevo = () => {
    setEditando(null)
    setForm({ nombre: '', categoria: 'Desarrollo', precio: '', descripcion: '', icono: 'Globe' })
    setIsDialogOpen(true)
  }

  const abrirEditar = (s: Servicio) => {
    setEditando(s)
    setForm({ nombre: s.nombre, categoria: s.categoria || 'Desarrollo', precio: s.precio?.toString() || '', descripcion: s.descripcion || '', icono: s.icono || 'Globe' })
    setIsDialogOpen(true)
  }

  const guardar = async () => {
    if (!form.nombre) return toast.error('El nombre es requerido')
    setSaving(true)
    const payload = { nombre: form.nombre, categoria: form.categoria, precio: form.precio ? parseFloat(form.precio) : null, descripcion: form.descripcion || null, icono: form.icono }
    const { error } = editando
      ? await supabase.from('servicios').update(payload).eq('id', editando.id)
      : await supabase.from('servicios').insert({ ...payload, orden: servicios.length + 1, activo: true })
    if (error) toast.error('Error al guardar servicio')
    else { toast.success(editando ? 'Servicio actualizado' : 'Servicio creado'); setIsDialogOpen(false); cargar() }
    setSaving(false)
  }

  const toggleActivo = async (s: Servicio) => {
    const { error } = await supabase.from('servicios').update({ activo: !s.activo }).eq('id', s.id)
    if (error) toast.error('Error al actualizar')
    else cargar()
  }

  const eliminar = async (id: string) => {
    const { error } = await supabase.from('servicios').delete().eq('id', id)
    if (error) toast.error('Error al eliminar')
    else { toast.success('Servicio eliminado'); cargar() }
  }

  const filtrados = servicios.filter(s =>
    s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.categoria || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading tracking-tight">Servicios</h2>
          <p className="text-muted-foreground mt-1">Catálogo de servicios ofrecidos</p>
        </div>
        <Button onClick={abrirNuevo} className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" /> Nuevo Servicio
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar servicios..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-muted/30" />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : filtrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-full bg-muted/50 mb-4"><Wrench className="h-8 w-8 text-muted-foreground" /></div>
          <p className="font-medium">No hay servicios{searchTerm ? ' que coincidan' : ' aún'}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((s, i) => {
            const Icon = iconMap[s.icono || 'Code'] || Code
            const catColor = categoriaColors[s.categoria || ''] || 'bg-muted text-muted-foreground'
            return (
              <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className={`border-border/50 hover:border-border transition-all duration-200 hover:shadow-md group ${!s.activo ? 'opacity-50' : ''}`}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2.5 rounded-xl ${catColor.split(' ')[0]}`}>
                        <Icon className={`h-5 w-5 ${catColor.split(' ')[1]}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={s.activo} onCheckedChange={() => toggleActivo(s)} />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => abrirEditar(s)}><Edit className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => eliminar(s.id)}><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <h3 className="font-semibold text-base mb-1">{s.nombre}</h3>
                    <Badge variant="outline" className="text-xs mb-3">{s.categoria}</Badge>
                    {s.descripcion && <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{s.descripcion}</p>}
                    {s.precio != null && (
                      <p className="text-xl font-bold text-primary">{formatCurrency(s.precio)}</p>
                    )}
                    <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.activo ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'}`}>
                        {s.activo ? 'Activo' : 'Inactivo'}
                      </span>
                      <span className="text-xs text-muted-foreground">Orden #{s.orden}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[520px] bg-background border-border">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-xl font-bold">{editando ? 'Editar Servicio' : 'Nuevo Servicio'}</DialogTitle>
            <p className="text-sm text-muted-foreground">Completa los datos del servicio.</p>
          </DialogHeader>
          <Separator />
          <div className="grid gap-5 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Nombre <span className="text-destructive">*</span></Label>
              <Input value={form.nombre} onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))} placeholder="Ej. Desarrollo Web" className="bg-muted/20 border-border/60" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Categoría</Label>
                <Select value={form.categoria} onValueChange={v => setForm(p => ({ ...p, categoria: v }))}>
                  <SelectTrigger className="bg-muted/20 border-border/60"><SelectValue /></SelectTrigger>
                  <SelectContent>{['Desarrollo', 'Diseño', 'Infraestructura', 'Consultoría'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Ícono</Label>
                <Select value={form.icono} onValueChange={v => setForm(p => ({ ...p, icono: v }))}>
                  <SelectTrigger className="bg-muted/20 border-border/60"><SelectValue /></SelectTrigger>
                  <SelectContent>{Object.keys(iconMap).map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Precio (PEN)</Label>
              <Input type="number" value={form.precio} onChange={e => setForm(p => ({ ...p, precio: e.target.value }))} placeholder="0.00" className="bg-muted/20 border-border/60" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Descripción</Label>
              <Textarea value={form.descripcion} onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))} placeholder="Describe brevemente el servicio..." rows={3} className="bg-muted/20 border-border/60 resize-none" />
            </div>
          </div>
          <Separator />
          <DialogFooter className="pt-2 gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-border/60">Cancelar</Button>
            <Button onClick={guardar} disabled={saving} className="gap-2 min-w-[130px]">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {saving ? 'Guardando...' : 'Guardar Servicio'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
