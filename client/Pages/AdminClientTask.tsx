import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { deleteAdminClientTasks, getAdminClientTasks } from '../apis/admin'
import { AdminClientTask } from '../../types/Admin'
import Button from '../components/UI/Button/Button'
import AdminClientTaskView from './AdminClientTaskView'
import { useState } from 'react'

function AdminClientTasks() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { clientUsername } = useParams()
  const [currentDate, setCurrentDate] = useState(new Date()) // set current date

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

  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  if (isLoading) {
    return <p>loading...</p>
  }

  if (isError) {
    return <p>something went wrong</p>
  }

  // Date view

  function minusDate() {
    const updatedDate = new Date(currentDate)
    updatedDate.setDate(updatedDate.getDate() - 1)
    setCurrentDate(updatedDate)
  }

  function plusDate() {
    const updatedDate = new Date(currentDate)
    updatedDate.setDate(updatedDate.getDate() + 1)
    setCurrentDate(updatedDate)
  }

  return (
    <>
      <h2>Client: {clientUsername}</h2>
      <div className="flex items-center">
        <Button onClick={minusDate}>-</Button>
        <div className="ml-2 mr-2">
          {currentDate.toLocaleDateString('en-GB')}
        </div>
        <Button onClick={plusDate}>+</Button>
      </div>
      <div>
        {data.map((task) => (
          <AdminClientTaskView
            key={task.id}
            task={task}
            currentDate={currentDate}
          />
        ))}
      </div>
    </>
  )
}

export default AdminClientTasks
