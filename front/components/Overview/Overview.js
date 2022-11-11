import React from 'react'
import Image from 'next/future/image'
import Link from 'next/link'
import Nav from '../Nav/Nav.js'
import styles from './overview.module.scss'
import PropTypes from 'prop-types'

const Overview = ({pictureData}) => {
  console.log(pictureData)
   return (
  <div className={styles.container}>
    <Link href='/collection'>
      <div className={styles.container__cross}>
        <Image src='/images/cross.jpeg' width='80' height='80' />
      </div>
    </Link>
    <div className={styles.container__picture}>
      <h2 className={styles.container__picture__place}>Berlin, Allemagne</h2>
      <h2 className={styles.container__picture__date}>Octobre 2022</h2>
      <Image
        src='https://live.staticflickr.com/65535/51058991016_ce65727ec7_k.jpg'
        width='0'
        height='0'
        style={{ width: '100%', height: 'auto' }}
        layout='fill'
        sizes='100vw'
        quality='100'
        priority
      />
    </div>
    <Nav />
  </div>
)}

Overview.propTypes = {
  pictureData: PropTypes.object.isRequired,
}

export default Overview
