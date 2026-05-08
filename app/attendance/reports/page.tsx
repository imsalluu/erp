"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { Download, FileSpreadsheet, FileText, Search, Filter, Printer } from "lucide-react";
import { REALISTIC_EMPLOYEES } from "@/mock-data/detailed-mock-data";
import { cn } from "@/lib/utils";

export default function AttendanceReportsPage() {
  return (
    <MainLayout>
      <div className="space-y-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <SectionHeader 
            title="Attendance Reports" 
            description="Generate and export detailed attendance and work-hour records."
          />
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-muted transition-all">
                <Printer className="h-4 w-4" />
                Print
             </button>
             <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                <Download className="h-4 w-4" />
                Export CSV
             </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
           <ReportFilter label="Date Range" value="May 01 - May 31" />
           <ReportFilter label="Department" value="Engineering" />
           <ReportFilter label="Status" value="All States" />
           <ReportFilter label="Employee" value="All Employees" />
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
           <div className="p-6 border-b border-border bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-bold text-lg">Report Preview</h3>
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input placeholder="Quick search..." className="rounded-xl border border-border bg-card py-2 pl-10 pr-4 text-xs outline-none focus:border-primary transition-all" />
                 </div>
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                 <thead className="bg-muted/50 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border">
                    <tr>
                       <th className="px-6 py-4">Employee</th>
                       <th className="px-6 py-4">Total Days</th>
                       <th className="px-6 py-4">Present</th>
                       <th className="px-6 py-4">Late</th>
                       <th className="px-6 py-4">Absent</th>
                       <th className="px-6 py-4">Total Hours</th>
                       <th className="px-6 py-4 font-black">Efficiency</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border text-xs">
                    {REALISTIC_EMPLOYEES.map((emp, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-bold">{emp.firstName} {emp.lastName}</td>
                        <td className="px-6 py-4">22</td>
                        <td className="px-6 py-4">20</td>
                        <td className="px-6 py-4 text-amber-600 font-bold">2</td>
                        <td className="px-6 py-4 text-rose-500 font-bold">0</td>
                        <td className="px-6 py-4 font-mono font-bold">176.5h</td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                              <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                                 <div className="h-full bg-primary" style={{ width: "95%" }} />
                              </div>
                              <span className="font-black text-primary">95%</span>
                           </div>
                        </td>
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

function ReportFilter({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-all cursor-pointer group">
       <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{label}</p>
       <p className="text-sm font-bold mt-1">{value}</p>
    </div>
  );
}
