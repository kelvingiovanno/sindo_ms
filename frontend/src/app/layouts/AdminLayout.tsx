import { Sidebar } from '@/shared/components/layout/Sidebar';
import type { ReactNode } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex min-h-screen w-full bg-slate-100">
            <Sidebar userRole="ADMIN" />

            <main className="flex-1 overflow-y-auto h-screen">
                <div className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8 lg:py-8 space-y-4">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
