// import { useAuth0 } from '@auth0/auth0-react'
import useProfile from '../hooks/useProfile'
import Button from '../components/UI/Button/Button'

function NewUserForm() {
  return <div>User profile not found, please create one:</div>
}

function Profile() {
  // `user` is the auth0.com user details
  // const { user } = useAuth0()

  // `data` contains the `getUser()` data from our db
  const { data: client, isLoading, isError } = useProfile()

  if (isLoading) {
    return <div>Please wait while we load your user profile...</div>
  }

  if (isError) {
    // if error is '404: not found'
    // TODO: handle other errors
    return <NewUserForm />
  }

  return (
    <div>
      <label htmlFor="name" className="font-semibold">
        Name
      </label>
      <div id="name" className="mb-2">
        {client?.name}
      </div>

      <label htmlFor="username" className="font-semibold">
        Username:
      </label>
      <div id="username" className="mb-2">
        {client?.username}
      </div>

      <label htmlFor="email" className="font-semibold">
        Email:
      </label>
      <div id="email" className="mb-2">
        {client?.email}
      </div>

      <Button>Edit</Button>
    </div>
  )
}

export default Profile
