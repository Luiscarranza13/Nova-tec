'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

// Configure NProgress
NProgress.configure({ showSpinner: false, speed: 300, minimum: 0.1 })

function ProgressBarInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])

  useEffect(() => {
    // Inject styles once
    const id = 'nprogress-styles'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      #nprogress { pointer-events: none; }
      #nprogress .bar {
        background: linear-gradient(90deg, hsl(243 75% 65%), hsl(190 80% 55%));
        position: fixed; z-index: 9999; top: 0; left: 0;
        width: 100%; height: 3px;
        box-shadow: 0 0 10px hsl(243 75% 65% / 0.6), 0 0 5px hsl(243 75% 65% / 0.4);
      }
      #nprogress .peg {
        display: block; position: absolute; right: 0; width: 100px; height: 100%;
        box-shadow: 0 0 10px hsl(243 75% 65%), 0 0 5px hsl(243 75% 65%);
        opacity: 1; transform: rotate(3deg) translate(0, -4px);
      }
    `
    document.head.appendChild(style)
  }, [])

  return null
}

export function ProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarInner />
    </Suspense>
  )
}

// Hook to start progress on link clicks
export function useProgressBar() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return
      NProgress.start()
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
}
