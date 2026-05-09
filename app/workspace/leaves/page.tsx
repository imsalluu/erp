"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import LeaveBalance from "@/modules/leaves/components/leave-balance";
import LeaveTable from "@/modules/leaves/components/leave-table";
import ApplyLeaveForm from "@/modules/leaves/components/apply-leave-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LeavesPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const { user } = useAuthStore();
  
  // The business owner does not book leaves, but monitors HR leaves or company leaves
  const isOwner = user?.role === "BUSINESS_OWNER";

  return (
    <MainLayout allowedRoles={["BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"]}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <SectionHeader 
            title="Leave Management" 
            description={isOwner ? "Review and approve company-wide leave applications." : "Manage your leave applications and view balances."}
          />
          {!isOwner && (
            <Dialog open={isApplyModalOpen} onOpenChange={setIsApplyModalOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-xl font-semibold">
                  <Plus className="h-4 w-4 mr-2" />
                  Apply Leave
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Apply for Leave</DialogTitle>
                </DialogHeader>
                <ApplyLeaveForm onSuccess={() => setIsApplyModalOpen(false)} />
              </DialogContent>
            </Dialog>
          )}
        </div>

        {!isOwner && <LeaveBalance />}
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight">Recent Leave Requests</h3>
          <LeaveTable />
        </div>
      </div>
    </MainLayout>
  );
}
