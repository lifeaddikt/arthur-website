'use client'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import Close from '@/components/icons/Close'
import Image from 'next/image'
import { Photography } from '@/payload-types'
import { useRouter } from 'next/navigation'

const ClientImage = ({ photo, collection }: { photo: Photography, collection: string }) => {
  const router = useRouter()
  const [imageLoaded, setImageLoaded] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const [imagePosition, setImagePosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  })

  const updateImagePosition = () => {
    if (imageLoaded && imageRef.current) {
      const { top, left, width } = imageRef.current.getBoundingClientRect()
      setImagePosition({ top, left, width })
    }
  }

  useLayoutEffect(() => {
    updateImagePosition()
  }, [imageLoaded])

  useEffect(() => {
    const handleResize = () => {
      updateImagePosition()
    }

    // Create a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(handleResize)
    
    // Observe the document body for attribute changes
    observer.observe(document.body, {
      attributes: true, // Watch for attribute changes
      subtree: true, // Observe all descendants
    })

    // Add resize event listener
    window.addEventListener('resize', handleResize)

    // Add a periodic check as a fallback
    const interval = setInterval(updateImagePosition, 1000)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      clearInterval(interval)
    }
  }, [imageLoaded])

  const handleBackToGrid = () => {
    const lastPictureSeen = sessionStorage.getItem(`${collection}lastPictureSeen`)
    sessionStorage.removeItem(`${collection}lastPictureSeen`)
    router.push(`/${collection}?lastPictureSeen=${lastPictureSeen}`)
  }

  const imageUrl = typeof photo?.picture !== 'number' && photo?.picture.url 
    ? photo.picture.url 
    : '/placeholder.svg'

  const imageAlt = typeof photo?.picture !== 'number' && photo?.picture.alt
    ? photo.picture.alt
    : 'Photo'

  return (
    <>
      <div className='w-full h-full relative flex items-center justify-center'>
        <Image
          onLoad={() => setImageLoaded(true)}
          ref={imageRef}
          draggable={false}
          id={photo.id.toString()}
          src={imageUrl}
          alt={imageAlt}
          fill
          className='object-contain max-w-fit max-h-fit dark:invert'
          priority
          style={{
            top: 'unset',
            left: 'unset',
            bottom: 'unset',
            right: 'unset',
          }}
        />
      </div>

      {imageLoaded && (
        <>
          <p
            className='fixed z-10 uppercase'
            style={{
              top: `${imagePosition.top - 30}px`,
              left: `${imagePosition.left}px`,
            }}>
            {`${photo.place} - ${photo.date}`}
          </p>
          <div
            onClick={handleBackToGrid}
            className='fixed z-10 cursor-pointer'
            style={{
              top: `${imagePosition.top - 50}px`,
              left: `${imagePosition.left + imagePosition.width - 25}px`,
            }}>
            <Close />
          </div>
        </>
      )}
    </>
  )
}

export default ClientImage
