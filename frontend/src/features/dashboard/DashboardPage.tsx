import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";

import type { ElementType } from "react";
import SalesChart from "./components/SalesChart";

type DashboardCardProps = {
  title: string;
  value: string;
  icon: ElementType;
};

export function DashboardCard({ title, value, icon: Icon }: DashboardCardProps) {
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
    <div className="p-4 pt-22 lg:p-6 space-y-6">

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
        <DashboardCard
          title="Customers"
          value="128"
          icon={Users}
        />
        <DashboardCard
          title="Products"
          value="542"
          icon={Package}
        />
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
            <InvoiceItem id="INV-001" customer="John Doe" total="$120" />
            <InvoiceItem id="INV-002" customer="Alice" total="$240" />
            <InvoiceItem id="INV-003" customer="Robert" total="$98" />
          </div>
        </div>

      </div>

      {/* Low Stock */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 overflow-x-auto">
        <h2 className="font-semibold text-slate-700 mb-4">
          Low Stock Products
        </h2>

        <table className="w-full text-sm min-w-100">
          <thead className="text-left text-slate-500">
            <tr>
              <th className="pb-2">Product</th>
              <th className="pb-2">SKU</th>
              <th className="pb-2">Stock</th>
            </tr>
          </thead>

          <tbody className="text-slate-700">
            <tr className="border-t">
              <td className="py-2">Laptop Charger</td>
              <td>SKU-001</td>
              <td className="text-red-500">3 left</td>
            </tr>

            <tr className="border-t">
              <td className="py-2">USB Cable</td>
              <td>SKU-002</td>
              <td className="text-red-500">5 left</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}