import { useAuth } from '@/app/providers/auth';
import { Outlet, useNavigate } from "react-router";

export const MainLayout = () => {
    
    const auth = useAuth();
    const navigate = useNavigate();

    if (!auth) {
        navigate('/auth/signin')    
    }

    return (
        <>
            <p>this is main layout</p>
            <Outlet />
        </>
    )
}
