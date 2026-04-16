import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../services/api'
import bg from '../../assets/images/Background.svg'
import ichgram from '../../assets/images/ICHgram.svg'
import styles from './styles.module.css'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      return alert('Fill all fields')
    }

    try {
      setLoading(true)

      const res = await API.post('/auth/login', {
        email,
        password,
      })

      const { token, user } = res.data

      if (!token || !user) {
        throw new Error('Invalid response')
      }

      localStorage.setItem('token', token)
      localStorage.setItem('userId', user.id)
      localStorage.setItem('username', user.username)

      navigate('/main')
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginBox}>
      <div>
        <img src={bg} alt="Background" />
      </div>

      <div className={styles.loginField}>
        <img src={ichgram} alt="ICHgram" />

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input
            className={styles.inputUsername}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className={styles.inputPassword}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className={styles.loginButton}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Log in'}
          </button>
        </form>

        <div className={styles.divider}>
          <div></div>
          <p>OR</p>
          <div></div>
        </div>

        <a href="/reset" className={styles.forgot}>
          Forgot password?
        </a>

        <p className={styles.signup}>
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default Login
