import { useAuth0 } from '@auth0/auth0-react'
import useProfile from '../hooks/useProfile'
import Button from '../components/UI/Button/Button'

function NewUserForm() {
  // `user` is the auth0.com user details
  const { user } = useAuth0()
  console.log(user)

  return (
    <form className="grid">
      <label htmlFor="auth0Id" className="font-semibold">
        User ID
      </label>
      <div id="auth0Id" className="mb-2">
        {user?.sub}
      </div>

      <label htmlFor="name" className="font-semibold">
        Name
      </label>
      <input id="name" className="mb-2" type="text" defaultValue={user?.name} />

      <label htmlFor="username" className="font-semibold">
        Username:
      </label>
      <input
        id="username"
        className="mb-2"
        type="text"
        defaultValue={user?.nickname}
      />
      <label htmlFor="email" className="font-semibold">
        Email:
      </label>
      <input
        id="email"
        className="mb-2"
        type="text"
        defaultValue={user?.email}
      />
      <Button>Save</Button>
    </form>
  )
}

function Profile() {
  // `data` contains the `getUser()` data from our db
  const { user } = useAuth0()
  // const { data: client, isLoading, isError } = useProfile()
  const {
    data: client,
    isLoading,
    isError,
  } = { data: {}, isLoading: false, isError: true }

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
      <label htmlFor="auth0Id" className="font-semibold">
        User ID
      </label>
      <div id="auth0Id" className="mb-2">
        {user?.sub}
      </div>

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
