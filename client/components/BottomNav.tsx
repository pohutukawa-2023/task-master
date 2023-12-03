import { useAuth0 } from '@auth0/auth0-react'
import { IfAdmin, IfNotAdmin } from './Authenticated.tsx'
import NavButton from './UI/NavButton/NavButton.tsx'
import { Link } from 'react-router-dom'

function BottomNav() {
  // TODO: call the useAuth0 hook and destructure user, logout, and loginWithRedirect
  const { logout, loginWithRedirect, user } = useAuth0()
  // TODO: replace placeholder user object with the one from auth0

  function handleSignOut() {
    logout()
  }

  function handleSignIn() {
    loginWithRedirect()
  }

  return (
    <>
      <IfNotAdmin>
        <div>
          <Link to="/profile">
            <NavButton>Profile</NavButton>
          </Link>
          <NavButton>Tasks</NavButton>
          <NavButton>Stats</NavButton>
        </div>
      </IfNotAdmin>
      <IfAdmin>
        <Link to="/profile">
          <NavButton>Profile</NavButton>
        </Link>
        <NavButton>Tasks</NavButton>
        <NavButton>Add Tasks</NavButton>
        <NavButton>Stats</NavButton>
      </IfAdmin>
    </>
  )
}

export default BottomNav
