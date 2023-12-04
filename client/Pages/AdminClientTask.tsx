import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { deleteAdminClientTasks, getAdminClientTasks } from '../apis/admin'

function AdminClientTasks() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { clientUsername } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['adminClientTasks'],
    queryFn: async () => {
      const adminId = await getAccessTokenSilently()
      const adminClientTasks = await getAdminClientTasks(
        adminId,
        clientUsername as string
      )
      return adminClientTasks
    },
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const adminId = await getAccessTokenSilently()
      await deleteAdminClientTasks(id, adminId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminClientTasks'] })
    },
  })

  const handleDeleteTask = (id: number) => mutation.mutate(id)

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
      <h2>Client: {clientUsername}</h2>
      <div>
        {data.map((task: any) => (
          <div key={task.id}>
            {task.date} -- {task.taskName} -- {task.isComplete} -
            <button onClick={() => handleDeleteTask(task.id)}>del</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminClientTasks
