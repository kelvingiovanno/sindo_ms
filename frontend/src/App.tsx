import { RouterProvider } from 'react-router'
import router from './router'
import { Toaster } from 'sonner'
import { AuthProvider } from './providers/AuthProvider'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <AuthProvider>
          <RouterProvider router={router}  />
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
