import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

const Home = async () => {
  const payload = await getPayload({ config })
  const collections = await payload.find({
    collection: 'photographies-collection',
  })

  if (!collections.docs.length) {
    throw new Error('No collections found')
  }

  // Try to find abstract collection
  const abstractCollection = collections.docs.find(
    collection => collection.slug === 'abstract'
  )

  // Redirect to abstract if it exists, otherwise to first collection
  const redirectSlug = abstractCollection?.slug || collections.docs[0].slug
  redirect(`/${redirectSlug}`)
}

export default Home
