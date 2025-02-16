'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const ScrollRestoration = () => {
  const searchParams = useSearchParams()
  const lastPictureSeen = searchParams.get('lastPictureSeen')

  useEffect(() => {
    if (!lastPictureSeen) return

    const scrollToElement = () => {
      const pictureElement = document.querySelector(
        `[data-picture-id="${lastPictureSeen}"]`
      )
      
      if (pictureElement) {
        pictureElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
      }
    }

    scrollToElement()
  }, [lastPictureSeen])

  return null
}

export default ScrollRestoration
