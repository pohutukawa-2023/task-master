import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'

import { addTask } from '../apis/admin'
import { TaskData } from '../../types/Task'
import Button from '../components/UI/Button/Button'
import TextBox from '../components/UI/Textbox/Textbox'
import Select from '../components/UI/Select/Select'
import QRScanner from './QRScanner'
import { useEffect, useState } from 'react'
import Header from '../components/Header'

function AddClientTask() {
  const { clientId } = useParams()
  const [QRCode, setQRCode] = useState('')

  const [showQRScanner, setShowQRScanner] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(clientId)
  })

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
    {
      id: 1,
      name: 'Breathing',
      link: '',
    },
    {
      id: 2,
      name: 'Something else',
      link: '',
    },
    {
      id: 3,
      name: 'Another task',
      link: '',
    },
    {
      id: 4,
      name: 'Balance Training',
      link: '',
    },
    {
      id: 5,
      name: 'Posture Correction Exercises',
      link: '',
    },
    {
      id: 6,
      name: 'Cardiovascular Activity',
      link: '',
    },
    {
      id: 7,
      name: 'Strength Training',
      link: '',
    },
    {
      id: 8,
      name: 'Mindfulness Practice',
      link: '',
    },
    {
      id: 9,
      name: 'Relaxation Techniques',
      link: '',
    },
    {
      id: 10,
      name: 'Core Strengthening Exercises',
      link: '',
    },
    {
      id: 11,
      name: 'Joint Mobility Exercises',
      link: '',
    },
    {
      id: 12,
      name: 'Walking Routine',
      link: '',
    },
    {
      id: 13,
      name: 'Water Therapy',
      link: '',
    },
  ]

  return (
    <div>
      <Header title="Add Task" />
      <form className="grid" onSubmit={handleSubmit}>
        <label htmlFor="clientId">Client</label>
        <div>
          {QRCode || clientId ? (
            <TextBox
              addclasses="mb-2"
              name="clientId"
              value={QRCode || clientId}
              onChange={(e) => setQRCode(e.target.value)}
              required
            />
          ) : (
            <>
              <div className="flex mb-2">
                <TextBox addclasses="" name="clientId" required />
                <Button
                  addclasses="ml-2"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowQRScanner(!showQRScanner)
                  }}
                >
                  {showQRScanner ? 'Close' : 'Scan'}
                </Button>
              </div>
              <div>{showQRScanner && <QRScanner setQRCode={setQRCode} />}</div>
            </>
          )}
        </div>

        <label htmlFor="taskOptionId">Task</label>
        <Select addclasses="mb-2" name="taskOptionId" required>
          {task_options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
        <label htmlFor="date">Date</label>
        <TextBox type="date" addclasses="mb-2" name="date" required />
        <Button addclasses="mt-4">Add</Button>
        <Button addclasses="mt-4" onClick={() => navigate(-1)}>
          Back
        </Button>
      </form>
    </div>
  )
}

export default AddClientTask
