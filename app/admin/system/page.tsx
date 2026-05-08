"use client";

import React from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { 
  ShieldCheck, Activity, Key, 
  Terminal, Server, Globe, 
  Cpu, Database 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SystemHealthPage() {
  return (
    <MainLayout roleRequired="SYSTEM_ADMIN">
      <div className="space-y-10 pb-20">
        <SectionHeader 
          title="System Health & Infrastructure" 
          description="Global platform monitoring, security audit logs, and infrastructure performance metrics."
          badge="Admin Tools"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
           <HealthCard label="API Gateway" status="Operational" icon={Activity} color="emerald" />
           <HealthCard label="Primary DB" status="Operational" icon={Database} color="emerald" />
           <HealthCard label="Compute Nodes" status="94% Load" icon={Cpu} color="amber" />
           <HealthCard label="Auth Service" status="Operational" icon={ShieldCheck} color="emerald" />
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
           <div className="lg:col-span-2 space-y-8">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                       <Terminal className="h-5 w-5 text-primary" />
                       Security Audit Logs
                    </h3>
                    <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Export Full Log</button>
                 </div>
                 <div className="space-y-4">
                    {[
                      { event: "SSO Config Updated", user: "Admin (Root)", time: "2m ago", tenant: "TechStream" },
                      { event: "Bulk Export Triggered", user: "HR Manager", time: "15m ago", tenant: "Global Logi" },
                      { event: "Failed Login Attempt", user: "Unknown (IP: 192.168.1.1)", time: "1h ago", tenant: "Innovative Health" },
                      { event: "API Key Generated", user: "Business Owner", time: "3h ago", tenant: "TechStream" },
                      { event: "User Permission Changed", user: "HR Manager", time: "5h ago", tenant: "Global Logi" },
                    ].map((log, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className={cn(
                              "h-8 w-8 rounded-lg flex items-center justify-center",
                              log.event.includes("Failed") ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
                            )}>
                               <ShieldCheck className="h-4 w-4" />
                            </div>
                            <div>
                               <p className="font-bold text-sm tracking-tight">{log.event}</p>
                               <p className="text-[10px] text-muted-foreground">{log.user} • {log.tenant}</p>
                            </div>
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{log.time}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                 <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <Server className="h-5 w-5 text-amber-500" />
                    Resource Usage
                 </h3>
                 <div className="space-y-6">
                    <UsageProgress label="Cloud Storage" value={78} />
                    <UsageProgress label="Compute Credits" value={45} />
                    <UsageProgress label="Traffic Bandwidth" value={92} />
                 </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                 <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <Key className="h-6 w-6" />
                 </div>
                 <h3 className="font-bold text-xl mb-4">Security Lockdown</h3>
                 <p className="text-xs text-muted-foreground leading-relaxed mb-6">Instantly revoke all active sessions and enable maintenance mode across all tenants.</p>
                 <button className="w-full py-4 rounded-xl bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all">
                    Initiate Global Lock
                 </button>
              </div>
           </div>
        </div>
      </div>
    </MainLayout>
  );
}

function HealthCard({ label, status, icon: Icon, color }: { label: string; status: string; icon: any; color: "emerald" | "amber" }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex items-center gap-4">
       <div className={cn(
         "h-12 w-12 rounded-2xl flex items-center justify-center",
         color === "emerald" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
       )}>
          <Icon className="h-6 w-6" />
       </div>
       <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</p>
          <p className="text-sm font-bold mt-0.5">{status}</p>
       </div>
    </div>
  );
}

function UsageProgress({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
       <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
          <span className="text-muted-foreground">{label}</span>
          <span>{value}%</span>
       </div>
       <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div className={cn(
            "h-full transition-all duration-500",
            value > 90 ? "bg-rose-500" : value > 70 ? "bg-amber-500" : "bg-emerald-500"
          )} style={{ width: `${value}%` }} />
       </div>
    </div>
  );
}
