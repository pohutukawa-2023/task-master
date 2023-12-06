import { useAuth0 } from '@auth0/auth0-react'
import { getClientTasks, taskDone } from '../apis/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ClientsTask } from '../../models/task'
import Header from '../components/Header'
// import { User, UserDraft } from '../../types/User'

function TaskItem({ task, handleChangeDone }) {
  return (
    <>
      <div
        key={task.id}
        className="flex items-center p-2 px-4 bg-lightPurple text-darkNavy border rounded-full focus:shadow-[0px_0px_5px_2px_#C3ACD0] border-transparent placeholder-[#B07CF2] focus:outline-none block w-full sm:text-sm"
      >
        <input
          type="checkbox"
          name="taskDone"
          id={task.id.toString()}
          checked={task.isComplete}
          onChange={(e) => handleChangeDone(e, task.id)}
          className="text-darkNavy accent-darkPurple w-5 h-5 mr-2 rounded-full"
        />

        <label htmlFor={task.id.toString()}>{task.name}</label>
      </div>
    </>
  )
}

function ClientTasks() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const auth0id = await getAccessTokenSilently()

      const response = await getClientTasks(auth0id)
      return response
    },
  })

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

  async function handleChangeDone(
    e: React.ChangeEvent<HTMLInputElement>,
    task_id: number
  ) {
    e.preventDefault()
    const token = await getAccessTokenSilently()
    // console.log(e.target.checked)

    mutation.mutate({ done: !e.target.checked, task_id, token })
  }

  const rows = []
  let lastDate = null

  const sortedData = data?.sort((taskA, taskB) => taskA.date < taskB.date)

  sortedData?.forEach((task: ClientsTask) => {
    if (task.date !== lastDate) {
      rows.push(
        <div key={task.date} className="font-semibold text-center text-xl">
          {new Date(task.date).toLocaleDateString('en-GB', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
          })}
        </div>
      )
    }
    rows.push(
      <TaskItem key={task.id} task={task} handleChangeDone={handleChangeDone} />
    )
    lastDate = task.date
  })

  return (
    <>
      <div>
        <Header title="Tasks" />
      </div>
      <form>
        {!isAuthenticated && !user && <div>Not authenticated</div>}
        {isLoading && <p>Loading... please wait</p>}
        {data && rows && rows.length > 0 && (
          <div className="mb-28 flex flex-col gap-4">{rows}</div>
        )}
        <div className="mb-28 flex flex-col gap-4 text-center text-2xl mt-4">
          {rows.length === 0 && 'No tasks assigned yet'}
        </div>
      </form>
    </>
  )
}

export default ClientTasks
