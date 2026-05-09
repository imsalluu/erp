"use client";

import * as React from "react";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { Search, MoreVertical, Edit2, Trash2, Plus, ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Employee } from "@/types";
import { MOCK_EMPLOYEES } from "@/mock-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddEmployeeForm from "./add-employee-form";

export default function EmployeeTable() {
  const [data, setData] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { user } = useAuthStore();

  const isHRorOwner = user?.role === "BUSINESS_OWNER" || user?.role === "HR";

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "firstName",
      header: "Employee",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
            {row.original.firstName[0]}{row.original.lastName[0]}
          </div>
          <div>
            <div className="font-semibold">{row.original.firstName} {row.original.lastName}</div>
            <div className="text-xs text-muted-foreground">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "designation",
      header: "Designation",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
          row.original.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" :
            row.original.status === "ON_LEAVE" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" :
              "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400"
        )}>
          {row.original.status}
        </div>
      ),
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
    },
    ...(isHRorOwner ? [{
      id: "actions",
      cell: ({ row }: any) => <ActionMenu row={row} onEdit={(emp: Employee) => { setSelectedEmployee(emp); setIsEditModalOpen(true); }} />
    }] : []),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search employees..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full rounded-xl border border-border bg-card py-2 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent transition-all shadow-sm"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>
          {isHRorOwner && (
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-xl font-semibold">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>
                <AddEmployeeForm onSuccess={() => setIsAddModalOpen(false)} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b border-border text-xs uppercase text-muted-foreground font-medium">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-4">
                      {header.isPlaceholder ? null : (
                        <div
                          className={cn(
                            header.column.getCanSort() ? "cursor-pointer select-none" : ""
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-muted/30 transition-colors group">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
          <p className="text-xs text-muted-foreground">
            Showing {table.getRowModel().rows.length} of {data.length} employees
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-lg border border-border bg-card p-1.5 hover:bg-accent disabled:opacity-50 transition-all shadow-xs"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1 mx-2">
              <span className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary">
                {table.getState().pagination.pageIndex + 1}
              </span>
              <span className="text-xs text-muted-foreground">of {table.getPageCount()}</span>
            </div>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-lg border border-border bg-card p-1.5 hover:bg-accent disabled:opacity-50 transition-all shadow-xs"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
         {isFilterModalOpen && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
               <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="bg-card border border-border p-6 rounded-3xl shadow-2xl w-full max-w-sm">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-lg">Filter Data</h3>
                     <button onClick={() => setIsFilterModalOpen(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
                  </div>
                  <div className="space-y-4">
                     <select className="w-full rounded-xl border border-border bg-background p-3 text-sm font-medium">
                        <option>All Departments</option>
                        <option>Engineering</option>
                        <option>Sales</option>
                        <option>Marketing</option>
                     </select>
                     <select className="w-full rounded-xl border border-border bg-background p-3 text-sm font-medium">
                        <option>Status: All</option>
                        <option>Active</option>
                        <option>On Leave</option>
                        <option>Suspended</option>
                     </select>
                     <button onClick={() => setIsFilterModalOpen(false)} className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-4">Apply Filters</button>
                  </div>
               </motion.div>
            </div>
         )}
         
         {isEditModalOpen && selectedEmployee && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
               <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="bg-card border border-border p-6 rounded-3xl shadow-2xl w-full max-w-md">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-lg">Edit {selectedEmployee.firstName}</h3>
                     <button onClick={() => setIsEditModalOpen(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); setIsEditModalOpen(false); }} className="space-y-4">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Department</label>
                        <input defaultValue={selectedEmployee.department} className="w-full rounded-xl border border-border bg-background p-3 text-sm" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Designation</label>
                        <input defaultValue={selectedEmployee.designation} className="w-full rounded-xl border border-border bg-background p-3 text-sm" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Status Update</label>
                        <select defaultValue={selectedEmployee.status} className="w-full rounded-xl border border-border bg-background p-3 text-sm">
                           <option value="ACTIVE">ACTIVE</option>
                           <option value="ON_LEAVE">ON LEAVE</option>
                           <option value="SUSPENDED">SUSPENDED</option>
                        </select>
                     </div>
                     <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-4">Save Changes</button>
                  </form>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}

function ActionMenu({ row, onEdit }: { row: any, onEdit: (emp: Employee) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 hover:bg-muted transition-colors">
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </button>
      {menuOpen && (
        <div className="absolute z-50 right-0 top-full mt-1 w-32 bg-card border border-border rounded-xl shadow-lg overflow-hidden font-medium text-xs">
           <button 
             onClick={() => { onEdit(row.original); setMenuOpen(false); }}
             className="w-full text-left px-3 py-2 hover:bg-muted flex items-center gap-2"
           ><Edit2 className="h-3 w-3" /> Edit</button>
           <button 
             onClick={() => { setMenuOpen(false); }}
             className="w-full text-left px-3 py-2 hover:bg-muted text-amber-500 flex items-center gap-2"
           ><Trash2 className="h-3 w-3" /> Suspend</button>
        </div>
      )}
    </div>
  );
}
