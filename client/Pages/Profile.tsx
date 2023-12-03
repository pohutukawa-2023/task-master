import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getClient, upsertClient } from '../apis/client'
import { User, UserDraft } from '../../types/User'
import Button from '../components/UI/Button/Button'
import BottomNav from '../components/BottomNav'

function Profile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

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
    <>
      <form onSubmit={handleSubmit} className="grid">
        <label htmlFor="auth0Id" className="font-semibold">
          User ID
        </label>
        <div id="auth0Id" className="mb-2">
          {user?.sub}
        </div>

        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <input
          id="name"
          name="name"
          className="mb-2"
          type="text"
          defaultValue={data?.name || user?.name}
        />

        <label htmlFor="username" className="font-semibold">
          Username:
        </label>
        <input
          id="username"
          name="username"
          className="mb-2"
          type="text"
          defaultValue={data?.username || user?.nickname}
        />
        <label htmlFor="email" className="font-semibold">
          Email:
        </label>
        <input
          id="email"
          name="email"
          className="mb-2"
          defaultValue={data?.email || user?.email}
        />
        <div>
          <Button type="submit" disabled={updateMutation.isLoading}>
            {updateMutation.isLoading ? 'Saving...' : 'Save'}
          </Button>
          {updateMutation.isSuccess && <p>Profile saved</p>}
          {updateMutation.isError ? (
            <div>An error occurred: {updateMutation.error.message}</div>
          ) : null}
        </div>
      </form>
      <BottomNav />
    </>
  )
}

export default Profile
