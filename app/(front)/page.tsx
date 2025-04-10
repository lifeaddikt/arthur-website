import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

const Home = async () => {
  const payload = await getPayload({ config })
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
