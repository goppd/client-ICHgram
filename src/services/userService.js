import API from './api'

const getMyProfile = async () => {
  const res = await API.get('/users/profile')
  return res.data
}

const getUserById = async (userId) => {
  const res = await API.get(`/users/${userId}`)
  return res.data
}

export { getMyProfile, getUserById }
