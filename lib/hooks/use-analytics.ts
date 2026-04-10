'use client'

import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

// Track page view in Supabase + GA
async function trackPageView(path: string) {
  // GA
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: path,
      page_title: document.title,
    })
  }
  // Supabase analytics (fire-and-forget)
  try {
    await supabase.from('page_views').insert({
      path,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    })
  } catch { /* non-critical */ }
}

export function useAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    trackPageView(pathname)
  }, [pathname])

  const trackEvent = useCallback((action: string, category: string, label: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
      })
    }
  }, [])

  const trackCTA = useCallback((label: string) => {
    trackEvent('click', 'CTA', label)
  }, [trackEvent])

  const trackWhatsApp = useCallback((service?: string) => {
    trackEvent('click', 'WhatsApp', service || 'general')
  }, [trackEvent])

  const trackFormSubmit = useCallback((formName: string) => {
    trackEvent('submit', 'Form', formName)
  }, [trackEvent])

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
