"use client";

import { StatCard, SectionHeader } from "../components/dashboard-ui";
import { Users, Building2, ShieldCheck, CreditCard, Activity, Globe } from "lucide-react";
import { MOCK_TENANTS, MOCK_STATS } from "@/mock-data";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <SectionHeader 
        title="System Administration" 
        description="Global overview of tenants, subscriptions, and system health."
        badge="System Admin"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Tenants" value={MOCK_TENANTS.length} change="+2" trend="up" icon={Building2} />
        <StatCard label="Active Subscriptions" value="12" change="+1" trend="up" icon={CreditCard} />
        <StatCard label="System Uptime" value="99.98%" trend="neutral" icon={Activity} />
        <StatCard label="Global Users" value="1,240" change="+15%" trend="up" icon={Globe} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-4">Tenant Growth</h3>
          <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed border-border">
            Chart: Tenant Onboarding Over Time
          </div>
        </div>
        <div className="col-span-3 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-4">Recent System Logs</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <p className="flex-1 text-muted-foreground truncate">New tenant "Acme Corp" registered.</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">2m ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
