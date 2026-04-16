import styles from './styles.module.css'

const PostActionsModal = ({ onClose }) => {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.modal}>
        <button className={`${styles.item} ${styles.danger}`}>Delete</button>

        <button className={styles.item}>Edit</button>
        <button className={styles.item}>Go to post</button>
        <button className={styles.item}>Copy link</button>

        <button className={styles.item} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default PostActionsModal
