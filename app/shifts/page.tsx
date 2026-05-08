"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import ShiftList from "@/modules/shifts/components/shift-list";
import { Calendar, Users, Settings } from "lucide-react";

export default function ShiftsPage() {
  return (
    <MainLayout>
      <div className="space-y-10 pb-20">
        <SectionHeader 
          title="Shift & Rotation Management" 
          description="Define work hours, assign team shifts, and manage rotational schedules."
        />

        <div className="grid gap-10 lg:grid-cols-4">
           {/* Main Shift List */}
           <div className="lg:col-span-3">
              <ShiftList />
           </div>

           {/* Sidebar: Assignment & Tools */}
           <div className="space-y-8">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                 <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Auto-Assign
                 </h3>
                 <p className="text-xs text-muted-foreground mb-6 leading-relaxed">Automatically distribute shifts based on team availability and skills.</p>
                 <button className="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all uppercase tracking-widest">
                    Run Auto-Shift
                 </button>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Calendar className="h-20 w-20" />
                 </div>
                 <h3 className="font-bold text-lg mb-2">Shift Calendar</h3>
                 <p className="text-sm text-muted-foreground mb-6">Review team rotations for the current month.</p>
                 <div className="aspect-square w-full flex items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/5">
                    <span className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-widest">Shift Calendar Placeholder</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </MainLayout>
  );
}
