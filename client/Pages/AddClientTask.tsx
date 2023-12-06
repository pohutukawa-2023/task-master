import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'

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

  const [searchParams, setSearchParams] = useSearchParams()
  const dateParam = searchParams.get('selectedDate')

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTasks', user?.sub] })
      navigate(-1)
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
      name: 'Power Breathing',
      link: '',
    },
    {
      id: 2,
      name: 'Yoga',
      link: '',
    },
    {
      id: 3,
      name: 'Walking',
      link: '',
    },
    {
      id: 4,
      name: 'Box Breathing',
      link: '',
    },
    {
      id: 5,
      name: 'Balance Training',
      link: '',
    },
    {
      id: 6,
      name: 'Posture Correction Exercises',
      link: '',
    },
    {
      id: 7,
      name: 'Cardiovascular Activity',
      link: '',
    },
    {
      id: 8,
      name: 'Strength Training',
      link: '',
    },
    {
      id: 9,
      name: 'Mindfulness Practice',
      link: '',
    },
    {
      id: 10,
      name: 'Relaxation Techniques',
      link: '',
    },
    {
      id: 11,
      name: 'Core Strengthening Exercises',
      link: '',
    },
    {
      id: 12,
      name: 'Joint Mobility Exercises',
      link: '',
    },
    {
      id: 13,
      name: 'Walking Routine',
      link: '',
    },
    {
      id: 14,
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
        <select
          className="bg-lightPurple text-darkNavy h-12 px-4 mb-2 rounded-full focus:shadow-[0px_0px_5px_2px_#C3ACD0]"
          name="taskOptionId"
          required
        >
          {task_options.map((option) => (
            <option className="py-4" key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <label htmlFor="date">Date</label>
        <div className="grid">
          <input
            className="h-12 bg-lightPurple text-darkNavy border rounded-full focus:shadow-[0px_0px_5px_2px_#C3ACD0] border-transparent placeholder-[#B07CF2] focus:outline-none w-full sm:text-sm"
            name="date"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <Button addclasses="mt-4">Add</Button>
        <Button
          addclasses="mt-4"
          onClick={(e) => {
            e.preventDefault()
            navigate(-1)
          }}
        >
          Back
        </Button>
      </form>
    </div>
  )
}

export default AddClientTask
