"use client";

import { StatCard, SectionHeader } from "../components/dashboard-ui";
import { Users, Clock, CalendarCheck, AlertTriangle, FileText, Download, CheckCircle, XCircle } from "lucide-react";

export default function SupervisorDashboard() {
  return (
    <div className="space-y-8 pb-20">
      <SectionHeader 
        title="Team Supervision" 
        description="Monitor team attendance, shifts, and daily performance."
        badge="Supervisor"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Team Members" value="8" icon={Users} />
        <StatCard label="Present Today" value="7" change="-1" trend="down" icon={CalendarCheck} />
        <StatCard label="Avg. Shift Hours" value="8.5h" icon={Clock} />
        <StatCard label="Issues Flagged" value="1" change="+1" trend="down" icon={AlertTriangle} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-lg mb-6">Daily Shift Schedule</h3>
          <div className="space-y-3">
            {[
              { name: "Alex Wilson", shift: "09:00 - 18:00", status: "On-time" },
              { name: "Emily Davis", shift: "08:00 - 17:00", status: "Late (15m)" },
              { name: "John Doe", shift: "10:00 - 19:00", status: "On-time" },
              { name: "Sarah Smith", shift: "09:00 - 18:00", status: "On-time" },
            ].map((emp, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{emp.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">{emp.shift}</span>
                  <span className={cn("text-xs font-medium", emp.status.includes("Late") ? "text-rose-500" : "text-emerald-500")}>
                    {emp.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-3 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-lg mb-4">Task Completion Rate</h3>
          <div className="flex flex-col items-center justify-center h-full pb-8">
            <div className="relative h-32 w-32 flex items-center justify-center">
              <svg className="h-full w-full rotate-[-90deg]">
                <circle cx="64" cy="64" r="60" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
                <circle cx="64" cy="64" r="60" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-primary" strokeDasharray={377} strokeDashoffset={377 * (1 - 0.88)} strokeLinecap="round" />
              </svg>
              <span className="absolute text-2xl font-bold tracking-tight text-foreground">88%</span>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Team overall efficiency</p>
          </div>
        </div>
      </div>

      {/* New Row: Recent Leave Requests & Team Reports */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Leave Requests */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Recent Leave Requests</h3>
          <div className="space-y-4">
            {[
              { name: "John Doe", type: "Sick Leave", date: "May 10 - May 11", status: "Pending" },
              { name: "Sarah Smith", type: "Annual Leave", date: "May 15 - May 20", status: "Pending" },
              { name: "Alex Wilson", type: "Casual Leave", date: "May 12", status: "Pending" },
            ].map((leave, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {leave.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{leave.name}</p>
                    <p className="text-xs font-semibold text-muted-foreground mt-0.5">{leave.type} • {leave.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="h-8 w-8 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors">
                    <CheckCircle className="h-4 w-4" />
                  </button>
                  <button className="h-8 w-8 rounded-full flex items-center justify-center bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors">
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 rounded-xl border-2 border-dashed border-border/50 text-xs font-bold text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all">
            View All Requests
          </button>
        </div>

        {/* Team Reports */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Team Reports</h3>
          <div className="space-y-4">
            {[
              { title: "Weekly Productivity Report", date: "Generated May 08, 2026", size: "2.4 MB" },
              { title: "Monthly Attendance Summary", date: "Generated May 01, 2026", size: "1.8 MB" },
              { title: "Shift Overtime Analysis", date: "Generated Apr 30, 2026", size: "3.1 MB" },
            ].map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer group bg-card">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{report.title}</h4>
                    <span className="text-xs font-semibold text-muted-foreground mt-0.5 block">{report.date} • {report.size}</span>
                  </div>
                </div>
                <button className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:brightness-110 transition-all shadow-sm">
            Generate New Report
          </button>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
