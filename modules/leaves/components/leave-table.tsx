"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable, 
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { MoreVertical, CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { LeaveRequest } from "@/types";
import { MOCK_LEAVE_REQUESTS } from "@/mock-data";
import { Button } from "@/components/ui/button";

export default function LeaveTable() {
  const { user } = useAuthStore();
  const [data, setData] = useState<LeaveRequest[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  
  useEffect(() => {
    if (user?.role === "PROJECT_MANAGER" || user?.role === "EMPLOYEE") {
      setData(MOCK_LEAVE_REQUESTS.filter(req => req.employeeName === user.name));
    } else {
      setData(MOCK_LEAVE_REQUESTS);
    }
  }, [user]);

  const isApprover = user?.role === "BUSINESS_OWNER" || user?.role === "HR" || user?.role === "SUPERVISOR";

  const columns = [
    {
      accessorKey: "employeeName",
      header: "Employee",
      cell: ({ row }: any) => (
        <div className="font-medium">{row.getValue("employeeName")}</div>
      ),
    },
    {
      accessorKey: "leaveType",
      header: "Type",
      cell: ({ row }: any) => (
        <div className="capitalize font-medium">{row.getValue("leaveType").toLowerCase()}</div>
      ),
    },
    {
      accessorKey: "startDate",
      header: "Duration",
      cell: ({ row }: any) => (
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          {row.original.startDate} to {row.original.endDate}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status") as string;
        return (
          <div className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
            status === "APPROVED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
            status === "REJECTED" ? "bg-rose-50 text-rose-700 border-rose-200" :
            "bg-amber-50 text-amber-700 border-amber-200"
          )}>
            {status === "APPROVED" ? <CheckCircle2 className="h-3 w-3" /> :
             status === "REJECTED" ? <XCircle className="h-3 w-3" /> :
             <Clock className="h-3 w-3" />}
            {status}
          </div>
        );
      },
    },
    ...(isApprover ? [{
      id: "actions",
      cell: ({ row }: any) => (
         <ActionCell 
            req={row.original} 
            onApprove={() => setData(prev => prev.map(i => i.id === row.original.id ? { ...i, status: "APPROVED" } : i))}
            onReject={() => setData(prev => prev.map(i => i.id === row.original.id ? { ...i, status: "REJECTED" } : i))}
         />
      ),
    }] : []),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="rounded-xl border border-border/40 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted/50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-border/40">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-border/10 hover:bg-muted/30 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ActionCell({ req, onApprove, onReject }: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="relative">
      <Button onClick={() => setMenuOpen(!menuOpen)} variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
        <MoreVertical className="h-4 w-4" />
      </Button>
      {menuOpen && (
        <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-border rounded-xl shadow-lg overflow-hidden font-medium text-xs z-50">
          <button onClick={() => { onApprove(); setMenuOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-muted text-emerald-600 flex items-center gap-2">
            <CheckCircle2 className="h-3 w-3" /> Approve
          </button>
          <button onClick={() => { onReject(); setMenuOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-muted text-rose-600 flex items-center gap-2">
            <XCircle className="h-3 w-3" /> Reject
          </button>
        </div>
      )}
    </div>
  );
}
