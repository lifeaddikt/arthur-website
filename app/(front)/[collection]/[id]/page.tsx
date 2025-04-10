import { getPayload } from 'payload'
import config from '@payload-config'
import PicturePageNav from '@/components/nav/PicturePageNav'
import ClientImage from '@/components/ClientImage'
import { notFound } from 'next/navigation'
import { generateBlurPlaceholder } from '@/utils/image'
import { cache } from 'react'

export const revalidate = 3600

const getPhotoById = cache(async (id: string) => {
  const payload = await getPayload({ config })

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
  const payload = await getPayload({ config })

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
  const payload = await getPayload({ config })

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
  const payload = await getPayload({ config })

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

  let photoWithBlur = currentPhoto
  if (typeof currentPhoto.picture !== 'number' && currentPhoto.picture?.url) {
    try {
      const base64 = await generateBlurPlaceholder(currentPhoto.picture.url)
      if (base64) {
        photoWithBlur = {
          ...currentPhoto,
          picture: {
            ...currentPhoto.picture,
            blurDataURL: base64,
          },
        }
      }
    } catch (error) {
      console.error('Error generating blur placeholder:', error)
    }
  }

  return (
    <main className='flex-1 h-[90vh] md:h-[100vh] overflow-hidden flex flex-col justify-center md:justify-between items-center pt-8 px-8 md:pt-16 md:px-16'>
      <ClientImage photo={photoWithBlur} collection={collection} />
      <PicturePageNav
        prevPhoto={prevPhoto.docs[0] || null}
        nextPhoto={nextPhoto.docs[0] || null}
        collection={collection}
      />
    </main>
  )
}

export default PicturePage
