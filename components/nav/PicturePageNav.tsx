'use client'
import { Link } from 'next-view-transitions'
import Next from '../icons/Next'
import Prev from '../icons/Prev'
import Grid from '../icons/Grid'
import { Photography } from '@/payload-types'

const PicturePageNav = ({
  prevPhoto,
  nextPhoto,
  collection,
}: {
  prevPhoto?: Photography
  nextPhoto?: Photography
  collection: string
}) => {
  return (
    <nav className='w-full md:mt-0 p-2 md:p-6'>
      <ul className='flex justify-center items-center gap-6 uppercase'>
        {prevPhoto ? (
          <Link href={`/${collection}/${prevPhoto.id}`}>
            <li className='flex justify-center items-center gap-3 hover:opacity-70 transition-opacity'>
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
        <Link href={`/${collection}`} className='flex justify-center items-center gap-3 cursor-pointer hover:opacity-70 transition-opacity'>
          <Grid />
          <p>Grid</p>
        </Link>
        {nextPhoto ? (
          <Link href={`/${collection}/${nextPhoto.id}`}>
            <li className='flex justify-center items-center gap-3 hover:opacity-70 transition-opacity'>
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
      </ul>
    </nav>
  )
}

export default PicturePageNav
