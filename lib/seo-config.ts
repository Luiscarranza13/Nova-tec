/**
 * SEO Configuration for NovaTec
 * Centralized SEO settings for better maintainability
 */

export const SEO_CONFIG = {
  // Site Information
  siteName: 'NovaTec',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.novatec.ink',
  siteDescription:
    'NovaTec — Agencia líder de desarrollo de software, páginas web y aplicaciones móviles en Cajamarca, Perú. Creamos sistemas a medida, e-commerce, apps iOS/Android y soluciones tecnológicas que hacen crecer tu empresa.',
  
  // Business Information
  businessName: 'NovaTec',
  businessLegalName: 'NovaTec Perú S.A.C.',
  businessEmail: 'NovaTec.Empresarial@gmail.com',
  businessPhone: '+51-918-146-783',
  businessWhatsApp: '51918146783',
  
  // Location
  address: {
    street: 'Senati Cajamarca',
    city: 'Cajamarca',
    region: 'Cajamarca',
    postalCode: '06001',
    country: 'PE',
  },
  
  // Geo Coordinates
  geo: {
    latitude: -7.1638,
    longitude: -78.5001,
  },
  
  // Social Media
  social: {
    facebook: 'https://www.facebook.com/novatec',
    linkedin: 'https://www.linkedin.com/company/novatec-peru',
    instagram: 'https://www.instagram.com/novatec_peru',
    twitter: 'https://twitter.com/novatec_peru',
  },
  
  // Default OG Image
  defaultOGImage: '/og-default.png',
  
  // Keywords (for meta tags)
  keywords: [
    // Marca
    'NovaTec',
    'NovaTec Perú',
    'NovaTec Cajamarca',
    'novatec.ink',
    
    // Servicios principales
    'desarrollo de software Cajamarca',
    'desarrollo de software Perú',
    'agencia de desarrollo web Cajamarca',
    'páginas web Cajamarca',
    'aplicaciones móviles Perú',
    'desarrollo de apps iOS Android',
    
    // Software empresarial
    'sistemas a medida Perú',
    'software empresarial Cajamarca',
    'desarrollo ERP Perú',
    'automatización empresarial',
    
    // E-commerce
    'tienda online Perú',
    'e-commerce Cajamarca',
    'desarrollo tiendas virtuales',
    
    // Consultoría
    'consultoría tecnológica Perú',
    'transformación digital',
    'empresas de tecnología Cajamarca',
  ],
  
  // Structured Data
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NovaTec',
    url: 'https://www.novatec.ink',
    logo: 'https://www.novatec.ink/logo.png',
    description:
      'Agencia de desarrollo de software y páginas web en Cajamarca, Perú',
    foundingDate: '2016',
    email: 'NovaTec.Empresarial@gmail.com',
    telephone: '+51-918-146-783',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Senati Cajamarca',
      addressLocality: 'Cajamarca',
      addressRegion: 'Cajamarca',
      postalCode: '06001',
      addressCountry: 'PE',
    },
    sameAs: [
      'https://www.facebook.com/novatec',
      'https://www.linkedin.com/company/novatec-peru',
      'https://www.instagram.com/novatec_peru',
      'https://twitter.com/novatec_peru',
    ],
  },
} as const

/**
 * Generate page-specific metadata
 */
export function generatePageMetadata({
  title,
  description,
  keywords,
  image,
  path = '',
  type = 'website',
}: {
  title: string
  description?: string
  keywords?: string[]
  image?: string
  path?: string
  type?: 'website' | 'article'
}) {
  const url = `${SEO_CONFIG.siteUrl}${path}`
  const ogImage = image || SEO_CONFIG.defaultOGImage

  return {
    title,
    description: description || SEO_CONFIG.siteDescription,
    keywords: keywords || SEO_CONFIG.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: description || SEO_CONFIG.siteDescription,
      url,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'es_PE',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || SEO_CONFIG.siteDescription,
      images: [ogImage],
    },
  }
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SEO_CONFIG.siteUrl}${item.url}`,
    })),
  }
}

/**
 * Generate article structured data
 */
export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author = 'NovaTec',
}: {
  title: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
      url: SEO_CONFIG.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.siteUrl}/logo.png`,
      },
    },
  }
}

/**
 * Generate service structured data
 */
export function generateServiceSchema({
  name,
  description,
  image,
  price,
}: {
  name: string
  description: string
  image?: string
  price?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Perú',
    },
    ...(image && { image }),
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: 'PEN',
      },
    }),
  }
}
