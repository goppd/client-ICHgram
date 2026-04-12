import { Navigate, Route, Routes } from 'react-router-dom'
import Reset from '../../pages/reset'
import Login from '../../pages/login'
import Register from '../../pages/register'
import MainPage from '../../pages/main'
import CreatePage from '../../pages/create'
import Layout from '../../components/layout'
import ExplorePage from '../../pages/explore'
import MessagesPage from '../../pages/messages'
import ProfilePage from '../../pages/profile'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route
        path="/explore"
        element={
          <Layout>
            <ExplorePage />
          </Layout>
        }
      />

      <Route
        path="/messages"
        element={
          <Layout>
            <MessagesPage />
          </Layout>
        }
      />

      <Route
        path="/profile"
        element={
          <Layout>
            <ProfilePage />
          </Layout>
        }
      />
      <Route
        path="/main"
        element={
          <Layout>
            <MainPage />
          </Layout>
        }
      />
      <Route
        path="/create"
        element={
          <Layout>
            <CreatePage />
          </Layout>
        }
      />
    </Routes>
  )
}

export default AppRouter
