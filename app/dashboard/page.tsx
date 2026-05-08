"use client";

import MainLayout from "@/components/layout/main-layout";
import { useAuthStore } from "@/store/auth-store";
import AdminDashboard from "@/modules/dashboard/views/admin-dashboard";
import OwnerDashboard from "@/modules/dashboard/views/owner-dashboard";
import HRDashboard from "@/modules/dashboard/views/hr-dashboard";
import PMDashboard from "@/modules/dashboard/views/pm-dashboard";
import SupervisorDashboard from "@/modules/dashboard/views/supervisor-dashboard";
import EmployeeDashboard from "@/modules/dashboard/views/employee-dashboard";
import React from "react";

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case "SYSTEM_ADMIN":
        return <AdminDashboard />;
      case "BUSINESS_OWNER":
        return <OwnerDashboard />;
      case "HR":
        return <HRDashboard />;
      case "PROJECT_MANAGER":
        return <PMDashboard />;
      case "SUPERVISOR":
        return <SupervisorDashboard />;
      case "EMPLOYEE":
        return <EmployeeDashboard />;
      default:
        return <div>Unauthorized</div>;
    }
  };

  return <MainLayout>{renderDashboard()}</MainLayout>;
}
