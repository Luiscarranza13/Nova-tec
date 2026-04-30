'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, MoreHorizontal, Star, Quote, Loader2, Users, TrendingUp, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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

const avatarColors = [
  'bg-violet-100 text-violet-700',
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
]

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

  const abrirNuevo = () => { setEditando(null); setForm({ nombre_cliente: '', empresa: '', comentario: '' }); setCalificacion(5); setIsDialogOpen(true) }
  const abrirEditar = (t: Testimonio) => { setEditando(t); setForm({ nombre_cliente: t.nombre_cliente, empresa: t.empresa || '', comentario: t.comentario }); setCalificacion(t.calificacion); setIsDialogOpen(true) }

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
    if (error) { toast.error('Error al actualizar'); return }
    setTestimonios(prev => prev.map(x => x.id === t.id ? { ...x, destacado: !x.destacado } : x))
  }

  const eliminar = async (id: string) => {
    const { error } = await supabase.from('testimonios').delete().eq('id', id)
    if (error) { toast.error('Error al eliminar'); return }
    setTestimonios(prev => prev.filter(t => t.id !== id))
    toast.success('Testimonio eliminado')
  }

  const filtrados = testimonios.filter(t =>
    t.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.empresa || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const promedio = testimonios.length
    ? (testimonios.reduce((a, t) => a + t.calificacion, 0) / testimonios.length).toFixed(1)
    : '0'

  const stats = [
    { label: 'Total testimonios', value: testimonios.length, icon: Users,     bg: 'bg-violet-50 border-violet-100', iconCls: 'text-violet-500', iconBg: 'bg-violet-100' },
    { label: 'Destacados',        value: testimonios.filter(t => t.destacado).length, icon: Award, bg: 'bg-amber-50 border-amber-100', iconCls: 'text-amber-500', iconBg: 'bg-amber-100' },
    { label: 'Calificación prom.',value: promedio,            icon: TrendingUp, bg: 'bg-emerald-50 border-emerald-100', iconCls: 'text-emerald-500', iconBg: 'bg-emerald-100' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-7">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-7 bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-100 mb-1">Panel Admin</p>
            <h1 className="text-3xl font-bold text-white tracking-tight">Testimonios</h1>
            <p className="text-amber-100 mt-1 text-sm">Gestiona las historias de éxito de tus clientes</p>
          </div>
          <Button onClick={abrirNuevo}
            className="rounded-xl bg-white text-amber-600 hover:bg-amber-50 border-0 shadow-md font-semibold transition-all hover:-translate-y-0.5 w-fit">
            <Plus className="mr-2 h-4 w-4" /> Nuevo Testimonio
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
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
        <Input placeholder="Buscar por nombre o empresa..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          className="pl-9 h-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl focus:border-amber-400" />
      </div>

      {/* Cards grid */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-7 w-7 animate-spin text-slate-400" /></div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtrados.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-lg transition-all duration-300">

              {/* Glow top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-slate-100 shadow-sm">
                    <AvatarFallback className={`${avatarColors[i % avatarColors.length]} text-sm font-bold`}>
                      {t.nombre_cliente.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm leading-tight">{t.nombre_cliente}</p>
                    {t.empresa && <p className="text-xs text-slate-400 mt-0.5">{t.empresa}</p>}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border-slate-200">
                    <DropdownMenuItem onClick={() => abrirEditar(t)} className="cursor-pointer hover:bg-slate-50">
                      <Edit className="mr-2 h-4 w-4" /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => eliminar(t.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer">
                      <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`h-4 w-4 ${s <= t.calificacion ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                ))}
              </div>

              {/* Quote */}
              <div className="relative pl-4 mb-5">
                <Quote className="absolute left-0 top-0.5 h-3 w-3 text-amber-300" />
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{t.comentario}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className={`text-xs px-3 py-1 rounded-full border font-medium ${t.destacado ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                  {t.destacado ? '★ Destacado' : 'Normal'}
                </span>
                <Switch checked={t.destacado} onCheckedChange={() => toggleDestacado(t)}
                  className="data-[state=checked]:bg-amber-500" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white border-slate-200">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-xl font-bold text-slate-900">{editando ? 'Editar Testimonio' : 'Nuevo Testimonio'}</DialogTitle>
            <p className="text-sm text-slate-500">{editando ? 'Modifica los datos del testimonio.' : 'Completa la información del testimonio.'}</p>
          </DialogHeader>
          <Separator className="bg-slate-100" />
          <div className="grid gap-4 py-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">Nombre <span className="text-red-500">*</span></Label>
                <Input value={form.nombre_cliente} onChange={e => setForm(p => ({ ...p, nombre_cliente: e.target.value }))}
                  placeholder="Nombre completo"
                  className="h-11 bg-white border-slate-200 rounded-xl focus:border-amber-400 text-slate-900 placeholder:text-slate-400" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">Empresa</Label>
                <Input value={form.empresa} onChange={e => setForm(p => ({ ...p, empresa: e.target.value }))}
                  placeholder="Nombre de la empresa"
                  className="h-11 bg-white border-slate-200 rounded-xl focus:border-amber-400 text-slate-900 placeholder:text-slate-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Testimonio <span className="text-red-500">*</span></Label>
              <Textarea value={form.comentario} onChange={e => setForm(p => ({ ...p, comentario: e.target.value }))}
                placeholder="Escribe el testimonio..." rows={4}
                className="bg-white border-slate-200 rounded-xl resize-none text-slate-900 placeholder:text-slate-400 focus:border-amber-400" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Calificación</Label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(star => (
                  <button key={star} type="button" onClick={() => setCalificacion(star)} className="p-1 hover:scale-110 transition-transform">
                    <Star className={`h-7 w-7 transition-colors ${star <= calificacion ? 'fill-amber-400 text-amber-400' : 'text-slate-300 hover:text-amber-300'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Separator className="bg-slate-100" />
          <DialogFooter className="pt-2 gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50">Cancelar</Button>
            <Button onClick={guardar} disabled={saving}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 rounded-xl hover:from-amber-400 hover:to-orange-400 min-w-[130px]">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Guardar Testimonio'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
