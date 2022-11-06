import styles from './layout.module.scss'
import SideStrip from '../SideStripe/SideStripe.js'

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <SideStrip />
      <main>{children}</main>
    </div>
  )
}

export default Layout
