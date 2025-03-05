import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import MansonryGrid from '@/components/grid/MansonryGrid'

const Home = async () => {
  const payload = await getPayload({ config })
  // For the home page we fetch all pictures
  const pictures = await payload.find({
    collection: 'photography',
    limit: -1,
  })

  if (!pictures.docs.length) {
    notFound()
  }

  return (
    <main className='flex-1 h-full overflow-y-auto px-[32px] pt-[32px] -mt-8'>
      <MansonryGrid photos={pictures.docs} collection='home' />
    </main>
  )
}

export default Home
