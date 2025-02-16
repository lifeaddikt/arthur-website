import NavbarClient from './NavbarClient'
import { getPayload } from 'payload'
import config from '@payload-config'

const Navbar = async () => {
  const payload = await getPayload({ config })
  const collections = await payload.find({
    collection: 'photographies-collection',
  })

  return <NavbarClient collections={collections?.docs || []} />
}

export default Navbar