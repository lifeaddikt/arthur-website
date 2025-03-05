'use client'

import Masonry from 'react-masonry-css'
import { Photography } from '@/payload-types'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { motion } from 'framer-motion'


type MasonryGridProps = {
  photos: Photography[]
  collection: string
}

const MasonryGrid = ({ photos, collection }: MasonryGridProps) => {
  const breakpointColumns = {
    default: 3,
    768: 1,
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className='my-masonry-grid mt-8'
      columnClassName='my-masonry-grid_column'>
      {photos.map(({ id, picture }, index) => {
        if (typeof picture === 'number' || !picture?.url) return null
        return (
          <motion.div
            key={id}
            data-picture-id={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/${collection}/${id}`}>
              <Image
                className='dark:invert'
                draggable={false}
                priority={index < 7}
                loading={index < 7 ? 'eager' : 'lazy'}
                src={picture.url}
                alt={picture.alt || 'Photo'}
                width={Number(picture.width) || 0}
                height={Number(picture.height) || 0}
                placeholder='blur'
                style={{ viewTransitionName: `photo-${id}` }}
                blurDataURL={picture.sizes?.blur?.url || ''}
              />
            </Link>
          </motion.div>
        )
      })}
    </Masonry>
  )
}

export default MasonryGrid
