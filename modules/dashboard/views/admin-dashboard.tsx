"use client";

import { StatCard, SectionHeader } from "../components/dashboard-ui";
import { 
  Users, Building2, CreditCard, Activity, Globe, 
  ArrowUpRight, AlertCircle, CheckCircle2, Info,
  ShieldCheck
} from "lucide-react";
import { 
  TENANT_GROWTH_DATA, 
  SYSTEM_LOGS, 
  PLATFORM_STATS,
  TENANTS 
} from "@/mock-data/detailed-mock-data";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from "recharts";
import { cn } from "@/lib/utils";
import React from "react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-10">
      <SectionHeader 
        title="System Administration" 
        description="Global overview of tenants, subscriptions, and system health."
        badge="Live Metrics"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          label="Total Tenants" 
          value={TENANTS.length} 
          change="+2" 
          trend="up" 
          icon={Building2} 
        />
        <StatCard 
          label="Active Subscriptions" 
          value="12" 
          change="+1" 
          trend="up" 
          icon={CreditCard} 
        />
        <StatCard 
          label="System Uptime" 
          value="99.98%" 
          trend="neutral" 
          icon={Activity} 
        />
        <StatCard 
          label="Global Users" 
          value={PLATFORM_STATS.totalUsers.toLocaleString()} 
          change={PLATFORM_STATS.revenueGrowth} 
          trend="up" 
          icon={Globe} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-lg">Tenant Growth</h3>
              <p className="text-xs text-muted-foreground">Historical onboarding and revenue performance.</p>
            </div>
            <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              View Detailed Report <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TENANT_GROWTH_DATA}>
                <defs>
                  <linearGradient id="colorTenants" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="tenants" 
                  stroke="var(--primary)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorTenants)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-3 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Recent System Logs</h3>
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          
          <div className="space-y-4">
            {SYSTEM_LOGS.map((log) => (
              <div key={log.id} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-muted/50 transition-all group">
                <div className={cn(
                  "mt-0.5 h-8 w-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                  log.status === "success" ? "bg-emerald-100 text-emerald-600" :
                  log.status === "warning" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                )}>
                  {log.status === "success" ? <CheckCircle2 className="h-4 w-4" /> :
                   log.status === "warning" ? <AlertCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-bold leading-none">{log.message}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">{log.type} &bull; {log.time}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-muted transition-all">
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2.5 rounded-xl border border-dashed border-border text-xs font-bold text-muted-foreground hover:bg-muted transition-all">
            Browse All Audit Logs
          </button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Productivity Insights</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TENANT_GROWTH_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '12px' }} />
                <Bar dataKey="revenue" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-4 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">AI System Guard</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-[280px]">Autonomous monitoring is active. No security anomalies detected in the last 24 hours.</p>
          </div>
          <button className="rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-all">
            Run Security Audit
          </button>
        </div>
      </div>
    </div>
  );
}
