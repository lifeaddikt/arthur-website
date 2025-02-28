'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhotographiesCollection } from '@/payload-types'
import Retract from '../icons/Retract'
import Open from '../icons/Open'
import Burger from '../icons/Burger'
import ThemeToggle from '../ThemeToggle'
import useClickOutside from '@/hooks/useClickOutside'
import MenuLinks from './MenuLinks'
import { Logo, SocialLinks, ContactInfo } from './NavElements'

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

  const RetractedMenu = () => (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className='absolute left-[60px] top-0 bg-white p-8 flex flex-col gap-10 border-b border-r border-black dark:bg-black dark:border-white z-10'>
      <MenuLinks collections={collections} setOpen={setRetractMenuOpen} />
      <SocialLinks />
    </motion.div>
  )

  const ExpandedMenu = () => (
    <>
      <div className='flex items-center'>
        <Logo />
      </div>
      <div className='flex flex-col gap-5 uppercase'>
        <MenuLinks collections={collections} setOpen={setRetractMenuOpen} />
      </div>
      <ContactInfo />
    </>
  )

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
            {retractMenuOpen && <RetractedMenu />}
          </AnimatePresence>
        </>
      )}
      {isOpen && <ExpandedMenu />}
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
