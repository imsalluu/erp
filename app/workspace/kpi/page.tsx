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
  const isProjectManager = user?.role === "PROJECT_MANAGER";
  
  const canSeeTeamKpi = isAdmin || isProjectManager;
  const canSeePersonalKpi = !isAdmin || isProjectManager; // Admin defaults to only team KPI, but project managers need both. Normal employees see personal.

  return (
    <MainLayout allowedRoles={["BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"]}>
      <div className="space-y-12 pb-20">
        {canSeeTeamKpi && (
          <div className="space-y-8">
            <SectionHeader 
              title="Team Performance & KPIs"
              description="Monitor organizational productivity, team growth goals, and target fulfillments."
              badge={isAdmin ? "Command Center" : "Manager View"}
            />
            <AdminKpiOverview />
          </div>
        )}

        {canSeePersonalKpi && (
          <div className="space-y-8">
            <SectionHeader 
              title={isProjectManager ? "My Performance & KPIs" : "Performance & KPIs"}
              description="Track your career growth and key performance indicators."
            />
            <KPIOverview />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
