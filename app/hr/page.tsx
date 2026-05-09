"use client";

import MainLayout from "@/components/layout/main-layout";
import HRManagementView from "@/modules/hr/views/hr-management-view";

export default function HRPage() {
  return (
    <MainLayout allowedRoles={["BUSINESS_OWNER", "HR"]}>
      <HRManagementView />
    </MainLayout>
  );
}
