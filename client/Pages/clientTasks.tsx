import { useAuth0 } from '@auth0/auth0-react'
import { getClientTasks, taskDone } from '../apis/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ClientsTask } from '../../models/task'
import Checkbox from '../components/UI/Checkbox/Checkbox'
import TextBox from '../components/UI/Textbox/Textbox'
import Header from '../components/Header'
// import { User, UserDraft } from '../../types/User'

function ClientTasks() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const auth0id = await getAccessTokenSilently()

      const response = await getClientTasks(auth0id)
      return response
    },

    // Not reallu Sure about the two lines below.
    // refetchOnWindowFocus: false,
    // retry: 1,
  })
  // console.log(data)

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({
      done,
      task_id,
      token,
    }: {
      done: boolean
      task_id: number
      token: string
    }) => taskDone(done, task_id, token),

    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  if (isLoading) {
    return <p>Loading... please wait</p>
  }

  async function handleChangeDone(
    e: React.ChangeEvent<HTMLInputElement>,
    task_id: number
  ) {
    e.preventDefault()
    const token = await getAccessTokenSilently()
    // console.log(e.target.checked)

    mutation.mutate({ done: !e.target.checked, task_id, token })
  }

  return (
    <>
      <div>
        <Header title="Tasks" />
      </div>
      <form>
        <div className="mb-28 flex flex-col gap-4">
          {data?.map((task: ClientsTask) => (
            <div
              key={task.id}
              className="flex items-center p-2 px-4 bg-lightPurple text-white border rounded-full focus:shadow-[0px_0px_5px_2px_#C3ACD0] border-transparent placeholder-[#B07CF2] focus:outline-none block w-full sm:text-sm"
            >
              <input
                type="checkbox"
                name="taskDone"
                id={task.id.toString()}
                checked={task.isComplete}
                onChange={(e) => handleChangeDone(e, task.id)}
                className="text-darkNavy rounded-full accent-darkPurple w-5 h-5 mr-2"
              />

              <label htmlFor={task.id.toString()}>
                {task.name} -{' '}
                {new Date(task.date).toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: '2-digit',
                  month: 'short',
                })}
              </label>
              <button></button>
            </div>
          ))}
        </div>
      </form>
    </>
  )
}

export default ClientTasks
