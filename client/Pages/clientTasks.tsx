import { useAuth0 } from '@auth0/auth0-react'
import { getClientTasks } from '../apis/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
  console.log(data)

  // const queryClient = useQueryClient()

  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  if (isLoading) {
    return <p>Loading... please wait</p>
  }

  return (
    <>
      <div>
        <h1>Tasks</h1>
      </div>

      <div>
        {data?.map((task: any) => (
          <>
            <li>
              <input type="checkbox" name="taskDone" />
              <label key={task}> {task.name}</label>
              <button></button>
            </li>
          </>
        ))}
      </div>
    </>
  )
}

export default ClientTasks
