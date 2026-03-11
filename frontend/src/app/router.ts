import { createBrowserRouter } from "react-router";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import LoginPage from "@/features/auth/LoginPage";
import DashboardPage from "@/features/dashboard/DashboardPage";

const router = createBrowserRouter([
    {
        Component: AuthLayout,
        children: [
            {
                path: 'signin',
                Component: LoginPage,
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