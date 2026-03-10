import { useAuth } from '@/app/providers/auth';
import { Outlet, useNavigate } from "react-router";

export const MainLayout = () => {
    
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    if(isLoading) (<p>auth loading..</p>);

    if (!isAuthenticated) navigate('/auth/signin');

    return (
        <>
            <p>this is main layout</p>
            <Outlet />
        </>
    )
}
