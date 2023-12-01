import { useAuth0 } from '@auth0/auth0-react'
import useProfile from '../hooks/useProfile'

function Profile() {
  // `user` is the auth0.com user details
  // `data` contains the `getUser()` data from our db
  const { user, isAuthenticated } = useAuth0()
  console.log(user)

  const { data, isLoading } = useProfile()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  return (
    <div>
      <label>
        username:
        <div>{JSON.stringify(data[0]?.username)}</div>
      </label>
      <label>
        email:
        <div>{JSON.stringify(data[0]?.email)}</div>
      </label>
    </div>
  )
}

export default Profile
