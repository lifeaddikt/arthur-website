import styles from './stripe.module.scss'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/future/image'

const Stripe = ({ slug, name, desktop_img_url, mobile_img_url }) => {

  return (
    <div className={styles.stripe}>
      <Image
        quality={100}
        src={desktop_img_url}
        alt={`Image de présentation de la collection ${name}.`}
        sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
        fill
        style={{ objectFit: 'cover' }}
        className={mobile_img_url.length > 0 ? styles.stripe__imgHidden : ''}
      />
      {mobile_img_url.length > 0 && (
        <Image
          src={mobile_img_url}
          alt={`Image de présentation de la collection ${name}.`}
          fill
          style={{ objectFit: 'cover' }}
          className={styles.stripe__imgDisplay}
        />
      )}
      <Link href={'/collection/' + slug }>
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
}

export default Stripe
