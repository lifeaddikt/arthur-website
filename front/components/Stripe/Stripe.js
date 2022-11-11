import styles from './stripe.module.scss'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/future/image'

const Stripe = ({ slug, name, desktop_img_url, mobile_img_url, isMobile }) => {

  return (
    <div className={styles.stripe}>
      {isMobile ? (
        <Image
          src={mobile_img_url.length > 0 ? mobile_img_url : desktop_img_url}
          alt={`Image de présentation de la collection ${name}.`}
          fill
          style={{ objectFit: 'cover' }}
          sizes='75vw'
          priority
        />
      ) : (
        <Image
          quality={100}
          src={desktop_img_url}
          alt={`Image de présentation de la collection ${name}.`}
          fill
          sizes='50vw'
          style={{ objectFit: 'cover' }}
          priority
        />
      )}
      <Link href={'/collection/' + slug}>
        <h2>{name}</h2>
      </Link>
      <div className={styles.stripe__filter}></div>
    </div>
  )
}

Stripe.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desktop_img_url: PropTypes.string.isRequired,
  mobile_img_url: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
}

export default Stripe
