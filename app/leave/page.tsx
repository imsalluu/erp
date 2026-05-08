"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import LeaveBalance from "@/modules/leave/components/leave-balance";
import LeaveApplicationForm from "@/modules/leave/components/leave-application-form";
import { Calendar, History, ClipboardList } from "lucide-react";

export default function LeaveManagementPage() {
  return (
    <MainLayout>
      <div className="space-y-10 pb-20">
        <SectionHeader 
          title="Leave & Absence Hub" 
          description="Request time off, track your leave balances, and review approval status."
        />

        <div className="grid gap-10 lg:grid-cols-3">
           <div className="lg:col-span-2 space-y-10">
              <div>
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  Your Leave Balances
                </h3>
                <LeaveBalance />
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Apply for Leave
                </h3>
                <LeaveApplicationForm />
              </div>
           </div>

           <div className="space-y-10">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                 <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <History className="h-5 w-5 text-primary" />
                    Leave History
                 </h3>
                 <div className="space-y-4">
                    {[
                      { type: "Sick Leave", status: "Approved", date: "May 02 - May 03", color: "text-emerald-500" },
                      { type: "Casual Leave", status: "Rejected", date: "Apr 15 - Apr 16", color: "text-rose-500" },
                      { type: "Annual Leave", status: "Approved", date: "Mar 10 - Mar 15", color: "text-emerald-500" },
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-xl border border-border hover:border-primary/40 transition-all cursor-pointer bg-muted/20">
                         <div className="flex justify-between items-start mb-2">
                            <p className="text-sm font-bold">{item.type}</p>
                            <span className={cn("text-[10px] font-black uppercase tracking-widest", item.color)}>{item.status}</span>
                         </div>
                         <p className="text-[11px] font-medium text-muted-foreground">{item.date}</p>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-6 py-3 rounded-xl border border-border text-xs font-bold hover:bg-muted transition-all uppercase tracking-widest">
                    View Full History
                 </button>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Calendar className="h-20 w-20" />
                 </div>
                 <h3 className="font-bold text-lg mb-2">Leave Calendar</h3>
                 <p className="text-sm text-muted-foreground mb-6">See who's out from your team this month.</p>
                 <div className="aspect-square w-full flex items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/5">
                    <span className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-widest">Team Calendar Placeholder</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </MainLayout>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
