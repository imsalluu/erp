"use client";

import { motion } from "framer-motion";
import { REALISTIC_EMPLOYEES } from "@/mock-data/detailed-mock-data";
import { Award, Target, MessageSquare, TrendingUp, Star, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminKpiOverview() {
  // Generate mock KPI stats per employee to simulate their target fulfillment
  const generateEmployeeKpi = (seed: number) => {
    return [
      { label: "Technical Proficiency", score: Math.min(100, 75 + (seed * 5) % 25), target: 85 },
      { label: "Communication", score: Math.min(100, 80 + (seed * 7) % 20), target: 80 },
      { label: "Reliability", score: Math.min(100, 85 + (seed * 3) % 15), target: 90 },
      { label: "Problem Solving", score: Math.min(100, 70 + (seed * 9) % 30), target: 80 },
    ];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
            <h3 className="text-lg font-bold">Team Performance Overview</h3>
            <p className="text-sm text-muted-foreground mt-1">Track departmental KPI goals and individual target fulfillment.</p>
         </div>
         <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-muted transition-all">
            <Filter className="h-4 w-4" />
            Filter Teams
         </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {REALISTIC_EMPLOYEES.map((employee, idx) => {
          const kpis = generateEmployeeKpi(idx + 1);
          const totalScore = Math.round(kpis.reduce((acc, curr) => acc + curr.score, 0) / kpis.length);
          const targetsMet = kpis.filter(k => k.score >= k.target).length;

          return (
            <motion.div 
              key={employee.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <span className="font-bold text-sm group-hover:text-primary transition-colors">
                    {employee.firstName} {employee.lastName}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                    {employee.designation}
                  </span>
                </div>
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {employee.firstName[0]}{employee.lastName[0]}
                </div>
              </div>

              <div className="flex items-center justify-between bg-muted/40 p-3 rounded-xl mb-6 border border-border">
                <div className="text-center">
                  <span className="block text-2xl font-black text-primary">{totalScore}</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Avg Score</span>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <span className="block text-2xl font-black text-foreground">{targetsMet}/4</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Targets Met</span>
                </div>
              </div>

              <div className="space-y-4">
                {kpis.map((kpi, kIdx) => (
                  <div key={kIdx} className="space-y-1.5">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-semibold">{kpi.label}</span>
                      <span className="text-[10px] font-bold text-muted-foreground">
                         <span className={kpi.score >= kpi.target ? "text-emerald-500" : ""}>{kpi.score}</span> / {kpi.target}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${kpi.score}%` }}
                        transition={{ duration: 1, delay: 0.2 + (kIdx * 0.1) }}
                        className={cn(
                          "h-full rounded-full",
                          kpi.score >= kpi.target ? "bg-emerald-500" : "bg-primary"
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-2.5 rounded-xl border-2 border-dashed border-border/50 text-xs font-bold text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all">
                Full Performance Review
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
