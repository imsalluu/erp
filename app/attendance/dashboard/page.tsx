"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader, StatCard } from "@/modules/dashboard/components/dashboard-ui";
import AdvancedClockIn from "@/modules/attendance/components/advanced-clock-in";
import AttendanceAnalytics from "@/modules/attendance/components/attendance-analytics";
import AttendanceLog from "@/modules/attendance/components/attendance-log";
import { Clock, AlertCircle, TrendingUp, Calendar } from "lucide-react";

export default function AttendanceDashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-10 pb-20">
        <SectionHeader 
          title="Attendance Command Center" 
          description="Monitor punctuality, track work hours, and manage daily check-ins."
        />

        <div className="grid gap-8 lg:grid-cols-5">
           {/* Left Column: Stats & Analytics */}
           <div className="lg:col-span-3 space-y-8">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 <StatCard label="Present Today" value="94%" trend="up" icon={Clock} />
                 <StatCard label="Avg. Punctuality" value="09:05 AM" icon={TrendingUp} />
                 <StatCard label="Late Marks" value="3" change="+1" trend="down" icon={AlertCircle} />
              </div>
              <AttendanceAnalytics />
              <AttendanceLog />
           </div>

           {/* Right Column: Clock-in & Monthly View */}
           <div className="lg:col-span-2 space-y-8">
              <AdvancedClockIn />
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                 <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Monthly Attendance
                 </h3>
                 <div className="aspect-square w-full flex items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/5">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Calendar Placeholder</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </MainLayout>
  );
}
