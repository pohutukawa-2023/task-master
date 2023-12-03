import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

function AdminClientTasks() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { clientUsername } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['adminClientTasks'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const adminClients = await getAdminClients(token)
      return adminClientsa
    },
  })
  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  if (isLoading) {
    return <p>loading...</p>
  }

  if (isError) {
    return <p>something went wrong</p>
  }

  return (
    <>
      <h2>Client Tasks here</h2>
      <p>{clientUsername}</p>
    </>
  )
}

export default AdminClientTasks
