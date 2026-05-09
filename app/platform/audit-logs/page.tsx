"use client";

import React from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { SYSTEM_LOGS } from "@/mock-data/detailed-mock-data";
import { 
  FileText, Search, Filter, 
  CheckCircle2, AlertCircle, Info,
  ShieldCheck, ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AuditLogsPage() {
  return (
    <MainLayout allowedRoles={["SYSTEM_ADMIN"]}>
      <div className="space-y-8 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <SectionHeader 
            title="Platform Audit Logs" 
            description="Comprehensive record of all system events, security alerts, and administrative actions."
            badge="Security & Compliance"
          />
          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input placeholder="Filter by event, user or IP..." className="rounded-xl border border-border bg-card py-2 pl-10 pr-4 text-xs outline-none focus:border-primary transition-all w-64" />
             </div>
             <button className="p-2 rounded-xl border border-border hover:bg-muted transition-all">
                <Filter className="h-4 w-4" />
             </button>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Event Description</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SYSTEM_LOGS.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                       <div className={cn(
                          "h-8 w-8 rounded-xl flex items-center justify-center shadow-sm",
                          log.status === "success" ? "bg-emerald-100 text-emerald-600" :
                          log.status === "warning" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                        )}>
                          {log.status === "success" ? <CheckCircle2 className="h-4 w-4" /> :
                           log.status === "warning" ? <AlertCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <p className="font-bold text-foreground">{log.message}</p>
                       <p className="text-[10px] text-muted-foreground truncate max-w-xs">{log.id} &bull; 192.168.1.1</p>
                    </td>
                    <td className="px-6 py-4">
                       <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-black uppercase tracking-widest border border-border">
                          {log.type}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground font-medium">{log.time}</td>
                    <td className="px-6 py-4 text-right">
                       <button className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted transition-all">
                          <ArrowUpRight className="h-4 w-4" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-border bg-muted/20 flex justify-center">
             <button className="text-xs font-bold text-primary hover:underline">Load More Records</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
