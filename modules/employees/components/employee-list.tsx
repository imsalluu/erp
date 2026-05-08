"use client";

import { useState } from "react";
import { LayoutGrid, List, Search, Filter, Plus } from "lucide-react";
import { EmployeeCard } from "./employee-card";
import EmployeeTable from "./employee-table";
import { REALISTIC_EMPLOYEES } from "@/mock-data/detailed-mock-data";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function EmployeeList() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const filteredEmployees = REALISTIC_EMPLOYEES.filter(emp => 
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card/30 p-2 rounded-2xl border border-border/50">
        <div className="flex items-center gap-4 px-2">
          <div className="flex items-center gap-1 rounded-xl border border-border p-1 bg-card shadow-sm">
            <button 
              onClick={() => setView("grid")}
              className={cn("p-2 rounded-lg transition-all", view === "grid" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-muted")}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setView("list")}
              className={cn("p-2 rounded-lg transition-all", view === "list" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-muted")}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
          <div className="h-8 w-px bg-border mx-2" />
          <p className="text-sm font-bold text-muted-foreground">
            {filteredEmployees.length} <span className="font-medium opacity-70 italic">Employees Found</span>
          </p>
        </div>

        <div className="flex flex-1 items-center gap-4 max-w-xl pr-2">
          <div className="relative group flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              placeholder="Search by name, department, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-2.5 pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <Plus className="h-5 w-5" />
            <span className="hidden sm:inline">Add Employee</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredEmployees.map((emp) => (
              <EmployeeCard key={emp.id} employee={emp} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <EmployeeTable />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
