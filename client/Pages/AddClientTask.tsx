import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { addTask } from '../apis/admin'
import { TaskData } from '../../types/Task'

function AddClientTask() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const queryClient = useQueryClient()

  const insertTaskMutation = useMutation({
    mutationFn: ({
      token,
      clientId,
      form,
    }: {
      token: string
      clientId: string
      form: TaskData
    }) => addTask(token, clientId, form),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTasks', user?.sub] })
      // navigate('/my-songs')
    },
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const token = await getAccessTokenSilently()

    const formData = new FormData(e.target as HTMLFormElement)
    // auth0|656ba3141d577edc5228f00e
    const clientId = formData.get('clientId')
    const taskOptionId = Number(formData.get('taskOptionId'))
    const data = ''
    const isComplete = formData.get('isComplete') == 'on' ? true : false

    console.log(formData.get('date'))

    const date = String(formData.get('date'))
    console.log(date)

    const form = { taskOptionId, data, isComplete, date }

    console.log(form)

    insertTaskMutation.mutate({ token, clientId, form })
  }

  return (
    <div>
      <div>AddClientTask</div>
      <div>Add task</div>
      <form className="grid" onSubmit={handleSubmit}>
        <label>
          client Auth0 Id
          <input type="text" name="clientId" required />
        </label>

        <label>
          task option
          <input type="text" name="taskOptionId" required />
        </label>

        <label>
          complete?
          <input type="checkbox" name="isComplete" />
        </label>

        <label>
          date
          <input type="date" name="date" required />
        </label>
        <button>Add</button>
      </form>
    </div>
  )
}

export default AddClientTask
