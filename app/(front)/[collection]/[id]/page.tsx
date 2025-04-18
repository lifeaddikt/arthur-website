import PicturePageNav from '@/components/nav/PicturePageNav'
import ClientImage from '@/components/ClientImage'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { getPayloadClient } from '@/utils/payload'

export const revalidate = 3600

const getPhotoById = cache(async (id: string) => {
  const payload = await getPayloadClient()

  try {
    return await payload.findByID({
      collection: 'photography',
      id: id,
    })
  } catch (error) {
    console.error(`Error fetching photo with id ${id}:`, error)
    return null
  }
})

const getPrevPhoto = cache(async (collection: string, createdAt: string) => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'photography',
    where: {
      'collections.slug': { equals: collection.toLowerCase() },
      createdAt: { greater_than: createdAt },
    },
    sort: 'createdAt',
    limit: 1,
  })
})

const getNextPhoto = cache(async (collection: string, createdAt: string) => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'photography',
    where: {
      'collections.slug': { equals: collection.toLowerCase() },
      createdAt: { less_than: createdAt },
    },
    sort: '-createdAt',
    limit: 1,
  })
})

export async function generateStaticParams() {
  const payload = await getPayloadClient()

  const collections = await payload.find({
    collection: 'photographies-collection',
    pagination: false,
  })

  const params = []

  for (const collection of collections.docs) {
    const photos = await payload.find({
      collection: 'photography',
      where: {
        'collections.slug': { equals: collection.slug },
      },
      pagination: false,
    })

    const collectionPhotos = photos.docs.map((photo) => ({
      collection: collection.slug,
      id: photo.id.toString(),
    }))

    params.push(...collectionPhotos)
  }

  return params
}

const PicturePage = async ({
  params,
}: {
  params: Promise<{ id: string; collection: string }>
}) => {
  const { id, collection } = await params

  const currentPhoto = await getPhotoById(id)

  if (!currentPhoto) {
    return notFound()
  }

  const [prevPhoto, nextPhoto] = await Promise.all([
    getPrevPhoto(collection, currentPhoto.createdAt),
    getNextPhoto(collection, currentPhoto.createdAt),
  ])

  return (
    <main className='flex-1 h-[90vh] md:h-[100vh] overflow-hidden flex flex-col justify-center md:justify-between items-center pt-8 px-8 md:pt-16 md:px-16'>
      <ClientImage photo={currentPhoto} collection={collection} />
      <PicturePageNav
        prevPhoto={prevPhoto.docs[0] || null}
        nextPhoto={nextPhoto.docs[0] || null}
        collection={collection}
      />
    </main>
  )
}

export default PicturePage
