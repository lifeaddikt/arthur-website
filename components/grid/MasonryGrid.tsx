'use client'

import { memo } from 'react'
import Masonry from 'react-masonry-css'
import { Photography } from '@/payload-types'
import Image from 'next/image'
import { Link } from 'next-view-transitions'

declare module '@/payload-types' {
  interface Media {
    blurDataURL?: string
  }
}

type MasonryGridProps = {
  photos: Photography[]
  collection: string
}

// Helper function to determine appropriate image size
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
          <div key={id} data-picture-id={id}>
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
                style={{ viewTransitionName: `photo-${id}` }}
                blurDataURL={picture.blurDataURL || undefined}
                quality={75}
                fetchPriority={index < 9 ? 'high' : 'auto'}
              />
            </Link>
          </div>
        )
      })}
    </Masonry>
  )
})

MasonryGrid.displayName = 'MasonryGrid'

export default MasonryGrid
