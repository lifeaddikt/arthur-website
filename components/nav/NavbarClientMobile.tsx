'use client'
import { useState } from 'react'
import MenuLinks from './MenuLinks'
import Burger from '../icons/Burger'
import Close from '../icons/Close'
import { PhotographiesCollection } from '@/payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo, SocialLinks } from './NavElements'

const NavbarClientMobile = ({
  collections,
}: {
  collections: PhotographiesCollection[]
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const MobileMenu = () => (
    <motion.div
      key='menu'
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.3 }}
      className='fixed bottom-0 left-0 w-full h-full bg-white dark:bg-black flex flex-col justify-center items-center gap-10 z-50'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='flex items-center'>
        <Logo />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='flex flex-col uppercase w-[100%]'>
        <MenuLinks collections={collections} setOpen={setIsOpen} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}>
        <SocialLinks />
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
  )

  return (
    <AnimatePresence mode='wait'>
      {!isOpen ? (
        <motion.button
          key='burger'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOpen(!isOpen)}
          className='lg:hidden fixed bottom-4 right-6 z-50 border border-black dark:border-white bg-white dark:bg-black p-1'>
          <Burger />
        </motion.button>
      ) : (
        <MobileMenu />
      )}
    </AnimatePresence>
  )
}

export default NavbarClientMobile
