import { MetadataRoute } from 'next'
import { products } from '@/lib/data'

const LAST_CONTENT_UPDATE = new Date('2026-07-12')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://feeltheprint.com'

  // We can add dynamic routes here later by querying the database
  const staticRoutes = [
    '',
    '/about',
    '/about/history',
    '/about/facilities',
    '/about/sustainability',
    '/about/leadership',
    '/about/careers',
    '/about/quality-assurance',
    '/contact/express',
    '/contact/corporate',
    '/calculator',
    '/press',
    '/press/standards',
    '/press/process',
    '/press/logistics',
    '/press/pre-press',
    '/press/printing',
    '/press/post-press',
    '/press/options',
    '/press/checklist',
    '/press/advanced',
    '/products',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const dynamicProductRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...dynamicProductRoutes]
}
