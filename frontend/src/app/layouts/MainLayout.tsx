import { useAuth } from '@/app/providers/auth'
import { Outlet, Navigate } from "react-router"

const MainLayout = () => {

    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return <p>auth loading...</p>
    }

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />
    }

    return (
        <>
            <p>this is main layout</p>
            <Outlet />
        </>
    )
}

export default MainLayout;