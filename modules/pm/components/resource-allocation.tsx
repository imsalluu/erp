"use client";

import React from "react";
import { Users, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const TEAM_LOAD = [
  { name: "Mike Johnson", role: "DevOps", load: 85, status: "High" },
  { name: "Sarah Smith", role: "UI/UX", load: 40, status: "Normal" },
  { name: "Emma Wilson", role: "Frontend", load: 95, status: "Overloaded" },
  { name: "Kevin Lee", role: "Backend", load: 60, status: "Normal" },
];

export default function ResourceAllocation() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h3 className="font-bold text-lg tracking-tight">Team Workload Hub</h3>
         <button className="text-xs font-black uppercase tracking-widest text-primary hover:underline">Rebalance Workload</button>
      </div>

      <div className="space-y-4">
        {TEAM_LOAD.map((member, i) => (
          <div key={i} className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:border-primary/40 transition-all group">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">
                      {member.name[0]}
                   </div>
                   <div>
                      <p className="font-bold text-sm tracking-tight">{member.name}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{member.role}</p>
                   </div>
                </div>
                <StatusBadge status={member.status} />
             </div>

             <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                   <span className="text-muted-foreground">Allocation</span>
                   <span className={cn(
                     member.load > 90 ? "text-rose-500" : member.load > 70 ? "text-amber-500" : "text-emerald-500"
                   )}>{member.load}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                   <div 
                    className={cn(
                      "h-full transition-all duration-500",
                      member.load > 90 ? "bg-rose-500" : member.load > 70 ? "bg-amber-500" : "bg-emerald-500"
                    )} 
                    style={{ width: `${member.load}%` }} 
                   />
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    "Overloaded": "bg-rose-500/10 text-rose-500 border-rose-500/20",
    "High": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "Normal": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };

  return (
    <span className={cn(
      "px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border",
      styles[status as keyof typeof styles]
    )}>
      {status}
    </span>
  );
}
