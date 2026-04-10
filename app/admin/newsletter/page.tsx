'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Trash2, Download, Mail, Users, TrendingUp, Loader2, ToggleLeft, ToggleRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { exportToCSV } from '@/lib/export'
import type { Newsletter } from '@/lib/supabase/types'

export default function NewsletterPage() {
  const [subs, setSubs] = useState<Newsletter[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('newsletter').select('*').order('suscrito_en', { ascending: false })
    setSubs(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const toggleActive = async (sub: Newsletter) => {
    await supabase.from('newsletter').update({ activo: !sub.activo }).eq('id', sub.id)
    setSubs(prev => prev.map(s => s.id === sub.id ? { ...s, activo: !s.activo } : s))
    toast.success(sub.activo ? 'Suscriptor desactivado' : 'Suscriptor activado')
  }

  const del = async (id: string) => {
    await supabase.from('newsletter').delete().eq('id', id)
    setSubs(prev => prev.filter(s => s.id !== id))
    toast.success('Suscriptor eliminado')
  }

  const filtered = subs.filter(s => s.email.toLowerCase().includes(search.toLowerCase()))
  const activos = subs.filter(s => s.activo).length
  const thisMonth = subs.filter(s => new Date(s.suscrito_en).getMonth() === new Date().getMonth()).length

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-7 bg-gradient-to-br from-indigo-600 to-blue-600 shadow-lg shadow-indigo-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200 mb-1">Panel Admin</p>
            <h1 className="text-3xl font-bold text-white tracking-tight">Newsletter</h1>
            <p className="text-indigo-200 mt-1 text-sm">Gestiona los suscriptores del boletín</p>
          </div>
          <Button onClick={() => exportToCSV(subs.filter(s => s.activo), 'newsletter-activos')}
            className="rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 border-0 shadow-md font-semibold gap-2 w-fit">
            <Download className="h-4 w-4" /> Exportar activos
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total suscriptores', value: subs.length,  icon: Users,      bg: 'bg-indigo-50 border-indigo-100', ic: 'text-indigo-500', ib: 'bg-indigo-100' },
          { label: 'Activos',            value: activos,       icon: Mail,       bg: 'bg-emerald-50 border-emerald-100', ic: 'text-emerald-500', ib: 'bg-emerald-100' },
          { label: 'Este mes',           value: thisMonth,     icon: TrendingUp, bg: 'bg-violet-50 border-violet-100', ic: 'text-violet-500', ib: 'bg-violet-100' },
        ].map((s, i) => (
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
        <Input placeholder="Buscar por email..." value={search} onChange={e => setSearch(e.target.value)}
          className="pl-9 h-10 bg-white border-slate-200 rounded-xl" />
      </div>

      {/* List */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-7 w-7 animate-spin text-slate-400" /></div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-slate-400">
            <Mail className="h-10 w-10 mb-3 opacity-30" />
            <p className="text-sm">No hay suscriptores{search ? ' que coincidan' : ' aún'}</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((sub, i) => (
              <motion.div key={sub.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="group flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 truncate">{sub.email}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(sub.suscrito_en).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${sub.activo ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                    {sub.activo ? 'Activo' : 'Inactivo'}
                  </span>
                  <button onClick={() => toggleActive(sub)} className="text-slate-400 hover:text-slate-700 transition-colors">
                    {sub.activo ? <ToggleRight className="h-5 w-5 text-emerald-500" /> : <ToggleLeft className="h-5 w-5" />}
                  </button>
                  <button onClick={() => del(sub.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
