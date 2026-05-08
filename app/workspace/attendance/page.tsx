"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import AttendanceCard from "@/modules/attendance/components/attendance-card";
import AttendanceLog from "@/modules/attendance/components/attendance-log";

export default function AttendancePage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <SectionHeader 
          title="Attendance & Timing" 
          description="Track your daily work hours and review attendance history."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <AttendanceCard />
          <AttendanceLog />
        </div>
      </div>
    </MainLayout>
  );
}
