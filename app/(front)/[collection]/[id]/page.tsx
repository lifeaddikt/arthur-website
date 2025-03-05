import { getPayload } from 'payload'
import config from '@payload-config'
import PicturePageNav from '@/components/nav/PicturePageNav'
import ClientImage from '@/components/ClientImage'
import { notFound } from 'next/navigation'

const PicturePage = async ({ params }: { params: Promise<{ id: string; collection: string }> }) => {
  const { id, collection } = await params
  const payload = await getPayload({ config })

  try {
    // Get current photo first
    const currentPhoto = await payload.findByID({
      collection: 'photography',
      id: id,
    })

    if (!currentPhoto) {
      return notFound()
    }

    // Get adjacent photos in parallel
    const [prevPhoto, nextPhoto] = await Promise.all([
      // Previous photo (newer photos)
      payload.find({
        collection: 'photography',
        where: {
          'collections.slug': { equals: collection.toLowerCase() },
          createdAt: { greater_than: currentPhoto.createdAt },
        },
        sort: 'createdAt', // Ascending order for newer photos
        limit: 1,
      }),
      
      // Next photo (older photos)
      payload.find({
        collection: 'photography',
        where: {
          'collections.slug': { equals: collection.toLowerCase() },
          createdAt: { less_than: currentPhoto.createdAt },
        },
        sort: '-createdAt', // Descending order for older photos
        limit: 1,
      }),
    ])

    return (
      <main className='flex-1 h-[100vh] overflow-hidden flex flex-col justify-center md:justify-between items-center pt-8 px-8 md:pt-16 md:px-16'>
          <ClientImage photo={currentPhoto} collection={collection} />
          <PicturePageNav 
            prevPhoto={prevPhoto.docs[0] || null} 
            nextPhoto={nextPhoto.docs[0] || null}
            collection={collection}
          />
      </main>
    )
  } catch (error) {
    console.error('Error fetching photo:', error)
    return notFound()
  }
}

export default PicturePage
