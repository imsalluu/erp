"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import EmployeeTable from "@/modules/employees/components/employee-table";

export default function EmployeesPage() {
  return (
    <MainLayout allowedRoles={["BUSINESS_OWNER", "HR"]}>
      <div className="space-y-8">
        <SectionHeader 
          title="Employee Management" 
          description="View and manage all employees across the organization."
        />
        <EmployeeTable />
      </div>
    </MainLayout>
  );
}
