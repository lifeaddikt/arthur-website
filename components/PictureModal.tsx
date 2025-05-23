'use client'

import { useEffect, useCallback } from 'react'
import type { Photography } from '@/payload-types'
import Image from 'next/image'
import Close from '@/components/icons/Close'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface PictureModalProps {
  photo: Photography
  collection: string
  prevPhoto?: Photography | null
  nextPhoto?: Photography | null
  onClose: () => void
  onNavigate: (photoId: string) => void
}

const PictureModal = ({
  photo,
  collection,
  prevPhoto,
  nextPhoto,
  onClose,
  onNavigate,
}: PictureModalProps) => {
  const imageUrl =
    typeof photo?.picture !== 'number' && photo?.picture.url
      ? photo.picture.url
      : '/placeholder.svg'

  const imageAlt =
    typeof photo?.picture !== 'number' && photo?.picture.alt
      ? photo.picture.alt
      : 'Photo'

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          if (prevPhoto) {
            onNavigate(prevPhoto.id.toString())
          }
          break
        case 'ArrowRight':
          if (nextPhoto) {
            onNavigate(nextPhoto.id.toString())
          }
          break
      }
    },
    [onClose, onNavigate, prevPhoto, nextPhoto]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [handleKeyDown])

  const modalContent = (
    <AnimatePresence>
      <motion.div
        className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className='relative w-full h-full flex flex-col justify-center px-4 md:px-8'
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
            scale: { type: 'spring', stiffness: 300, damping: 30 },
          }}
        >
          <div className='absolute top-4 left-4 right-4 z-30 flex justify-between items-center'>
            <p className='uppercase text-sm text-white'>
              {`${photo.place} - ${photo.date}`}
            </p>
            <button
              onClick={onClose}
              className='text-white hover:opacity-70 transition-opacity'
              aria-label='Close'
            >
              <Close />
            </button>
          </div>

          <div className='relative w-full h-[85vh] flex items-center justify-center'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className='relative w-full h-full flex items-center justify-center'
              >
                <Image
                  quality={100}
                  draggable={false}
                  src={imageUrl || '/placeholder.svg'}
                  alt={imageAlt}
                  fill
                  className={`object-contain max-w-fit max-h-fit z-10 ${
                    collection === 'film' ? 'dark:invert' : ''
                  }`}
                  loading='eager'
                  priority
                  sizes='90vw'
                  style={{
                    top: 'unset',
                    left: 'unset',
                    bottom: 'unset',
                    right: 'unset',
                  }}
                  placeholder={
                    typeof photo?.picture !== 'number' ? 'blur' : undefined
                  }
                  blurDataURL={
                    typeof photo?.picture !== 'number' &&
                    photo.picture.blurDataURL
                      ? photo.picture.blurDataURL
                      : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNlZWUiLz48L3N2Zz4='
                  }
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation zones overlay */}
            <div className='absolute inset-0 z-20 flex w-full h-full'>
              {/* Left zone - Previous */}
              {prevPhoto ? (
                <button
                  onClick={() => onNavigate(prevPhoto.id.toString())}
                  className='w-1/3 h-full cursor-prev'
                >
                  <div className='h-full'></div>
                </button>
              ) : (
                <div className='w-1/3 h-full cursor-not-allowed'></div>
              )}

              {/* Middle zone - Close */}
              <button onClick={onClose} className='w-1/3 h-full cursor-grid'>
                <div className='h-full'></div>
              </button>

              {/* Right zone - Next */}
              {nextPhoto ? (
                <button
                  onClick={() => onNavigate(nextPhoto.id.toString())}
                  className='w-1/3 h-full cursor-next'
                >
                  <div className='h-full'></div>
                </button>
              ) : (
                <div className='w-1/3 h-full cursor-not-allowed'></div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}

export default PictureModal
