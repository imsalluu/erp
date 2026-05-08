"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp, Award, Target, MessageSquare } from "lucide-react";
import { KPI } from "@/types";
import { cn } from "@/lib/utils";

export default function KPIOverview() {
  const kpis = [
    { label: "Technical Proficiency", score: 92, target: 85, icon: Target },
    { label: "Communication", score: 88, target: 80, icon: MessageSquare },
    { label: "Reliability", score: 95, target: 90, icon: Star },
    { label: "Problem Solving", score: 85, target: 80, icon: TrendingUp },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Overall Performance
        </h3>
        <div className="space-y-6">
          {kpis.map((kpi, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <kpi.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{kpi.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{kpi.score}%</span>
                  <span className="text-xs text-muted-foreground">Target: {kpi.target}%</span>
                </div>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${kpi.score}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className={cn(
                    "h-full rounded-full",
                    kpi.score >= kpi.target ? "bg-emerald-500" : "bg-primary"
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="relative h-40 w-40 flex items-center justify-center">
          <svg className="h-full w-full rotate-[-90deg]">
            <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-muted/20" />
            <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-primary" strokeDasharray={440} strokeDashoffset={440 * (1 - 0.9)} strokeLinecap="round" />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-black tracking-tighter text-primary">4.9</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Score</span>
          </div>
        </div>
        <h4 className="mt-6 font-bold text-lg">Top Performance Tier</h4>
        <p className="text-sm text-muted-foreground mt-1 max-w-[200px]">
          You are in the top 5% of your department this quarter.
        </p>
      </div>
    </div>
  );
}
