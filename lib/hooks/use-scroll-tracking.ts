'use client'

import { useEffect, useRef } from 'react'

type ScrollDepth = 25 | 50 | 75 | 100

export function useScrollTracking(pageName?: string) {
  const reached = useRef(new Set<ScrollDepth>())

  useEffect(() => {
    const checkpoints: ScrollDepth[] = [25, 50, 75, 100]

    const track = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.round((scrollTop / docHeight) * 100)

      checkpoints.forEach(cp => {
        if (pct >= cp && !reached.current.has(cp)) {
          reached.current.add(cp)
          // GA event
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'Engagement',
              event_label: pageName || window.location.pathname,
              value: cp,
            })
          }
        }
      })
    }

    window.addEventListener('scroll', track, { passive: true })
    return () => window.removeEventListener('scroll', track)
  }, [pageName])
}

export function useTimeOnPage(pageName?: string) {
  const start = useRef(Date.now())

  useEffect(() => {
    const intervals = [30, 60, 120, 300] // seconds

    const timers = intervals.map(sec =>
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'time_on_page', {
            event_category: 'Engagement',
            event_label: pageName || window.location.pathname,
            value: sec,
          })
        }
      }, sec * 1000)
    )

    const handleUnload = () => {
      const seconds = Math.round((Date.now() - start.current) / 1000)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_exit', {
          event_category: 'Engagement',
          event_label: pageName || window.location.pathname,
          value: seconds,
        })
      }
    }

    window.addEventListener('beforeunload', handleUnload)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [pageName])
}
