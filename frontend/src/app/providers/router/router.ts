import { createBrowserRouter } from "react-router";

import { AuthLayout } from "@/app/layouts/AuthLayout";

import LoginPage from "@/features/auth/LoginPage";

const router = createBrowserRouter([
    {
        Component: AuthLayout,
        children: [
            {
                path: 'signin',
                Component: LoginPage
            }
        ]
    }
])

export default router;