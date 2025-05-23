import NavbarClient from './NavbarClient'
import NavbarClientMobile from './NavbarClientMobile'
import { getPayload } from 'payload'
import config from '@payload-config'

const Navbar = async () => {
  const payload = await getPayload({ config })
  const collections = await payload.find({
    collection: 'photographies-collection',
    sort: 'order',
  })

  const filteredCollections = collections?.docs?.filter(
    (collection) => collection.photos?.docs && collection.photos.docs.length > 0
  )

  return (
    <>
      <NavbarClient collections={filteredCollections || []} />
      <NavbarClientMobile collections={filteredCollections || []} />
    </>
  )
}

export default Navbar
