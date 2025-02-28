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
      <main className='flex-1 h-full overflow-hidden flex flex-col items-center justify-center'>
        <div className='w-[85%] h-[85%] flex flex-col gap-2'>
          <ClientImage photo={currentPhoto} collection={collection} />
          <PicturePageNav 
            prevPhoto={prevPhoto.docs[0] || null} 
            nextPhoto={nextPhoto.docs[0] || null}
            collection={collection}
          />
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error fetching photo:', error)
    return notFound()
  }
}

export default PicturePage
