"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { FileText, Download, Shield, ExternalLink, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function PoliciesPage() {
  const categories = [
    { name: "Code of Conduct", count: 3 },
    { name: "Benefits & Perks", count: 5 },
    { name: "Work Environment", count: 4 },
    { name: "Security & Privacy", count: 6 },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <SectionHeader 
          title="Company Policies" 
          description="Access official documentation, handbooks, and guidelines."
        />

        <div className="grid gap-6 md:grid-cols-4">
           {categories.map((cat, i) => (
             <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/50 transition-all cursor-pointer group">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                   <Shield className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-bold text-sm">{cat.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{cat.count} Documents</p>
             </div>
           ))}
        </div>

        <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
           <div className="p-6 border-b border-border bg-muted/20 flex items-center justify-between">
              <h3 className="font-bold">Recent Updates</h3>
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                 <input placeholder="Search policies..." className="rounded-lg border border-border bg-card py-1.5 pl-9 pr-4 text-xs outline-none focus:border-primary" />
              </div>
           </div>
           <div className="divide-y divide-border">
              {[
                { name: "Remote Work Policy 2026", date: "Apr 20, 2026", size: "1.2 MB" },
                { name: "Global Anti-Discrimination Policy", date: "Mar 15, 2026", size: "850 KB" },
                { name: "Employee Handbook v4.2", date: "Jan 10, 2026", size: "12.4 MB" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                   <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-bold">{doc.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black">{doc.date}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-muted-foreground">{doc.size}</span>
                      <button className="p-2 rounded-lg hover:bg-muted text-primary transition-all">
                         <Download className="h-4 w-4" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </MainLayout>
  );
}
