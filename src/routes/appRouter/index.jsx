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
import EditProfilePage from '../../pages/editProfile'
import NotFound from '../../pages/notFound'

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
        path="/messages/:conversationId"
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
            {({ openPostModal }) => (
              <ProfilePage openPostModal={openPostModal} />
            )}
          </Layout>
        }
      />

      <Route
  path="/profile/:userId"
  element={
    <Layout>
      {({ openPostModal }) => (
        <ProfilePage openPostModal={openPostModal} />
      )}
    </Layout>
  }
/>

      <Route
        path="/edit-profile"
        element={
          <Layout>
            <EditProfilePage />
          </Layout>
        }
      />

      <Route
        path="/main"
        element={
          <Layout>
            {({ openPostModal }) => <MainPage openPostModal={openPostModal} />}
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

      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  )
}

export default AppRouter
