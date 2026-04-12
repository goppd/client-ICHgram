import { useEffect, useState, useCallback } from 'react'
import styles from './styles.module.css'

const ExplorePage = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const fetchPosts = useCallback(async () => {
    setLoading(true)

    try {
      const res = await fetch(
        `http://localhost:5000/api/posts?page=${page}&limit=9`,
      )

      const data = await res.json()

      if (data.length === 0) {
        setHasMore(false)
      }

      setPosts((prev) => {
        const newPosts = data.filter(
          (newPost) => !prev.some((p) => p._id === newPost._id),
        )
        return [...prev, ...newPosts]
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const fullHeight = document.documentElement.scrollHeight

      if (scrollTop + windowHeight >= fullHeight - 100 && !loading && hasMore) {
        setPage((prev) => prev + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [loading, hasMore])

  return (
    <div className={styles.explore}>
      <div className={styles.grid}>
        {posts.map((post, index) => (
          <div
            key={post._id + index}
            className={`${styles.item} ${index % 5 === 0 ? styles.big : ''}`}
          >
            <img src={post.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExplorePage
