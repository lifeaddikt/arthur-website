'use client'

import { memo } from 'react'
import Masonry from 'react-masonry-css'
import { Photography } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

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

  const isMobile = useMediaQuery('(max-width: 768px)')

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

        const isPriority = isMobile ? index === 0 : index < 6

        return (
          <motion.div
            key={id}
            data-picture-id={id}
            initial={{ opacity: 1, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            viewport={{ once: true, amount: 0 }}
          >
            <Link href={`/${collection}/${id}`} prefetch={false}>
              <Image
                className={collection === 'film' ? 'dark:invert' : ''}
                draggable={false}
                priority={isPriority}
                loading={isPriority ? 'eager' : 'lazy'}
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
                  contain: 'layout',
                }}
                blurDataURL={
                  picture.blurDataURL ||
                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNlZWUiLz48L3N2Zz4='
                }
                fetchPriority={isPriority ? 'high' : 'auto'}
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
