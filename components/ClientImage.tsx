import Close from '@/components/icons/Close'
import Image from 'next/image'
import { Photography } from '@/payload-types'
import { Link } from 'next-view-transitions'

const ClientImage = ({
  photo,
  collection,
}: {
  photo: Photography
  collection: string
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
          draggable={false}
          id={photo.id.toString()}
          src={imageUrl}
          alt={imageAlt}
          fill
          className='object-contain max-w-fit max-h-fit dark:invert'
          loading='eager'
          priority
          style={{
            top: 'unset',
            left: 'unset',
            bottom: 'unset',
            right: 'unset',
            viewTransitionName: `photo-${photo.id}`,
          }}
          placeholder={typeof photo?.picture !== 'number' ? 'blur' : undefined}
          blurDataURL={
            typeof photo?.picture !== 'number'
              ? photo.picture.blurDataURL
              : undefined
          }
        />
        <div className='hidden md:flex absolute -top-20 left-0 right-0 justify-between items-center px-6 w-[85%] mx-auto'>
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
