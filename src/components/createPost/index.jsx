import { useState } from 'react'
import API from '../../services/api'

const CreatePost = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!image) {
      alert('Выбери картинку')
      return
    }

    try {
      await API.post('/posts', {
        caption,
        image,
      })

      alert('Пост создан')
      setCaption('')
      setImage(null)
      setPreview(null)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Описание..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <input type="file" onChange={handleImageChange} />

        {preview && <img src={preview} width="200" />}

        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default CreatePost
