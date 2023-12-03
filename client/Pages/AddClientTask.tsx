import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { addTask } from '../apis/admin'
import { TaskData } from '../../types/Task'

function AddClientTask() {
  const { clientId } = useParams()
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const queryClient = useQueryClient()

  const insertTaskMutation = useMutation({
    mutationFn: ({ form, token }: { form: TaskData; token: string }) =>
      addTask(token, clientId, { form }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', clientId] })
      // navigate('/my-songs')
    },
  })

  if (!clientId || !isAuthenticated || !user) {
    return <div>error</div>
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const token = await getAccessTokenSilently()

    const formData = new FormData(e.target as HTMLFormElement)
    const taskOptionId = formData.get('taskOptionId')
    const data = formData.get('data')
    const isComplete = formData.get('isComplete')
    const date = formData.get('date')

    const form = { taskOptionId, data, isComplete, date }

    insertTaskMutation.mutate({ token, form })
  }

  return (
    <div>
      <div>AddClientTask</div>
      <div>{clientId}</div>
    </div>
  )
}

export default AddClientTask
