import Sidebar from '../sidebar'
import Footer from '../footer'
import { useLocation } from 'react-router-dom'
import styles from './styles.module.css'

const Layout = ({ children }) => {
  const location = useLocation()

  const isFeed = location.pathname === '/main'

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.content}>
        {children}

        <Footer className={isFeed ? styles.footerStatic : styles.footerFixed} />
      </div>
    </div>
  )
}

export default Layout
