/**
 * Meta Tags Optimizadas para Cada Página
 * Uso: import { getPageMetadata } from '@/lib/meta-tags'
 */

import { Metadata } from 'next'
import { SEO_CONFIG } from './seo-config'

export interface PageMetadataConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  path?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

/**
 * Genera metadata completa para una página
 */
export function getPageMetadata(config: PageMetadataConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image,
    path = '',
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
  } = config

  const url = `${SEO_CONFIG.siteUrl}${path}`
  const ogImage = image || `${SEO_CONFIG.siteUrl}/og-default.png`

  const metadata: Metadata = {
    title,
    description,
    keywords: [...SEO_CONFIG.keywords, ...keywords],
    authors: [{ name: author || SEO_CONFIG.siteName }],
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,
    alternates: {
      canonical: url,
      languages: {
        'es-PE': url,
      },
    },
    openGraph: {
      type,
      locale: 'es_PE',
      url,
      siteName: SEO_CONFIG.siteName,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png',
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@novatec_peru',
      site: '@novatec_peru',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }

  return metadata
}

/**
 * Meta tags predefinidas para páginas principales
 */
export const PAGE_METADATA = {
  home: {
    title: 'NovaTec | Desarrollo de Software y Páginas Web en Cajamarca, Perú',
    description:
      'Agencia líder de desarrollo de software en Cajamarca. Creamos páginas web, aplicaciones móviles y software a medida. +120 clientes satisfechos. Cotización gratis.',
    keywords: [
      'desarrollo de software Cajamarca',
      'desarrollo web Cajamarca',
      'páginas web Cajamarca',
      'agencia de desarrollo Cajamarca',
      'software a medida Perú',
    ],
    path: '/',
  },

  servicios: {
    title: 'Servicios de Desarrollo de Software | NovaTec Cajamarca',
    description:
      'Desarrollo web, aplicaciones móviles, software a medida, diseño UI/UX y consultoría tecnológica en Cajamarca. Soluciones innovadoras para tu empresa.',
    keywords: [
      'servicios de desarrollo web',
      'desarrollo de aplicaciones móviles',
      'software empresarial',
      'diseño UI/UX Cajamarca',
      'consultoría tecnológica',
    ],
    path: '/servicios',
  },

  portafolio: {
    title: 'Portafolio de Proyectos | Casos de Éxito NovaTec',
    description:
      'Conoce nuestros proyectos exitosos: páginas web, apps móviles y software empresarial. +120 clientes satisfechos en Perú. Ver casos de éxito.',
    keywords: [
      'portafolio desarrollo web',
      'casos de éxito software',
      'proyectos web Cajamarca',
      'apps móviles Perú',
    ],
    path: '/portafolio',
  },

  planes: {
    title: 'Planes y Precios | Desarrollo Web desde S/ 1,500 | NovaTec',
    description:
      'Planes de desarrollo web, apps móviles y software a medida desde S/ 1,500. Precios transparentes, sin sorpresas. Cotización gratis por WhatsApp.',
    keywords: [
      'precios desarrollo web Cajamarca',
      'cuánto cuesta una página web',
      'planes de desarrollo software',
      'cotización desarrollo web',
    ],
    path: '/planes',
  },

  contacto: {
    title: 'Contacto | Cotización Gratis por WhatsApp | NovaTec Cajamarca',
    description:
      'Contáctanos para una cotización gratuita. WhatsApp: +51 918 146 783. Respondemos en minutos. Oficina en Cajamarca, atendemos todo Perú.',
    keywords: [
      'contacto NovaTec',
      'cotización desarrollo web',
      'WhatsApp desarrollo software',
      'agencia Cajamarca contacto',
    ],
    path: '/contacto',
  },

  nosotros: {
    title: 'Sobre Nosotros | Agencia de Software en Cajamarca | NovaTec',
    description:
      'Somos NovaTec, agencia de desarrollo de software en Cajamarca con +5 años de experiencia. Equipo experto, metodología ágil y +120 clientes satisfechos.',
    keywords: [
      'sobre NovaTec',
      'agencia de software Cajamarca',
      'equipo desarrollo web',
      'empresa tecnología Cajamarca',
    ],
    path: '/nosotros',
  },

  testimonios: {
    title: 'Testimonios de Clientes | Reseñas 5 Estrellas | NovaTec',
    description:
      'Lee las opiniones de nuestros +120 clientes satisfechos. Calificación 4.9/5 estrellas. Casos de éxito reales en desarrollo web y software.',
    keywords: [
      'testimonios NovaTec',
      'reseñas desarrollo web',
      'opiniones clientes software',
      'casos de éxito Cajamarca',
    ],
    path: '/testimonios',
  },

  blog: {
    title: 'Blog de Tecnología y Desarrollo | NovaTec Cajamarca',
    description:
      'Artículos sobre desarrollo web, apps móviles, tendencias tecnológicas y mejores prácticas. Guías, tutoriales y consejos de expertos.',
    keywords: [
      'blog desarrollo web',
      'artículos tecnología',
      'tutoriales programación',
      'tendencias software',
    ],
    path: '/blog',
  },
} as const

/**
 * Genera metadata para artículos de blog
 */
export function getBlogPostMetadata(post: {
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt?: string
  author?: string
  image?: string
  tags?: string[]
}): Metadata {
  return getPageMetadata({
    title: `${post.title} | Blog NovaTec`,
    description: post.description,
    keywords: post.tags || [],
    image: post.image,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt || post.publishedAt,
    author: post.author,
  })
}

/**
 * Genera metadata para páginas de servicios
 */
export function getServiceMetadata(service: {
  name: string
  description: string
  slug: string
  price?: number
}): Metadata {
  const priceText = service.price ? ` desde S/ ${service.price}` : ''
  
  return getPageMetadata({
    title: `${service.name}${priceText} | NovaTec Cajamarca`,
    description: service.description,
    keywords: [
      service.name.toLowerCase(),
      `${service.name.toLowerCase()} Cajamarca`,
      `${service.name.toLowerCase()} Perú`,
      `precio ${service.name.toLowerCase()}`,
    ],
    path: `/servicios/${service.slug}`,
  })
}

/**
 * Genera metadata para proyectos del portafolio
 */
export function getProjectMetadata(project: {
  name: string
  description: string
  slug: string
  client?: string
  image?: string
  technologies?: string[]
}): Metadata {
  const clientText = project.client ? ` para ${project.client}` : ''
  
  return getPageMetadata({
    title: `${project.name}${clientText} | Portafolio NovaTec`,
    description: project.description,
    keywords: [
      ...(project.technologies || []),
      'caso de éxito',
      'proyecto web',
      'desarrollo software',
    ],
    image: project.image,
    path: `/portafolio/${project.slug}`,
  })
}
