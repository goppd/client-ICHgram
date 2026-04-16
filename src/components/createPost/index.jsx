import { useState } from 'react'
import styles from './styles.module.css'
import emojiIcon from '../../assets/icons/smile.svg'
import shareIcon from '../../assets/icons/share.svg'

const CreatePost = ({ onClose, onSubmit, user }) => {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      setImage(reader.result)
      setPreview(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!image) return

    await onSubmit({ caption, image })
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className={styles.top}>
          <h3>Create new post</h3>

          <button
            className={styles.shareBtn}
            onClick={handleSubmit}
            disabled={!image}
          >
            Share
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.left}>
            {preview ? (
              <img src={preview} alt="preview" />
            ) : (
              <label className={styles.upload}>
                <input type="file" onChange={handleImageChange} hidden />
                <img
                  src={shareIcon}
                  alt="upload"
                  className={styles.uploadIcon}
                />
                <span>Upload photo</span>
              </label>
            )}
          </div>

          <div className={styles.right}>
            <div className={styles.topRight}>
              <div className={styles.user}>
                <img
                  src={user?.avatar}
                  alt="avatar"
                  className={styles.avatar}
                />
                <span>{user?.username}</span>
              </div>

              <textarea
                className={styles.textarea}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={2200}
                placeholder="Write a caption..."
              />

              <div className={styles.bottomRow}>
                <img src={emojiIcon} alt="emoji" className={styles.emoji} />
                <div className={styles.counter}>{caption.length}/2200</div>
              </div>
            </div>

            <div className={styles.bottomRight}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
