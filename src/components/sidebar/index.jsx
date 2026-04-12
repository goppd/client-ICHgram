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

const Sidebar = () => {
  const getClass = ({ isActive }) =>
    isActive ? `${styles.item} ${styles.active}` : styles.item
  return (
    <aside className={styles.sidebar}>
      <img src={ichgram} alt="ICHgram Logo" />

      <nav className={styles.nav}>
        <NavLink to="/main" className={getClass}>
          <img src={homeIcon} alt="HomeIcon" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/search" className={getClass}>
          <img src={searchIcon} alt="SearchIcon" />
          <span>Search</span>
        </NavLink>
        <NavLink to="/explore" className={getClass}>
          <img src={exploreIcon} alt="ExploreIcon" />
          <span>Explore</span>
        </NavLink>
        <NavLink to="/messages" className={getClass}>
          <img src={messagesIcon} alt="MessagesIcon" />
          <span>Messages</span>
        </NavLink>
        <NavLink to="/notifications" className={getClass}>
          <img src={notificationIcon} alt="NotificationIcon" />
          <span>Notifications</span>
        </NavLink>
        <NavLink to="/create" className={getClass}>
          <img src={createIcon} alt="CreateIcon" />
          <span>Create</span>
        </NavLink>
      </nav>
      <NavLink to="/profile" className={getClass}>
        <img src={ichIcon} alt="ICHIcon" />
        <span>Profile</span>
      </NavLink>
    </aside>
  )
}

export default Sidebar
