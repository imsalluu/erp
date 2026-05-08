"use client";

import { motion } from "framer-motion";
import { LEAVE_BALANCES } from "@/mock-data/detailed-mock-data";
import { cn } from "@/lib/utils";

export default function LeaveBalance() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {LEAVE_BALANCES.map((item, i) => (
        <motion.div
          key={item.type}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
             <div className={cn("h-2 w-2 rounded-full", item.color)} />
             <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Available</span>
          </div>
          <h4 className="text-sm font-bold text-muted-foreground">{item.type}</h4>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tighter">{item.remaining}</span>
            <span className="text-xs font-medium text-muted-foreground">/ {item.total} Days</span>
          </div>
          
          <div className="mt-6 space-y-2">
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${(item.used / item.total) * 100}%` }}
                 className={cn("h-full", item.color)}
               />
            </div>
            <p className="text-[10px] font-bold text-muted-foreground">{item.used} days used so far</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
