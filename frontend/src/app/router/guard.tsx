import type { UserRole } from '@/features/user';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../providers/auth/useAuth';
import ForbiddenPage from '../pages/ForbiddenPage';
import StaffLayout from '../layouts/StaffLayout';
import AdminLayout from '../layouts/AdminLayout';

export const AuthGuard = () => {
    const { auth, isLoading } = useAuth();

    if (isLoading) {
        return <p>loading....</p>;
    }

    if (!auth) {
        return <Navigate to={'/signin'} replace />;
    }

    return <Outlet />;
};

export const RoleGuard = ({ roles }: { roles: UserRole[] }) => {
    const { auth } = useAuth();

    if (!auth) {
        return <Navigate to="/signin" replace />;
    }

    if (!roles.includes(auth.role)) {
        return <ForbiddenPage />;
    }

    switch (auth.role) {
        case 'ADMIN':
            return (
                <AdminLayout>
                    <Outlet />
                </AdminLayout>
            );
        case 'STAFF':
            return (
                <StaffLayout>
                    <Outlet />
                </StaffLayout>
            );
        case 'VIEWER':
            return (
                <AdminLayout>
                    <Outlet />
                </AdminLayout>
            );
        default:
            return <ForbiddenPage />;
    }
};
