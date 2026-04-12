import styles from './styles.module.css'
import PostCard from '../postCard'
import { useEffect, useState, useCallback, useRef } from 'react'
import { getPosts } from '../../services/postService'
import doneIcon from '../../assets/icons/done.svg'

const LIMIT = 4

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const isFetching = useRef(false)

  const loadPosts = useCallback(async () => {
    if (isFetching.current || !hasMore) return

    isFetching.current = true
    setLoading(true)

    try {
      const data = await getPosts(page, LIMIT)

      if (!data || data.length < LIMIT) {
        setHasMore(false)
      }

      setPosts((prev) => {
        const uniquePosts = data.filter(
          (newPost) => !prev.some((post) => post._id === newPost._id),
        )
        return [...prev, ...uniquePosts]
      })

      setPage((prev) => prev + 1)
    } catch (err) {
      console.error('Error loading posts:', err)
    } finally {
      setLoading(false)
      isFetching.current = false
    }
  }, [page, hasMore])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        loadPosts()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadPosts])

  return (
    <main className={styles.feed}>
      <div className={styles.feedInner}>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}

        {loading && <p>Loading...</p>}

        {!hasMore && (
          <div className={styles.endBlock}>
            <img src={doneIcon} alt="done" className={styles.endIcon} />
            <h3>You've seen all the updates</h3>
            <p>You have viewed all new publications</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Feed
