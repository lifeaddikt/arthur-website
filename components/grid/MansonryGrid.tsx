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
        console.log(picture)
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
                priority={index < 4}
                loading={index < 4 ? 'eager' : 'lazy'}
                src={picture.url}
                alt={picture.alt || 'Photo'}
                width={Number(picture.width) || 0}
                height={Number(picture.height) || 0}
                sizes="(max-width: 768px) 100vw, 33vw"
                placeholder='blur'
                style={{ viewTransitionName: `photo-${id}` }}
                blurDataURL={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU0LS0yMi4qIiUvKTI+QjIyNjo6Pj4+LzI4RkU/QjU+Pj7/2wBDAR'}
                quality={80}
              />
            </Link>
          </motion.div>
        )
      })}
    </Masonry>
  )
}

export default MasonryGrid
