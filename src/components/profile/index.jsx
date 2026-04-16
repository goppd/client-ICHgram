import styles from './styles.module.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPosts, getUserPosts } from '../../services/postService'
import { getMyProfile, getUserById } from '../../services/userService'
import API from '../../services/api'

const Profile = ({ openPostModal }) => {
  const { userId } = useParams()
  const navigate = useNavigate()

  const isMyProfile = !userId

  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = isMyProfile ? await getPosts() : await getUserPosts(userId)

        setPosts(data.posts || data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchPosts()
  }, [userId, isMyProfile])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (isMyProfile) {
          const data = await getMyProfile()
          setUser(data.user)
        } else {
          const data = await getUserById(userId)
          setUser(data.user)
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchUser()
  }, [userId, isMyProfile])

  const handleFollow = async () => {
    try {
      const res = await API.put(`/users/${userId}/follow`)

      setUser((prev) => ({
        ...prev,
        followers: new Array(res.data.followersCount),
      }))
    } catch (err) {
      console.error(err)
    }
  }

  const handleMessage = async () => {
    try {
      const res = await API.post('/conversations', {
        receiverId: userId,
      })

      navigate(`/messages/${res.data._id}`)
    } catch (err) {
      console.error(err)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className={styles.profile}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <img src={user.avatar} className={styles.avatar} />

          <div className={styles.info}>
            <div className={styles.topRow}>
              {/* USERNAME */}
              <h2>{user.username}</h2>

              {isMyProfile ? (
                <Link to="/edit-profile" className={styles.editBtn}>
                  Edit profile
                </Link>
              ) : (
                <>
                  <button className={styles.followBtn} onClick={handleFollow}>
                    Follow
                  </button>

                  <button className={styles.messageBtn} onClick={handleMessage}>
                    Message
                  </button>
                </>
              )}
            </div>

            <div className={styles.stats}>
              <span>
                <b>{posts.length}</b> posts
              </span>
              <span>
                <b>{user.followers?.length || 0}</b> followers
              </span>
              <span>
                <b>{user.following?.length || 0}</b> following
              </span>
            </div>

            <div className={styles.bio}>
              <p>{user.bio}</p>
            </div>
          </div>
        </div>

        <div className={styles.posts}>
          {posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img
                src={post.image}
                className={styles.postImage}
                onClick={() => openPostModal(post)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
