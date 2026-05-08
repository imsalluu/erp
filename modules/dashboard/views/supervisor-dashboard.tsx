"use client";

import { StatCard, SectionHeader } from "../components/dashboard-ui";
import { Users, Clock, CalendarCheck, AlertTriangle } from "lucide-react";

export default function SupervisorDashboard() {
  return (
    <div className="space-y-8">
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
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
