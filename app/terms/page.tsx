import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-6 relative">
      <div className="max-w-3xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        <h1 className="text-5xl font-black tracking-tight">Terms of Service</h1>
        <div className="prose prose-lg dark:prose-invert text-muted-foreground">
          <p>Last updated: October 2024</p>
          <h2 className="text-foreground">1. Acceptance of Terms</h2>
          <p>By accessing or using the WorkSync platform ("Service"), you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>
          <h2 className="text-foreground">2. Subscription and Billing</h2>
          <p>You will be billed in advance on a recurring monthly or annual basis, depending on the type of subscription plan you select. Non-payment will immediately restrict your Tenant access without deleting your internal configurations.</p>
          <h2 className="text-foreground">3. Uptime Guarantees</h2>
          <p>Enterprise plans carry a strictly defined 99.99% uptime SLA documented in your onboarding master services agreement. Professional and Starter plans are operated on a commercially reasonable effort foundation.</p>
        </div>
      </div>
    </div>
  );
}
