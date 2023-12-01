import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routes } from './routes.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById('app') as HTMLElement)

root.render(
  /**
   * Auth0Provider is a component that has a hook that provides
   * all authentication operations
   *
   * TODO: replace the empty strings below with your own domain, clientId, and audience
   */
  <Auth0Provider
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID as string}
    cacheLocation="localstorage"
    authorizationParams={{
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      redirect_uri: `${window.location.origin}/Profile`,
    }}
  >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Auth0Provider>
)
