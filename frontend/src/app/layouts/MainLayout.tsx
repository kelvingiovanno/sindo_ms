
import { Outlet } from "react-router"
import { Sidebar } from "./components/sidebar";

const MainLayout = () => {

    return (
        <div className="flex w-full">
            <Sidebar />
            <main className="bg-slate-100 w-full lg:flex-1 h-screen overflow-y-auto ">
                <div className="max-w-440 mx-auto ">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default MainLayout;