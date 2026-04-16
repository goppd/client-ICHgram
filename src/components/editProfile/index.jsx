import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyProfile } from '../../services/userService'
import API from '../../services/api'

const EditProfile = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile()

        setUser(data)

        setUsername(data.username || '')
        setWebsite(data.website || '')
        setBio(data.bio || '')
      } catch (err) {
        console.error(err)
      }
    }

    fetchProfile()
  }, [])

  const handleSave = async () => {
    try {
      const res = await API.put('/users/profile', {
        username,
        website,
        bio,
      })

      const updatedUser = res.data
      setUser(updatedUser)

      navigate('/profile')
    } catch (err) {
      console.error(err)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Edit profile</h2>

      <div className={styles.userBox}>
        <img src={user.avatar} className={styles.avatar} alt="" />

        <div className={styles.userInfo}>
          <p className={styles.username}>{user.username}</p>
          <p className={styles.subtitle}>{user.bio}</p>
        </div>

        <button className={styles.photoBtn}>New photo</button>
      </div>

      <div className={styles.form}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Website</label>
        <input value={website} onChange={(e) => setWebsite(e.target.value)} />

        <label>About</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </div>

      <button className={styles.saveBtn} onClick={handleSave}>
        Save
      </button>
    </div>
  )
}

export default EditProfile
