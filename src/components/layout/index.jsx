import Sidebar from '../sidebar'
import Footer from '../footer'
import { useState } from 'react'
import styles from './styles.module.css'
import Search from '../search'
import Notifications from '../notifications'

const Layout = ({ children }) => {
  const [activePanel, setActivePanel] = useState(null)

  const handleClose = () => {
    setActivePanel(null)
  }

  return (
    <div className={styles.layout}>
      <Sidebar onOpen={setActivePanel} activePanel={activePanel} />

      <div className={styles.content}>
        {children}

        {activePanel && (
          <div className={styles.overlay} onClick={handleClose} />
        )}

        {activePanel === 'search' && <Search />}
        {activePanel === 'notifications' && <Notifications />}

        <Footer />
      </div>
    </div>
  )
}

export default Layout
