/**
 * Google Analytics & Tag Manager Configuration
 * Tracking de eventos y conversiones
 */

// Google Analytics 4
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ''

// Google Tag Manager
export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER || ''

// Verificar si está en producción
export const isProduction = process.env.NODE_ENV === 'production'

/**
 * Track page views
 */
export const pageview = (url: string) => {
  if (!isProduction || !GA_TRACKING_ID) return

  window.gtag?.('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

/**
 * Track custom events
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (!isProduction || !GA_TRACKING_ID) return

  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

/**
 * Eventos predefinidos para tracking
 */
export const trackEvent = {
  // Contacto
  contactFormSubmit: (formType: string) => {
    event({
      action: 'submit_form',
      category: 'Contact',
      label: formType,
    })
  },

  contactWhatsApp: () => {
    event({
      action: 'click_whatsapp',
      category: 'Contact',
      label: 'WhatsApp Button',
    })
  },

  contactPhone: () => {
    event({
      action: 'click_phone',
      category: 'Contact',
      label: 'Phone Number',
    })
  },

  contactEmail: () => {
    event({
      action: 'click_email',
      category: 'Contact',
      label: 'Email Address',
    })
  },

  // Navegación
  clickCTA: (ctaName: string, location: string) => {
    event({
      action: 'click_cta',
      category: 'Navigation',
      label: `${ctaName} - ${location}`,
    })
  },

  viewPortfolio: (projectName: string) => {
    event({
      action: 'view_portfolio',
      category: 'Engagement',
      label: projectName,
    })
  },

  viewService: (serviceName: string) => {
    event({
      action: 'view_service',
      category: 'Engagement',
      label: serviceName,
    })
  },

  // Conversiones
  requestQuote: (service: string) => {
    event({
      action: 'request_quote',
      category: 'Conversion',
      label: service,
    })
  },

  downloadPortfolio: () => {
    event({
      action: 'download',
      category: 'Conversion',
      label: 'Portfolio PDF',
    })
  },

  subscribeNewsletter: () => {
    event({
      action: 'subscribe',
      category: 'Conversion',
      label: 'Newsletter',
    })
  },

  // Engagement
  scrollDepth: (percentage: number) => {
    event({
      action: 'scroll_depth',
      category: 'Engagement',
      label: `${percentage}%`,
      value: percentage,
    })
  },

  timeOnPage: (seconds: number) => {
    event({
      action: 'time_on_page',
      category: 'Engagement',
      value: seconds,
    })
  },

  // Social
  clickSocial: (platform: string) => {
    event({
      action: 'click_social',
      category: 'Social',
      label: platform,
    })
  },

  // Blog
  readArticle: (articleTitle: string) => {
    event({
      action: 'read_article',
      category: 'Blog',
      label: articleTitle,
    })
  },

  shareArticle: (articleTitle: string, platform: string) => {
    event({
      action: 'share_article',
      category: 'Blog',
      label: `${articleTitle} - ${platform}`,
    })
  },

  // Pricing
  viewPricing: (planName: string) => {
    event({
      action: 'view_pricing',
      category: 'Pricing',
      label: planName,
    })
  },

  selectPlan: (planName: string) => {
    event({
      action: 'select_plan',
      category: 'Conversion',
      label: planName,
    })
  },

  // PWA
  installPWA: () => {
    event({
      action: 'install_pwa',
      category: 'Engagement',
      label: 'PWA Installation',
    })
  },

  // Errors
  error: (errorMessage: string, errorLocation: string) => {
    event({
      action: 'error',
      category: 'Error',
      label: `${errorLocation}: ${errorMessage}`,
    })
  },
}

/**
 * Facebook Pixel
 */
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL || ''

export const fbPixelEvent = (eventName: string, data?: Record<string, any>) => {
  if (!isProduction || !FB_PIXEL_ID) return

  window.fbq?.('track', eventName, data)
}

/**
 * Conversiones de Facebook Pixel
 */
export const fbTrack = {
  pageView: () => fbPixelEvent('PageView'),
  lead: () => fbPixelEvent('Lead'),
  contact: () => fbPixelEvent('Contact'),
  submitApplication: () => fbPixelEvent('SubmitApplication'),
  schedule: () => fbPixelEvent('Schedule'),
  viewContent: (contentName: string) =>
    fbPixelEvent('ViewContent', { content_name: contentName }),
}

/**
 * Declaración de tipos para window
 */
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void
    fbq?: (
      command: string,
      eventName: string,
      data?: Record<string, any>
    ) => void
    dataLayer?: any[]
  }
}
