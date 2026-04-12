import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
import ICHgramIcon from '../../assets/icons/ICHgram.svg'

const Footer = ({ className }) => {
  const getClass = ({ isActive }) =>
    isActive ? `${styles.item} ${styles.active}` : styles.item

  return (
    <footer className={`${styles.footer} ${className}`}>
      <div className={styles.inner}>
        <nav className={styles.nav}>
          <NavLink to="/main" className={getClass}>
            <span>Home</span>
          </NavLink>
          <NavLink to="/search" className={getClass}>
            <span>Search</span>
          </NavLink>
          <NavLink to="/explore" className={getClass}>
            <span>Explore</span>
          </NavLink>
          <NavLink to="/messages" className={getClass}>
            <span>Messages</span>
          </NavLink>
          <NavLink to="/notifications" className={getClass}>
            <span>Notifications</span>
          </NavLink>
          <NavLink to="/create" className={getClass}>
            <span>Create</span>
          </NavLink>
        </nav>

        <div className={styles.copyright}>
          <img src={ICHgramIcon} alt="2024 ICHgram" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
