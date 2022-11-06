import styles from './grid.module.scss'
import Image from 'next/future/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const Grid = ({ pictures }) => { 
  const router = useRouter()

  return (
  <div className='grid'>
    <div className='grid-col grid-col--1'></div>
    <div className='grid-col grid-col--2'></div>
    <div className='grid-col grid-col--3'></div>
    <div className='grid-col grid-col--4'></div>

    {pictures.map(picture => {
      return (
        <div className='grid-item' key={picture.id}>
          <Link href={`${router.asPath}/picture/${picture.id}`}>
            <Image
              width='0'
              height='0'
              sizes='25vw' /// A FAIRE
              style={{ width: '100%', height: 'auto' }}
              src={picture._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url}
              placeholder='blur'
              blurDataURL='https://live.staticflickr.com/65535/51119804658_41d0955d57_h.jpg'
              alt='à faire'
            />
          </Link>
        </div>
      )
    })}
  </div>
)}

Grid.propTypes = {
  pictures: PropTypes.array.isRequired,
}

export default Grid
