'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Plus, Search, Edit, Trash2, MoreHorizontal, Eye, EyeOff,
  Star, Loader2, FileText, BookOpen, TrendingUp, Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { exportToCSV } from '@/lib/export'
import type { BlogPost } from '@/lib/supabase/types'

const CATEGORIES = ['desarrollo', 'frontend', 'marketing', 'diseño', 'cloud', 'negocio']

const catColors: Record<string, string> = {
  desarrollo: 'bg-blue-100 text-blue-700',
  frontend:   'bg-violet-100 text-violet-700',
  marketing:  'bg-emerald-100 text-emerald-700',
  diseño:     'bg-pink-100 text-pink-700',
  cloud:      'bg-cyan-100 text-cyan-700',
  negocio:    'bg-amber-100 text-amber-700',
}

const emptyForm = {
  titulo: '', slug: '', extracto: '', contenido: '',
  imagen_url: '', categoria: 'desarrollo', tiempo_lectura: '5',
  publicado: false, destacado: false,
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('blog_posts').select('*').order('creado_en', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew = () => {
    setEditing(null)
    setForm(emptyForm)
    setOpen(true)
  }

  const openEdit = (p: BlogPost) => {
    setEditing(p)
    setForm({
      titulo: p.titulo, slug: p.slug, extracto: p.extracto || '',
      contenido: p.contenido || '', imagen_url: p.imagen_url || '',
      categoria: p.categoria, tiempo_lectura: String(p.tiempo_lectura),
      publicado: p.publicado, destacado: p.destacado,
    })
    setOpen(true)
  }

  const generateSlug = (title: string) =>
    title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')

  const save = async () => {
    if (!form.titulo || !form.slug) return toast.error('Título y slug son requeridos')
    setSaving(true)
    const payload = {
      titulo: form.titulo, slug: form.slug, extracto: form.extracto || null,
      contenido: form.contenido || null, imagen_url: form.imagen_url || null,
      categoria: form.categoria, tiempo_lectura: parseInt(form.tiempo_lectura) || 5,
      publicado: form.publicado, destacado: form.destacado,
      publicado_en: form.publicado ? new Date().toISOString() : null,
    }
    const { error } = editing
      ? await supabase.from('blog_posts').update(payload).eq('id', editing.id)
      : await supabase.from('blog_posts').insert(payload)
    if (error) toast.error('Error al guardar: ' + error.message)
    else { toast.success(editing ? 'Post actualizado' : 'Post creado'); setOpen(false); load() }
    setSaving(false)
  }

  const togglePublished = async (p: BlogPost) => {
    const { error } = await supabase.from('blog_posts')
      .update({ publicado: !p.publicado, publicado_en: !p.publicado ? new Date().toISOString() : null })
      .eq('id', p.id)
    if (error) { toast.error('Error'); return }
    setPosts(prev => prev.map(x => x.id === p.id ? { ...x, publicado: !x.publicado } : x))
    toast.success(!p.publicado ? 'Post publicado' : 'Post despublicado')
  }

  const del = async (id: string) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) { toast.error('Error al eliminar'); return }
    setPosts(prev => prev.filter(p => p.id !== id))
    toast.success('Post eliminado')
  }

  const filtered = posts.filter(p =>
    p.titulo.toLowerCase().includes(search.toLowerCase()) ||
    p.categoria.toLowerCase().includes(search.toLowerCase())
  )

  const stats = [
    { label: 'Total posts',  value: posts.length,                          icon: FileText,   bg: 'bg-violet-50 border-violet-100', ic: 'text-violet-500', ib: 'bg-violet-100' },
    { label: 'Publicados',   value: posts.filter(p => p.publicado).length, icon: Eye,        bg: 'bg-emerald-50 border-emerald-100', ic: 'text-emerald-500', ib: 'bg-emerald-100' },
    { label: 'Destacados',   value: posts.filter(p => p.destacado).length, icon: Star,       bg: 'bg-amber-50 border-amber-100', ic: 'text-amber-500', ib: 'bg-amber-100' },
    { label: 'Borradores',   value: posts.filter(p => !p.publicado).length,icon: BookOpen,   bg: 'bg-slate-50 border-slate-100', ic: 'text-slate-500', ib: 'bg-slate-100' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-7 bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-200 mb-1">Panel Admin</p>
            <h1 className="text-3xl font-bold text-white tracking-tight">Blog</h1>
            <p className="text-violet-200 mt-1 text-sm">Gestiona los artículos y contenido del blog</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => exportToCSV(posts, 'blog-posts')}
              className="rounded-xl border border-white/30 text-white hover:bg-white/20 gap-2">
              <Download className="h-4 w-4" /> CSV
            </Button>
            <Button onClick={openNew}
              className="rounded-xl bg-white text-violet-600 hover:bg-violet-50 border-0 shadow-md font-semibold gap-2">
              <Plus className="h-4 w-4" /> Nuevo Post
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div className={`rounded-2xl p-5 border ${s.bg} bg-white flex items-center gap-4`}>
              <div className={`p-3 rounded-xl ${s.ib} shrink-0`}><s.icon className={`h-5 w-5 ${s.ic}`} /></div>
              <div><p className="text-2xl font-bold text-slate-900">{s.value}</p><p className="text-xs text-slate-500 mt-0.5">{s.label}</p></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input placeholder="Buscar posts..." value={search} onChange={e => setSearch(e.target.value)}
          className="pl-9 h-10 bg-white border-slate-200 rounded-xl" />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-7 w-7 animate-spin text-slate-400" /></div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-slate-400">
            <FileText className="h-10 w-10 mb-3 opacity-30" />
            <p className="text-sm">No hay posts{search ? ' que coincidan' : ' aún'}</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="group flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-slate-900 truncate">{p.titulo}</p>
                    {p.destacado && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${catColors[p.categoria] || 'bg-slate-100 text-slate-600'}`}>{p.categoria}</span>
                    <span>{p.tiempo_lectura} min lectura</span>
                    {p.publicado_en && <span>{new Date(p.publicado_en).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${p.publicado ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                    {p.publicado ? 'Publicado' : 'Borrador'}
                  </span>
                  <Switch checked={p.publicado} onCheckedChange={() => togglePublished(p)}
                    className="data-[state=checked]:bg-emerald-500" />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => openEdit(p)}><Edit className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => del(p.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar Post' : 'Nuevo Post'}</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="grid gap-4 py-4">
            <div className="space-y-1.5">
              <Label>Título *</Label>
              <Input value={form.titulo} onChange={e => {
                const t = e.target.value
                setForm(p => ({ ...p, titulo: t, slug: editing ? p.slug : generateSlug(t) }))
              }} placeholder="Título del artículo" />
            </div>
            <div className="space-y-1.5">
              <Label>Slug *</Label>
              <Input value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} placeholder="url-del-articulo" className="font-mono text-sm" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Categoría</Label>
                <Select value={form.categoria} onValueChange={v => setForm(p => ({ ...p, categoria: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Tiempo de lectura (min)</Label>
                <Input type="number" min="1" value={form.tiempo_lectura} onChange={e => setForm(p => ({ ...p, tiempo_lectura: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Extracto</Label>
              <Textarea value={form.extracto} onChange={e => setForm(p => ({ ...p, extracto: e.target.value }))} rows={2} placeholder="Breve descripción del artículo..." className="resize-none" />
            </div>
            <div className="space-y-1.5">
              <Label>Contenido (Markdown)</Label>
              <Textarea value={form.contenido} onChange={e => setForm(p => ({ ...p, contenido: e.target.value }))} rows={8} placeholder="# Título&#10;&#10;Contenido en Markdown..." className="font-mono text-sm resize-none" />
            </div>
            <div className="space-y-1.5">
              <Label>URL de imagen de portada</Label>
              <Input value={form.imagen_url} onChange={e => setForm(p => ({ ...p, imagen_url: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <Switch checked={form.publicado} onCheckedChange={v => setForm(p => ({ ...p, publicado: v }))} />
                <span className="text-sm font-medium">Publicado</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Switch checked={form.destacado} onCheckedChange={v => setForm(p => ({ ...p, destacado: v }))} />
                <span className="text-sm font-medium">Destacado</span>
              </label>
            </div>
          </div>
          <Separator />
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={save} disabled={saving} className="min-w-[120px]">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : (editing ? 'Actualizar' : 'Crear Post')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
