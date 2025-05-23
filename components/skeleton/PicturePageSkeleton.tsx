'use client'
import { motion } from 'framer-motion'
import { ReactLenis } from 'lenis/react'
import Close from '@/components/icons/Close'
import Next from '@/components/icons/Next'
import Prev from '@/components/icons/Prev'
import Grid from '@/components/icons/Grid'

const PicturePageSkeleton = () => {
  return (
    <ReactLenis
      className='flex-1 h-[100vh] overflow-hidden'
      options={{ smoothWheel: true, autoRaf: true }}
    >
      <motion.main
        className='h-full flex flex-col justify-between items-center px-8 md:px-16'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='w-full flex justify-between items-center pt-8 md:pt-16'>
          <motion.div
            className='h-5 w-32 bg-gray-300/50 rounded animate-pulse'
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Close className='opacity-50' />
          </motion.div>
        </div>

        <motion.div
          className='w-full h-[65%] md:h-[70%] relative flex items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className='w-full h-full max-w-[90%] max-h-[90%] bg-gray-300/30 bg-gradient-to-t from-gray-300/40 to-gray-300/20 animate-pulse' />
        </motion.div>

        <motion.nav
          className='w-full p-2 md:p-6 mb-14 md:mb-6'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <ul className='flex justify-center items-center gap-6 uppercase'>
            <li className='flex justify-center items-center gap-3 opacity-50'>
              <Prev />
              <p>Prev</p>
            </li>
            <li className='flex justify-center items-center gap-3 opacity-50'>
              <Grid />
              <p>Grid</p>
            </li>
            <li className='flex justify-center items-center gap-3 opacity-50'>
              <p>Next</p>
              <Next />
            </li>
          </ul>
        </motion.nav>
      </motion.main>
    </ReactLenis>
  )
}

export default PicturePageSkeleton
