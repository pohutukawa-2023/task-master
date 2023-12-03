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
        <div className="my-4 w-full md:w-fit flex justify-around">
          <Link to="/profile">
            <NavButton>
              <img
                src={`./images/png/007-user-1.png`}
                alt="profile user icon"
              />
            </NavButton>
          </Link>
          <Link to="/test">
            <NavButton>
              <img src={`./images/png/013-task-1.png`} alt="tasks icon" />
            </NavButton>
          </Link>
          <Link to="/test">
            <NavButton>
              <img src={`./images/png/001-bar-chart.png`} alt="stats icon" />
            </NavButton>
          </Link>
        </div>
      </IfNotAdmin>
      <IfAdmin>
        <div className="my-6 bg-slate-200 w-full md:w-fit flex justify-around">
          <Link to="/profile">
            <NavButton>
              <img
                src={`./images/png/007-user-1.png`}
                alt="profile user icon"
              />
            </NavButton>
          </Link>
          <Link to="/test">
            <NavButton>
              <img src={`./images/png/019-add.png`} alt="add client icon" />
            </NavButton>
          </Link>
          <Link to="/test">
            <NavButton>
              <img src={`./images/png/013-task-1.png`} alt="add task icon" />
            </NavButton>
          </Link>
          <Link to="/test">
            <NavButton>
              <img src={`./images/png/001-bar-chart.png`} alt="stats icon" />
            </NavButton>
            <p>I am an admin</p>
          </Link>
        </div>
      </IfAdmin>
    </>
  )
}

export default BottomNav
