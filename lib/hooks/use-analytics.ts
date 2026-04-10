'use client'

import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

// Track page view in GA only — Supabase tracking removed to avoid 404 errors
// and hydration mismatches
export function useAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_path: pathname,
        page_title: document.title,
      })
    }
  }, [pathname])

  const trackEvent = useCallback((action: string, category: string, label: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, { event_category: category, event_label: label, value })
    }
  }, [])

  const trackCTA = useCallback((label: string) => trackEvent('click', 'CTA', label), [trackEvent])
  const trackWhatsApp = useCallback((service?: string) => trackEvent('click', 'WhatsApp', service || 'general'), [trackEvent])
  const trackFormSubmit = useCallback((formName: string) => trackEvent('submit', 'Form', formName), [trackEvent])
  const trackConversion = useCallback((conversionId: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', { send_to: conversionId })
    }
  }, [])

  return { trackEvent, trackCTA, trackWhatsApp, trackFormSubmit, trackConversion }
}

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void
  }
}
