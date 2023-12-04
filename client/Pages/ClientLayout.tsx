import { useAuth0 } from '@auth0/auth0-react'
import BottomNav from '../components/BottomNav'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

// Note that you must add the useQuery and UseAuth0 on the page for the isAdmin and isNot Admin functions to work.

export default function ClientLayout() {
  const { user, isAuthenticated } = useAuth0()

  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  return (
    <>
      <div className="p-6">
        <Outlet />
      </div>

      <BottomNav />
    </>
  )
}
