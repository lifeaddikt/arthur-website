'use client'
import Link from 'next/link'
import Next from '../icons/Next'
import Prev from '../icons/Prev'
import Grid from '../icons/Grid'
import { Photography } from '@/payload-types'
import { useRouter } from 'next/navigation'

const PicturePageNav = ({
  prevPhoto,
  nextPhoto,
  collection,
}: {
  prevPhoto?: Photography
  nextPhoto?: Photography
  collection: string
}) => {
  const router = useRouter()
  
  const handleBackClick = () => {
    const lastPictureSeen = sessionStorage.getItem(`${collection}lastPictureSeen`)
    sessionStorage.removeItem(`${collection}lastPictureSeen`)
    router.push(`/${collection}?lastPictureSeen=${lastPictureSeen}`)
  }

  return (
    <nav className='mt-4'>
      <ul className='flex justify-center items-center gap-3 uppercase'>
        {prevPhoto ? (
          <Link href={`/${collection}/${prevPhoto.id}`}>
            <li className='flex justify-center items-center gap-3'>
              <Prev />
              <p>Prev</p>
            </li>
          </Link>
        ) : (
          <li className='flex justify-center items-center gap-3 opacity-30 text-gray-500 cursor-not-allowed'>
            <Prev />
            <p>Prev</p>
          </li>
        )}
        {nextPhoto ? (
          <Link href={`/${collection}/${nextPhoto.id}`}>
            <li className='flex justify-center items-center gap-3'>
              <p>Next</p>
              <Next />
            </li>
          </Link>
        ) : (
          <li className='flex justify-center items-center gap-3 opacity-30 cursor-not-allowed'>
            <p>Next</p>
            <Next />
          </li>
        )}
        <li className='flex justify-center items-center gap-3 cursor-pointer' onClick={handleBackClick}>
          <Grid />
          <p>Grid</p>
        </li>
      </ul>
    </nav>
  )
}

export default PicturePageNav
