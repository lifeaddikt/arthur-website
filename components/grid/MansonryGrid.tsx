'use client'

import Masonry from 'react-masonry-css'
import { Photography } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type MasonryGridProps = {
  photos: Photography[]
  collection: string
}

const MasonryGrid = ({ photos, collection }: MasonryGridProps) => {
  const handlePictureClick = (pictureId: number) => {
    sessionStorage.setItem(`${collection}lastPictureSeen`, pictureId.toString())
  }

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
          <div key={id} data-picture-id={id}>
            <Link href={`/${collection}/${id}`} onClick={() => handlePictureClick(id)}>
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
                blurDataURL={picture.sizes?.blur?.url || ''}
              />
            </Link>
          </div>
        )
      })}
    </Masonry>
  )
}

export default MasonryGrid
