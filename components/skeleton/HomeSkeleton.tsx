'use client'
import { motion } from 'framer-motion'

const HomeSkeleton = () => {
  return (
    <div className='container mx-auto px-4 py-12 h-full overflow-y-auto'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className='relative overflow-hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className='aspect-[4/3] w-full overflow-hidden'>
              <div className='h-full w-full bg-gray-300/50 bg-gradient-to-t from-gray-300/50 to-gray-300/30 animate-pulse' />
            </div>
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4'>
              <div className='h-6 w-32 bg-gray-300/50 rounded animate-pulse mb-1'></div>
              <div className='h-4 w-20 bg-gray-300/50 rounded animate-pulse'></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HomeSkeleton
