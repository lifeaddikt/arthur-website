import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import MasonryGrid from '@/components/grid/MasonryGrid'
import { generateBlurPlaceholder } from '@/utils/image'
import { ReactLenis } from 'lenis/react'


const Home = async () => {
  const payload = await getPayload({ config })
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
        const base64 = await generateBlurPlaceholder(photo.picture.url)
        if (base64) {
          return {
            ...photo,
            picture: {
              ...photo.picture,
              blurDataURL: base64,
            },
          }
        }
        return photo
      } catch (err) {
        console.error('Error generating blur data:', err)
        return photo
      }
    })
  )

  return (
    <ReactLenis className='flex-1 h-full overflow-y-auto px-[32px] pt-[32px]' options={{ smoothWheel: true, autoRaf: true }}>
      <h1 className='text-4xl capitalize font-black mb-[25px]'>Home</h1>
      <div className='border-b border-theme-black' />
      <MasonryGrid photos={photosWithBlur} collection='home' />
    </ReactLenis>
  )
}

export default Home
