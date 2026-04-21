'use client'

import { useEffect } from 'react'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'

// Uses driver.js for guided tours
export function useGuidedTour(tourId: string, steps: {
  element: string
  popover: { title: string; description: string; side?: string }
}[]) {
  const [seen, setSeen] = useLocalStorage(`tour-${tourId}`, false)

  useEffect(() => {
    if (seen) return

    let driver: any = null

    const init = async () => {
      try {
        const { driver: driverFn } = await import('driver.js')

        // Inject driver.js CSS once
        if (!document.getElementById('driver-js-css')) {
          const link = document.createElement('link')
          link.id = 'driver-js-css'
          link.rel = 'stylesheet'
          link.href = 'https://cdn.jsdelivr.net/npm/driver.js@1/dist/driver.css'
          document.head.appendChild(link)
        }

        driver = driverFn({
          showProgress: true,
          animate: true,
          overlayColor: 'rgba(0,0,0,0.6)',
          stagePadding: 8,
          stageRadius: 12,
          popoverClass: 'novatec-tour',
          nextBtnText: 'Siguiente →',
          prevBtnText: '← Anterior',
          doneBtnText: '¡Entendido!',
          onDestroyStarted: () => { setSeen(true); driver?.destroy() },
          steps: steps.map(s => ({
            element: s.element,
            popover: {
              title: s.popover.title,
              description: s.popover.description,
            },
          })),
        })

        // Small delay so DOM is ready
        setTimeout(() => driver?.drive(), 800)
      } catch { /* driver.js not available */ }
    }

    init()
    return () => { driver?.destroy() }
  }, [seen, steps, setSeen])
}

// Admin tour
export function AdminTour() {
  useGuidedTour('admin-v1', [
    { element: '[data-tour="dashboard"]',     popover: { title: '📊 Dashboard', description: 'Aquí ves todas las métricas en tiempo real: clientes, proyectos, cotizaciones y mensajes.' } },
    { element: '[data-tour="proyectos"]',     popover: { title: '📁 Proyectos', description: 'Gestiona todos tus proyectos activos con seguimiento de progreso y estado.' } },
    { element: '[data-tour="cotizaciones"]',  popover: { title: '💰 Cotizaciones', description: 'Crea y gestiona propuestas comerciales. Puedes exportarlas a PDF.' } },
    { element: '[data-tour="mensajes"]',      popover: { title: '✉️ Mensajes', description: 'Bandeja de entrada de contactos del sitio web. Responde directamente por email.' } },
    { element: '[data-tour="configuracion"]', popover: { title: '⚙️ Configuración', description: 'Personaliza el sitio web, SEO, redes sociales y más desde aquí.' } },
  ])
  return null
}
