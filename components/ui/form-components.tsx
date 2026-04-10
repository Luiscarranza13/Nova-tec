'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FormErrorProps {
  message?: string
  className?: string
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null
  return (
    <p className={cn('text-sm text-destructive mt-1', className)}>
      {message}
    </p>
  )
}

interface FormSuccessProps {
  message?: string
  className?: string
}

export function FormSuccess({ message, className }: FormSuccessProps) {
  if (!message) return null
  return (
    <p className={cn('text-sm text-green-600 mt-1', className)}>
      {message}
    </p>
  )
}

interface FormFieldProps {
  label?: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
  className?: string
}

export function FormField({
  label,
  error,
  hint,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <FormError message={error} />}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  )
}
