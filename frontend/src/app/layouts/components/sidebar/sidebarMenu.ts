import {
  LayoutDashboard,
  Store,
  Package,
  Truck,
  User,
  ReceiptText,
  FileText,
  BarChart3,
} from "lucide-react";
import type { ElementType } from "react";

type SidebarMenuItem = {
  type: "ITEM";
  icon?: ElementType;
  label: string;
  path: string;
};

type SidebarMenuCollapse = {
  type: "COLLAPSE";
  icon: ElementType;
  label: string;
  children: SidebarMenuItem[];
};

type SidebarMenu = SidebarMenuItem | SidebarMenuCollapse;

export const sidebarMenu: SidebarMenu[] = [
  {
    type: "ITEM",
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
  },
  {
    type: "COLLAPSE",
    icon: ReceiptText,
    label: "Sales",
    children: [
      { type: "ITEM", label: "Invoices", path: "/invoice" },
      { type: "ITEM", label: "Payments", path: "/payments" },
      { type: "ITEM", label: "Returns", path: "/returns" },
    ],
  },
  {
    type: "ITEM",
    icon: User,
    label: "Customers",
    path: "/customers",
  },
  {
    type: "COLLAPSE",
    icon: Package,
    label: "Products",
    children: [
      { type: "ITEM", label: "Products", path: "/products" },
      { type: "ITEM", label: "Categories", path: "/product-categories" },
      { type: "ITEM", label: "Brands", path: "/product-brands" },
      { type: "ITEM", label: "Units", path: "/product-units" },
      { type: "ITEM", label: "Measurement Units", path: "/measurement-units" },
    ],
  },
  {
    type: "ITEM",
    icon: Truck,
    label: "Suppliers",
    path: "/suppliers",
  },
  {
    type: "COLLAPSE",
    icon: FileText,
    label: "Statements",
    children: [
      { type: "ITEM", label: "Statements", path: "/statements" },
      { type: "ITEM", label: "Statement Invoices", path: "/statement-invoices" },
    ],
  },
  {
    type: "COLLAPSE",
    icon: Store,
    label: "Administration",
    children: [
      { type: "ITEM", label: "Stores", path: "/stores" },
      { type: "ITEM", label: "Users", path: "/users" },
      { type: "ITEM", label: "User Store Access", path: "/user-stores" },
    ],
  },
  {
    type: "COLLAPSE",
    icon: BarChart3,
    label: "Reports",
    children: [
      { type: "ITEM", label: "Sales Report", path: "/reports/sales" },
      { type: "ITEM", label: "Payments Report", path: "/reports/payments" },
      { type: "ITEM", label: "Product Sales", path: "/reports/products" },
      { type: "ITEM", label: "Customer Statements", path: "/reports/statements" },
    ],
  },
];