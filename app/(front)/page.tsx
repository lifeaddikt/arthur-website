import Link from 'next/link'
import { getPayloadClient } from '@/utils/payload'
import Image from 'next/image'

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

      const photosCount = await payload.find({
        collection: 'photography',
        where: {
          'collections.id': { equals: collection.id },
        },
        limit: 0,
      })

      return {
        ...collection,
        coverPicture: photos.docs[0]?.picture || null,
        photosCount: photosCount.totalDocs,
      }
    })
  )

  const filteredCollections = collectionsWithPhotos.filter(
    (collection) => collection.coverPicture !== null
  )

  return (
    <div className='container mx-auto px-4 py-4 overflow-y-auto'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredCollections.map((collection) => {
          const coverPicture = collection.coverPicture as {
            url: string
            alt?: string
            blurDataURL?: string
          } | null

          return (
            <Link
              key={collection.id}
              href={`/${collection.slug}`}
              className='group relative overflow-hidden transition-all hover:shadow-lg'
            >
              {coverPicture && (
                <div className='aspect-[4/3] w-full overflow-hidden'>
                  <Image
                    src={coverPicture.url}
                    alt={coverPicture.alt || 'Collection photo'}
                    width={600}
                    height={450}
                    className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                    priority
                    sizes='(max-width: 600px) 100vw, (max-width: 768px) 50vw, 33vw'
                    placeholder='blur'
                    blurDataURL={coverPicture.blurDataURL}
                  />
                </div>
              )}
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4'>
                <h2 className='text-white text-xl font-medium'>
                  {collection.name}
                </h2>
                <p className='text-white/80 text-sm mt-1'>
                  {collection.photosCount} photo
                  {collection.photosCount !== 1 ? 's' : ''}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Home
