"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import KPIOverview from "@/modules/kpi/components/kpi-overview";
import AdminKpiOverview from "@/modules/kpi/components/admin-kpi-overview";
import { useAuthStore } from "@/store/auth-store";
import React from "react";

export default function KPIPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "BUSINESS_OWNER" || user?.role === "HR";

  return (
    <MainLayout allowedRoles={["BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"]}>
      <div className="space-y-8 pb-20">
        <SectionHeader 
          title={isAdmin ? "Team Performance & KPIs" : "Performance & KPIs"}
          description={isAdmin ? "Monitor organizational productivity, team growth goals, and target fulfillments." : "Track your career growth and key performance indicators."}
          badge={isAdmin ? "Command Center" : undefined}
        />
        {isAdmin ? <AdminKpiOverview /> : <KPIOverview />}
      </div>
    </MainLayout>
  );
}
