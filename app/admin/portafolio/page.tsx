'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Plus, Search, Edit, Trash2, MoreHorizontal, ExternalLink,
  Loader2, Globe, Star, Download, Eye, EyeOff,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { exportToCSV } from '@/lib/export'
import type { PortafolioItem } from '@/lib/supabase/types'
import Image from 'next/image'
import { TechSelector } from '@/components/ui/tech-selector'

const CATEGORIES = ['Web', 'Móvil', 'Dashboard', 'E-commerce', 'SaaS', 'Otro']

const emptyForm = {
  nombre: '', descripcion: '', imagen_url: '', tecnologias: [] as string[],
  url_demo: '', url_repo: '', categoria: 'Web', cliente: '',
  resultado: '', destacado: false, publicado: true, orden: '0',
}

export default function PortafolioAdminPage() {
  const [items, setItems] = useState<PortafolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<PortafolioItem | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('elementos_portafolio').select('*').order('orden')
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew = () => { setEditing(null); setForm(emptyForm); setOpen(true) }
  const openEdit = (item: PortafolioItem) => {
    setEditing(item)
    setForm({
      nombre: item.nombre, descripcion: item.descripcion || '',
      imagen_url: item.imagen_url || '', tecnologias: item.tecnologias || [],
      url_demo: item.url_demo || '', url_repo: item.url_repositorio || '',
      categoria: item.categoria, cliente: item.cliente || '',
      resultado: item.resultado || '', destacado: item.destacado,
      publicado: item.publicado, orden: String(item.orden),
    })
    setOpen(true)
  }

  const save = async () => {
    if (!form.nombre) return toast.error('El nombre es requerido')
    setSaving(true)
    const payload = {
      nombre: form.nombre, descripcion: form.descripcion || null,
      imagen_url: (form.imagen_url && (form.imagen_url.startsWith('http://') || form.imagen_url.startsWith('https://'))) ? form.imagen_url : null,
      tecnologias: form.tecnologias.length > 0 ? form.tecnologias : null,
      url_demo: form.url_demo || null, url_repositorio: form.url_repo || null,
      categoria: form.categoria, cliente: form.cliente || null,
      resultado: form.resultado || null, destacado: form.destacado,
      publicado: form.publicado, orden: parseInt(form.orden) || 0,
    }
    const { error } = editing
      ? await supabase.from('elementos_portafolio').update(payload).eq('id', editing.id)
      : await supabase.from('elementos_portafolio').insert(payload)
    if (error) toast.error('Error: ' + error.message)
    else { toast.success(editing ? 'Item actualizado' : 'Item creado'); setOpen(false); load() }
    setSaving(false)
  }

  const del = async (id: string) => {
    const { error } = await supabase.from('elementos_portafolio').delete().eq('id', id)
    if (error) { toast.error('Error al eliminar'); return }
    setItems(prev => prev.filter(i => i.id !== id))
    toast.success('Item eliminado')
  }

  const togglePublished = async (item: PortafolioItem) => {
    await supabase.from('elementos_portafolio').update({ publicado: !item.publicado }).eq('id', item.id)
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, publicado: !i.publicado } : i))
  }

  const filtered = items.filter(i =>
    i.nombre.toLowerCase().includes(search.toLowerCase()) ||
    (i.cliente || '').toLowerCase().includes(search.toLowerCase()) ||
    i.categoria.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-7 bg-gradient-to-br from-cyan-600 to-teal-600 shadow-lg shadow-cyan-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-200 mb-1">Panel Admin</p>
            <h1 className="text-3xl font-bold text-white tracking-tight">Portafolio</h1>
            <p className="text-cyan-200 mt-1 text-sm">Gestiona los proyectos públicos del portafolio</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => exportToCSV(items, 'portafolio')}
              className="rounded-xl border border-white/30 text-white hover:bg-white/20 gap-2">
              <Download className="h-4 w-4" /> CSV
            </Button>
            <Button onClick={openNew}
              className="rounded-xl bg-white text-cyan-600 hover:bg-cyan-50 border-0 shadow-md font-semibold gap-2">
              <Plus className="h-4 w-4" /> Nuevo Item
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total items',  value: items.length,                          color: 'text-cyan-600',    bg: 'bg-cyan-50 border-cyan-100' },
          { label: 'Publicados',   value: items.filter(i => i.publicado).length, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
          { label: 'Destacados',   value: items.filter(i => i.destacado).length, color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-100' },
          { label: 'Categorías',   value: new Set(items.map(i => i.categoria)).size, color: 'text-violet-600', bg: 'bg-violet-50 border-violet-100' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div className={`rounded-2xl p-5 border ${s.bg} bg-white`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input placeholder="Buscar por nombre, cliente o categoría..." value={search} onChange={e => setSearch(e.target.value)}
          className="pl-9 h-10 bg-white border-slate-200 rounded-xl" />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-7 w-7 animate-spin text-slate-400" /></div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Image */}
              <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                {item.imagen_url && (item.imagen_url.startsWith('http://') || item.imagen_url.startsWith('https://') || item.imagen_url.startsWith('/')) ? (
                  <Image src={item.imagen_url} alt={item.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="400px" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Globe className="h-12 w-12 text-slate-300" />
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/40 text-white backdrop-blur-sm">{item.categoria}</span>
                  {item.destacado && <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/80 text-white backdrop-blur-sm">★ Destacado</span>}
                </div>
                {!item.publicado && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">No publicado</span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-slate-900 leading-tight">{item.nombre}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => openEdit(item)}><Edit className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                      {item.url_demo && (
                        <DropdownMenuItem onClick={() => window.open(item.url_demo!, '_blank')}>
                          <ExternalLink className="mr-2 h-4 w-4" />Ver demo
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600 focus:bg-red-50" onClick={() => del(item.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {item.cliente && <p className="text-xs text-slate-400 mb-2">{item.cliente}</p>}
                {item.resultado && (
                  <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-medium mb-3">
                    {item.resultado}
                  </span>
                )}
                {item.tecnologias && item.tecnologias.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tecnologias.slice(0, 3).map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500">{t}</span>
                    ))}
                    {item.tecnologias.length > 3 && <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500">+{item.tecnologias.length - 3}</span>}
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-400">Orden #{item.orden}</span>
                  <Switch checked={item.publicado} onCheckedChange={() => togglePublished(item)}
                    className="data-[state=checked]:bg-emerald-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">{editing ? 'Editar Item' : 'Nuevo Item de Portafolio'}</DialogTitle>
          </DialogHeader>
          <Separator className="bg-slate-100" />
          <div className="grid gap-4 py-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-700">Nombre *</Label>
                <Input value={form.nombre} onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))} placeholder="Nombre del proyecto"
                  className="h-11 bg-white border-slate-200 rounded-xl focus:border-cyan-400 text-slate-900 placeholder:text-slate-400" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-700">Categoría</Label>
                <Select value={form.categoria} onValueChange={v => setForm(p => ({ ...p, categoria: v }))}>
                  <SelectTrigger className="h-11 bg-white border-slate-200 rounded-xl focus:border-cyan-400"><SelectValue /></SelectTrigger>
                  <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-slate-700">Descripción</Label>
              <Textarea value={form.descripcion} onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))} rows={3}
                className="bg-white border-slate-200 rounded-xl resize-none text-slate-900 placeholder:text-slate-400 focus:border-cyan-400" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-700">Cliente</Label>
                <Input value={form.cliente} onChange={e => setForm(p => ({ ...p, cliente: e.target.value }))} placeholder="Nombre del cliente"
                  className="h-11 bg-white border-slate-200 rounded-xl focus:border-cyan-400 text-slate-900 placeholder:text-slate-400" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-700">Resultado / Métrica</Label>
                <Input value={form.resultado} onChange={e => setForm(p => ({ ...p, resultado: e.target.value }))} placeholder="+180% ventas"
                  className="h-11 bg-white border-slate-200 rounded-xl focus:border-cyan-400 text-slate-900 placeholder:text-slate-400" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-slate-700">Tecnologías utilizadas</Label>
              <TechSelector value={form.tecnologias} onChange={techs => setForm(p => ({ ...p, tecnologias: techs }))} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-700">URL Demo</Label>
                <Input value={form.url_demo} onChange={e => setForm(p => ({ ...p, url_demo: e.target.value }))} placeholder="https://..."
                  className="h-11 bg-white border-slate-200 rounded-xl focus:border-cyan-400 text-slate-900 placeholder:text-slate-400" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-700">URL Repositorio</Label>
                <Input value={form.url_repo} onChange={e => setForm(p => ({ ...p, url_repo: e.target.value }))} placeholder="https://github.com/..."
                  className="h-11 bg-white border-slate-200 rounded-xl focus:border-cyan-400 text-slate-900 placeholder:text-slate-400" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-slate-700">URL Imagen</Label>
              <Input value={form.imagen_url} onChange={e => setForm(p => ({ ...p, imagen_url: e.target.value }))} placeholder="https://..."
                className="h-11 bg-white border-slate-200 rounded-xl focus:border-cyan-400 text-slate-900 placeholder:text-slate-400" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-700">Orden</Label>
                <Input type="number" value={form.orden} onChange={e => setForm(p => ({ ...p, orden: e.target.value }))} min="0"
                  className="h-11 bg-white border-slate-200 rounded-xl focus:border-cyan-400 text-slate-900" />
              </div>
              <div className="flex items-end gap-6 pb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Switch checked={form.publicado} onCheckedChange={v => setForm(p => ({ ...p, publicado: v }))} />
                  <span className="text-sm font-medium text-slate-700">Publicado</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Switch checked={form.destacado} onCheckedChange={v => setForm(p => ({ ...p, destacado: v }))} />
                  <span className="text-sm font-medium text-slate-700">Destacado</span>
                </label>
              </div>
            </div>
          </div>
          <Separator className="bg-slate-100" />
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl">Cancelar</Button>
            <Button onClick={save} disabled={saving} className="min-w-[120px] bg-cyan-600 hover:bg-cyan-700 rounded-xl">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : (editing ? 'Actualizar' : 'Crear Item')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
