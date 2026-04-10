import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://novatec.pe'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/login', '/registro', '/recuperar-password', '/mantenimiento'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/blog/', '/servicios', '/portafolio', '/nosotros', '/contacto', '/planes', '/testimonios'],
        disallow: ['/admin/', '/api/'],
      },
      { userAgent: 'GPTBot',       disallow: ['/'] },
      { userAgent: 'ChatGPT-User', disallow: ['/'] },
      { userAgent: 'CCBot',        disallow: ['/'] },
      { userAgent: 'anthropic-ai', disallow: ['/'] },
      { userAgent: 'Claude-Web',   disallow: ['/'] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  }
}
