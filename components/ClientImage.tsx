'use client'

import Close from '@/components/icons/Close'
import Image from 'next/image'
import { Photography } from '@/payload-types'
import { Link } from 'next-view-transitions'

const ClientImage = ({
  photo,
  collection,
  prevPhoto,
  nextPhoto,
}: {
  photo: Photography
  collection: string
  prevPhoto?: Photography | null
  nextPhoto?: Photography | null
}) => {
  const imageUrl =
    typeof photo?.picture !== 'number' && photo?.picture.url
      ? photo.picture.url
      : '/placeholder.svg'

  const imageAlt =
    typeof photo?.picture !== 'number' && photo?.picture.alt
      ? photo.picture.alt
      : 'Photo'

  return (
    <div className='w-full h-full flex flex-col justify-center'>
      <div className='flex md:hidden justify-between items-start mb-4'>
        <p className='uppercase text-sm'>{`${photo.place} - ${photo.date}`}</p>
        <Link
          href={`/${collection}?lastPictureSeen=${photo.id}`}
          className='cursor-pointer ml-auto'
        >
          <Close />
        </Link>
      </div>
      <div className='w-full h-[65%] md:h-[90%] relative flex items-center justify-center'>
        <Image
          quality={100}
          draggable={false}
          id={photo.id.toString()}
          src={imageUrl}
          alt={imageAlt}
          fill
          className={`object-contain max-w-fit max-h-fit z-10 animate-fade-in ${collection === 'film' ? 'dark:invert' : ''}`}
          loading='eager'
          priority
          sizes='(max-width: 768px) 90vw, (max-width: 1200px) 75vw, 70vw'
          style={{
            top: 'unset',
            left: 'unset',
            bottom: 'unset',
            right: 'unset',
            viewTransitionName: `photo-${photo.id}`,
            transform: 'translateZ(0)',
            willChange: 'transform',
            contain: 'layout',
          }}
          placeholder={typeof photo?.picture !== 'number' ? 'blur' : undefined}
          blurDataURL={
            typeof photo?.picture !== 'number' && photo.picture.blurDataURL
              ? photo.picture.blurDataURL
              : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNlZWUiLz48L3N2Zz4='
          }
        />

        {/* Navigation zones - without visible icons */}
        <div className='absolute inset-0 z-20 flex w-full h-full'>
          {/* Left zone - Previous */}
          {prevPhoto ? (
            <Link 
              href={`/${collection}/${prevPhoto.id}`}
              className='w-1/3 h-full cursor-prev'
            >
              <div className='h-full'></div>
            </Link>
          ) : (
            <div className='w-1/3 h-full cursor-not-allowed'></div>
          )}
          
          {/* Middle zone - Grid */}
          <Link 
            href={`/${collection}?lastPictureSeen=${photo.id}`}
            className='w-1/3 h-full cursor-grid'
          >
            <div className='h-full'></div>
          </Link>
          
          {/* Right zone - Next */}
          {nextPhoto ? (
            <Link 
              href={`/${collection}/${nextPhoto.id}`}
              className='w-1/3 h-full cursor-next'
            >
              <div className='h-full'></div>
            </Link>
          ) : (
            <div className='w-1/3 h-full cursor-not-allowed'></div>
          )}
        </div>

        <div className='hidden md:flex absolute -top-14 left-0 right-0 justify-between items-center mx-auto'>
          <p className='uppercase text-sm'>{`${photo.place} - ${photo.date}`}</p>
          <Link
            href={`/${collection}?lastPictureSeen=${photo.id}`}
            className='cursor-pointer ml-auto'
          >
            <Close />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ClientImage
