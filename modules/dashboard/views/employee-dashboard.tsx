"use client";

import { StatCard, SectionHeader } from "../components/dashboard-ui";
import { CheckSquare, Clock, Calendar, Star, Briefcase, Bell } from "lucide-react";

export default function EmployeeDashboard() {
  return (
    <div className="space-y-8">
      <SectionHeader 
        title="My Dashboard" 
        description="View your personal tasks, attendance, and performance metrics."
        badge="Employee"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Tasks Done" value="24" change="+3" trend="up" icon={CheckSquare} />
        <StatCard label="Attendance" value="98%" trend="neutral" icon={Clock} />
        <StatCard label="Performance" value="4.9" trend="up" icon={Star} />
        <StatCard label="Paid Time Off" value="14 Days" icon={Calendar} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-lg mb-6">Upcoming Tasks</h3>
          <div className="space-y-4">
            {[
              { title: "Fix Dashboard Sidebar bug", project: "ERP Frontend", due: "Today", priority: "High" },
              { title: "Implement Auth Flow", project: "ERP Frontend", due: "Tomorrow", priority: "Medium" },
              { title: "Code Review: API Integration", project: "Mobile App", due: "Friday", priority: "Low" },
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border group hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    task.priority === "High" ? "bg-rose-500" : task.priority === "Medium" ? "bg-amber-500" : "bg-slate-400"
                  )} />
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.project} • Due {task.due}</p>
                  </div>
                </div>
                <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                  Complete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-lg mb-4">Announcements</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Company Townhall</p>
                  <p className="text-xs text-muted-foreground">Friday, May 15th at 10:00 AM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckSquare className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">New Health Insurance Plan</p>
                  <p className="text-xs text-muted-foreground">Document updated in the vault.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gradient-to-br from-primary/20 to-indigo-500/20 bg-card p-6 border-primary/20 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Star className="h-12 w-12" />
            </div>
            <h3 className="font-bold text-lg mb-1">Q2 Goals Progress</h3>
            <p className="text-xs text-muted-foreground mb-4">Performance tracking</p>
            <div className="space-y-3">
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[75%]" />
              </div>
              <p className="text-xs font-medium text-right text-primary">75% Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility function duplicated for this file to avoid import issues if not shared correctly
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
