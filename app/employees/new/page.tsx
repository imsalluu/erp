"use client";

import MainLayout from "@/components/layout/main-layout";
import OnboardingWizard from "@/modules/employees/components/onboarding-wizard";

export default function NewEmployeePage() {
  return (
    <MainLayout>
      <OnboardingWizard />
    </MainLayout>
  );
}
