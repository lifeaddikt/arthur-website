'use client'

import { memo } from 'react'
import Masonry from 'react-masonry-css'
import { Photography } from '@/payload-types'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { motion } from 'framer-motion'

type MasonryGridProps = {
  photos: Photography[]
  collection: string
}


const getOptimalImageDimensions = (
  originalWidth: number,
  originalHeight: number
) => {
  const maxWidth = 800 

  if (!originalWidth || !originalHeight) {
    return { width: 640, height: 480 }
  }

  if (originalWidth <= maxWidth) {
    return { width: originalWidth, height: originalHeight }
  }

  const aspectRatio = originalHeight / originalWidth
  const newHeight = Math.round(maxWidth * aspectRatio)

  return { width: maxWidth, height: newHeight }
}

const MasonryGrid = memo(({ photos, collection }: MasonryGridProps) => {
  const breakpointColumns = {
    default: 3,
    1024: 2,
    768: 1,
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className='my-masonry-grid mt-8'
      columnClassName='my-masonry-grid_column'
    >
      {photos.map(({ id, picture }, index) => {
        if (typeof picture === 'number' || !picture?.url) return null

        const { width, height } = getOptimalImageDimensions(
          Number(picture.width) || 0,
          Number(picture.height) || 0
        )

        return (
          <motion.div key={id} data-picture-id={id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.250 }} viewport={{ once: true, amount: 0 }}>
            <Link href={`/${collection}/${id}`} prefetch={false}>
              <Image
                className='dark:invert'
                draggable={false}
                priority={index < 9}
                loading={index < 9 ? 'eager' : 'lazy'}
                src={picture.url}
                alt={picture.alt || 'Photo'}
                width={width}
                height={height}
                sizes='(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 30vw'
                placeholder='blur'
                style={{ 
                  viewTransitionName: `photo-${id}`,
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                  contain: 'layout'
                }}
                blurDataURL={picture.blurDataURL || undefined}
                quality={75}
                fetchPriority={index < 9 ? 'high' : 'auto'}
              />
            </Link>
          </motion.div>
        )
      })}
    </Masonry>
  )
})

MasonryGrid.displayName = 'MasonryGrid'

export default MasonryGrid
