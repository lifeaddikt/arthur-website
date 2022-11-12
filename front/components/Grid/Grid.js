import styles from './grid.module.scss'
import Image from 'next/future/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import React from 'react'
import Masonry from 'react-masonry-css'

const Grid = ({ pictures }) => {
  const router = useRouter()

  const breakpointColumnsObj = {
    default: 3,
    700: 2,
  };
  

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className='my-masonry-grid'
      columnClassName='my-masonry-grid_column'>
      {pictures.map(picture => {
        console.log(picture._embedded)
        return (
          <div key={picture.id}>
            <Link href={`${router.asPath}/picture/${picture.id}`}>
              <a style={{ display: 'contents' }}>
                <Image
                  src={
                    picture._embedded['wp:featuredmedia'][0].media_details.sizes
                      .full.source_url
                  }
                  width='0'
                  height='0'
                  sizes='25vw' /// A FAIRE
                  style={{ width: '100%', height: '100%', display: 'block' }}
                  placeholder='blur'
                  blurDataURL='https://live.staticflickr.com/65535/51119804658_41d0955d57_h.jpg'
                  alt='à faire'
                />
              </a>
            </Link>
          </div>
        )
      })}
    </Masonry>
  )
}

Grid.propTypes = {
  pictures: PropTypes.array.isRequired,
}

export default Grid
