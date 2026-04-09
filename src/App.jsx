import './App.css'
import AppRouter from './routes/appRouter'
import Footer from './components/footer'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()

  const hideFooter =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/reset'

  return (
    <>
      <AppRouter />
      {!hideFooter && <Footer />}
    </>
  )
}

export default App
