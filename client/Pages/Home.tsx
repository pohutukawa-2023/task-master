import { useAuth0 } from '@auth0/auth0-react'
import Button from '../components/UI/Button/Button'
import Logo from '../components/UI/Logo/Logo'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../components/Authenticated'

function Home() {
  const { logout, loginWithRedirect, user } = useAuth0()

  function handleSignOut() {
    logout()
  }

  function handleSignIn() {
    console.log(user)
    loginWithRedirect()
  }

  return (
    <>
      <div className="flex justify-end p-4 font-title text-lg">
        <IfAuthenticated>
          {user && <p>Welcome {user?.nickname}</p>}
        </IfAuthenticated>
        <Logo>t</Logo>
      </div>
      <div className="pt-title px-4 h-full">
        <h1 className="text-darkPurple text-bigTask">
          <span className="font-title text-bigTask font-semibold">task</span>{' '}
          master
        </h1>
        <p className="text-md text-darkNavy pt-5">
          get assigned important tasks.
        </p>
        <p className="text-md">complete, track, see results.</p>
      </div>

      <div className="flex gap-4 justify-center pt-[55%]">
        <IfNotAuthenticated>
          <Button onClick={handleSignIn}>Login</Button>
          <Button>Register</Button>
        </IfNotAuthenticated>
        <IfAuthenticated>
          <Button onClick={handleSignOut}>Logout</Button>
        </IfAuthenticated>
      </div>
    </>
  )
}

export default Home
