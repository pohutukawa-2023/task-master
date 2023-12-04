import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { deleteAdminClientTasks, getAdminClientTasks } from '../apis/admin'
import { AdminClientTask } from '../../types/Admin'
import Button from '../components/UI/Button/Button'

function AdminClientTasks() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { clientUsername } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['adminClientTasks'],
    queryFn: async (): Promise<AdminClientTask[]> => {
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
        {data.map((task) => (
          <div key={task.id}>
            {task.date} -- {task.taskName} -- {task.isComplete} -
            <Button onClick={() => handleDeleteTask(task.id)}>x</Button>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminClientTasks
