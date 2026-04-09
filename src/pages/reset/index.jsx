import styles from './styles.module.css'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import reset from '../../assets/images/reset.svg'
import ichgram from '../../assets/images/ICHgram.svg'

const Reset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className={styles.resetPage}>
      <header className={styles.logoCard}>
        <img src={ichgram} alt="ICHgram" />
      </header>
      <div className={styles.resetCard}>
        <img src={reset} alt="Reset" />
        <h2>Trouble logging in?</h2>
        <p className={styles.subtitle}>
          Enter your email, phone, or username and we'll send you a link to get
          back into your account.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.resetForm}>
          <input
            type="text"
            placeholder="Email or Username"
            {...register('login', {
              required: 'This field is required',
              minLength: {
                value: 3,
                message: 'Must be at least 3 characters',
              },
            })}
          />
          {errors.login && (
            <span className={styles.error}>{errors.login.message}</span>
          )}
          <button type="submit" disabled={!isValid}>
            Reset your password
          </button>
        </form>
        <div className={styles.divider}>
          <div></div>
          <p>OR</p>
          <div></div>
        </div>
        <Link to="/register" className={styles.link}>
          Create a new account
        </Link>
      </div>
      <div className={styles.bottom}>
        <Link to="/login">Back to login</Link>
      </div>
    </div>
  )
}

export default Reset
