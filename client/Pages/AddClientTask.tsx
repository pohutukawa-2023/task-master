import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { addTask } from '../apis/admin'
import { TaskData } from '../../types/Task'
import Button from '../components/UI/Button/Button'
import TextBox from '../components/UI/Textbox/Textbox'
import Select from '../components/UI/Select/Select'
import Checkbox from '../components/UI/Checkbox/Checkbox'

function AddClientTask() {
  const { user, getAccessTokenSilently } = useAuth0()

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
    // const isComplete = formData.get('isComplete') == 'on' ? true : false
    const isComplete = false
    const date = String(formData.get('date'))

    const form = { taskOptionId, data, isComplete, date }

    insertTaskMutation.mutate({ token, clientId, form })
  }

  const task_options = [
    { id: 1, value: 'Breathing' },
    { id: 2, value: 'Meditation' },
    { id: 3, value: 'Something else' },
  ]

  return (
    <div>
      <div className="mb-2 text-xl">AddClientTask</div>
      <form className="grid" onSubmit={handleSubmit}>
        <label htmlFor="clientId">Client</label>
        <TextBox addclasses="mb-2" name="clientId" required />
        <label htmlFor="taskOptionId">Task</label>
        <Select addclasses="mb-2" name="taskOptionId" required>
          {task_options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.value}
            </option>
          ))}
        </Select>
        <label htmlFor="date">Date</label>
        <TextBox type="date" addclasses="mb-2" name="date" required />
        <Button addclasses="mt-4">Add</Button>
      </form>
    </div>
  )
}

export default AddClientTask
