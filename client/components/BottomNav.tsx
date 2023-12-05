import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated } from './Authenticated.tsx'
import NavButton from './UI/NavButton/NavButton.tsx'
import { Link, NavLink } from 'react-router-dom'

function BottomNav() {
  const { user } = useAuth0()

  return (
    <>
      <IfAuthenticated>
        <div className="bg-primaryBeige py-4 w-full md:w-fit flex justify-around fixed inset-x-0 bottom-0">
          <NavButton link={'/profile'}>
            <img src={`/images/png/007-user-1.png`} alt="profile user icon" />
          </NavButton>
          <NavButton link="/client/tasks">
            <img src={`/images/png/013-task-1.png`} alt="tasks icon" />
          </NavButton>
          <NavButton link={`/client/${user?.sub}/stats`}>
            <img src={`/images/png/001-bar-chart.png`} alt="stats icon" />
          </NavButton>
        </div>
      </IfAuthenticated>
    </>
  )
}

export default BottomNav
