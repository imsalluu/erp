"use client";

import { StatCard, SectionHeader } from "../components/dashboard-ui";
import { FolderKanban, CheckSquare, Clock, Users, BarChart3, AlertCircle } from "lucide-react";

export default function PMDashboard() {
  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Project Management" 
        description="Oversee project timelines, budgets, and team performance."
        badge="Project Manager"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Projects" value="4" change="+1" trend="up" icon={FolderKanban} />
        <StatCard label="Team Members" value="12" icon={Users} />
        <StatCard label="Overdue Tasks" value="3" change="+2" trend="down" icon={AlertCircle} />
        <StatCard label="Budget Util." value="72%" trend="up" icon={BarChart3} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-lg mb-6">Active Project Timelines</h3>
          <div className="space-y-6">
            {[
              { name: "ERP Frontend", progress: 85, status: "On Track" },
              { name: "Mobile App", progress: 42, status: "Delayed" },
              { name: "API Revamp", progress: 60, status: "On Track" },
            ].map((proj, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{proj.name}</span>
                  <span className={proj.status === "Delayed" ? "text-rose-500" : "text-emerald-500"}>{proj.status}</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full">
                  <div className={cn("h-full rounded-full transition-all duration-500", proj.status === "Delayed" ? "bg-rose-500" : "bg-primary")} style={{ width: `${proj.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3 rounded-xl border border-border bg-card p-6 flex flex-col items-center justify-center text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground/20 mb-4" />
            <h4 className="font-semibold">Resource Allocation</h4>
            <p className="text-sm text-muted-foreground">Detailed chart of developer hours vs capacity.</p>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
