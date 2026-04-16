import styles from './styles.module.css'
import PostCard from '../postCard'
import { useEffect, useState, useCallback, useRef } from 'react'
import { getFeed } from '../../services/postService'
import doneIcon from '../../assets/icons/done.svg'

const LIMIT = 4

const Feed = ({ openPostModal, refreshKey }) => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const isFetching = useRef(false)

  useEffect(() => {
    setPosts([])
    setPage(1)
    setHasMore(true)
  }, [refreshKey])

  const loadPosts = useCallback(async () => {
    if (isFetching.current || !hasMore) return

    isFetching.current = true
    setLoading(true)

    try {
      const data = await getFeed(page, LIMIT)
      const newPosts = data.posts

      if (!data.hasMore) setHasMore(false)

      setPosts((prev) => {
        const uniquePosts = newPosts.filter(
          (newPost) => !prev.some((post) => post._id === newPost._id),
        )
        return [...prev, ...uniquePosts]
      })

      setPage((prev) => prev + 1)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      isFetching.current = false
    }
  }, [page, hasMore])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  return (
    <main className={styles.feed}>
      <div className={styles.feedInner}>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} openPostModal={openPostModal} />
        ))}

        {loading && <p>Loading...</p>}

        {!hasMore && (
          <div className={styles.endBlock}>
            <img src={doneIcon} className={styles.endIcon} />
            <h3>You've seen all the updates</h3>
          </div>
        )}
      </div>
    </main>
  )
}

export default Feed
