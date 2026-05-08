"use client";

import React from "react";
import { CheckCircle2, Circle, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MILESTONES = [
  { id: 1, title: "Initial Research & Scoping", date: "Apr 15, 2026", status: "completed", type: "Discovery" },
  { id: 2, title: "System Architecture Design", date: "May 05, 2026", status: "completed", type: "Development" },
  { id: 3, title: "Cloud Infrastructure Setup", date: "Jun 10, 2026", status: "in-progress", type: "Ops" },
  { id: 4, title: "User Acceptance Testing (UAT)", date: "Jul 25, 2026", status: "pending", type: "QA" },
  { id: 5, title: "Production Go-Live", date: "Aug 15, 2026", status: "pending", type: "Launch" },
];

export default function ProjectTimeline() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between mb-10">
         <h3 className="font-bold text-lg tracking-tight">Delivery Roadmap</h3>
         <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Completed</div>
            <div className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-amber-500" /> In Progress</div>
            <div className="flex items-center gap-1.5"><Circle className="h-3 w-3 " /> Pending</div>
         </div>
      </div>

      <div className="relative space-y-12 after:absolute after:left-[19px] after:top-2 after:bottom-2 after:w-0.5 after:bg-muted after:-z-0">
        {MILESTONES.map((mile, i) => (
          <div key={mile.id} className="relative pl-12 group">
            {/* Dot */}
            <div className={cn(
              "absolute left-0 top-1 h-10 w-10 rounded-full border-4 border-card flex items-center justify-center z-10 transition-all",
              mile.status === "completed" ? "bg-emerald-500 text-white" : 
              mile.status === "in-progress" ? "bg-amber-500 text-white animate-pulse" : "bg-muted text-muted-foreground"
            )}>
              {mile.status === "completed" ? <CheckCircle2 className="h-5 w-5" /> : 
               mile.status === "in-progress" ? <Clock className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
            </div>

            {/* Content Card */}
            <div className="bg-card border border-border p-6 rounded-3xl shadow-sm group-hover:border-primary/40 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{mile.type}</span>
                <h4 className="font-bold text-lg tracking-tight">{mile.title}</h4>
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-primary">
                    <Calendar className="h-3.5 w-3.5" />
                    {mile.date}
                  </span>
                  <span>Team: Platform Ops</span>
                </div>
              </div>
              <button className="flex items-center gap-2 group-hover:translate-x-1 transition-transform text-xs font-black uppercase tracking-widest text-primary">
                View Details
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Calendar(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
  );
}
