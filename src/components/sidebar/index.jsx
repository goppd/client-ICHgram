import styles from './styles.module.css'
import createIcon from '../../assets/icons/create.svg'
import exploreIcon from '../../assets/icons/explore.svg'
import homeIcon from '../../assets/icons/home.svg'
import messagesIcon from '../../assets/icons/messages.svg'
import notificationIcon from '../../assets/icons/notification.svg'
import searchIcon from '../../assets/icons/search1.svg'
import ichIcon from '../../assets/icons/ich.svg'
import ichgram from '../../assets/images/ICHgram.svg'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ onOpen, activePanel }) => {
  const getClass = ({ isActive }) => {
    if (activePanel) return styles.item
    return isActive ? `${styles.item} ${styles.active}` : styles.item
  }

  return (
    <aside className={styles.sidebar}>
      <img src={ichgram} alt="ICHgram Logo" />

      <nav className={styles.nav}>
        <NavLink to="/main" className={getClass} onClick={() => onOpen(null)}>
          <img src={homeIcon} alt="" />
          <span>Home</span>
        </NavLink>

        <button
          onClick={() => onOpen('search')}
          className={`${styles.item} ${
            activePanel === 'search' ? styles.active : ''
          }`}
        >
          <img src={searchIcon} alt="" />
          <span>Search</span>
        </button>

        <NavLink
          to="/explore"
          className={getClass}
          onClick={() => onOpen(null)}
        >
          <img src={exploreIcon} alt="" />
          <span>Explore</span>
        </NavLink>

        <NavLink
          to="/messages"
          className={getClass}
          onClick={() => onOpen(null)}
        >
          <img src={messagesIcon} alt="" />
          <span>Messages</span>
        </NavLink>

        <button
          onClick={() => onOpen('notifications')}
          className={`${styles.item} ${
            activePanel === 'notifications' ? styles.active : ''
          }`}
        >
          <img src={notificationIcon} alt="" />
          <span>Notifications</span>
        </button>

        <NavLink to="/create" className={getClass} onClick={() => onOpen(null)}>
          <img src={createIcon} alt="" />
          <span>Create</span>
        </NavLink>
      </nav>

      <NavLink to="/profile" className={getClass} onClick={() => onOpen(null)}>
        <img src={ichIcon} alt="" />
        <span>Profile</span>
      </NavLink>
    </aside>
  )
}

export default Sidebar
