import API from './api'

const getPosts = async (page = 1, limit = 4) => {
  const res = await API.get(`/posts?page=${page}&limit=${limit}`)
  return res.data
}

const getUserPosts = async (userId) => {
  const res = await API.get(`/posts/user/${userId}`)
  return res.data
}

const getFeed = async (page = 1, limit = 4) => {
  const res = await API.get(`/posts/feed?page=${page}&limit=${limit}`)
  return res.data
}

export { getPosts, getUserPosts, getFeed }
