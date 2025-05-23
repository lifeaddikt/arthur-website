import PicturePageNav from '@/components/nav/PicturePageNav'
import ClientImage from '@/components/ClientImage'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { getPayloadClient } from '@/utils/payload'

export const revalidate = 3600

const getPhotoWithNavigation = cache(async (id: string, collection: string) => {
  const payload = await getPayloadClient()

  try {
    const currentPhoto = await payload.findByID({
      collection: 'photography',
      id: id,
    })

    if (!currentPhoto) return null

    const [prevPhoto, nextPhoto] = await Promise.all([
      payload.find({
        collection: 'photography',
        where: {
          'collection.slug': { equals: collection.toLowerCase() },
          createdAt: { greater_than: currentPhoto.createdAt },
        },
        sort: 'createdAt',
        limit: 1,
      }),
      payload.find({
        collection: 'photography',
        where: {
          'collection.slug': { equals: collection.toLowerCase() },
          createdAt: { less_than: currentPhoto.createdAt },
        },
        sort: '-createdAt',
        limit: 1,
      }),
    ])

    return {
      currentPhoto,
      prevPhoto: prevPhoto.docs[0] || null,
      nextPhoto: nextPhoto.docs[0] || null,
    }
  } catch (error) {
    console.error(`Error fetching photo with id ${id}:`, error)
    return null
  }
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
        'collection.slug': { equals: collection.slug },
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

  const result = await getPhotoWithNavigation(id, collection)

  if (!result) {
    return notFound()
  }

  const { currentPhoto, prevPhoto, nextPhoto } = result

  return (
    <main className='flex-1 h-[90vh] md:h-[100vh] overflow-hidden flex flex-col justify-center md:justify-between items-center pt-8 px-8 md:pt-16 md:px-16'>
      <ClientImage
        photo={currentPhoto}
        collection={collection}
        prevPhoto={prevPhoto}
        nextPhoto={nextPhoto}
      />
      <PicturePageNav
        prevPhoto={prevPhoto}
        nextPhoto={nextPhoto}
        collection={collection}
      />
    </main>
  )
}

export default PicturePage
