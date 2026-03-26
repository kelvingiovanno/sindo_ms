import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

import type { ElementType } from 'react';
import SalesChart from '../components/SalesChart';

type DashboardCardProps = {
    title: string;
    value: string;
    icon: ElementType;
};

export function DashboardCard({
    title,
    value,
    icon: Icon,
}: DashboardCardProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-lg p-5 flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500">{title}</p>
                <p className="text-xl font-semibold text-slate-800">{value}</p>
            </div>

            <div className="p-3 rounded-md bg-slate-100">
                <Icon size={20} className="text-slate-600" />
            </div>
        </div>
    );
}

type InvoiceItemProps = {
    id: string;
    customer: string;
    total: string;
};

export function InvoiceItem({ id, customer, total }: InvoiceItemProps) {
    return (
        <div className="flex justify-between items-center border-b pb-2">
            <div>
                <p className="font-medium text-slate-700">{id}</p>
                <p className="text-xs text-slate-500">{customer}</p>
            </div>

            <span className="font-medium text-slate-700">{total}</span>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <>
            {/* Page Title */}
            <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
                    Dashboard
                </h1>
                <p className="text-sm text-slate-500">
                    Overview of your store performance
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <DashboardCard
                    title="Total Sales"
                    value="$24,560"
                    icon={DollarSign}
                />
                <DashboardCard
                    title="Invoices"
                    value="356"
                    icon={ShoppingCart}
                />
                <DashboardCard title="Customers" value="128" icon={Users} />
                <DashboardCard title="Products" value="542" icon={Package} />
            </div>

            {/* Sales Chart + Recent Invoices */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-5">
                    <h2 className="font-semibold text-slate-700 mb-4">
                        Sales Overview
                    </h2>

                    <div className="h-56 sm:h-64 flex items-center justify-center text-slate-400">
                        <SalesChart />
                    </div>
                </div>

                {/* Recent Invoices */}
                <div className="bg-white border border-slate-200 rounded-lg p-5">
                    <h2 className="font-semibold text-slate-700 mb-4">
                        Recent Invoices
                    </h2>

                    <div className="space-y-3 text-sm">
                        <InvoiceItem
                            id="INV-001"
                            customer="John Doe"
                            total="$120"
                        />
                        <InvoiceItem
                            id="INV-002"
                            customer="Alice"
                            total="$240"
                        />
                        <InvoiceItem
                            id="INV-003"
                            customer="Robert"
                            total="$98"
                        />
                    </div>
                </div>
            </div>

            {/* Low Stock */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm overflow-x-auto">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="font-semibold text-slate-700 text-lg">
                        Low Stock Products
                    </h2>

                    <button className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded-md hover:bg-slate-700">
                        View All
                    </button>
                </div>

                <table className="w-full text-sm min-w-200">
                    <thead className="text-left text-slate-500 border-b">
                        <tr>
                            <th className="pb-3 font-medium">Product</th>
                            <th className="pb-3 font-medium">SKU</th>
                            <th className="pb-3 font-medium">Category</th>
                            <th className="pb-3 font-medium">Price</th>
                            <th className="pb-3 font-medium">Stock</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 font-medium">Last Updated</th>
                            <th className="pb-3 font-medium text-right">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-slate-700">
                        <tr className="border-b hover:bg-slate-50">
                            <td className="py-3 flex items-center gap-3">
                                <img
                                    src="https://via.placeholder.com/40"
                                    className="w-9 h-9 rounded-md border"
                                />
                                Laptop Charger
                            </td>
                            <td>SKU-001</td>
                            <td>Accessories</td>
                            <td>$25.00</td>
                            <td className="text-red-500 font-medium">3</td>
                            <td>
                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                                    Low Stock
                                </span>
                            </td>
                            <td>2 hours ago</td>
                            <td className="text-right">
                                <button className="text-blue-600 hover:underline text-sm">
                                    Restock
                                </button>
                            </td>
                        </tr>

                        <tr className="border-b hover:bg-slate-50">
                            <td className="py-3 flex items-center gap-3">
                                <img
                                    src="https://via.placeholder.com/40"
                                    className="w-9 h-9 rounded-md border"
                                />
                                USB Cable
                            </td>
                            <td>SKU-002</td>
                            <td>Cables</td>
                            <td>$8.00</td>
                            <td className="text-red-500 font-medium">5</td>
                            <td>
                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                                    Low Stock
                                </span>
                            </td>
                            <td>5 hours ago</td>
                            <td className="text-right">
                                <button className="text-blue-600 hover:underline text-sm">
                                    Restock
                                </button>
                            </td>
                        </tr>

                        <tr className="hover:bg-slate-50">
                            <td className="py-3 flex items-center gap-3">
                                <img
                                    src="https://via.placeholder.com/40"
                                    className="w-9 h-9 rounded-md border"
                                />
                                Wireless Mouse
                            </td>
                            <td>SKU-003</td>
                            <td>Accessories</td>
                            <td>$18.00</td>
                            <td className="text-red-500 font-medium">2</td>
                            <td>
                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                                    Critical
                                </span>
                            </td>
                            <td>1 day ago</td>
                            <td className="text-right">
                                <button className="text-blue-600 hover:underline text-sm">
                                    Restock
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
