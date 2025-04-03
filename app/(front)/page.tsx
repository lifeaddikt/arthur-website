import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import MasonryGrid from '@/components/grid/MasonryGrid'
import { getPlaiceholder } from 'plaiceholder'

const Home = async () => {
  const payload = await getPayload({ config })
  // For the home page we fetch all pictures
  const photos = await payload.find({
    collection: 'photography',
    limit: -1,
  })

  if (!photos.docs.length) {
    notFound()
  }

  const photosWithBlur = await Promise.all(
    photos.docs.map(async (photo) => {
      if (!photo.picture || typeof photo.picture === 'number' || !photo.picture.url) return photo

      try {
        const url = photo.picture.url.startsWith('http') || photo.picture.url.startsWith('https')
          ? photo.picture.url 
          : `${process.env.NEXT_PUBLIC_URL}${photo.picture.url.startsWith('/') ? '' : '/'}${photo.picture.url}`
        
        console.log('Attempting to process image:', url)
        
        const imageResponse = await fetch(url, {
          next: { revalidate: 3600 },
        })

        if (!imageResponse.ok) {
          console.error(`Failed to fetch image: ${url} - Status: ${imageResponse.status}`)
          return photo
        }
        
        const arrayBuffer = await imageResponse.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        
        const { base64 } = await getPlaiceholder(buffer, { size: 10 })
        
        console.log('Successfully generated blur data for:', url)
        console.log(base64)
        
        return {
          ...photo,
          picture: {
            ...photo.picture,
            blurDataURL: base64,
          },
        }
      } catch (err) {
        console.error('Error generating blur data:', err)
        return photo
      }
    })
  )

  return (
    <main className='flex-1 h-full overflow-y-auto px-[32px] pt-[32px] -mt-8'>
      <MasonryGrid photos={photosWithBlur} collection='home' />
    </main>
  )
}

export default Home
