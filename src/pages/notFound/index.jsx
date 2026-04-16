import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import bg from '../../assets/images/background.svg'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* 📱 Картинка */}
        <div className={styles.imageBlock}>
          <img src={bg} alt="404" className={styles.image} />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>Oops! Page Not Found (404 Error)</h1>

          <p className={styles.text}>
            We’re sorry, but the page you’re looking for doesn’t seem to exist.{' '}
            <br />
            If you typed the URL manually, please double-check the spelling.{' '}
            <br />
            If you clicked on a link, it may be outdated or broken.
          </p>

          <button className={styles.button} onClick={() => navigate('/main')}>
            Go back home
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
