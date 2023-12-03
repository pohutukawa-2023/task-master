// TODO: import useAuth0 function

import { useAuth0 } from '@auth0/auth0-react'
import { getClient } from '../apis/client'
import { useQuery } from '@tanstack/react-query'

function useIsAuthenticated() {
  // TODO: call the useAuth0 hook, destructure and return isAuthenticated
  const { isAuthenticated } = useAuth0()
  return isAuthenticated
}

function useIsAdmin() {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()

  const { data: admin } = useQuery({
    queryKey: ['client', user?.sub],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await getClient(accessToken)
        return response
      }
    },
  })
  return admin.is_admin && isAuthenticated
}

interface Props {
  children: React.ReactNode
}
export function IfAuthenticated(props: Props) {
  const { children } = props
  return useIsAuthenticated() ? <>{children}</> : null
}

export function IfNotAuthenticated(props: Props) {
  const { children } = props
  return !useIsAuthenticated() ? <>{children}</> : null
}

export function IfAdmin(props: Props) {
  const { children } = props
  return useIsAdmin() ? <>{children}</> : null
}
