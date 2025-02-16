'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Instagram from '../icons/Instagram'
import { PhotographiesCollection } from '@/payload-types'
import Retract from '../icons/Retract'
import Open from '../icons/Open'
import Burger from '../icons/Burger'
import ThemeToggle from '../ThemeToggle'

const NavbarClient = ({
  collections,
}: {
  collections: PhotographiesCollection[]
}) => {
  const pathname = usePathname()

  const formatURL = (name: string) => name.replace(/\s+/g, '-').toLowerCase()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <nav
      className={`flex flex-col gap-10 border-r border-theme-black transition-all ease-in-out duration-250 ${isOpen ? 'basis-[18%] max-w-[275px] pt-10 pb-4 pl-8 ' : 'basis-[5%] max-w-[60px] items-center py-4'}`}>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)}>
          <Burger />
        </button>
      )}
      {isOpen && (
        <>
          <div className='flex items-center'>
            <Link href='/' className='text-4xl font-extrabold uppercase'>
              Arthur <br /> Paumier
            </Link>
          </div>
          <div className='flex flex-col gap-5 uppercase'>
            {collections.map(collection => {
              const formattedName = formatURL(collection.name)
              const isActive = pathname === `/${formattedName}`

              return (
                <Link
                  key={collection.id}
                  href={`/${formattedName}`}
                  className={`text-lg ${isActive ? 'underline' : ''}`}>
                  {collection.name}
                </Link>
              )
            })}
          </div>
          <div className='flex flex-col gap-3 text-sm'>
            <Instagram />
            <div>
              <p>Contact :</p>
              <a href='mailto:paumier.arthur@gmail.com'>
                paumier.arthur@gmail.com
              </a>
            </div>
            <p>&copy; Victor Paumier, {new Date().getFullYear()}</p>
          </div>
        </>
      )}
      {isOpen ? (
        <div className='flex justify-between mt-auto w-[90%]'>
          <ThemeToggle />
          <button onClick={() => setIsOpen(false)}>
            <Retract />
          </button>
        </div>
      ) : (
        <button className='mt-auto' onClick={() => setIsOpen(true)}>
          <Open />
        </button>
      )}
    </nav>
  )
}

export default NavbarClient
