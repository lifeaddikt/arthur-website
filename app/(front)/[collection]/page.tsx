import MasonryGrid from '@/components/grid/MasonryGrid'
import Badge from '@/components/Badge'
import { notFound, redirect } from 'next/navigation'
import ScrollRestoration from '@/hooks/ScrollRestoration'
import { ReactLenis } from 'lenis/react'
import { cache } from 'react'
import { getPayloadClient } from '@/utils/payload'
import { Serie } from '@/payload-types'

export const revalidate = 3600

const getCollection = cache(async (slug: string) => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'photographies-collection',
    where: {
      slug: { equals: slug.toLowerCase() },
    },
    limit: 1,
  })
})

const getPhotos = cache(async (collection: string, activeSerie?: string) => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'photography',
    where: {
      and: [
        {
          'collection.slug': { equals: collection.toLowerCase() },
        },
        ...(activeSerie
          ? [
              {
                'serie.id': { equals: Number(activeSerie) },
              },
            ]
          : []),
      ],
    },
    depth: 2,
    pagination: false,
    sort: 'serie',
  })
})

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const collections = await payload.find({
    collection: 'photographies-collection',
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

  const collectionData = await getCollection(collection)

  if (!collectionData.docs.length) {
    notFound()
  }

  const series = collectionData.docs[0].availableSeries
  const photos = await getPhotos(collection, activeSerie)

  console.log(series)
  if (!photos.docs.length && activeSerie) {
    redirect(`/${collection}`)
  }

  return (
    <ReactLenis
      className='flex-1 h-full overflow-y-auto pt-[32px] px-[32px]'
      options={{ smoothWheel: true, autoRaf: true }}
    >
      <ScrollRestoration />
      <main>
        <div className='flex flex-col lg:flex-row gap-10 items-center mb-[25px]'>
          <h1 className='text-4xl font-bold uppercase'>
            {collectionData?.docs[0]?.name}
          </h1>
          <div className='flex gap-3 flex-wrap'>
            <Badge text='All' active={!activeSerie} collection={collection} />
            {series?.map((serie: number | Serie, index: number) => {
              const id = typeof serie === 'object' ? serie.id : serie
              const name = typeof serie === 'object' ? serie.name : `Série ${index + 1}`
              return (
                <Badge
                  key={index}
                  text={name}
                  active={Number(activeSerie) === id}
                  collection={collection}
                  id={id}
                />
              )
            })}
          </div>
        </div>
        <div className='border-b border-theme-black' />
        <MasonryGrid
          photos={photos.docs}
          collection={collection?.toLowerCase()}
        />
      </main>
    </ReactLenis>
  )
}

export default CollectionPage
