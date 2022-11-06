import styles from './ArrowButton.module.scss'
import PropTypes from 'prop-types'

const ArrowButton = ({ isVisible }) => {
  return (
    <>
      <div className={isVisible ? styles.button : styles.button__invisible}>
        <img src='images/icon-next.png'></img>
      </div>
    </>
  )
}

ArrowButton.propTypes = {
  isVisible: PropTypes.bool.isRequired,
}

export default ArrowButton
