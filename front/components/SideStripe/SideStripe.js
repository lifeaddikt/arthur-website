import styles from './sideStripe.module.scss'
import Link from 'next/link'

export default function SideStripe() {
  return (
    <header className={styles.container}>
      <Link href='/'>
        <h1 className={styles.container__logo}>
          Arthur <br /> Paumier
        </h1>
      </Link>
      <p className={styles.container__description}>
        This is a collection of my projects. In on hand you can find my
        photogrpahies works. In the other hans there are my graphism works. a
        click to insta will lead you to my instagram account . A click to
        Architecture will leead you to my portfolio.
      </p>
      <p className={styles.container__copyright}>&copy; Victor Paumier, 2022</p>
    </header>
  )
}
