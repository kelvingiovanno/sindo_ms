import { LayoutDashboard, ReceiptText } from "lucide-react";

export const sidebarMenu = [
  {
    type: "item",
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
  },
  {
    type: "collapse",
    icon: ReceiptText,
    label: "Sales",
    children: [
      { label: "Create Invoice", path: "/create-invoice" },
      { label: "Invoice List", path: "/invoices" },
      { label: "Payments", path: "/payments" },
      { label: "Returns", path: "/returns" },
    ],
  },
];