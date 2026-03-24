'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, MoreHorizontal, Star, Quote, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import type { Testimonio } from '@/lib/supabase/types'

export default function TestimoniosPage() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editando, setEditando] = useState<Testimonio | null>(null)
  const [saving, setSaving] = useState(false)
  const [calificacion, setCalificacion] = useState(5)
  const [form, setForm] = useState({ nombre_cliente: '', empresa: '', comentario: '' })

  const cargar = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('testimonios').select('*').order('creado_en', { ascending: false })
    if (error) toast.error('Error al cargar testimonios')
    else setTestimonios(data || [])
    setLoading(false)
  }

  useEffect(() => { cargar() }, [])

  const abrirNuevo = () => {
    setEditando(null)
    setForm({ nombre_cliente: '', empresa: '', comentario: '' })
    setCalificacion(5)
    setIsDialogOpen(true)
  }

  const abrirEditar = (t: Testimonio) => {
    setEditando(t)
    setForm({ nombre_cliente: t.nombre_cliente, empresa: t.empresa || '', comentario: t.comentario })
    setCalificacion(t.calificacion)
    setIsDialogOpen(true)
  }

  const guardar = async () => {
    if (!form.nombre_cliente || !form.comentario) return toast.error('Nombre y comentario son requeridos')
    setSaving(true)
    const payload = { nombre_cliente: form.nombre_cliente, empresa: form.empresa || null, comentario: form.comentario, calificacion }
    const { error } = editando
      ? await supabase.from('testimonios').update(payload).eq('id', editando.id)
      : await supabase.from('testimonios').insert({ ...payload, destacado: false })
    if (error) toast.error('Error al guardar')
    else { toast.success(editando ? 'Testimonio actualizado' : 'Testimonio creado'); setIsDialogOpen(false); cargar() }
    setSaving(false)
  }

  const toggleDestacado = async (t: Testimonio) => {
    const { error } = await supabase.from('testimonios').update({ destacado: !t.destacado }).eq('id', t.id)
    if (error) toast.error('Error al actualizar')
    else cargar()
  }

  const eliminar = async (id: string) => {
    const { error } = await supabase.from('testimonios').delete().eq('id', id)
    if (error) toast.error('Error al eliminar')
    else { toast.success('Testimonio eliminado'); cargar() }
  }

  const filtrados = testimonios.filter(t =>
    t.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.empresa || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading tracking-tight">Testimonios</h2>
          <p className="text-muted-foreground mt-1">Gestiona los testimonios de tus clientes</p>
        </div>
        <Button onClick={abrirNuevo} className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" /> Nuevo Testimonio
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total', value: testimonios.length, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Destacados', value: testimonios.filter(t => t.destacado).length, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
          { label: 'Calificación promedio', value: testimonios.length ? (testimonios.reduce((a, t) => a + t.calificacion, 0) / testimonios.length).toFixed(1) : '—', color: 'text-green-500', bg: 'bg-green-500/10' },
        ].map(s => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${s.bg}`}><Star className={`h-4 w-4 ${s.color}`} /></div>
              <div><p className="text-2xl font-bold">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="border-border/50">
        <div className="p-4 border-b border-border/50">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar testimonios..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-muted/30" />
          </div>
        </div>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : filtrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 rounded-full bg-muted/50 mb-4"><Star className="h-8 w-8 text-muted-foreground" /></div>
              <p className="font-medium">No hay testimonios{searchTerm ? ' que coincidan' : ' aún'}</p>
              <p className="text-sm text-muted-foreground mt-1">{searchTerm ? 'Intenta con otro término' : 'Agrega el primer testimonio'}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x-0">
              {filtrados.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="p-5 hover:bg-muted/20 transition-colors group border-b border-border/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-sm">
                          {t.nombre_cliente.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{t.nombre_cliente}</p>
                        {t.empresa && <p className="text-xs text-muted-foreground">{t.empresa}</p>}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => abrirEditar(t)}><Edit className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => eliminar(t.id)}><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`h-3.5 w-3.5 ${s <= t.calificacion ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground/30'}`} />
                    ))}
                  </div>
                  <div className="relative pl-4">
                    <Quote className="absolute top-0 left-0 h-3.5 w-3.5 text-primary/30" />
                    <p className="text-sm text-muted-foreground line-clamp-3">{t.comentario}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/40">
                    <Badge variant={t.destacado ? 'default' : 'outline'} className="text-xs">
                      {t.destacado ? 'Destacado' : 'Normal'}
                    </Badge>
                    <Switch checked={t.destacado} onCheckedChange={() => toggleDestacado(t)} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-background border-border">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-xl font-bold">{editando ? 'Editar Testimonio' : 'Nuevo Testimonio'}</DialogTitle>
            <p className="text-sm text-muted-foreground">{editando ? 'Modifica los datos del testimonio.' : 'Completa la información del testimonio.'}</p>
          </DialogHeader>
          <Separator />
          <div className="grid gap-5 py-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nombre <span className="text-destructive">*</span></Label>
                <Input value={form.nombre_cliente} onChange={e => setForm(p => ({ ...p, nombre_cliente: e.target.value }))} placeholder="Nombre completo" className="bg-muted/20 border-border/60" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Empresa</Label>
                <Input value={form.empresa} onChange={e => setForm(p => ({ ...p, empresa: e.target.value }))} placeholder="Nombre de la empresa" className="bg-muted/20 border-border/60" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Testimonio <span className="text-destructive">*</span></Label>
              <Textarea value={form.comentario} onChange={e => setForm(p => ({ ...p, comentario: e.target.value }))} placeholder="Escribe el testimonio..." rows={4} className="bg-muted/20 border-border/60 resize-none" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Calificación</Label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(star => (
                  <button key={star} type="button" onClick={() => setCalificacion(star)} className="p-1 hover:scale-110 transition-transform">
                    <Star className={`h-6 w-6 transition-colors ${star <= calificacion ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground/40 hover:text-yellow-400'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Separator />
          <DialogFooter className="pt-2 gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-border/60">Cancelar</Button>
            <Button onClick={guardar} disabled={saving} className="gap-2 min-w-[130px]">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {saving ? 'Guardando...' : 'Guardar Testimonio'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
