'use client'

import { motion } from 'framer-motion'
import Masonry from 'react-masonry-css'

const Loading = () => {
  const breakpointColumns = {
    default: 3,
    1024: 2,
    768: 1,
  }

  return (
    <div className='flex-1 h-full overflow-y-auto px-[32px] pt-[32px]'>
      <motion.div 
        className='h-12 md:w-[400px] bg-gray-200 mb-[25px] animate-pulse'
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
            className='mb-4 bg-gray-200 animate-pulse'
            style={{ aspectRatio: '3/4' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </Masonry>
    </div>
  )
}

export default Loading
