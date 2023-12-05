import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import Header from '../components/Header'
import { getAdminClients } from '../apis/admin'

import { Link } from 'react-router-dom'
import Button from '../components/UI/Button/Button'

function AdminStatsClients() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const {
    data: allClients,
    isLoading,
    isError,
  } = useQuery({
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

  if (isError) {
    return <p>something went wrong</p>
  }

  if (isLoading) {
    return <p>loading...</p>
  }

  const clients = allClients.filter((obj, index: number) => {
    return index === allClients.findIndex((o) => obj.id === o.id)
  })

  return (
    <>
      <Header title="Stats" />
      <h3 className="text-3xl text-center my-8">My Clients:</h3>
      <div className="flex flex-col items-center">
        {clients.map((client) => (
          <Link key={client.id} to={`${client.id}`}>
            <Button>{client.name}</Button>
          </Link>
        ))}
      </div>
    </>
  )
}

export default AdminStatsClients
