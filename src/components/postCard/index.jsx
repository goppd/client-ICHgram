import styles from './styles.module.css'
import likeIcon from '../../assets/icons/like.svg'
import likeFilledIcon from '../../assets/icons/like-filled.svg'
import commentIcon from '../../assets/icons/comment.svg'
import { useState } from 'react'

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked || false)
  const [expanded, setExpanded] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [following, setFollowing] = useState(false)

  const getTime = (date) => {
    const diff = (new Date() - new Date(date)) / 1000

    if (diff < 60) return 'now'
    if (diff < 3600) return Math.floor(diff / 60) + 'm'
    if (diff < 86400) return Math.floor(diff / 3600) + 'h'
    return Math.floor(diff / 86400) + 'd'
  }

  const shortText =
    post.caption.length > 20 && !expanded
      ? post.caption.slice(0, 20) + '...'
      : post.caption

  return (
    <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <div className={styles.userInfo}>
          <img src={post.user.avatar} className={styles.avatar} alt="avatar" />

          <div>
            <b>{post.user.username}</b>
            <span className={styles.time}> • {getTime(post.createdAt)} • </span>
          </div>

          <span
            className={styles.follow}
            onClick={() => setFollowing(!following)}
          >
            {following ? 'Following' : 'Follow'}
          </span>
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <img src={post.image} className={styles.postImage} alt="post" />
      </div>

      <div className={styles.actions}>
        <img
          src={liked ? likeFilledIcon : likeIcon}
          onClick={() => setLiked(!liked)}
          style={{
            filter: liked
              ? 'invert(24%) sepia(94%) saturate(7474%) hue-rotate(357deg)'
              : 'none',
          }}
        />

        <img src={commentIcon} onClick={() => setShowComments(!showComments)} />
      </div>

      <div className={styles.like}>{post.likesCount} likes</div>

      <div className={styles.caption}>
        <b className={styles.username}>{post.user.username}</b>

        <span className={styles.captionText}>{shortText}</span>

        {post.caption.length > 20 && !expanded && (
          <span className={styles.more} onClick={() => setExpanded(true)}>
            ...more
          </span>
        )}
      </div>

      <div
        className={styles.comments}
        onClick={() => setShowComments(!showComments)}
      >
        View all comments ({post.commentsCount})
      </div>
    </div>
  )
}

export default PostCard
