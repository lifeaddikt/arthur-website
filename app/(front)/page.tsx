import { getPayloadClient } from '@/utils/payload'
import HomeSkeleton from '@/components/skeleton/HomeSkeleton'
import CollectionCard from '@/components/cards/CollectionCard'

export const revalidate = 3600

const Home = async () => {
  const payload = await getPayloadClient()
  const collections = await payload.find({
    collection: 'photographies-collection',
    depth: 1,
  })

  const collectionsWithPhotos = await Promise.all(
    collections.docs.map(async (collection) => {
      const photos = await payload.find({
        collection: 'photography',
        where: {
          'collections.id': { equals: collection.id },
        },
        limit: 1,
        depth: 1,
      })

      return {
        ...collection,
        photos: photos.docs,
        coverPicture: photos.docs[0] || null,
        photosCount: photos.totalDocs,
      }
    })
  )

  const filteredCollections = collectionsWithPhotos.filter(
    (collection) => collection.coverPicture !== null
  )

  if (!filteredCollections.length) {
    return <HomeSkeleton />
  }

  return (
    <div className='py-[32px] px-[32px] overflow-y-auto w-full'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredCollections.map((collection, index) => {
          return (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Home
