import { Navigate, Route, Routes } from 'react-router-dom'
import Reset from '../../pages/reset'
import Login from '../../pages/login'
import Register from '../../pages/register'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
    </Routes>
  )
}

export default AppRouter
