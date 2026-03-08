import { createBrowserRouter } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./pages/SignIn";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
    {
        Component: AuthLayout,
        children: [
            {
                path: 'signin',
                Component: SignIn
            }
        ],
    },
    {
        Component: MainLayout,
    }
])

export default router;