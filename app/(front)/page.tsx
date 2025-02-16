import MansonryGrid from '@/components/grid/MansonryGrid'
import { getPayload } from 'payload'
import config from '@payload-config'

const Home = async () => {
  const payload = await getPayload({ config })
  console.log(payload)
  return (
    <main className='flex-1 h-full overflow-y-auto pt-[32px] px-[32px]'>
      <h1 className='text-2xl mb-[32px]'>Architecture</h1>
      <div className='border-b border-white' />
      <MansonryGrid />
    </main>
  )
}

export default Home
