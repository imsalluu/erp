"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-6 relative">
      <div className="max-w-3xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        <h1 className="text-5xl font-black tracking-tight">About WorkSync</h1>
        <div className="prose prose-lg dark:prose-invert">
          <p className="text-xl text-muted-foreground font-medium">Building the operation system for the modern enterprise.</p>
          <p>WorkSync began with a simple observation: mid-market and enterprise companies use entirely too many tools to simply manage their people doing their jobs.</p>
          <p>By unifying Core HR, complex KPI tracking, Project Management, and intricate time-attendance tracking into a single logically separated multi-tenant SaaS application, we save operators literally thousands of hours in reconciliation time.</p>
        </div>
      </div>
    </div>
  );
}
