'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import HomeSkeleton from '@/components/skeleton/HomeSkeleton'
import CollectionPageSkeleton from '@/components/skeleton/CollectionPageSkeleton'
import PicturePageSkeleton from '@/components/skeleton/PicturePageSkeleton'

const Loading = () => {
  const [showLoading, setShowLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!showLoading) return null

  if (pathname === '/') {
    return <HomeSkeleton />
  }

  if (pathname.split('/').length === 2) {
    return <CollectionPageSkeleton />
  }

  if (pathname.split('/').length === 3) {
    return <PicturePageSkeleton />
  }

  return null
}

export default Loading
