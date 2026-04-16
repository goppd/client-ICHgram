import styles from './styles.module.css'
import likeIcon from '../../assets/icons/like.svg'
import likeFilledIcon from '../../assets/icons/like-filled.svg'
import commentIcon from '../../assets/icons/comment.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../services/api'

const PostCard = ({ post, openPostModal }) => {
  const navigate = useNavigate()

  const [liked, setLiked] = useState(post.isLiked || false)
  const [likesCount, setLikesCount] = useState(post.likesCount || 0)
  const [expanded, setExpanded] = useState(false)

  const getTime = (date) => {
    const diff = (new Date() - new Date(date)) / 1000
    if (diff < 60) return 'now'
    if (diff < 3600) return Math.floor(diff / 60) + 'm'
    if (diff < 86400) return Math.floor(diff / 3600) + 'h'
    return Math.floor(diff / 86400) + 'd'
  }

  const shortText =
    post.caption?.length > 20 && !expanded
      ? post.caption.slice(0, 20) + '...'
      : post.caption

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

    const id = post.user?._id || post.user?.id
    if (!id) return

    navigate(`/profile/${id}`)
  }

  return (
    <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <div className={styles.userInfo}>
          <img
            src={post.user?.avatar}
            className={styles.avatar}
            onClick={(e) => goToProfile(e)}
            style={{ cursor: 'pointer' }}
            alt="avatar"
          />

          <div>
            <b style={{ cursor: 'pointer' }} onClick={(e) => goToProfile(e)}>
              {post.user?.username}
            </b>

            <span className={styles.time}> • {getTime(post.createdAt)} • </span>
          </div>
        </div>
      </div>

      <div
        className={styles.imageWrapper}
        onClick={() => openPostModal(post)}
        style={{ cursor: 'pointer' }}
      >
        <img src={post.image} className={styles.postImage} alt="post" />
      </div>

      <div className={styles.actions}>
        <img
          src={liked ? likeFilledIcon : likeIcon}
          onClick={handleLike}
          style={{ cursor: 'pointer' }}
          alt="like"
        />

        <img src={commentIcon} style={{ cursor: 'pointer' }} alt="comment" />
      </div>

      <div className={styles.like}>{likesCount} likes</div>

      <div className={styles.caption}>
        <b
          className={styles.username}
          onClick={(e) => goToProfile(e)}
          style={{ cursor: 'pointer' }}
        >
          {post.user?.username}
        </b>

        <span className={styles.captionText}>{shortText}</span>

        {post.caption?.length > 20 && !expanded && (
          <span className={styles.more} onClick={() => setExpanded(true)}>
            ...more
          </span>
        )}
      </div>

      <div className={styles.comments}>
        View all comments ({post.commentsCount})
      </div>
    </div>
  )
}

export default PostCard
