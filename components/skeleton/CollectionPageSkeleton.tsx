'use client'
import Masonry from 'react-masonry-css'
import { motion } from 'framer-motion'
import { ReactLenis } from 'lenis/react'

const CollectionPageSkeleton = () => {
  const breakpointColumns = {
    default: 3,
    1024: 2,
    768: 1,
  }

  return (
    <ReactLenis
      className='flex-1 h-full overflow-y-auto pt-[32px] px-[32px]'
      options={{ smoothWheel: true, autoRaf: true }}
    >
      <motion.div
        className='h-12 md:w-[400px] bg-gray-300/50 bg-gradient-to-t from-gray-300/50 to-gray-300/30 mb-[25px] animate-pulse'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className='border-b border-theme-black' />

      <Masonry
        breakpointCols={breakpointColumns}
        className='my-masonry-grid mt-8'
        columnClassName='my-masonry-grid_column'
      >
        {[...Array(9)].map((_, index) => (
          <motion.div
            key={index}
            className='mb-4 bg-gray-300/50 bg-gradient-to-t from-gray-300/50 to-gray-300/30 animate-pulse'
            style={{ aspectRatio: '3/4' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </Masonry>
    </ReactLenis>
  )
}

export default CollectionPageSkeleton
