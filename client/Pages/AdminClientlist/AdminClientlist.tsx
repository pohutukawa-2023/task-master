import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { getAdminClients } from '../../apis/admin'

function AdminClientlist() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['adminClients'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const adminClients = await getAdminClients(token)
      return adminClients
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
      <h2>Show Clients here:</h2>
      <div>
        {data &&
          [...new Set(data.map((client: any) => client.id))].map((uniqueId) => {
            const uniqueClient = data.find(
              (client: any) => client.id === uniqueId
            )
            return <div key={uniqueClient.id}>{uniqueClient.name}</div>
          })}
      </div>
    </>
  )
}

export default AdminClientlist
