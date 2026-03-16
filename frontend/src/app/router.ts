import { createBrowserRouter } from "react-router";

import MainLayout from "./layouts/MainLayout";

import LoginPage from "@/features/auth/LoginPage";
import StoreSelectorPage from "@/features/store/StoreSelectorPage";
import DashboardPage from "@/features/dashboard/DashboardPage";
import InvoicePage from "@/features/invoice/InvoicePage";

import ProtectedPage from "./pages/ProtectedPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    ErrorBoundary: ErrorPage,
    children: [
      {
        path: "signin",
        Component: LoginPage,
      },
      {
        path: "select-store",
        Component: StoreSelectorPage,
      },
      {
        Component: ProtectedPage,
        children: [
          {
            Component: MainLayout,
            children: [
              {
                index: true,
                Component: DashboardPage,
              },
              {
                path: "/invoice",
                Component: InvoicePage,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);

export default router;