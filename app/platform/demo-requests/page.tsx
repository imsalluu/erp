"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { 
  Building2, Search, Filter, 
  CheckCircle2, Clock, Info,
  Mail, ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DemoRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/demo")
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          setRequests(res.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout allowedRoles={["SYSTEM_ADMIN"]}>
      <div className="space-y-8 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <SectionHeader 
            title="Demo Requests" 
            description="Manage incoming product demonstration inquiries from potential clients."
            badge="Leads Management"
          />
          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input placeholder="Filter by name, company..." className="rounded-xl border border-border bg-card py-2 pl-10 pr-4 text-xs outline-none focus:border-primary transition-all w-64" />
             </div>
             <button className="p-2 rounded-xl border border-border hover:bg-muted transition-all">
                <Filter className="h-4 w-4" />
             </button>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Client Contact</th>
                  <th className="px-6 py-4">Inquiry</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground font-semibold">
                      Loading demo requests...
                    </td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground font-semibold">
                      No demo requests yet.
                    </td>
                  </tr>
                ) : (
                  requests.map((r) => (
                    <tr key={r.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="px-6 py-4">
                         <div className={cn(
                            "h-8 w-8 rounded-xl flex items-center justify-center shadow-sm",
                            r.status === "contacted" ? "bg-emerald-100 text-emerald-600" :
                            r.status === "closed" ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-muted-foreground" : 
                            "bg-amber-100 text-amber-600" // Formatted for pending
                          )}>
                            {r.status === "contacted" ? <CheckCircle2 className="h-4 w-4" /> :
                             r.status === "closed" ? <Info className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <p className="font-bold text-foreground flex items-center gap-1">
                           <Building2 className="h-3 w-3 text-muted-foreground" /> {r.company}
                         </p>
                         <p className="text-[10px] text-muted-foreground mt-0.5">
                           {r.name} &bull; <a href={`mailto:${r.email}`} className="hover:underline">{r.email}</a>
                         </p>
                      </td>
                      <td className="px-6 py-4">
                         <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-black uppercase tracking-widest border border-border inline-block mb-1">
                            {r.message ? "Message Included" : "Direct Demo"}
                         </span>
                         <p className="text-xs text-muted-foreground truncate max-w-[200px]" title={r.message}>
                            {r.message || "No additional context provided"}
                         </p>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-medium">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted transition-all">
                            <ArrowUpRight className="h-4 w-4" />
                         </button>
                      </td>
                    </tr>
                  ))
                )}
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
