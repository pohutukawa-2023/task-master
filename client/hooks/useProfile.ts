import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { getClient } from '../apis/client'

function useProfile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await getClient(accessToken)
        return response
      }
    },
  })
  return { user, isAuthenticated, data, isLoading }
}

export default useProfile
