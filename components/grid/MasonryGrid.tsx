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

const MasonryGrid = memo(({ photos, collection }: MasonryGridProps) => {
  const breakpointColumns = {
    default: 3,
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
        return (
          <div key={id} data-picture-id={id}>
            <Link href={`/${collection}/${id}`} prefetch={false}>
              <Image
                className='dark:invert'
                draggable={false}
                priority={index < 3}
                loading={index < 3 ? 'eager' : 'lazy'}
                src={picture.url}
                alt={picture.alt || 'Photo'}
                width={Number(picture.width) || 0}
                height={Number(picture.height) || 0}
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                placeholder='blur'
                style={{ viewTransitionName: `photo-${id}` }}
                blurDataURL={picture.blurDataURL || undefined}
                quality={index < 3 ? 85 : 75}
                fetchPriority={index < 3 ? 'high' : 'auto'}
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
