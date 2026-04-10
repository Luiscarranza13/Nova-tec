'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, CheckSquare, X, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BulkActionsProps {
  selected: string[]
  onClear: () => void
  onDelete: (ids: string[]) => void
  onExport?: (ids: string[]) => void
  entityName?: string
}

export function BulkActions({ selected, onClear, onDelete, onExport, entityName = 'elementos' }: BulkActionsProps) {
  return (
    <AnimatePresence>
      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700"
        >
          <CheckSquare className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm font-medium">
            {selected.length} {entityName} seleccionado{selected.length !== 1 ? 's' : ''}
          </span>

          <div className="w-px h-5 bg-slate-700" />

          {onExport && (
            <Button size="sm" variant="ghost"
              onClick={() => onExport(selected)}
              className="h-8 text-slate-300 hover:text-white hover:bg-slate-800 gap-1.5 text-xs">
              <Download className="h-3.5 w-3.5" /> Exportar
            </Button>
          )}

          <Button size="sm" variant="ghost"
            onClick={() => onDelete(selected)}
            className="h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-1.5 text-xs">
            <Trash2 className="h-3.5 w-3.5" /> Eliminar
          </Button>

          <button onClick={onClear} className="text-slate-400 hover:text-white transition-colors ml-1">
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for managing bulk selection
import { useState, useCallback } from 'react'

export function useBulkSelection<T extends { id: string }>(items: T[]) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = useCallback((id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }, [])

  const toggleAll = useCallback(() => {
    setSelected(prev => prev.length === items.length ? [] : items.map(i => i.id))
  }, [items])

  const clear = useCallback(() => setSelected([]), [])
  const isSelected = useCallback((id: string) => selected.includes(id), [selected])
  const allSelected = selected.length === items.length && items.length > 0

  return { selected, toggle, toggleAll, clear, isSelected, allSelected }
}
