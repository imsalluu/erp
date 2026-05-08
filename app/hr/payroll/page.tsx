"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader, StatCard } from "@/modules/dashboard/components/dashboard-ui";
import { Landmark, CreditCard, Receipt, FileCheck, Search, Filter, ArrowUpRight } from "lucide-react";
import { REALISTIC_EMPLOYEES } from "@/mock-data/detailed-mock-data";
import { cn } from "@/lib/utils";

export default function PayrollPage() {
  const totalPayroll = REALISTIC_EMPLOYEES.reduce((acc, emp) => acc + emp.salary, 0);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <SectionHeader 
            title="Payroll & Compensation" 
            description="Monitor monthly disbursements, tax compliance, and benefits."
          />
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-muted transition-all">
                <FileCheck className="h-4 w-4" />
                Run Compliance
             </button>
             <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                <CreditCard className="h-4 w-4" />
                Process Payroll
             </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Monthly" value={`$${(totalPayroll / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}`} change="+2.4%" trend="up" icon={Landmark} />
          <StatCard label="Employees Paid" value="124" trend="up" icon={FileCheck} />
          <StatCard label="Tax Liabilities" value="$12,450" icon={Receipt} />
          <StatCard label="Benefits Cost" value="$8,200" icon={ArrowUpRight} />
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="font-bold text-lg">Disbursement History</h3>
            <div className="relative w-full max-w-sm">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <input placeholder="Search transactions..." className="w-full rounded-xl border border-border bg-card py-2 pl-10 pr-4 text-xs outline-none focus:border-primary transition-all" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {REALISTIC_EMPLOYEES.map((emp, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-bold">{emp.firstName} {emp.lastName}</td>
                    <td className="px-6 py-4 text-muted-foreground">Monthly Salary</td>
                    <td className="px-6 py-4 font-mono font-bold">${(emp.salary / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                    <td className="px-6 py-4">
                       <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase">
                          Paid
                       </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">May 01, 2026</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
