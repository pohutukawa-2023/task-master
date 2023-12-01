import useProfile from '../hooks/useProfile'

function Profile() {
  // `user` is the auth0.com user details
  // `data` contains the `getUser()` data from our db
  const { user, isAuthenticated, data, isLoading } = useProfile()

  if (!isAuthenticated) {
    return <div>Not authenticated</div>
  }

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (!data) {
    return <div>no data</div>
  }

  return (
    <div>
      <label>
        username:
        <div>{JSON.stringify(data[0].username)}</div>
      </label>
      <label>
        email:
        <div>{JSON.stringify(data[0].email)}</div>
      </label>
    </div>
  )
}

export default Profile
