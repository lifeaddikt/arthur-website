'use client'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import Close from '@/components/icons/Close'
import Image from 'next/image'
import { Photography } from '@/payload-types'
import { Link } from 'next-view-transitions'

const ClientImage = ({ photo, collection }: { photo: Photography, collection: string }) => {
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
    const interval = setInterval(updateImagePosition, 100)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      clearInterval(interval)
    }
  }, [imageLoaded])

  const imageUrl = typeof photo?.picture !== 'number' && photo?.picture.url 
    ? photo.picture.url 
    : '/placeholder.svg'

  const imageAlt = typeof photo?.picture !== 'number' && photo?.picture.alt
    ? photo.picture.alt
    : 'Photo'

    // On regarde si on vient d'une autre page de photo
    // Une autre page photo = un url qui contient /{collection}/{id}
    // collection est identique à la data collection que l'on a dans les paramètres
    // mais l'id est différent
    // Le problème est que la page grid de photos est de la forme /{collection}
    // et la page de la photo est de la forme /{collection}/{id}
    // Donc on ne peut pas savoir si on vient de la page grid ou de la page de la photo
    // à cause du /{collection}
    // On va donc utiliser le referrer
    
    

  return (
    <>
      <div className='w-full h-[65%] md:h-full relative flex items-center justify-center'>
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
            viewTransitionName: `photo-${photo.id}`,
          }}
        />
      </div>

        {imageLoaded && (
          <>
            <p
              className='fixed z-10 uppercase'
              style={{
                top: `${imagePosition.top - 40}px`,
                left: `${imagePosition.left}px`,
              }}>
              {`${photo.place} - ${photo.date}`}
            </p>
            <div
              style={{
                position: 'fixed',
                top: `${imagePosition.top - 50}px`,
                left: `${imagePosition.left + imagePosition.width - 25}px`,
                zIndex: 10,
              }}>
              <Link
                href={`/${collection}?lastPictureSeen=${photo.id}`}
                className='cursor-pointer'>
                <Close />
              </Link>
            </div>
          </>
        )}
    </>
  )
}

export default ClientImage
