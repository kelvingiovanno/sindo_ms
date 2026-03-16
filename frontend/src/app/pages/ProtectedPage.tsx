import { useAuth } from '@/app/providers/auth'
import { Outlet, Navigate } from "react-router"

const ProtectedPage = () => {

    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return <p>auth loading...</p>
    }

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default ProtectedPage;