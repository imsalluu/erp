"use client";

import { StatCard, SectionHeader } from "../components/dashboard-ui";
import { Users, Briefcase, TrendingUp, DollarSign, Clock, CheckCircle2 } from "lucide-react";

export default function OwnerDashboard() {
  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Business Overview" 
        description="Monitor your company's performance, human resources, and project status."
        badge="Business Owner"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue (MTD)" value="$128,450" change="+8.2%" trend="up" icon={DollarSign} />
        <StatCard label="Total Employees" value="148" change="+4" trend="up" icon={Users} />
        <StatCard label="Active Projects" value="14" change="+2" trend="up" icon={Briefcase} />
        <StatCard label="Overall Progress" value="82%" change="+5%" trend="up" icon={TrendingUp} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">Project Progress Distribution</h3>
            <span className="text-sm text-muted-foreground">Current Quarter</span>
          </div>
          <div className="h-[300px] w-full flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border gap-2">
            <TrendingUp className="h-8 w-8 opacity-20" />
            <span>Interactive Project Progress Chart</span>
          </div>
        </div>

        <div className="col-span-3 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-lg mb-6">Key Business Metrics</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Employee Utilization</span>
                <span className="font-semibold">94%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[94%]" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Budget vs Actual</span>
                <span className="font-semibold">88%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[88%]" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Client Satisfaction</span>
                <span className="font-semibold">4.8/5.0</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[96%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
