import styles from './styles.module.css'
import ichgram from '../../assets/images/ICHgram.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import API from '../../services/api'

const Register = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await API.post('/auth/register', {
        username: data.username,
        email: data.email,
        password: data.password,
      })

      alert('Registration successful')

      navigate('/login')
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Registration error')
    }
  }

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerCard}>
        <img src={ichgram} alt="ICHgram" className={styles.logo} />

        <p className={styles.subtitle}>
          Sign up to see photos and videos <br /> from your friends
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
          <input
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          <input
            placeholder="Username"
            {...register('username', {
              required: 'Username is required',
            })}
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: 6,
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          <button type="submit">Sign up</button>
        </form>
      </div>

      <div className={styles.bottomCard}>
        <p>
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
