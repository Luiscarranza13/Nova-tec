import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://novatec.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/login', '/registro', '/recuperar-password', '/mantenimiento'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  }
}
