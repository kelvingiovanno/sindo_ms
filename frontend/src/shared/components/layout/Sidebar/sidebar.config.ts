import type { UserRole } from '@/shared/types';
import type { SidebarMenu } from './types/SidebarMenu';
import {
    LayoutDashboard,
    ReceiptText,
    User,
    Package,
    Truck,
    FileText,
    Store,
    BarChart3,
} from 'lucide-react';

const adminSidebarMenu: SidebarMenu[] = [
    {
        type: 'ITEM',
        icon: LayoutDashboard,
        label: 'Dashboard',
        path: '/',
    },
    {
        type: 'COLLAPSE',
        icon: ReceiptText,
        label: 'Sales',
        children: [
            { type: 'ITEM', label: 'Invoices', path: '/invoice' },
            { type: 'ITEM', label: 'Payments', path: '/payments' },
            { type: 'ITEM', label: 'Returns', path: '/returns' },
        ],
    },
    {
        type: 'ITEM',
        icon: User,
        label: 'Customers',
        path: '/customers',
    },
    {
        type: 'COLLAPSE',
        icon: Package,
        label: 'Inventory',
        children: [
            { type: 'ITEM', label: 'inventory', path: '/inventory' },
            {
                type: 'ITEM',
                label: 'Categories',
                path: '/inventory-categories',
            },
            { type: 'ITEM', label: 'Brands', path: '/inventory-brands' },
            { type: 'ITEM', label: 'Units', path: '/inventory-units' },
            {
                type: 'ITEM',
                label: 'Measurement Units',
                path: '/measurement-units',
            },
        ],
    },
    {
        type: 'ITEM',
        icon: Truck,
        label: 'Suppliers',
        path: '/suppliers',
    },
    {
        type: 'COLLAPSE',
        icon: FileText,
        label: 'Statements',
        children: [
            { type: 'ITEM', label: 'Statements', path: '/statements' },
            {
                type: 'ITEM',
                label: 'Statement Invoices',
                path: '/statement-invoices',
            },
        ],
    },
    {
        type: 'COLLAPSE',
        icon: Store,
        label: 'Administration',
        children: [
            { type: 'ITEM', label: 'Stores', path: '/stores' },
            { type: 'ITEM', label: 'Users', path: '/users' },
            { type: 'ITEM', label: 'User Store Access', path: '/user-stores' },
        ],
    },
    {
        type: 'COLLAPSE',
        icon: BarChart3,
        label: 'Reports',
        children: [
            { type: 'ITEM', label: 'Sales Report', path: '/reports/sales' },
            {
                type: 'ITEM',
                label: 'Payments Report',
                path: '/reports/payments',
            },
            { type: 'ITEM', label: 'Product Sales', path: '/reports/products' },
            {
                type: 'ITEM',
                label: 'Customer Statements',
                path: '/reports/statements',
            },
        ],
    },
];

export const staffSidebarMenu: SidebarMenu[] = [
    {
        type: 'ITEM',
        label: 'Create Invoice',
        path: '/invoice/create',
    },
    {
        type: 'ITEM',
        label: 'Invoices',
        path: '/invoice',
    },
    {
        type: 'ITEM',
        label: 'Inventory',
        path: '/inventory',
    },
];

export const getSidebarMenu = (userRole: UserRole) => {
    switch (userRole) {
        case 'STAFF':
            return staffSidebarMenu;
        case 'ADMIN':
            return adminSidebarMenu;
        default:
            throw new Error('Invalid user role');
    }
};
