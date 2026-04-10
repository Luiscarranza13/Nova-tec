'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { Toaster as Sonner } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ProgressBar } from '@/components/ui/progress-bar'
import { SkipToContent } from '@/components/ui/skip-to-content'
import { CountdownBanner } from '@/components/ui/countdown-banner'

export function Providers({ children, ...props }: ThemeProviderProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,        // 1 min
        gcTime: 5 * 60 * 1000,       // 5 min
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...props}>
        <TooltipProvider>
          <SkipToContent />
          <ProgressBar />
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
    </QueryClientProvider>
  )
}
