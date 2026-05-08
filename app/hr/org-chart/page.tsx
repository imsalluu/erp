"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { REALISTIC_EMPLOYEES } from "@/mock-data/detailed-mock-data";
import { ChevronDown, Share2, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

export default function OrgChartPage() {
  const CEO = { name: "Sarah Smith", designation: "CEO & Founder", dept: "Executive" };
  const Managers = REALISTIC_EMPLOYEES.filter(e => e.role === "PROJECT_MANAGER" || e.role === "HR");
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <SectionHeader 
            title="Organization Chart" 
            description="Explore the hierarchy and team structures across the entire organization."
          />
          <div className="flex items-center gap-2 rounded-xl border border-border p-1 bg-card shadow-sm">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors"><ZoomIn className="h-4 w-4" /></button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors"><ZoomOut className="h-4 w-4" /></button>
            <div className="w-px h-4 bg-border mx-1" />
            <button className="p-2 hover:bg-muted rounded-lg transition-colors"><Maximize2 className="h-4 w-4" /></button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg transition-all hover:bg-primary/90 ml-2">
               <Share2 className="h-3 w-3" />
               Share
            </button>
          </div>
        </div>

        <div className="relative min-h-[600px] w-full rounded-3xl border-2 border-dashed border-border flex items-center justify-center overflow-auto bg-muted/5 p-20">
          <div className="flex flex-col items-center gap-16">
            {/* Level 1: CEO */}
            <OrgNode name={CEO.name} designation={CEO.designation} isRoot />

            <div className="relative flex gap-24">
               {/* Connections */}
               <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-4/5 h-16 border-x-2 border-t-2 border-border/50 rounded-t-2xl" />
               
               {/* Level 2: Managers */}
               {Managers.slice(0, 3).map((mgr, i) => (
                 <div key={i} className="flex flex-col items-center gap-12">
                    <OrgNode name={`${mgr.firstName} ${mgr.lastName}`} designation={mgr.designation} />
                    
                    {/* Level 3: Employees under each manager */}
                    <div className="flex gap-8">
                      {REALISTIC_EMPLOYEES.filter(e => e.department === mgr.department && e.id !== mgr.id).slice(0, 2).map((emp, j) => (
                        <OrgNode key={j} name={`${emp.firstName} ${emp.lastName}`} designation={emp.designation} isChild />
                      ))}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function OrgNode({ name, designation, isRoot, isChild }: { name: string; designation: string; isRoot?: boolean; isChild?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.05 }}
      className={cn(
        "relative flex flex-col items-center gap-3 p-5 rounded-2xl border bg-card shadow-sm transition-all min-w-[180px]",
        isRoot ? "border-primary shadow-lg shadow-primary/10 ring-4 ring-primary/5" : "border-border hover:border-primary/40",
        isChild ? "scale-90 opacity-80" : ""
      )}
    >
      <div className={cn(
        "h-12 w-12 rounded-full flex items-center justify-center font-bold text-white shadow-md",
        isRoot ? "bg-primary" : "bg-slate-400"
      )}>
        {name[0]}
      </div>
      <div className="text-center">
        <h4 className="text-xs font-black tracking-tight">{name}</h4>
        <p className="text-[10px] font-medium text-muted-foreground mt-0.5 uppercase tracking-wider">{designation}</p>
      </div>
      {!isChild && <ChevronDown className="h-3 w-3 text-muted-foreground mt-1" />}
    </motion.div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
