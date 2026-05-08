"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { Check, X, Eye, Search, Filter, MessageSquare } from "lucide-react";
import { REALISTIC_EMPLOYEES } from "@/mock-data/detailed-mock-data";
import { cn } from "@/lib/utils";

export default function LeaveApprovalsPage() {
  const pendingLeaves = [
    { id: "L1", employee: REALISTIC_EMPLOYEES[0], type: "Annual Leave", dates: "May 15 - May 20", days: 5, reason: "Family vacation", status: "PENDING_SUPERVISOR" },
    { id: "L2", employee: REALISTIC_EMPLOYEES[1], type: "Sick Leave", dates: "May 10 - May 11", days: 2, reason: "Fever and flu", status: "PENDING_SUPERVISOR" },
    { id: "L3", employee: REALISTIC_EMPLOYEES[2], type: "Casual Leave", dates: "May 12 - May 12", days: 1, reason: "Personal errand", status: "PENDING_HR" },
  ];

  return (
    <MainLayout>
      <div className="space-y-10 pb-20">
        <SectionHeader 
          title="Leave Approval Queue" 
          description="Review and process leave applications from across the organization."
        />

        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <button className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20">All Requests</button>
                <button className="px-4 py-2 rounded-xl border border-border text-xs font-bold hover:bg-muted font-medium">Pending Only</button>
             </div>
             <div className="flex items-center gap-3">
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   <input placeholder="Search employees..." className="rounded-xl border border-border bg-card py-2 pl-10 pr-4 text-xs outline-none focus:border-primary transition-all w-64" />
                </div>
                <button className="p-2 rounded-xl border border-border hover:bg-muted transition-all">
                   <Filter className="h-4 w-4" />
                </button>
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="bg-muted/50 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border">
                  <tr>
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4">Reason</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border">
                  {pendingLeaves.map((leave) => (
                    <tr key={leave.id} className="hover:bg-muted/30 transition-colors group">
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                                {leave.employee.firstName[0]}{leave.employee.lastName[0]}
                             </div>
                             <div>
                                <p className="font-bold">{leave.employee.firstName} {leave.employee.lastName}</p>
                                <p className="text-[10px] text-muted-foreground">{leave.employee.department}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4 font-medium">{leave.type}</td>
                       <td className="px-6 py-4">
                          <p className="font-bold">{leave.dates}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-black">{leave.days} Days</p>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                             <MessageSquare className="h-3.5 w-3.5" />
                             <span className="truncate max-w-[150px]">{leave.reason}</span>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                            leave.status === "PENDING_SUPERVISOR" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                          )}>
                             {leave.status.replace("_", " ")}
                          </span>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                                <Check className="h-4 w-4" />
                             </button>
                             <button className="p-2 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                <X className="h-4 w-4" />
                             </button>
                             <button className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-white transition-all shadow-sm">
                                <Eye className="h-4 w-4" />
                             </button>
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
