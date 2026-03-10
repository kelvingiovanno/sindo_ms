
import { Toaster } from 'sonner'
import { AuthProvider } from './providers/auth'
import RouterProvider from './providers/router/RouterProvider'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export const Application = () => {

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <AuthProvider>
          <RouterProvider/>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}
