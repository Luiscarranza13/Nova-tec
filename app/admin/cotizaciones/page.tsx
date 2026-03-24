'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, MoreHorizontal, Send, FileText, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Cotizacion, Cliente } from '@/lib/supabase/types'

const estadoColores: Record<string, string> = { borrador: 'secondary', enviada: 'info', aceptada: 'success', rechazada: 'destructive' }
const estadoLabels: Record<string, string> = { borrador: 'Borrador', enviada: 'Enviada', aceptada: 'Aceptada', rechazada: 'Rechazada' }

export default function CotizacionesPage() {
  const [cotizaciones, setCotizaciones] = useState<(Cotizacion & { clientes: Cliente | null })[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ cliente_id: '', subtotal: '', impuesto: '', notas: '', valida_hasta: '' })

  const cargar = async () => {
    setLoading(true)
    const [{ data: c }, { data: cl }] = await Promise.all([
      supabase.from('cotizaciones').select('*, clientes(*)').order('creado_en', { ascending: false }),
      supabase.from('clientes').select('*').order('nombre'),
    ])
    setCotizaciones((c as any) || [])
    setClientes(cl || [])
    setLoading(false)
  }

  useEffect(() => { cargar() }, [])

  const guardar = async () => {
    if (!form.cliente_id) return toast.error('Selecciona un cliente')
    setSaving(true)
    const subtotal = parseFloat(form.subtotal) || 0
    const impuesto = parseFloat(form.impuesto) || 0
    const { error } = await supabase.from('cotizaciones').insert({
      cliente_id: form.cliente_id,
      estado: 'borrador',
      subtotal,
      impuesto,
      total: subtotal + impuesto,
      notas: form.notas || null,
      valida_hasta: form.valida_hasta || null,
    })
    if (error) toast.error('Error al crear cotización')
    else { toast.success('Cotización creada'); setIsDialogOpen(false); setForm({ cliente_id: '', subtotal: '', impuesto: '', notas: '', valida_hasta: '' }); cargar() }
    setSaving(false)
  }

  const cambiarEstado = async (id: string, estado: string) => {
    const { error } = await supabase.from('cotizaciones').update({ estado }).eq('id', id)
    if (error) toast.error('Error al actualizar')
    else { toast.success(`Cotización marcada como ${estadoLabels[estado]}`); cargar() }
  }

  const eliminar = async (id: string) => {
    const { error } = await supabase.from('cotizaciones').delete().eq('id', id)
    if (error) toast.error('Error al eliminar')
    else { toast.success('Cotización eliminada'); cargar() }
  }

  const filtradas = cotizaciones.filter(c =>
    (c.numero || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.clientes?.nombre || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading">Cotizaciones</h2>
          <p className="text-muted-foreground">Gestiona tus cotizaciones</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Nueva Cotización</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-background border-border">
            <DialogHeader className="pb-2">
              <DialogTitle className="text-xl font-bold">Nueva Cotización</DialogTitle>
              <p className="text-sm text-muted-foreground">Crea una nueva cotización para un cliente.</p>
            </DialogHeader>
            <Separator />
            <div className="grid gap-5 py-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Cliente <span className="text-destructive">*</span></Label>
                <Select value={form.cliente_id} onValueChange={v => setForm(p => ({ ...p, cliente_id: v }))}>
                  <SelectTrigger className="bg-muted/20 border-border/60"><SelectValue placeholder="Seleccionar cliente" /></SelectTrigger>
                  <SelectContent>{clientes.map(c => <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label className="text-sm font-medium">Subtotal (MXN)</Label><Input type="number" value={form.subtotal} onChange={e => setForm(p => ({ ...p, subtotal: e.target.value }))} placeholder="0" className="bg-muted/20 border-border/60" /></div>
                <div className="space-y-2"><Label className="text-sm font-medium">Impuesto (MXN)</Label><Input type="number" value={form.impuesto} onChange={e => setForm(p => ({ ...p, impuesto: e.target.value }))} placeholder="0" className="bg-muted/20 border-border/60" /></div>
              </div>
              <div className="space-y-2"><Label className="text-sm font-medium">Válida hasta</Label><Input type="date" value={form.valida_hasta} onChange={e => setForm(p => ({ ...p, valida_hasta: e.target.value }))} className="bg-muted/20 border-border/60" /></div>
              <div className="space-y-2"><Label className="text-sm font-medium">Notas</Label><Textarea value={form.notas} onChange={e => setForm(p => ({ ...p, notas: e.target.value }))} placeholder="Notas adicionales..." className="bg-muted/20 border-border/60 resize-none" rows={3} /></div>
            </div>
            <Separator />
            <DialogFooter className="pt-2 gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-border/60">Cancelar</Button>
              <Button onClick={guardar} disabled={saving} className="gap-2 min-w-[140px]">{saving && <Loader2 className="h-4 w-4 animate-spin" />}{saving ? 'Guardando...' : 'Crear Cotización'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar cotizaciones..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : filtradas.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No hay cotizaciones{searchTerm ? ' que coincidan' : ' aún'}</p>
          ) : (
            <div className="space-y-3">
              {filtradas.map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10"><FileText className="h-5 w-5 text-primary" /></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{c.numero}</p>
                        <Badge variant={estadoColores[c.estado] as any}>{estadoLabels[c.estado]}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{c.clientes?.nombre}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden md:block text-right">
                      <p className="font-medium">{formatCurrency(c.total)}</p>
                      {c.valida_hasta && <p className="text-xs text-muted-foreground">Vence: {formatDate(c.valida_hasta)}</p>}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {c.estado === 'borrador' && <DropdownMenuItem onClick={() => cambiarEstado(c.id, 'enviada')}><Send className="mr-2 h-4 w-4" />Marcar como enviada</DropdownMenuItem>}
                        {c.estado === 'enviada' && <DropdownMenuItem onClick={() => cambiarEstado(c.id, 'aceptada')}><Send className="mr-2 h-4 w-4" />Marcar como aceptada</DropdownMenuItem>}
                        <DropdownMenuItem className="text-destructive" onClick={() => eliminar(c.id)}><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
