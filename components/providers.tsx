'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { Toaster as Sonner } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>
        {children}
        <Sonner 
          position="top-right"
          richColors
          closeButton
          duration={4000}
          style={{
            '--sonner-background': 'hsl(var(--card))',
            '--sonner-border': 'hsl(var(--border))',
          } as React.CSSProperties}
        />
      </TooltipProvider>
    </NextThemesProvider>
  )
}
