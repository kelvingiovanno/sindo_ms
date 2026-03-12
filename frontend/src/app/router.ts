import { createBrowserRouter } from "react-router";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import LoginPage from "@/features/auth/LoginPage";
import StoreSelectorPage from "@/features/store/StoreSelectorPage";
import DashboardPage from "@/features/dashboard/DashboardPage";

const router = createBrowserRouter([
    {
        Component: AuthLayout,
        children: [
            {
                path: 'signin',
                Component: StoreSelectorPage,
            }
        ]
    },
    {
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: DashboardPage,
            }
        ]
    }
])

export default router;