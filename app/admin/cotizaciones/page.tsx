'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Plus, Search, Send, FileText, Loader2,
  CheckCircle, Clock, DollarSign, MoreHorizontal,
  Trash2, TrendingUp, RefreshCw, XCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

const MOCK_COTIZACIONES = [
  { id: '1', numero: 'COT-2024-001', estado: 'aceptada',  subtotal: 45000, impuesto: 7200,  total: 52200, notas: 'Desarrollo de e-commerce con pasarela de pago integrada y panel de administracion', valida_hasta: '2024-04-15', creado_en: '2024-03-15', clientes: { id: 'c1', nombre: 'RetailMax',  correo: 'contacto@retailmax.com' } },
  { id: '2', numero: 'COT-2024-002', estado: 'enviada',   subtotal: 28000, impuesto: 4480,  total: 32480, notas: 'App movil iOS y Android para servicio de delivery con seguimiento en tiempo real',   valida_hasta: '2024-04-20', creado_en: '2024-03-17', clientes: { id: 'c2', nombre: 'FastShip',   correo: 'ops@fastship.mx' } },
  { id: '3', numero: 'COT-2024-003', estado: 'borrador',  subtotal: 18500, impuesto: 2960,  total: 21460, notas: 'Rediseno completo de sitio web corporativo con SEO y optimizacion de velocidad',    valida_hasta: '2024-04-25', creado_en: '2024-03-18', clientes: { id: 'c3', nombre: 'FinCorp',    correo: 'it@fincorp.mx' } },
  { id: '4', numero: 'COT-2024-004', estado: 'aceptada',  subtotal: 62000, impuesto: 9920,  total: 71920, notas: 'Sistema de gestion hospitalaria con modulo de citas, expedientes y facturacion',    valida_hasta: '2024-04-10', creado_en: '2024-03-10', clientes: { id: 'c4', nombre: 'MediCare+',  correo: 'sistemas@medicare.mx' } },
  { id: '5', numero: 'COT-2024-005', estado: 'rechazada', subtotal: 35000, impuesto: 5600,  total: 40600, notas: 'Plataforma educativa con videoconferencias en vivo y sistema de evaluaciones',      valida_hasta: '2024-03-30', creado_en: '2024-03-05', clientes: { id: 'c5', nombre: 'EduTech MX', correo: 'dev@edutech.com' } },
  { id: '6', numero: 'COT-2024-006', estado: 'enviada',   subtotal: 22000, impuesto: 3520,  total: 25520, notas: 'Dashboard de analitica con reportes automatizados y exportacion a PDF/Excel',       valida_hasta: '2024-04-28', creado_en: '2024-03-19', clientes: { id: 'c6', nombre: 'TechStart',  correo: 'hola@techstart.io' } },
]

const MOCK_CLIENTES = [
  { id: 'c1', nombre: 'RetailMax' }, { id: 'c2', nombre: 'FastShip' },
  { id: 'c3', nombre: 'FinCorp' },   { id: 'c4', nombre: 'MediCare+' },
  { id: 'c5', nombre: 'EduTech MX' },{ id: 'c6', nombre: 'TechStart' },
]

const estadoConfig: Record<string, { label: string; cls: string; dot: string }> = {
  borrador:  { label: 'Borrador',  cls: 'bg-slate-100 text-slate-600 border-slate-200',       dot: 'bg-slate-400'   },
  enviada:   { label: 'Enviada',   cls: 'bg-blue-50 text-blue-600 border-blue-200',           dot: 'bg-blue-500'    },
  aceptada:  { label: 'Aceptada', cls: 'bg-emerald-50 text-emerald-600 border-emerald-200',   dot: 'bg-emerald-500' },
  rechazada: { label: 'Rechazada',cls: 'bg-red-50 text-red-500 border-red-200',               dot: 'bg-red-500'     },
}

const avatarColors = [
  'bg-violet-100 text-violet-700', 'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700', 'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700', 'bg-cyan-100 text-cyan-700',
]

const fmt = (n: number) =>
  new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', maximumFractionDigits: 0 }).format(n)

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })

export default function CotizacionesPage() {
  const [cotizaciones, setCotizaciones] = useState<any[]>(MOCK_COTIZACIONES)
  const [clientes, setClientes] = useState<any[]>(MOCK_CLIENTES)
  const [loading, setLoading] = useState(false)
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
    if (c && c.length > 0) setCotizaciones(c)
    if (cl && cl.length > 0) setClientes(cl)
    setLoading(false)
  }

  useEffect(() => { cargar() }, [])

  const guardar = async () => {
    if (!form.cliente_id) return toast.error('Selecciona un cliente')
    setSaving(true)
    const subtotal = parseFloat(form.subtotal) || 0
    const impuesto = parseFloat(form.impuesto) || 0
    const { error } = await supabase.from('cotizaciones').insert({
      cliente_id: form.cliente_id, estado: 'borrador',
      subtotal, impuesto, total: subtotal + impuesto,
      notas: form.notas || null, valida_hasta: form.valida_hasta || null,
    })
    if (error) toast.error('Error al crear cotizacion')
    else {
      toast.success('Cotizacion creada')
      setIsDialogOpen(false)
      setForm({ cliente_id: '', subtotal: '', impuesto: '', notas: '', valida_hasta: '' })
      cargar()
    }
    setSaving(false)
  }

  const cambiarEstado = async (id: string, estado: string) => {
    const { error } = await supabase.from('cotizaciones').update({ estado }).eq('id', id)
    if (error) { toast.error('Error al actualizar'); return }
    setCotizaciones(prev => prev.map(c => c.id === id ? { ...c, estado } : c))
    toast.success(`Marcada como ${estadoConfig[estado].label}`)
  }

  const eliminar = async (id: string) => {
    const { error } = await supabase.from('cotizaciones').delete().eq('id', id)
    if (error) { toast.error('Error al eliminar'); return }
    setCotizaciones(prev => prev.filter(c => c.id !== id))
    toast.success('Cotizacion eliminada')
  }

  const filtradas = cotizaciones.filter(c =>
    (c.numero || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.clientes?.nombre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.notas || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalIngresos = cotizaciones.filter(c => c.estado === 'aceptada').reduce((a, c) => a + c.total, 0)
  const tasaExito = cotizaciones.length
    ? Math.round((cotizaciones.filter(c => c.estado === 'aceptada').length / cotizaciones.length) * 100)
    : 0
  const totalEstimado = (parseFloat(form.subtotal) || 0) + (parseFloat(form.impuesto) || 0)

  const stats = [
    { label: 'Total',      value: cotizaciones.length,                                                        icon: FileText,    bg: 'bg-violet-50 border-violet-100',   iconBg: 'bg-violet-100',  iconCls: 'text-violet-500'  },
    { label: 'Aceptadas',  value: cotizaciones.filter(c => c.estado === 'aceptada').length,                   icon: CheckCircle, bg: 'bg-emerald-50 border-emerald-100', iconBg: 'bg-emerald-100', iconCls: 'text-emerald-500' },
    { label: 'En proceso', value: cotizaciones.filter(c => ['enviada','borrador'].includes(c.estado)).length, icon: Clock,       bg: 'bg-blue-50 border-blue-100',       iconBg: 'bg-blue-100',    iconCls: 'text-blue-500'    },
    { label: 'Ingresos',   value: fmt(totalIngresos),                                                         icon: DollarSign,  bg: 'bg-amber-50 border-amber-100',     iconBg: 'bg-amber-100',   iconCls: 'text-amber-500'   },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-7">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-7 bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-200">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -right-6 -top-6 opacity-[0.07] pointer-events-none">
          <FileText className="h-48 w-48 text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-200 mb-1">Panel Admin</p>
            <h1 className="text-3xl font-bold text-white tracking-tight">Cotizaciones</h1>
            <p className="text-violet-200 mt-1 text-sm">Gestiona y da seguimiento a tus propuestas comerciales</p>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 border border-white/30">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-300" />
                <span className="text-xs text-white font-semibold">{tasaExito}% tasa de cierre</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 border border-white/30">
                <DollarSign className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-xs text-white font-semibold">{fmt(totalIngresos)} cerrados</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={cargar}
              className="h-10 w-10 rounded-xl border border-white/30 text-white hover:bg-white/20">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button onClick={() => setIsDialogOpen(true)}
              className="rounded-xl bg-white text-violet-600 hover:bg-violet-50 border-0 shadow-md font-semibold px-5 transition-all hover:-translate-y-0.5">
              <Plus className="mr-2 h-4 w-4" /> Nueva Cotizacion
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div className={`rounded-2xl p-5 border ${s.bg} bg-white flex items-center gap-4 hover:shadow-md transition-shadow`}>
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
        <Input placeholder="Buscar por numero, cliente o descripcion..."
          value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          className="pl-9 h-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl focus:border-violet-400" />
      </div>

      {/* Lista */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm divide-y divide-slate-100">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-7 w-7 animate-spin text-slate-400" /></div>
        ) : filtradas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <FileText className="h-10 w-10 mb-3 opacity-30" />
            <p className="text-sm font-medium">No hay cotizaciones{searchTerm ? ' que coincidan' : ' aun'}</p>
          </div>
        ) : (
          filtradas.map((c, i) => {
            const cfg = estadoConfig[c.estado] ?? estadoConfig.borrador
            return (
              <motion.div key={c.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="group flex items-center gap-4 px-6 py-5 hover:bg-slate-50/80 transition-colors border-l-4 border-transparent hover:border-violet-400">
                <Avatar className="h-12 w-12 shrink-0 border-2 border-slate-100 shadow-sm">
                  <AvatarFallback className={`${avatarColors[i % avatarColors.length]} text-sm font-bold`}>
                    {(c.clientes?.nombre || 'NA').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                    <span className="font-bold text-sm text-slate-900 tracking-wide">{c.numero}</span>
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border font-semibold ${cfg.cls}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">{c.clientes?.nombre}</p>
                  {c.notas && <p className="text-xs text-slate-400 mt-1 line-clamp-1 max-w-md">{c.notas}</p>}
                </div>
                <div className="hidden md:flex flex-col items-end gap-1 shrink-0 mr-2">
                  <p className="font-bold text-slate-900 text-lg leading-tight">{fmt(c.total)}</p>
                  <p className="text-xs text-slate-400">{fmt(c.subtotal)} + {fmt(c.impuesto)} IVA</p>
                  {c.valida_hasta && (
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3" /> Vence {fmtDate(c.valida_hasta)}
                    </p>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"
                      className="h-8 w-8 shrink-0 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border-slate-200 text-slate-700 w-52 shadow-lg">
                    {c.estado === 'borrador' && (
                      <DropdownMenuItem onClick={() => cambiarEstado(c.id, 'enviada')} className="hover:bg-blue-50 cursor-pointer">
                        <Send className="mr-2 h-4 w-4 text-blue-500" /> Marcar como enviada
                      </DropdownMenuItem>
                    )}
                    {c.estado === 'enviada' && (
                      <DropdownMenuItem onClick={() => cambiarEstado(c.id, 'aceptada')} className="hover:bg-emerald-50 cursor-pointer">
                        <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" /> Marcar como aceptada
                      </DropdownMenuItem>
                    )}
                    {c.estado === 'enviada' && (
                      <DropdownMenuItem onClick={() => cambiarEstado(c.id, 'rechazada')} className="text-red-500 hover:bg-red-50 cursor-pointer">
                        <XCircle className="mr-2 h-4 w-4" /> Marcar como rechazada
                      </DropdownMenuItem>
                    )}
                    <Separator className="my-1 bg-slate-100" />
                    <DropdownMenuItem onClick={() => eliminar(c.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer">
                      <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            )
          })
        )}
      </div>

      {/* Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white border-slate-200 shadow-2xl">
          <DialogHeader className="pb-2">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-xl bg-violet-100">
                <FileText className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-slate-900">Nueva Cotizacion</DialogTitle>
                <p className="text-xs text-slate-500">Crea una nueva propuesta comercial</p>
              </div>
            </div>
          </DialogHeader>
          <Separator className="bg-slate-100" />
          <div className="grid gap-5 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Cliente <span className="text-red-500">*</span></Label>
              <Select value={form.cliente_id} onValueChange={v => setForm(p => ({ ...p, cliente_id: v }))}>
                <SelectTrigger className="bg-slate-50 border-slate-200 h-11 rounded-xl focus:border-violet-400">
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map(c => <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">Subtotal (PEN)</Label>
                <Input type="number" value={form.subtotal} onChange={e => setForm(p => ({ ...p, subtotal: e.target.value }))}
                  placeholder="0.00" className="bg-slate-50 border-slate-200 h-11 rounded-xl focus:border-violet-400" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">IVA (PEN)</Label>
                <Input type="number" value={form.impuesto} onChange={e => setForm(p => ({ ...p, impuesto: e.target.value }))}
                  placeholder="0.00" className="bg-slate-50 border-slate-200 h-11 rounded-xl focus:border-violet-400" />
              </div>
            </div>
            {totalEstimado > 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100">
                <span className="text-sm text-violet-600 font-semibold">Total estimado</span>
                <span className="text-xl font-bold text-violet-700">{fmt(totalEstimado)}</span>
              </motion.div>
            )}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Valida hasta</Label>
              <Input type="date" value={form.valida_hasta} onChange={e => setForm(p => ({ ...p, valida_hasta: e.target.value }))}
                className="bg-slate-50 border-slate-200 h-11 rounded-xl focus:border-violet-400" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Descripcion del proyecto</Label>
              <Textarea value={form.notas} onChange={e => setForm(p => ({ ...p, notas: e.target.value }))}
                placeholder="Describe brevemente el alcance del proyecto..." rows={3}
                className="bg-slate-50 border-slate-200 rounded-xl resize-none placeholder:text-slate-400 focus:border-violet-400" />
            </div>
          </div>
          <Separator className="bg-slate-100" />
          <DialogFooter className="pt-2 gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50">
              Cancelar
            </Button>
            <Button onClick={guardar} disabled={saving}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 rounded-xl hover:from-violet-500 hover:to-indigo-500 min-w-[140px] shadow-md shadow-violet-200">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Crear Cotizacion'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </motion.div>
  )
}
