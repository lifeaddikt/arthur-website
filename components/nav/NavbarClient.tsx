'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Instagram from '../icons/Instagram'
import { PhotographiesCollection } from '@/payload-types'
import Retract from '../icons/Retract'
import Open from '../icons/Open'
import Burger from '../icons/Burger'
import ThemeToggle from '../ThemeToggle'
import useClickOutside from '@/hooks/useClickOutside'
import MenuLinks from './MenuLinks'

const NavbarClient = ({
  collections,
}: {
  collections: PhotographiesCollection[]
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const [retractMenuOpen, setRetractMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  useClickOutside(menuRef, () => setRetractMenuOpen(false), burgerRef)


  return (
    <nav
      className={`hidden relative lg:flex flex-col gap-10 border-r border-theme-black transition-all ease-in-out duration-250 ${isOpen ? 'basis-[18%] max-w-[275px] pt-10 pb-4 pl-8 ' : 'basis-[5%] max-w-[60px] items-center py-4'}`}>
      {!isOpen && (
        <>
          <button
            ref={burgerRef}
            onClick={() => setRetractMenuOpen(prev => !prev)}>
            <Burger />
          </button>
          <AnimatePresence>
            {retractMenuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className='absolute left-[60px] top-0 bg-theme-white p-8 flex flex-col gap-10 border-b border-r border-theme-black'>
                <MenuLinks collections={collections} setOpen={setRetractMenuOpen} />
                <div className='flex gap-3 text-sm'>
                  <Instagram />
                  <ThemeToggle />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
      {isOpen && (
        <>
          <div className='flex items-center'>
            <Link href='/' className='text-4xl font-extrabold uppercase'>
              Arthur <br /> Paumier
            </Link>
          </div>
          <div className='flex flex-col gap-5 uppercase'>
            <MenuLinks collections={collections} setOpen={setRetractMenuOpen} />
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
