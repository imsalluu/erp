"use client";

import { motion } from "framer-motion";
import { Clock, Calendar, Plus, Users, Settings2, Trash2, Edit2 } from "lucide-react";
import { SHIFTS } from "@/mock-data/detailed-mock-data";
import { cn } from "@/lib/utils";

export default function ShiftList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h3 className="font-bold text-lg tracking-tight">Active Shifts</h3>
         <button className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all">
            <Plus className="h-4 w-4" />
            Create New Shift
         </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SHIFTS.map((shift, i) => (
          <motion.div
            key={shift.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between">
               <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <Clock className="h-5 w-5" />
               </div>
               <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-all"><Edit2 className="h-3.5 w-3.5" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-muted text-rose-500 transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
               </div>
            </div>

            <div className="mt-4">
               <h4 className="font-bold text-base tracking-tight">{shift.name}</h4>
               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">{shift.days}</p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
               <div className="space-y-1">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase">Timing</p>
                  <p className="text-xs font-bold">{shift.start} - {shift.end}</p>
               </div>
               <div className="text-right space-y-1">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase">Break</p>
                  <p className="text-xs font-bold">{shift.break}</p>
               </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
               <div className="flex -space-x-2">
                 {[1,2,3].map(j => (
                    <div key={j} className="h-7 w-7 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold">
                       {j}
                    </div>
                 ))}
                 <div className="h-7 w-7 rounded-full border-2 border-card bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                    +12
                 </div>
               </div>
               <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary hover:gap-2 transition-all">
                  Assign Shift
                  <Settings2 className="h-3.5 w-3.5" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
