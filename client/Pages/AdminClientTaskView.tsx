import { useAuth0 } from '@auth0/auth0-react'
import { Task } from '../../models/task'
import { deleteAdminClientTasks } from '../apis/admin'
import Button from '../components/UI/Button/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function AdminClientTaskView({ task, currentDate }: any) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

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

  // conditionally render the task if the date match
  const taskDate = new Date(task.date)
  const displayTask = taskDate.toDateString() === currentDate.toDateString()

  if (!displayTask) {
    return null // If the date doesn't match, don't render the task
  }

  return (
    <>
      <div>
        {task.taskName} -- {task.isComplete}
        <Button onClick={() => handleDeleteTask(task.id)}>x</Button>
      </div>
    </>
  )
}
export default AdminClientTaskView
