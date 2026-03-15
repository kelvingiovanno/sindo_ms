import { useAuth } from "@/app/providers/auth";
import { useNavigate } from "react-router";

const DashboardPage = () => {
    
    const { logout } = useAuth();
    const navigate = useNavigate();

    async function onLogoutButtonAction() {
        await logout();
        navigate('/signin');
    }
    
    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={onLogoutButtonAction}>
                logout
            </button>
        </>
    );
};

export default DashboardPage;