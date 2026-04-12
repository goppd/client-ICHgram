import API from './api'

const getPosts = async (page = 1, limit = 4) => {
  const res = await API.get(`/posts?page=${page}&limit=${limit}`)
  return res.data
}

export { getPosts }
