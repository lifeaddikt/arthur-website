'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Masonry from 'react-masonry-css'

const Loading = () => {
  const pathname = usePathname()
  const isCollectionPage = pathname.includes('/') && pathname !== '/'

  // Collection page loading UI
  if (isCollectionPage) {
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

  // Home page loading UI
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <div className="h-full w-full bg-gray-200 animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
              <div className="h-6 w-32 bg-gray-300/50 rounded animate-pulse mb-1"></div>
              <div className="h-4 w-20 bg-gray-300/30 rounded animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Loading
