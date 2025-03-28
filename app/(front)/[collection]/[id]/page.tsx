import { getPayload } from 'payload'
import config from '@payload-config'
import PicturePageNav from '@/components/nav/PicturePageNav'
import ClientImage from '@/components/ClientImage'
import { notFound } from 'next/navigation'
import { getPlaiceholder } from 'plaiceholder'

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
    
    if (typeof currentPhoto.picture !== 'number' && currentPhoto.picture?.url) {
      try {
        const url = currentPhoto.picture.url.startsWith('http') || currentPhoto.picture.url.startsWith('https')
          ? currentPhoto.picture.url 
          : `${process.env.NEXT_PUBLIC_URL}${currentPhoto.picture.url.startsWith('/') ? '' : '/'}${currentPhoto.picture.url}`
        
        const imageResponse = await fetch(url)
        if (!imageResponse.ok) {
          console.error(`Failed to fetch image: ${url} - Status: ${imageResponse.status}`)
        } else {
          const arrayBuffer = await imageResponse.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          
          const { base64 } = await getPlaiceholder(buffer)
          currentPhoto.picture.blurDataURL = base64
        }
      } catch (err) {
        console.error('Error generating blur data:', err)
      }
    }

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
