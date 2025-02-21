'use client'
import Masonry from 'react-masonry-css'
import { Photography } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

const MansonryGrid = ({
  photos,
  collection,
}: {
  photos: Photography[]
  collection: string
}) => {
  
  const handlePictureClick = (pictureId: number) => {
    sessionStorage.setItem(`${collection}lastPictureSeen`, pictureId.toString())
  }

  return (
    <Masonry
      breakpointCols={{
        default: 3,
        768: 1 // Switch to 1 column on mobile screens
      }}
      className='my-masonry-grid mt-[32px]'
      columnClassName='my-masonry-grid_column'>
      {photos?.map((photo: Photography, index: number) => (
        <div key={index} data-picture-id={photo.id}>
          <Link href={`/${collection}/${photo.id}`} onClick={() => handlePictureClick(photo.id)}>
            <Image
              draggable={false}
              id={photo.id.toString()}
              src={
                typeof photo.picture !== 'number' && photo.picture.url
                  ? photo.picture.url
                  : ''
              }
              alt={
                typeof photo.picture !== 'number' && photo.picture.alt
                  ? photo.picture.alt
                  : ''
              }
              width={
                typeof photo.picture !== 'number'
                  ? Number(photo.picture.width)
                  : 0
              }
              height={
                typeof photo.picture !== 'number'
                  ? Number(photo.picture.height)
                  : 0
              }
            />
          </Link>
        </div>
      ))}
    </Masonry>
  )
}

export default MansonryGrid
