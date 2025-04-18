import { redirect } from 'next/navigation'
import { getPayloadClient } from '@/utils/payload'

const Home = async () => {
  const payload = await getPayloadClient()
  const collections = await payload.find({
    collection: 'photographies-collection',
  })

  const filteredCollections = collections.docs.filter(
    (collection) => collection.photos?.docs && collection.photos.docs.length > 0
  )

  if (!filteredCollections.length) {
    return <div>No collections available</div>
  }

  redirect(`/${filteredCollections[0].slug}`)
}

export default Home
