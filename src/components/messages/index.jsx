import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from '../../services/api'
import styles from './styles.module.css'
import { io } from 'socket.io-client'
import React from 'react'

const socket = io('http://localhost:5000')

const Messages = () => {
  const { conversationId } = useParams()
  const navigate = useNavigate()

  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [currentChat, setCurrentChat] = useState(null)

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get('/conversations')
        setConversations(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetch()
  }, [])

  useEffect(() => {
    if (!conversationId) return

    const chat = conversations.find((c) => c._id === conversationId)

    if (chat && chat._id !== currentChat?._id) {
      setCurrentChat(chat)
    }

    const fetchMessages = async () => {
      try {
        const res = await API.get(`/messages/${conversationId}`)
        setMessages(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchMessages()
  }, [conversationId, conversations])

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg])
    })

    return () => socket.off('receiveMessage')
  }, [])

  const handleSend = async () => {
    if (!text.trim()) return

    try {
      const res = await API.post('/messages', {
        conversationId,
        text,
      })

      socket.emit('sendMessage', res.data)

      setMessages((prev) => [...prev, res.data])
      setText('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.chatList}>
        <div className={styles.chatListHeader}>
          {localStorage.getItem('username') || 'Username'}
        </div>

        {conversations.map((conv) => {
          const otherUserId = conv.members.find((id) => id !== userId)

          return (
            <div
              key={conv._id}
              className={`${styles.chatItem} ${
                conversationId === conv._id ? styles.active : ''
              }`}
              onClick={() => navigate(`/messages/${conv._id}`)}
            >
              <img
                src={`https://i.pravatar.cc/150?u=${otherUserId}`}
                className={styles.avatar}
              />

              <div className={styles.chatInfo}>
                <div className={styles.username}>
                  user_{otherUserId.slice(-4)}
                </div>

                <div className={styles.lastMessage}>Open chat...</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.chatWindow}>
        {!conversationId ? (
          <div className={styles.chatContent}>
            <div className={styles.profileCenter}>
              <img
                src="https://i.pravatar.cc/150"
                className={styles.bigAvatar}
              />
              <div className={styles.bigUsername}>Select a chat</div>
              <div className={styles.subText}>
                Choose a conversation to start messaging
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.chatHeader}>
              <img
                src="https://i.pravatar.cc/150"
                className={styles.headerAvatar}
              />
              <strong>Chat user</strong>
            </div>

            <div className={styles.chatContent}>
              <div className={styles.messages}>
                {messages.map((msg) => {
                  const isMy = msg.senderId === userId

                  return (
                    <div
                      key={msg._id}
                      className={`${styles.messageRow} ${
                        isMy ? styles.myRow : styles.otherRow
                      }`}
                    >
                      <div
                        className={`${styles.message} ${
                          isMy ? styles.myMessage : styles.otherMessage
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write message..."
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Messages
