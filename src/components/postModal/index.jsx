import styles from './styles.module.css'
import likeIcon from '../../assets/icons/like.svg'
import likeFilledIcon from '../../assets/icons/like-filled.svg'
import commentIcon from '../../assets/icons/comment.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../services/api'

const PostModal = ({ post, onClose }) => {
  const navigate = useNavigate()

  const [liked, setLiked] = useState(post.isLiked || false)
  const [likesCount, setLikesCount] = useState(post.likesCount || 0)

  const getTime = (date) => {
    const diff = (new Date() - new Date(date)) / 1000
    if (diff < 60) return 'now'
    if (diff < 3600) return Math.floor(diff / 60) + 'm'
    if (diff < 86400) return Math.floor(diff / 3600) + 'h'
    return Math.floor(diff / 86400) + 'd'
  }

  const handleLike = async () => {
    try {
      const res = await API.put(`/posts/${post._id}/like`)
      setLiked(res.data.isLiked)
      setLikesCount(res.data.likesCount)
    } catch (e) {
      console.error(e)
    }
  }

  const goToProfile = (e) => {
    e.stopPropagation()

    const id = post.user?._id || post.user?.id
    if (!id) return

    onClose()
    navigate(`/profile/${id}`)
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* LEFT IMAGE */}
        <div className={styles.left}>
          <img src={post.image} className={styles.image} alt="post" />
        </div>

        <div className={styles.right}>
          {/* HEADER */}
          <div className={styles.header}>
            <img
              src={post.user?.avatar}
              className={styles.avatar}
              onClick={goToProfile}
              style={{ cursor: 'pointer' }}
              alt="avatar"
            />

            <div>
              <b onClick={goToProfile} style={{ cursor: 'pointer' }}>
                {post.user?.username}
              </b>

              <span className={styles.time}> • {getTime(post.createdAt)}</span>
            </div>
          </div>

          <div className={styles.caption}>
            <b onClick={goToProfile} style={{ cursor: 'pointer' }}>
              {post.user?.username}
            </b>{' '}
            {post.caption}
          </div>

          <div className={styles.actions}>
            <img
              src={liked ? likeFilledIcon : likeIcon}
              onClick={handleLike}
              style={{ cursor: 'pointer' }}
              alt="like"
            />

            <img src={commentIcon} alt="comment" />
          </div>

          <div className={styles.likes}>{likesCount} likes</div>
        </div>
      </div>
    </div>
  )
}

export default PostModal
