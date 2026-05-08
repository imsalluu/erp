"use client";

import { StatCard, SectionHeader } from "../components/dashboard-ui";
import { Users, CalendarCheck, PlaneTakeoff, Heart, UserPlus, Clock } from "lucide-react";

export default function HRDashboard() {
  return (
    <div className="space-y-8">
      <SectionHeader 
        title="HR & People Operations" 
        description="Manage employee well-being, attendance, and recruitment."
        badge="HR Admin"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Employees" value="148" change="+2" trend="up" icon={Users} />
        <StatCard label="Attendance Today" value="96%" change="+1.5%" trend="up" icon={CalendarCheck} />
        <StatCard label="Pending Leaves" value="12" change="+3" trend="down" icon={PlaneTakeoff} />
        <StatCard label="Open Positions" value="5" trend="neutral" icon={UserPlus} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-lg mb-6">Attendance Overview (Weekly)</h3>
          <div className="h-[250px] w-full flex items-center justify-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
            Chart: Weekly Attendance Trends
          </div>
        </div>

        <div className="col-span-3 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-lg mb-4">Pending Approvals</h3>
          <div className="space-y-4">
            {[
              { name: "Alex Wilson", type: "Annual Leave", duration: "3 days", date: "Tomorrow" },
              { name: "Emily Davis", type: "Sick Leave", duration: "1 day", date: "Today" },
              { name: "John Doe", type: "Unpaid Leave", duration: "2 days", date: "May 12" },
            ].map((leave, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                <div>
                  <p className="text-sm font-semibold">{leave.name}</p>
                  <p className="text-xs text-muted-foreground">{leave.type} • {leave.duration}</p>
                </div>
                <button className="text-xs font-medium text-primary hover:underline">Review</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
