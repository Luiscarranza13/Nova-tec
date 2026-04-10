import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-20 text-center ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground/50" />
      </div>
      <p className="text-base font-semibold text-foreground mb-1">{title}</p>
      {description && <p className="text-sm text-muted-foreground max-w-xs">{description}</p>}
      {action && (
        <Button onClick={action.onClick} size="sm" className="mt-5">
          {action.label}
        </Button>
      )}
    </motion.div>
  )
}
