
import { Sidebar } from "@/shared/components/layout/sidebar";
import { Outlet } from "react-router"

const MainLayout = () => {

    return (
        <div className="flex w-full">
            <Sidebar />
            <main className="bg-slate-100 w-full lg:flex-1 min-h-screen">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;