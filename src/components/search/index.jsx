import styles from './styles.module.css'
import crossIcon from '../../assets/icons/cross.svg'

const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles.header}>
        <h2>Search</h2>
        <div className={styles.inputWrapper}>
          <input placeholder="Search" />

          <img src={crossIcon} alt="clear" className={styles.crossIcon} />
        </div>
      </div>

      <div className={styles.results}>
        <p>Recent</p>

        <div className={styles.user}>
          <img src="https://i.pravatar.cc/40" alt="" />
          <span>username</span>
        </div>
      </div>
    </div>
  )
}

export default Search
