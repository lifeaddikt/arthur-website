'use client'
import { motion } from 'framer-motion'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { Media, Photography, PhotographiesCollection } from '@/payload-types'

interface CollectionCardProps {
  collection: Omit<PhotographiesCollection, 'photos'> & {
    photos?: Photography[]
    coverPicture: Photography
    photosCount: number
  }
  index: number
}

const CollectionCard = ({ collection, index }: CollectionCardProps) => {
  const coverPicture = collection.coverPicture
  const picture = coverPicture?.picture as Media
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      className='group relative overflow-hidden'
    >
      <Link
        key={collection.id}
        href={`/${collection.slug}`}
        className='transition-all hover:shadow-lg'
      >
        {picture && (
          <div className='aspect-[4/3] w-full overflow-hidden'>
            <Image
              id={coverPicture.id.toString()}
              src={picture.url || ''}
              alt={picture.alt || 'Collection photo'}
              width={600}
              height={450}
              className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
              priority
              sizes='(max-width: 600px) 100vw, (max-width: 768px) 50vw, 33vw'
              placeholder='blur'
              blurDataURL={picture.blurDataURL || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNlZWUiLz48L3N2Zz4='}
              style={{
                viewTransitionName: `photo-${coverPicture.id}`,
              }}
            />
          </div>
        )}
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4'>
          <h2 className='text-white text-xl font-medium'>{collection.name}</h2>
          <p className='text-white/80 text-[15px] md:text-sm mt-1'>
            {collection.photosCount} photo
            {collection.photosCount !== 1 ? 's' : ''}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export default CollectionCard
