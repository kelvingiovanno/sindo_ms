import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";

import LoginPage from "@/features/auth/LoginPage";
import StoreSelectorPage from "@/features/store/StoreSelectorPage";
import DashboardPage from "@/features/dashboard/DashboardPage";

import ProtectedRoute from "./ProtectedRoute";
import CreateInvoicePage from "@/features/invoice/CreateInvoicePage";

const router = createBrowserRouter([
    {
        children: [
            {
                path: 'signin',
                Component: LoginPage,
            },
            {
                path: 'select-store',
                Component: StoreSelectorPage,
            },
        ]
    },
    {
        Component: ProtectedRoute,
        children: [
            {
                Component: MainLayout,
                children: [
                    {
                        index: true,
                        Component: DashboardPage,
                    },
                    {
                        path:'/create-invoice',
                        Component: CreateInvoicePage,
                    },
                ],
            },
            
        ]
    }
])

export default router;