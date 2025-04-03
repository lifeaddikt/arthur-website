import MasonryGrid from '@/components/grid/MasonryGrid'
import { getPayload } from 'payload'
import config from '@payload-config'
import Badge from '@/components/Badge'
import { Series } from '@/payload-types'
import { notFound, redirect } from 'next/navigation'
import ScrollRestoration from '@/hooks/ScrollRestoration'
import { generateBlurPlaceholder } from '@/utils/image'
import { ReactLenis } from 'lenis/react'
import { cache } from 'react'

// Revalidate pages every hour
export const revalidate = 3600

// Cache data fetches across requests
const getCollection = cache(async (slug: string) => {
  const payload = await getPayload({ config })
  
  return payload.find({
    collection: 'photographies-collection',
    where: {
      slug: { equals: slug.toLowerCase() },
    },
    limit: 1,
  })
})

const getPhotos = cache(async (collection: string, activeSerie?: string) => {
  const payload = await getPayload({ config })
  
  return payload.find({
    collection: 'photography',
    where: {
      and: [
        {
          'collections.slug': { equals: collection.toLowerCase() },
        },
        ...(activeSerie
          ? [
              {
                'series.id': { equals: Number(activeSerie) },
              },
            ]
          : []),
      ],
    },
    depth: 2,
    pagination: false,
  })
})

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const collections = await payload.find({ 
    collection: 'photographies-collection'
  })

  return collections.docs.map((collection) => ({
    collection: collection.slug,
  }))
}

const CollectionPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>
  searchParams: Promise<{ activeSerie: string; scrollY?: string }>
}) => {
  const { collection } = await params
  const { activeSerie } = await searchParams
  
  // Use cached data fetching functions
  const collectionData = await getCollection(collection)
  
  if (!collectionData.docs.length) {
    notFound()
  }

  // Use cached data fetching function
  const photos = await getPhotos(collection, activeSerie)

  if (!photos.docs.length && activeSerie) {
    redirect(`/${collection}`)
  }

  const photosWithBlur = await Promise.all(
    photos.docs.map(async (photo) => {
      if (!photo.picture || typeof photo.picture === 'number' || !photo.picture.url) return photo

      try {
        const base64 = await generateBlurPlaceholder(photo.picture.url)
        if (base64) {
          return {
            ...photo,
            picture: {
              ...photo.picture,
              blurDataURL: base64,
            },
          }
        }
        return photo
      } catch (err) {
        console.error('Error generating blur data:', err)
        return photo
      }
    })
  )

  const uniqueSeries = Array.from(
    new Set(
      photos.docs
        .flatMap((photo) => photo.series)
        .filter(
          (series): series is Series => series !== null && series !== undefined
        )
    )
  )

  return (
    <ReactLenis
      className='flex-1 h-full overflow-y-auto pt-[32px] px-[32px]'
      options={{ smoothWheel: true, autoRaf: true }}
    >
      <ScrollRestoration />
      <main>
        <div className='flex flex-col lg:flex-row gap-10 items-center mb-[25px]'>
          <h1 className='text-4xl capitalize font-black'>
            {collectionData?.docs[0]?.name}
          </h1>
          <div className='flex gap-3 flex-wrap'>
            <Badge text='All' active={!activeSerie} collection={collection} />
            {uniqueSeries.map((serie: Series, index: number) => (
              <Badge
                key={index}
                text={serie.name}
                active={Number(activeSerie) === serie.id}
                collection={collection}
                id={serie.id}
              />
            ))}
          </div>
        </div>
        <div className='border-b border-theme-black' />
        <MasonryGrid
          photos={photosWithBlur}
          collection={collection?.toLowerCase()}
        />
      </main>
    </ReactLenis>
  )
}

export default CollectionPage
