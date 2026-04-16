import Profile from '../../components/profile'
import { useParams } from 'react-router-dom'

const ProfilePage = (props) => {
  const { userId } = useParams()

  return <Profile isMyProfile={!userId} {...props} />
}

export default ProfilePage
