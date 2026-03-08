import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="w-full h-screen sm:bg-slate-200 flex justify-center items-center">
            <Outlet />
        </div>
    )
}

export default AuthLayout;