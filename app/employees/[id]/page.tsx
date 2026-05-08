"use client";

import { use } from "react";
import MainLayout from "@/components/layout/main-layout";
import EmployeeDetailsView from "@/modules/employees/views/employee-details-view";
import { REALISTIC_EMPLOYEES } from "@/mock-data/detailed-mock-data";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmployeeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const employee = REALISTIC_EMPLOYEES.find(e => e.id === id) || REALISTIC_EMPLOYEES[0];

  return (
    <MainLayout>
      <div className="space-y-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-4 group"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to list
        </button>
        <EmployeeDetailsView employee={employee} />
      </div>
    </MainLayout>
  );
}
