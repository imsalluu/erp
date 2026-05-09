import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-6 relative">
      <div className="max-w-3xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        <h1 className="text-5xl font-black tracking-tight">Privacy Policy</h1>
        <div className="prose prose-lg dark:prose-invert text-muted-foreground">
          <p>Last updated: October 2024</p>
          <h2 className="text-foreground">1. Information we collect</h2>
          <p>We strictly collect only the information necessary to provide the WorkSync platform to our clients, including standard SSO PII and role designations.</p>
          <h2 className="text-foreground">2. Tenant Isolation</h2>
          <p>All data belonging to your company is strictly ring-fenced within your own tenant space. We never use tenant operational data (e.g. KPIs or Project details) for cross-tenant model training or marketing.</p>
        </div>
      </div>
    </div>
  );
}
