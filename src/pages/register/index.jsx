import styles from './styles.module.css'
import ichgram from '../../assets/images/ICHgram.svg'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
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
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          <input
            placeholder="Full Name"
            {...register('fullName', {
              required: 'Full name is required',
            })}
          />
          {errors.fullName && (
            <p className={styles.error}>{errors.fullName.message}</p>
          )}

          <input
            placeholder="Username"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
              validate: (value) =>
                value !== 'admin' || 'This username is already taken',
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
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          <p className={styles.info}>
            People who use our service may have uploaded <br /> your contact
            information to Instagram. <a href="#">Learn More</a>
          </p>

          <p className={styles.info}>
            By signing up, you agree to our <a href="#">Terms</a>,{' '}
            <a href="#">
              Privacy <br /> Policy
            </a>
            and <a href="#">Cookies Policy</a>.
          </p>
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
