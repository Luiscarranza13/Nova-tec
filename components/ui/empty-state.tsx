'use client'

import { cn } from '@/lib/utils'
import { Folder, Inbox, Users, FileText, Search, AlertCircle, LucideIcon } from 'lucide-react'
import { Button } from './button'

interface EmptyStateProps {
  icon?: 'folder' | 'inbox' | 'users' | 'files' | 'search' | 'error' | 'custom'
  customIcon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

const iconMap: Record<string, LucideIcon> = {
  folder: Folder,
  inbox: Inbox,
  users: Users,
  files: FileText,
  search: Search,
  error: AlertCircle,
}

export function EmptyState({ 
  icon = 'inbox', 
  customIcon, 
  title, 
  description, 
  action,
  className 
}: EmptyStateProps) {
  const Icon = customIcon 
    ? () => customIcon as React.ReactElement
    : iconMap[icon] || Inbox

  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-16 px-4 text-center',
      className
    )}>
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
        <div className="relative w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-10 h-10 text-primary/60" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold font-heading text-foreground mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-muted-foreground max-w-md mb-6">
          {description}
        </p>
      )}
      
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

export function TableEmptyState({ 
  title = 'No hay datos',
  description = 'No se encontró información para mostrar.',
  actionLabel,
  onAction 
}: { 
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Inbox className="w-8 h-8 text-muted-foreground/50" />
      </div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
