"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import AttendanceCard from "@/modules/attendance/components/attendance-card";
import AttendanceLog from "@/modules/attendance/components/attendance-log";
import TeamAttendance from "@/modules/attendance/components/team-attendance";
import { useAuthStore } from "@/store/auth-store";

export default function AttendancePage() {
  const { user } = useAuthStore();
  const showTeamAttendance = user?.role === "HR" || user?.role === "BUSINESS_OWNER" || user?.role === "SUPERVISOR";

  return (
    <MainLayout allowedRoles={["BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"]}>
      <div className="space-y-8 pb-20">
        <SectionHeader 
          title="Attendance & Timing" 
          description="Track your daily work hours and review attendance history."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <AttendanceCard />
          <AttendanceLog />
        </div>

        {showTeamAttendance && (
           <div className="mt-12">
              <TeamAttendance />
           </div>
        )}
      </div>
    </MainLayout>
  );
}
