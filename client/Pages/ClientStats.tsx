import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getClientStats } from '../apis/client'

function ClientStats() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const userURL = useParams()
  // userURL.clientId = authID (fetch data by authID)

  const data = [
    {
      id: 1,
      clientId: 'auth0|656ba4f101f9e8a19d2c8d19',
      taskId: 1,
      data: null,
      isComplete: false,
      date: '2023-12-01',
      clientName: 'Kirsty',
      taskName: 'Power Breathing',
    },
    {
      id: 2,
      clientId: 'auth0|656ba4f101f9e8a19d2c8d19',
      taskId: 2,
      data: null,
      isComplete: false,
      date: '2023-12-01',
      clientName: 'Kirsty',
      taskName: 'Yoga',
    },
    {
      id: 3,
      clientId: 'auth0|656ba4f101f9e8a19d2c8d19',
      taskId: 3,
      data: null,
      isComplete: false,
      date: '2023-12-01',
      clientName: 'Kirsty',
      taskName: 'Walking',
    },
    {
      id: 4,
      clientId: 'auth0|656ba4f101f9e8a19d2c8d19',
      taskId: 1,
      data: null,
      isComplete: true,
      date: '2023-12-02',
      clientName: 'Kirsty',
      taskName: 'Power Breathing',
    },
  ]

  // shape I want the data in
  const stats = [
    { date: '01-12-2023', tasksDone: 0, tasksToDo: 3 },
    { date: '02-12-2023', tasksDone: 1, tasksToDo: 0 },
  ]

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['clientStats'],
  //   queryFn: async () => {
  //     const token = await getAccessTokenSilently()
  //     const clientStats = await getClientStats(
  //       token,
  //       'auth0|656ba4f101f9e8a19d2c8d19'
  //     )
  //     return clientStats
  //   },
  // })

  // if (!isAuthenticated && !user) {
  //   return <div>Not authenticated</div>
  // }

  // if (isLoading) {
  //   return <p>loading...</p>
  // }

  // if (isError) {
  //   return <p>something went wrong</p>
  // }

  // const taskByDate = data.reduce((acc, current) => acc.date === current.date)
  // console.log(taskByDate)

  // const dates = data.map((task) => {
  //   task.date, task.name, task.isComplete
  // })

  // const oneDate = [...new Set(dates)]
  // console.log(oneDate)

  return (
    <>
      <h2>Client: {data[1].clientName}</h2>
      <br />
      <div>
        {data.map((task: any) => (
          <div key={task.id}>
            <p>{task.date}</p>
            <p>{task.taskName}</p>
            <p> {task.isComplete === false ? 'Not Done' : 'Done'}</p>
            <br />
          </div>
        ))}
      </div>
    </>
  )
}

export default ClientStats
