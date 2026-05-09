"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Activity, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsSection() {
  return (
    <section className="py-24 bg-background relative border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Data that <span className="text-indigo-500">drives decisions.</span>
          </h2>
          <p className="text-lg text-muted-foreground pt-2">
            Real-time analytics across all your operations. Connect project velocity with employee KPIs instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Chart Card 1 */}
           <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 rounded-3xl bg-card border border-border p-8 shadow-sm flex flex-col justify-between group overflow-hidden relative"
           >
              <div className="absolute top-0 right-0 h-64 w-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="flex justify-between items-start mb-8">
                 <div>
                   <h3 className="text-xl font-bold">Revenue vs Productivity</h3>
                   <p className="text-sm text-muted-foreground">Team output correlated to earnings.</p>
                 </div>
                 <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm font-bold">
                    <TrendingUp className="h-4 w-4" /> +24.5%
                 </div>
              </div>

              {/* Mock Chart Area */}
              <div className="h-64 w-full flex items-end gap-2 mt-auto">
                 {[40, 60, 35, 80, 55, 90, 75, 100, 65, 85].map((height, i) => (
                   <div key={i} className="flex-1 flex flex-col justify-end gap-1 group-hover:scale-y-[1.02] origin-bottom transition-transform duration-500 delay-[50ms]">
                      <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.5, type: "spring" }}
                        className={cn(
                          "w-full rounded-t-sm", 
                          i === 7 ? "bg-indigo-500" : "bg-indigo-500/20"
                        )} 
                      />
                   </div>
                 ))}
              </div>
           </motion.div>

           {/* Metrics Column */}
           <div className="space-y-6 flex flex-col">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-card border border-border p-6 shadow-sm flex-1"
              >
                 <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                    <Users className="h-5 w-5" />
                 </div>
                 <h4 className="text-muted-foreground font-medium mb-1">Total Employees</h4>
                 <p className="text-3xl font-black">1,248</p>
                 <p className="text-sm text-amber-500 mt-2 font-medium">+12 this month</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl bg-primary text-white p-6 shadow-xl flex-1 relative overflow-hidden"
              >
                 <div className="absolute -right-4 -top-4 opacity-10">
                   <Activity className="h-32 w-32" />
                 </div>
                 <div className="relative z-10">
                   <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                      <BarChart3 className="h-5 w-5" />
                   </div>
                   <h4 className="text-white/80 font-medium mb-1">Company KPI Score</h4>
                   <p className="text-4xl font-black">94.2<span className="text-2xl text-white/60">/100</span></p>
                   <p className="text-sm mt-4 text-white/80 leading-relaxed font-medium">Top 5% performer in your industry sector.</p>
                 </div>
              </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
}
