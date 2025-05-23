'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import HomeSkeleton from '@/components/skeleton/HomeSkeleton'
import CollectionPageSkeleton from '@/components/skeleton/CollectionPageSkeleton'

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

  return null
}

export default Loading
