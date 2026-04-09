import bg from '../../assets/images/Background.svg'
import ichgram from '../../assets/images/ICHgram.svg'
import styles from './styles.module.css'

const Login = () => {
  return (
    <div className={styles.loginBox}>
      <div>
        <img src={bg} alt="Background" />
      </div>
      <div className={styles.loginField}>
        <img src={ichgram} alt="ICHgram" />
        <form className={styles.loginForm}>
          <input
            className={styles.inputUsername}
            type="text"
            placeholder="Username, or email"
          />
          <input
            className={styles.inputPassword}
            type="password"
            placeholder="Password"
          />
          <button className={styles.loginButton} type="submit">
            Log in
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
