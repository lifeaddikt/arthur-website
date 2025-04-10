import Link from 'next/link'
import { PhotographiesCollection } from '@/payload-types'
import { usePathname } from 'next/navigation'

const MenuLinks = ({ collections, setOpen }: { collections: PhotographiesCollection[], setOpen: (open: boolean) => void }) => {
    const pathname = usePathname()
    const formatURL = (name: string) => name.replace(/\s+/g, '-').toLowerCase()

    return collections.map(collection => {
      const formattedName = formatURL(collection.name)
      const isActive = pathname.includes(`/${formattedName}`)

      return (
        <Link
          key={collection.id}
          href={`/${formattedName}`}
          onClick={() => setOpen(false)}
          className={`font-medium text-lg ${isActive ? 'underline' : ''} uppercase text-center lg:text-left py-6 lg:py-0 border-t lg:border-none ${collections[collections.length - 1].id === collection.id ? 'border-b lg:border-none' : ''}`}>
          {collection.name}
        </Link>
      )
    })
  }

export default MenuLinks