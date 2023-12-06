import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteAdminClientTasks, getAdminClientTasks } from '../apis/admin'
import { AdminClientTask } from '../../types/Admin'
import Header from '../components/Header'
import Button from '../components/UI/Button/Button'

function AdminClientTasks() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { clientUsername } = useParams()
  const navigate = useNavigate()

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
  console.log(data)
  const rows = []
  let lastDate = null

  data?.forEach((task) => {
    if (task.date != lastDate) {
      rows.push(
        <div className="font-semibold text-center text-xl" key={task.date}>
          {new Date(task.date).toLocaleDateString('en-GB', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
          })}
        </div>
      )
    }
    console.log(task.isComplete)
    rows.push(
      <div key={task.id} className="flex items-center">
        <div className="flex items-center p-2 px-4 bg-lightPurple text-darkNavy border rounded-full focus:shadow-[0px_0px_5px_2px_#C3ACD0] border-transparent placeholder-[#B07CF2] focus:outline-none block w-full sm:text-sm">
          <div>
            {task.isComplete ? (
              <img
                className="w-6 h-6 mr-6"
                src="/images/png/022-tick.png"
                alt="tick-icon"
              />
            ) : (
              <img
                className="w-4 h-4 mr-6"
                src="/images/png/021-cross.png"
                alt="cross-icon"
              />
            )}
          </div>
          {task.taskName}
        </div>
        <div>
          <button onClick={() => handleDeleteTask(task.id)}>
            <div className="rounded-full w-8 h-8 ml-6 mr-2 mt-2">
              <img src="/images/png/020-trash.png" alt="trash-icon" />
            </div>
          </button>
        </div>
      </div>
    )
    lastDate = task.date
  })

  return (
    <>
      <Header
        title={
          data[0] && data[0].clientName
            ? `Tasks: ${data[0].clientName}`
            : `Tasks: ${clientUsername}`
        }
      />
      <div className="grid text-center my-6">
        <Button onClick={() => navigate(`/admin/addTask/${data[0]?.clientId}`)}>
          Add Task
        </Button>
      </div>

      <div>
        <div className="mb-28 flex flex-col gap-4">{rows}</div>
      </div>
    </>
  )
}

export default AdminClientTasks
