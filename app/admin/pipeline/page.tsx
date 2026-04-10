'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent,
  PointerSensor, useSensor, useSensors, closestCorners,
} from '@dnd-kit/core'
import {
  SortableContext, useSortable, verticalListSortingStrategy, arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Plus, GripVertical, DollarSign, Calendar, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

type Lead = {
  id: string
  numero: string
  cliente: string
  total: number
  estado: string
  creado_en: string
}

const COLUMNS = [
  { id: 'borrador',  label: 'Borrador',  color: 'bg-slate-500', light: 'bg-slate-50 border-slate-200' },
  { id: 'enviada',   label: 'Enviada',   color: 'bg-blue-500',  light: 'bg-blue-50 border-blue-200' },
  { id: 'aceptada',  label: 'Aceptada',  color: 'bg-emerald-500', light: 'bg-emerald-50 border-emerald-200' },
  { id: 'rechazada', label: 'Rechazada', color: 'bg-red-500',   light: 'bg-red-50 border-red-200' },
]

function KanbanCard({ lead, isDragging }: { lead: Lead; isDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lead.id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }

  return (
    <div ref={setNodeRef} style={style}
      className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-default group">
      <div className="flex items-start gap-2">
        <button {...attributes} {...listeners} className="mt-0.5 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing">
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-slate-400 mb-1">{lead.numero}</p>
          <p className="font-semibold text-slate-900 text-sm truncate">{lead.cliente}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {formatCurrency(lead.total)}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(lead.creado_en).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PipelinePage() {
  const [columns, setColumns] = useState<Record<string, Lead[]>>({
    borrador: [], enviada: [], aceptada: [], rechazada: [],
  })
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('cotizaciones')
        .select('id, numero, estado, subtotal, impuesto, total, creado_en, clientes(nombre)')
        .order('creado_en', { ascending: false })

      const grouped: Record<string, Lead[]> = { borrador: [], enviada: [], aceptada: [], rechazada: [] }
      ;(data || []).forEach((c: any) => {
        const col = grouped[c.estado]
        if (col) col.push({ id: c.id, numero: c.numero, cliente: c.clientes?.nombre || 'Sin cliente', total: c.total, estado: c.estado, creado_en: c.creado_en })
      })
      setColumns(grouped)
      setLoading(false)
    }
    load()
  }, [])

  const findColumn = (id: string) => Object.keys(columns).find(col => columns[col].some(l => l.id === id))

  const handleDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id))

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e
    setActiveId(null)
    if (!over) return

    const activeCol = findColumn(String(active.id))
    const overCol = COLUMNS.find(c => c.id === over.id)?.id || findColumn(String(over.id))

    if (!activeCol || !overCol) return

    if (activeCol === overCol) {
      // Reorder within column
      const items = columns[activeCol]
      const oldIdx = items.findIndex(l => l.id === active.id)
      const newIdx = items.findIndex(l => l.id === over.id)
      if (oldIdx !== newIdx) {
        setColumns(prev => ({ ...prev, [activeCol]: arrayMove(prev[activeCol], oldIdx, newIdx) }))
      }
    } else {
      // Move to different column
      const lead = columns[activeCol].find(l => l.id === active.id)!
      setColumns(prev => ({
        ...prev,
        [activeCol]: prev[activeCol].filter(l => l.id !== active.id),
        [overCol]: [{ ...lead, estado: overCol }, ...prev[overCol]],
      }))
      const { error } = await supabase.from('cotizaciones').update({ estado: overCol }).eq('id', active.id)
      if (error) toast.error('Error al actualizar estado')
      else toast.success(`Movido a ${COLUMNS.find(c => c.id === overCol)?.label}`)
    }
  }

  const activeLead = activeId ? Object.values(columns).flat().find(l => l.id === activeId) : null
  const totalPipeline = columns.enviada.reduce((s, l) => s + l.total, 0) + columns.aceptada.reduce((s, l) => s + l.total, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl p-7 bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200 mb-1">Panel Admin</p>
            <h1 className="text-3xl font-bold text-white tracking-tight">Pipeline de Ventas</h1>
            <p className="text-indigo-200 mt-1 text-sm">Arrastra las cotizaciones entre columnas para actualizar su estado</p>
          </div>
          <div className="flex items-center gap-3 bg-white/20 rounded-xl px-4 py-3 border border-white/30">
            <DollarSign className="h-5 w-5 text-white" />
            <div>
              <p className="text-xs text-indigo-200">Pipeline activo</p>
              <p className="text-lg font-bold text-white">{formatCurrency(totalPipeline)}</p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 overflow-x-auto pb-4">
            {COLUMNS.map(col => (
              <div key={col.id} className={`rounded-2xl border ${col.light} p-4 min-h-[400px]`}>
                {/* Column header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                    <span className="font-semibold text-slate-900 text-sm">{col.label}</span>
                    <span className="text-xs text-slate-400 bg-white rounded-full px-2 py-0.5 border border-slate-200">
                      {columns[col.id].length}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    {formatCurrency(columns[col.id].reduce((s, l) => s + l.total, 0))}
                  </span>
                </div>

                {/* Cards */}
                <SortableContext items={columns[col.id].map(l => l.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3" id={col.id}>
                    {columns[col.id].map(lead => (
                      <KanbanCard key={lead.id} lead={lead} isDragging={lead.id === activeId} />
                    ))}
                    {columns[col.id].length === 0 && (
                      <div className="flex items-center justify-center h-24 rounded-xl border-2 border-dashed border-slate-200 text-slate-300 text-sm">
                        Arrastra aquí
                      </div>
                    )}
                  </div>
                </SortableContext>
              </div>
            ))}
          </div>

          <DragOverlay>
            {activeLead && (
              <div className="rotate-2 opacity-90">
                <KanbanCard lead={activeLead} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      )}
    </motion.div>
  )
}
