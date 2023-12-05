import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { getClientStats } from '../apis/client'
import GraphPage from '../components/GraphPage'
import Header from '../components/Header'

function ClientStats() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  // const { clientId } = useParams()
  // const authId = userURL.clientId

  // shape I want the data in
  // const stats = [
  //   { date: '01-12-2023', tasksDone: 0, tasksTotal: 3 },
  //   { date: '02-12-2023', tasksDone: 1, tasksTotal: 1 },
  // ]

  const {
    data: clientStats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['clientStats'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const clientStats = await getClientStats(token)
      return clientStats
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

  const groupedStats = Object.values(
    clientStats.reduce((acc, item) => {
      const dateKey = item.date

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          done: 0,
          total: 0,
        }
      }

      acc[dateKey].total += 1
      acc[dateKey].done += item.isComplete ? 1 : 0

      return acc
    }, {})
  )

  const stats = groupedStats.map((task) => {
    return { ...task, percentDone: (task.done / task.total) * 100 }
  })

  return (
    <>
      <Header title="Stats" />
      <h3 className="text-lg text-center my-4">{`${clientStats[1].clientName}'s Progress`}</h3>
      <div>
        <GraphPage stats={stats} />
      </div>
    </>
  )
}

export default ClientStats
