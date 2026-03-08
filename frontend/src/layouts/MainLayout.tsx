import useAuth from "@/hooks/useAuth"
import { Outlet, useNavigate } from "react-router";

const MainLayout = () => {
    
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

export default MainLayout;