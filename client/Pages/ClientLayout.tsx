import { useAuth0 } from '@auth0/auth0-react'
import BottomNav from '../components/BottomNav'
import { Outlet } from 'react-router-dom'

// Note that you must add the useQuery and UseAuth0 on the page for the isAdmin and isNot Admin functions to work.

export default function ClientLayout() {
  const { user, isAuthenticated } = useAuth0()

  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  return (
    <>
      <main className="h-[844px] w-[390px] bg-primaryBeige p-6">
        <Outlet />
      </main>
      <BottomNav />
    </>
  )
}
