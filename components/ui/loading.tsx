'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Spinner
export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn('h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin', className)} />
  )
}

// Skeleton line
export function SkeletonLine({ className }: { className?: string }) {
  return <div className={cn('h-4 rounded-lg bg-muted animate-pulse', className)} />
}

// Skeleton card
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-border/50 bg-card/60 p-6 space-y-4', className)}>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-muted animate-pulse" />
        <div className="flex-1 space-y-2">
          <SkeletonLine className="w-3/4" />
          <SkeletonLine className="w-1/2 h-3" />
        </div>
      </div>
      <SkeletonLine />
      <SkeletonLine className="w-5/6" />
      <SkeletonLine className="w-4/6" />
    </div>
  )
}

// Full page loader
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-primary/30 animate-pulse" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground font-medium">Cargando...</p>
      </motion.div>
    </div>
  )
}

// Skeleton grid (for portafolio/blog)
export function SkeletonGrid({ count = 6, cols = 3 }: { count?: number; cols?: number }) {
  return (
    <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-${cols}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

// Inline loading dots
export function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-current"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  )
}
