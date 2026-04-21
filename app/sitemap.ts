import { MetadataRoute } from 'next'
import { SERVICES, BLOG_POSTS } from '@/lib/constants'

const BASE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://novatec.vercel.app').trim()
const NOW = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                    lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/servicios`,     lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/contacto`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/planes`,        lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/portafolio`,    lastModified: NOW, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/nosotros`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/testimonios`,   lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,          lastModified: NOW, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/terminos`,      lastModified: NOW, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/politicas`,     lastModified: NOW, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICES.map(s => ({
    url: `${BASE}/servicios#${s.id}`,
    lastModified: NOW,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(p => ({
    url: `${BASE}/blog/${p.id}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages, ...blogPages]
}
