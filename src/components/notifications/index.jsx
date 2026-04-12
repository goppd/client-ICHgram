import { useEffect, useState } from 'react'
import styles from './styles.module.css'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch('http://localhost:5000/notifications')
        const data = await res.json()
        setNotifications(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchNotifications()
  }, [])

  const hasNew = notifications.some((n) => !n.isRead)

  useEffect(() => {
    const markAsRead = async () => {
      try {
        await fetch('http://localhost:5000/notifications/read', {
          method: 'PATCH',
        })
      } catch (err) {
        console.error(err)
      }
    }

    if (notifications.length > 0) {
      markAsRead()
    }
  }, [notifications])

  const getTimeAgo = (date) => {
    const now = new Date()
    const created = new Date(date)
    const diff = Math.floor((now - created) / 1000)

    if (diff < 60) return `${diff}s`
    if (diff < 3600) return `${Math.floor(diff / 60)}m`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`
    return `${Math.floor(diff / 86400)}d`
  }

  const getText = (item) => {
    switch (item.type) {
      case 'like':
        return 'liked your photo'
      case 'comment':
        return 'commented your photo'
      case 'follow':
        return 'started following you'
      case 'unfollow':
        return 'unfollowed you'
      default:
        return ''
    }
  }

  return (
    <div className={styles.notifications}>
      <h2>Notifications</h2>

      {hasNew && <p className={styles.new}>New</p>}

      <div className={styles.list}>
        {notifications.length === 0 ? (
          <p className={styles.empty}>No new notifications</p>
        ) : (
          notifications.map((item) => (
            <div key={item._id} className={styles.item}>
              <img src={item.user?.avatar} alt="" />

              <p className={styles.text}>
                <span className={styles.username}>{item.user?.username}</span>{' '}
                {getText(item)}
                <span className={styles.time}>
                  {' '}
                  {getTimeAgo(item.createdAt)}
                </span>
              </p>

              {(item.type === 'like' || item.type === 'comment') && (
                <img className={styles.preview} src={item.postImage} alt="" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Notifications
