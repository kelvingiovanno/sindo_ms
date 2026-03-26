import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import SidebarItem from './components/SidebarItem';
import SidebarCollapseItem from './components/SidebarCollapseItem';
import UserProfile from './components/UserProfile';
import { Menu } from 'lucide-react';
import type { UserRole } from '@/shared/types';
import { getSidebarMenu } from './sidebar.config';
import StoreSwitcher from './components/StoreSwitcher';

type SidebarProps = {
    userRole: UserRole;
};

export const Sidebar = ({ userRole }: SidebarProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const location = useLocation();
    const menu = getSidebarMenu(userRole);

    const [openMenu, setOpenMenu] = useState<string | null>(() => {
        const activeCollapse = menu.find(
            (item) =>
                item.type === 'COLLAPSE' &&
                item.children.some((child) => child.path === location.pathname),
        );

        if (activeCollapse) {
            return activeCollapse.label;
        } else {
            return null;
        }
    });

    const toggleMenu = (label: string) => {
        setOpenMenu((prev) => (prev === label ? null : label));
    };

    useEffect(() => {
        if (mobileOpen) {
            document.documentElement.style.overflow = 'hidden';
            return;
        }

        document.documentElement.style.overflow = '';

        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [mobileOpen]);

    return (
        <>
            <button
                className="z-10 cursor-pointer lg:hidden flex items-center justify-between p-3 border-b border-slate-300 bg-white absolute m-4 rounded-sm"
                onClick={() => {
                    setMobileOpen(true);
                }}
            >
                <Menu size={22} />
            </button>

            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 bg-black/30 z-40 lg:hidden h-screen backdrop-blur-xs"
                />
            )}

            <aside
                className={`fixed lg:static top-0 left-0 z-50 w-72 h-screen bg-white border-r border-slate-300 flex flex-col transform transition-transform ease-in-out duration-300 select-none
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                <div className="p-4 border-b border-slate-300 flex items-center gap-3">
                    <img
                        src="/sindoms.svg"
                        alt="logo"
                        className="w-9 h-9 rounded-sm"
                    />
                    <div className="flex flex-col">
                        <h1 className="text-base font-bold tracking-wide text-slate-800">
                            Sindo MS
                        </h1>
                        <p className="text-xs text-slate-500">
                            Management System
                        </p>
                    </div>
                </div>

                <StoreSwitcher />

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <p className="text-xs text-slate-500 mb-2">Menus</p>

                    {menu.map((item) => {
                        if (item.type === 'ITEM') {
                            return (
                                <SidebarItem
                                    key={item.path}
                                    icon={item.icon}
                                    label={item.label}
                                    path={item.path}
                                />
                            );
                        }

                        if (item.type === 'COLLAPSE') {
                            return (
                                <SidebarCollapseItem
                                    key={item.label}
                                    icon={item.icon}
                                    label={item.label}
                                    items={item.children}
                                    isOpen={openMenu === item.label}
                                    onToggle={() => toggleMenu(item.label)}
                                />
                            );
                        }

                        return null;
                    })}
                </nav>

                <UserProfile />
            </aside>
        </>
    );
};
