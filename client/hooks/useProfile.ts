import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { getClient } from '../apis/client'

function useProfile() {
  const { user, getAccessTokenSilently } = useAuth0()

  // const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['client'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      const response = await getClient(accessToken)
      return response
    },
  })
  return { user, data, isLoading }
}

export default useProfile
