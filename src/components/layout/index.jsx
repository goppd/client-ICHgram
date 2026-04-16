import Sidebar from '../sidebar'
import { useState, useEffect } from 'react'
import styles from './styles.module.css'
import CreatePost from '../createPost'
import PostModal from '../postModal'
import Search from '../search'
import Notifications from '../notifications'
import { getMyProfile } from '../../services/userService'
import API from '../../services/api'

const Layout = ({ children }) => {
  const [createOpen, setCreateOpen] = useState(false)
  const [postModal, setPostModal] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [activePanel, setActivePanel] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMyProfile()
        setCurrentUser(data.user)
      } catch (e) {
        console.error(e)
      }
    }

    fetchUser()
  }, [])

  const openPostModal = (post) => {
    setPostModal(post)
  }

  const closePostModal = () => {
    setPostModal(null)
  }

  const handleCreatePost = async (postData) => {
    try {
      await API.post('/posts', postData)
      setCreateOpen(false)

      window.location.reload()
    } catch (e) {
      console.error(e)
    }
  }

  const handleOpenPanel = (type) => {
    if (type === 'create') {
      setCreateOpen(true)
    } else {
      setActivePanel(type)
    }
  }

  const closePanel = () => {
    setActivePanel(null)
  }

  return (
    <div className={styles.wrapper}>
      <Sidebar activePanel={activePanel} onOpen={handleOpenPanel} />

      <div className={styles.content}>
        {typeof children === 'function'
          ? children({ openPostModal })
          : children}
      </div>

      {activePanel && (
        <div className={styles.overlay} onClick={closePanel}>
          <div onClick={(e) => e.stopPropagation()}>
            {activePanel === 'search' && <Search />}
            {activePanel === 'notifications' && <Notifications />}
          </div>
        </div>
      )}

      {createOpen && (
        <CreatePost
          onClose={() => setCreateOpen(false)}
          onSubmit={handleCreatePost}
          user={currentUser}
        />
      )}

      {postModal && <PostModal post={postModal} onClose={closePostModal} />}
    </div>
  )
}

export default Layout
