import MansonryGrid from '@/components/grid/MansonryGrid'
import { getPayload } from 'payload'
import config from '@payload-config'
import Badge from '@/components/Badge'
import { Series } from '@/payload-types'
import { redirect } from 'next/navigation'
import ScrollRestoration from '@/hooks/ScrollRestoration' 

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
    redirect('/')
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
    pagination: false,
  })

  if (!photos.docs.length) {
    redirect(`/${collection}`)
  }

  return (
    <main
      className='flex-1 h-full overflow-y-auto pt-[32px] px-[32px]'
      id='collection-main'>
      <ScrollRestoration />
      <div className='flex gap-10 items-center mb-[25px]'>
        <h1 className='text-4xl capitalize font-black'>
          {collectionData?.docs[0]?.name}
        </h1>
        <div className='flex gap-3 flex-wrap'>
          <Badge text='All' active={!activeSerie} collection={collection} />
          {collectionData?.docs[0]?.series
            ?.filter((serie): serie is Series => typeof serie !== 'number')
            .map((serie: Series, index: number) => (
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
      <MansonryGrid
        photos={photos?.docs}
        collection={collection?.toLowerCase()}
      />
    </main>
  )
}

export default CollectionPage
