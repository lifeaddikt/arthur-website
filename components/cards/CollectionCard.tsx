'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { PhotographiesCollection } from '@/payload-types'

interface CollectionCardProps {
  collection: Omit<PhotographiesCollection, 'photos'> & {
    photosCount: number
  }
  index: number
}

const CollectionCard = ({ collection, index }: CollectionCardProps) => {
  const desktopPhoto =
    typeof collection.desktopPhoto === 'number' ? null : collection.desktopPhoto
  const mobilePhoto =
    typeof collection.mobilePhoto === 'number' ? null : collection.mobilePhoto

  if (!desktopPhoto || !mobilePhoto) return null

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
        <div className='aspect-[4/3] w-full overflow-hidden'>
          <Image
            id={desktopPhoto.id.toString()}
            src={desktopPhoto.url || ''}
            alt={desktopPhoto.alt || 'Collection photo'}
            width={600}
            height={450}
            className='hidden md:block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
            priority
            sizes='(max-width: 600px) 100vw, (max-width: 768px) 50vw, 33vw'
            placeholder='blur'
            blurDataURL={
              desktopPhoto.blurDataURL ||
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNlZWUiLz48L3N2Zz4='
            }
          />
          <Image
            id={mobilePhoto.id.toString()}
            src={mobilePhoto.url || ''}
            alt={mobilePhoto.alt || 'Collection photo'}
            width={600}
            height={450}
            className='block md:hidden h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
            priority
            sizes='(max-width: 600px) 100vw, (max-width: 768px) 50vw, 33vw'
            placeholder='blur'
            blurDataURL={
              mobilePhoto.blurDataURL ||
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNlZWUiLz48L3N2Zz4='
            }
          />
        </div>
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
