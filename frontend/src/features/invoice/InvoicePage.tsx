import { useState } from "react";

import { Button, Input } from "@/shared/components/ui";
import { Badge } from "@/shared/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

const invoices = [
  { id: "INV-001", customer: "John Doe", date: "2026-03-17", total: "$120", status: "paid" },
  { id: "INV-002", customer: "Jane Smith", date: "2026-03-16", total: "$240", status: "pending" },
  { id: "INV-003", customer: "Michael Ross", date: "2026-03-15", total: "$90", status: "paid" },
  { id: "INV-004", customer: "Harvey Specter", date: "2026-03-14", total: "$310", status: "paid" },
  { id: "INV-005", customer: "Rachel Zane", date: "2026-03-13", total: "$180", status: "pending" },
  { id: "INV-006", customer: "Louis Litt", date: "2026-03-12", total: "$75", status: "paid" },
  { id: "INV-007", customer: "Mike Ross", date: "2026-03-11", total: "$450", status: "pending" },
  { id: "INV-008", customer: "Donna Paulsen", date: "2026-03-10", total: "$260", status: "paid" },
  { id: "INV-009", customer: "Jessica Pearson", date: "2026-03-09", total: "$510", status: "paid" },
  { id: "INV-010", customer: "Daniel Hardman", date: "2026-03-08", total: "$140", status: "pending" },
  { id: "INV-011", customer: "Scottie", date: "2026-03-07", total: "$330", status: "paid" },
  { id: "INV-012", customer: "Katrina Bennett", date: "2026-03-06", total: "$210", status: "pending" },
];

const statusColor = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
};

const ITEMS_PER_PAGE = 5;

const InvoicePage = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(invoices.length / ITEMS_PER_PAGE);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentInvoices = invoices.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Invoices</h1>
          <p className="text-sm text-slate-500">Manage all invoices</p>
        </div>

        <Button size={"lg"}>Create Invoice</Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <Input placeholder="Search invoice..." className="max-w-sm" />
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.total}</TableCell>
                <TableCell>
                  <Badge className={statusColor[invoice.status as keyof typeof statusColor]}>
                    {invoice.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t">
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;

              return (
                <Button
                  key={pageNumber}
                  variant={page === pageNumber ? "default" : "outline"}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InvoicePage;