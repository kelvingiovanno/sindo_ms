import { Sidebar } from '@/shared/components/layout/Sidebar';
import type { ReactNode } from 'react';

const StaffLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex w-full">
            <Sidebar userRole={'STAFF'} />
            <main className="bg-slate-100 w-full lg:flex-1 h-screen overflow-y-auto">
                <div className="relative max-w-440 mx-auto p-4 pt-22 lg:p-6 space-y-4">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default StaffLayout;
