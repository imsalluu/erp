"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import KPIOverview from "@/modules/kpi/components/kpi-overview";
import React from "react";

export default function KPIPage() {
  return (
    <MainLayout allowedRoles={["BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"]}>
      <div className="space-y-8">
        <SectionHeader 
          title="Performance & KPIs" 
          description="Track your career growth and key performance indicators."
        />
        <KPIOverview />
      </div>
    </MainLayout>
  );
}
