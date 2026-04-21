'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Copy, Share2, Eye } from 'lucide-react'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { toast } from 'sonner'

interface ContextMenuItem {
  label: string
  icon: React.ElementType
  action: () => void
  danger?: boolean
}

interface ContextMenuProps {
  items: ContextMenuItem[]
  children: React.ReactNode
}

export function ContextMenu({ items, children }: ContextMenuProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  const close = useCallback(() => setPos(null), [])

  useEffect(() => {
    if (!pos) return
    const handler = () => close()
    window.addEventListener('click', handler)
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close() })
    return () => window.removeEventListener('click', handler)
  }, [pos, close])

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault()
        setPos({ x: e.clientX, y: e.clientY })
      }}
      className="relative"
    >
      {children}

      <AnimatePresence>
        {pos && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            style={{ position: 'fixed', top: pos.y, left: pos.x, zIndex: 9999 }}
            className="w-48 rounded-xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl py-1.5 overflow-hidden"
          >
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => { item.action(); close() }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-muted/60 ${item.danger ? 'text-red-500 hover:bg-red-50' : 'text-foreground'}`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Pre-built context menu for portfolio projects
export function ProjectContextMenu({ children, url, name }: { children: React.ReactNode; url?: string; name: string }) {
  const { copy } = useCopyToClipboard()

  const items: ContextMenuItem[] = [
    ...(url ? [{ label: 'Ver demo', icon: ExternalLink, action: () => window.open(url, '_blank') }] : []),
    { label: 'Copiar nombre', icon: Copy, action: () => { copy(name); toast.success('Copiado') } },
    { label: 'Compartir', icon: Share2, action: () => {
      if (navigator.share) navigator.share({ title: name, url: window.location.href })
      else { copy(window.location.href); toast.success('URL copiada') }
    }},
  ]

  return <ContextMenu items={items}>{children}</ContextMenu>
}
