"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SkipToContent } from "@/components/ui/skip-to-content";
import { CountdownBanner } from "@/components/ui/countdown-banner";

export function Providers({ children, ...props }: ThemeProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10 * 60 * 1000,      // 10 min — datos frescos más tiempo
            gcTime: 30 * 60 * 1000,          // 30 min — cache en memoria
            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnReconnect: "always",
            networkMode: "offlineFirst",
          },
          mutations: {
            networkMode: "offlineFirst",
            retry: 1,
          },
        },
      }),
  );

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
            style={{ "--sonner-background": "hsl(var(--card))", "--sonner-border": "hsl(var(--border))" } as React.CSSProperties}
          />
        </TooltipProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
