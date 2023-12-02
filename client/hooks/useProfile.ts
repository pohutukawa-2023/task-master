import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getClient, upsertClient } from '../apis/client'
import { User, UserDraft } from '../../types/User'

function useProfile() {
  const { user, getAccessTokenSilently } = useAuth0()

  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['client'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await getClient(accessToken)
        return response
      }
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ form, token }: { form: UserDraft | User; token: string }) =>
      upsertClient(token, form),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ['client'] })
      // navigate('/my-songs')
    },
  })

  return { data, isLoading, isError, updateMutation }
}

export default useProfile
