import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated } from './Authenticated.tsx'
import NavButton from './UI/NavButton/NavButton.tsx'
import { Link, NavLink } from 'react-router-dom'

function BottomNav() {
  const { user } = useAuth0()

  return (
    <>
      <IfAuthenticated>
        <div className="fixed inset-x-0 bottom-0 flex justify-around w-full py-4 bg-primaryBeige sm:w-[390px] sm:h-fit sm:left-1/2 sm:bottom-1/2 sm:-ml-[195px] sm:-mb-[422px]">
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
