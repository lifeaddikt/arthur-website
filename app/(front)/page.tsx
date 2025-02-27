import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

const Home = async () => {
  const payload = await getPayload({ config })
  const collections = await payload.find({
    collection: 'photographies-collection',
  })

  if (!collections.docs.length) {
    notFound()
  }

  const abstractCollection = collections.docs.find(
    collection => collection.slug === 'abstract'
  )

  const redirectSlug = abstractCollection?.slug || collections.docs[0].slug
  return redirect(`/${redirectSlug}`)
}

export default Home
