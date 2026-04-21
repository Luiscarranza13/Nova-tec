import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50 transition-all duration-200',
          'dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800 dark:hover:border-slate-700 dark:placeholder:text-slate-500 dark:disabled:bg-slate-950',
          className
        )}

        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
