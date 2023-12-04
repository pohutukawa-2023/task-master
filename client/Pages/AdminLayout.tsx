import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { getClient } from '../apis/client'
import AdminNav from '../components/AdminNav'
import { Outlet } from 'react-router-dom'

// Note that you must add the useQuery and UseAuth0 on the page for the isAdmin and isNot Admin functions to work.

export default function AdminLayout() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { isLoading, isError } = useQuery({
    queryKey: ['client', user?.sub],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await getClient(accessToken)
        return response
      }
    },
    refetchOnWindowFocus: false,
    retry: 1,
  })

  if (!isAuthenticated && !user) {
    return <p>Not authenticated</p>
  }

  if (isLoading) {
    return <p>Loading... please wait</p>
  }

  if (isError) {
    return <p>Whoops! Something went wrong</p>
  }

  return (
    <>
      <Outlet />
      <AdminNav />
    </>
  )
}
