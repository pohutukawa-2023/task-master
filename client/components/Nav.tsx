import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { NavGroup, NavButton } from './Styled.tsx'
import Button from './UI/Button/Button.tsx'

function Nav() {
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
      <NavGroup>
        <IfAuthenticated>
          <NavButton onClick={handleSignOut}>Sign out</NavButton>
          {user && <p>Signed in as: {user?.nickname}</p>}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Button onClick={handleSignIn}>Sign in</Button>
        </IfNotAuthenticated>
      </NavGroup>
      <h1>Task Master!</h1>
    </>
  )
}

export default Nav
