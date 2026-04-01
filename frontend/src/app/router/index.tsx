import { createBrowserRouter } from 'react-router';
import ErrorPage from '../pages/ErrorPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import StoreSelectorPage from '@/features/store/pages/StoreSelectorPage';
import NotFoundPage from '../pages/NotFoundPage';
import { AuthGuard, RoleGuard } from './guard';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import InvoicePage from '@/features/invoice/pages/InvoicePage';
import InventoryListPage from '@/features/inventory/pages/inventory-list.page';
import InventoryDetailPage from '@/features/inventory/pages/inventory-detail.page';
import CategoryPage from '@/features/category/pages/category.page';
import InventoryEditPage from '@/features/inventory/pages/inventory-edit.page';

const router = createBrowserRouter([
    {
        ErrorBoundary: ErrorPage,
        children: [
            {
                path: 'signin',
                Component: LoginPage,
            },
            {
                path: 'select-store',
                Component: StoreSelectorPage,
            },
            {
                Component: AuthGuard,
                children: [
                    {
                        element: <RoleGuard roles={['ADMIN']} />,
                        children: [
                            {
                                index: true,
                                Component: DashboardPage,
                            },
                        ],
                    },
                    {
                        path: 'invoices',
                        element: <RoleGuard roles={['ADMIN', 'STAFF']} />,
                        children: [
                            {
                                index: true,
                                Component: InvoicePage,
                            },
                            {
                                path: 'create',
                            },
                        ],
                    },
                    {
                        path: 'inventory',
                        element: <RoleGuard roles={['ADMIN', 'STAFF']} />,
                        children: [
                            {
                                index: true,
                                Component: InventoryListPage,
                            },
                            {
                                path: ':inventoryId',
                                Component: InventoryDetailPage,
                            },
                            {
                                path: ':inventoryId/edit',
                                Component: InventoryEditPage,
                            },
                        ],
                    },
                    {
                        path: 'categories',
                        element: <RoleGuard roles={['ADMIN']} />,
                        children: [
                            {
                                index: true,
                                Component: CategoryPage,
                            },
                        ],
                    },
                ],
            },
            {
                path: '*',
                Component: NotFoundPage,
            },
        ],
    },
]);

export default router;
