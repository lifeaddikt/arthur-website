'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const ScrollRestoration = () => {
  const searchParams = useSearchParams()
  const lastPictureSeen = searchParams.get('lastPictureSeen')

  useEffect(() => {
    // Handle back/forward cache restoration
    if (document.visibilityState === 'hidden') {
      // Document is hidden, likely part of bfcache
      return
    }

    if (!lastPictureSeen) return

    const scrollToElement = () => {
      const pictureElement = document.querySelector(
        `[data-picture-id="${lastPictureSeen}"]`
      )

      if (pictureElement) {
        // Use less disruptive scrolling behavior
        pictureElement.scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center',
        })
      }
    }

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      scrollToElement()
    })

    // Handle page show event for back/forward navigation
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // Page was restored from bfcache
        requestAnimationFrame(() => {
          scrollToElement()
        })
      }
    }

    window.addEventListener('pageshow', handlePageShow)

    return () => {
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [lastPictureSeen])

  return null
}

export default ScrollRestoration
