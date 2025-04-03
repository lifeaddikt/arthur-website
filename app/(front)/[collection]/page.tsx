import MasonryGrid from '@/components/grid/MasonryGrid'
import { getPayload } from 'payload'
import config from '@payload-config'
import Badge from '@/components/Badge'
import { Series } from '@/payload-types'
import { notFound, redirect } from 'next/navigation'
import ScrollRestoration from '@/hooks/ScrollRestoration'
import { getPlaiceholder } from 'plaiceholder'

// Revalidate pages every hour
export const revalidate = 3600

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const collections = await payload.find({ collection: 'photographies-collection' })

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
  const payload = await getPayload({ config })

  const collectionData = await payload.find({
    collection: 'photographies-collection',
    where: {
      slug: { equals: collection.toLowerCase() },
    },
    limit: 1,
  })

  if (!collectionData.docs.length) {
    notFound()
  }

  const photos = await payload.find({
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

  const photosWithBlur = await Promise.all(
    photos.docs.map(async (photo) => {
      if (!photo.picture || typeof photo.picture === 'number' || !photo.picture.url) return photo

      try {
        const url = photo.picture.url.startsWith('http') || photo.picture.url.startsWith('https')
          ? photo.picture.url 
          : `${process.env.NEXT_PUBLIC_URL}${photo.picture.url.startsWith('/') ? '' : '/'}${photo.picture.url}`
        
        console.log('Attempting to process image:', url)
        
        const imageResponse = await fetch(url, {
          next: { revalidate: 3600 },
        })

        if (!imageResponse.ok) {
          console.error(`Failed to fetch image: ${url} - Status: ${imageResponse.status}`)
          return photo
        }
        
        const arrayBuffer = await imageResponse.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        
        const { base64 } = await getPlaiceholder(buffer, { size: 10 })
        
        console.log('Successfully generated blur data for:', url)
        console.log(base64)
        
        return {
          ...photo,
          picture: {
            ...photo.picture,
            blurDataURL: base64,
          },
        }
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

  if (!photos.docs.length && activeSerie) {
    redirect(`/${collection}`)
  }

  return (
    <div>
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
    </div>
  )
}

export default CollectionPage
