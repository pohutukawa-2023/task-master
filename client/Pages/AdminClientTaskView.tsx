import { useAuth0 } from '@auth0/auth0-react'

import { deleteAdminClientTasks } from '../apis/admin'
import Button from '../components/UI/Button/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Task from '../components/UI/Task/Task'
import Checkbox from '../components/UI/Checkbox/Checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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
      <div className="flex items-center">
        <div style={{ marginRight: '8px', marginTop: '8px' }}>
          <Task>
            {task.isComplete === 1 ? ( // Render checkmark if task.isComplete is 1
              <span
                role="img"
                aria-label="checkmark"
                style={{ marginRight: '10px' }}
              >
                ✅
              </span>
            ) : (
              <span
                role="img"
                aria-label="cross"
                style={{ marginRight: '10px' }}
              >
                ❌
              </span> // Render cross if task.isComplete is 0
            )}
            {task.taskName}
          </Task>
        </div>
        <div>
          <button onClick={() => handleDeleteTask(task.id)}>
            <FontAwesomeIcon icon={faTrash} style={{ margin: '0 4px' }} />
          </button>
        </div>
      </div>
    </>
  )
}
export default AdminClientTaskView
