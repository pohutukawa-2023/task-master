import { useAuth0 } from '@auth0/auth0-react'
import Button from '../components/UI/Button/Button'
import Logo from '../components/UI/Logo/Logo'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../components/Authenticated'
import Profile from './Profile'

function Home() {
  const { logout, loginWithRedirect, user } = useAuth0()

  function handleSignOut() {
    logout()
  }

  function handleSignIn() {
    // console.log(user)
    loginWithRedirect()
  }

  return (
    <>
      <div className="flex justify-end p-4 font-title text-lg">
        <Logo>
          <img src="t.svg" alt="Logo for Task Masters" />
        </Logo>
      </div>
      <div className="pt-title px-4 h-1/2">
        <h1 className="text-darkPurple text-bigTask">
          <span className="font-title text-bigTask font-semibold">task</span>{' '}
          master
        </h1>
        <p className="text-md text-darkNavy pt-5">
          get assigned important tasks.
        </p>
        <p className="text-md">complete, track, see results.</p>
      </div>

      <div>
        <IfNotAuthenticated>
          <div className="grid gap-4 text-center pt-[25%] m-6">
            <Button onClick={handleSignIn}>Login</Button>
            <Button onClick={handleSignIn}>Register</Button>
          </div>
        </IfNotAuthenticated>
        <IfAuthenticated>
          <div className="grid gap-4 text-center pt-[25%] m-6">
            <Button onClick={handleSignOut}>Logout</Button>
          </div>
        </IfAuthenticated>
      </div>
    </>
  )
}

export default Home
