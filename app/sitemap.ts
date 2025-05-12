import { MetadataRoute } from 'next'
import { getPayloadClient } from '@/utils/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_URL || 'https://arthur-website-rho.vercel.app'
  const payload = await getPayloadClient()

  const collections = await payload.find({
    collection: 'photographies-collection',
    pagination: false,
  })

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]

  for (const collection of collections.docs) {
    sitemap.push({
      url: `${baseUrl}/${collection.slug}`,
      lastModified: new Date(collection.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    })

    const photos = await payload.find({
      collection: 'photography',
      where: { 'collections.slug': { equals: collection.slug } },
      pagination: false,
    })

    for (const photo of photos.docs) {
      sitemap.push({
        url: `${baseUrl}/${collection.slug}/${photo.id}`,
        lastModified: new Date(photo.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    }
  }

  return sitemap
}
