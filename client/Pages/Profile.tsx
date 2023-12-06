import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getClient, upsertClient } from '../apis/client'
import { User, UserDraft } from '../../types/User'
import Button from '../components/UI/Button/Button'
import AdminNav from '../components/AdminNav'
import BottomNav from '../components/BottomNav'
import TextBox from '../components/UI/Textbox/Textbox'
import Header from '../components/Header'

function Profile() {
  const { user, isAuthenticated, logout, getAccessTokenSilently } = useAuth0()

  const { data, isLoading } = useQuery({
    queryKey: ['client', user?.sub],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await getClient(accessToken)
        return response
      }
    },
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: ({ form, token }: { form: UserDraft | User; token: string }) =>
      upsertClient(token, form),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['client'] })
      // navigate('/my-songs')
    },
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const token = await getAccessTokenSilently()

    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    const username = formData.get('username') as string
    const email = formData.get('email') as string

    const form = { name, username, email }

    updateMutation.mutate({ token, form })
  }

  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  if (isLoading) {
    return <p>loading...</p>
  }

  return (
    <div className="p-6 mb-28">
      <Header title="Profile" />
      <form onSubmit={handleSubmit} className="grid">
        {/* <label htmlFor="auth0Id" className="font-semibold flex justify-center">
          User ID
        </label> */}

        {/* <div id="auth0Id" className=" flex justify-center">
          {user?.sub}
        </div> */}

        {data && (
          <div className="flex justify-center mt-2 min-h-[150px]">
            <img
              className="mix-blend-darken"
              alt={user?.sub}
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user?.sub}`}
            ></img>
          </div>
        )}

        <label
          htmlFor="name"
          className="font-semibold mt-2 ml-4 text-darkPurple"
        >
          Name
        </label>
        <TextBox
          id="name"
          name="name"
          type="text"
          defaultValue={data?.name || user?.name}
        />

        <label
          htmlFor="username"
          className="font-semibold mt-2 ml-4 text-darkPurple"
        >
          Username
        </label>
        <TextBox
          id="username"
          name="username"
          type="text"
          defaultValue={data?.username || user?.nickname}
        />
        <label
          htmlFor="email"
          className="font-semibold mt-2 ml-4 text-darkPurple"
        >
          Email
        </label>
        <TextBox
          id="email"
          name="email"
          defaultValue={data?.email || user?.email}
        />
        <div className="grid text-center mt-6">
          <Button type="submit" disabled={updateMutation.isLoading}>
            {data ? 'Update profile' : 'Create profile'}
          </Button>
        </div>
        <div className="flex mt-4 text-center">
          {updateMutation.isError ? (
            <span>An error occurred: {updateMutation.error.message}</span>
          ) : null}
        </div>
      </form>
      <div className="grid mt-2">
        <Button onClick={logout}>Logout</Button>
      </div>
      {data && data.is_admin === 1 && <AdminNav />}
      {data && data.is_admin === 0 && <BottomNav />}
    </div>
  )
}

export default Profile
