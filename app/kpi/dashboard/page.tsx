"use client";

import React from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader, StatCard } from "@/modules/dashboard/components/dashboard-ui";
import PerformanceScoreChart from "@/modules/kpi/components/performance-score-chart";
import { EMPLOYEE_KPI_RECORDS, REALISTIC_EMPLOYEES } from "@/mock-data/detailed-mock-data";
import { TrendingUp, Award, Target, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function KPIDashboardPage() {
  const kpiData = EMPLOYEE_KPI_RECORDS[0].scores;

  return (
    <MainLayout>
      <div className="space-y-10 pb-20">
        <SectionHeader 
          title="Performance & KPI Command Center" 
          description="Monitor organizational productivity, track growth goals, and manage employee performance reviews."
          badge="High Performance"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
           <StatCard label="Avg. KPI Score" value="88.4" trend="up" change="+2.1" icon={Award} />
           <StatCard label="Task Velocity" value="94%" icon={Zap} />
           <StatCard label="Goals Reached" value="12/15" icon={Target} />
           <StatCard label="Team Morale" value="High" icon={TrendingUp} />
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
           <div className="lg:col-span-2 space-y-8">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold tracking-tight">Performance Distribution</h3>
                    <button className="text-xs font-black uppercase tracking-widest text-primary hover:underline">View Historical Data</button>
                 </div>
                 <PerformanceScoreChart data={kpiData} />
              </div>

              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                 <h3 className="text-xl font-bold mb-8">Top Performers</h3>
                 <div className="space-y-6">
                    {REALISTIC_EMPLOYEES.slice(0, 4).map((emp, i) => (
                      <div key={i} className="flex items-center justify-between group">
                         <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">
                               {emp.firstName[0]}
                            </div>
                            <div>
                               <p className="font-bold text-sm">{emp.firstName} {emp.lastName}</p>
                               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{emp.designation}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="text-right">
                               <p className="text-sm font-black text-primary">9{8-i}.2</p>
                               <div className="h-1 w-16 bg-muted rounded-full mt-1 overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: `9${8-i}%` }} />
                               </div>
                            </div>
                            <button className="p-2 rounded-xl bg-muted group-hover:bg-primary group-hover:text-white transition-all">
                               <ChevronRight className="h-4 w-4" />
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                 <h3 className="font-bold text-lg mb-6">Upcoming Reviews</h3>
                 <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="relative pl-6 border-l-2 border-primary/20">
                         <div className="absolute left-[-5px] top-0 h-2 w-2 rounded-full bg-primary" />
                         <p className="text-xs font-bold leading-none">May {i * 5 + 10}, 2026</p>
                         <p className="text-sm font-bold mt-2">Quarterly Review</p>
                         <p className="text-[10px] text-muted-foreground mt-1">Employee: {REALISTIC_EMPLOYEES[i + 5].firstName}</p>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-8 py-3 rounded-xl border border-border text-xs font-bold hover:bg-muted transition-all">
                    Schedule All Reviews
                 </button>
              </div>

              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm text-center">
                 <div className="mx-auto h-16 w-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                    <Target className="h-8 w-8" />
                 </div>
                 <h3 className="font-bold text-xl mb-2">Goal Tracking</h3>
                 <p className="text-xs text-muted-foreground leading-relaxed mb-6">You have 4 active company objectives this quarter. Current completion: 65%.</p>
                 <button className="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all uppercase tracking-widest">
                    Manage Objectives
                 </button>
              </div>
           </div>
        </div>
      </div>
    </MainLayout>
  );
}
