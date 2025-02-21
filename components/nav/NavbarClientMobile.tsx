'use client'
import { useState } from 'react'
import MenuLinks from './MenuLinks'
import Burger from '../icons/Burger'
import Close from '../icons/Close'
import { PhotographiesCollection } from '@/payload-types'
import Link from 'next/link'
import Instagram from '../icons/Instagram'
import ThemeToggle from '../ThemeToggle'
import { AnimatePresence, motion } from 'framer-motion'

const NavbarClientMobile = ({
  collections,
}: {
  collections: PhotographiesCollection[]
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AnimatePresence mode='wait'>
        {!isOpen ? (
          <motion.button
            key='burger'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(!isOpen)}
            className='lg:hidden fixed bottom-4 right-6 z-50'>
            <Burger />
          </motion.button>
        ) : (
          <motion.div
            key='menu'
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.3 }}
            className='fixed bottom-0 left-0 w-full h-full bg-theme-white flex flex-col justify-center items-center gap-10 z-50'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className='flex items-center'>
              <Link href='/' className='text-4xl font-extrabold uppercase'>
                Arthur <br /> Paumier
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className='flex flex-col uppercase w-[100%]'>
              <MenuLinks collections={collections} setOpen={setIsOpen} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className='flex gap-3 text-sm'>
              <Instagram />
              <ThemeToggle />
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              onClick={() => setIsOpen(false)}
              className='lg:hidden fixed bottom-4 right-6 z-50'>
              <Close />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavbarClientMobile
