
import { Toaster } from 'sonner'
import { AuthProvider } from './providers/auth'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import router from './router'

export const Application = () => {

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <AuthProvider>
          <RouterProvider router={router}/>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}
