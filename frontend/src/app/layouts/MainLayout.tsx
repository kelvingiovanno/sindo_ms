
import { Sidebar } from "@/shared/components/layout/sidebar";
import { Outlet } from "react-router"

const MainLayout = () => {

    return (
        <div className="flex w-full">
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;