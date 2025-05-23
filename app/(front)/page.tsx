import { getPayloadClient } from '@/utils/payload'
import CollectionCard from '@/components/cards/CollectionCard'
import { ReactLenis } from 'lenis/react'

export const revalidate = 3600

const Home = async () => {
  const payload = await getPayloadClient()
  const collections = await payload.find({
    collection: 'photographies-collection',
    sort: 'order',
  })

  const collectionsWithPhotos = await Promise.all(
    collections.docs.map(async collection => {
      const photosCount = await payload.count({
        collection: 'photography',
        where: {
          'collection.id': { equals: collections.docs[0].id },
        },
      })
      return {
        ...collection,
        photosCount: photosCount.totalDocs,
      }
    })
  )

  return (
    <ReactLenis
      className='flex-1 h-full overflow-y-auto pt-[32px] px-[32px]'
      options={{ smoothWheel: true, autoRaf: true }}
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {collectionsWithPhotos.map((collection, index) => {
          if (collection.photosCount === 0) {
            return null
          }
          return (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          )
        })}
      </div>
    </ReactLenis>
  )
}

export default Home
