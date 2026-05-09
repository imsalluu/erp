"use client";

import React from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { PRICING_PLANS, BILLING_HISTORY } from "@/mock-data/detailed-mock-data";
import { Check, CreditCard, Calendar, Download, Zap, Shield, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SubscriptionPage() {
   const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

   return (
      <MainLayout allowedRoles={["SYSTEM_ADMIN"]}>
         <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <SectionHeader
                  title="Subscription & Billing"
                  description="Manage your enterprise plan, view billing history, and configure payment methods."
                  badge="Billing Admin"
               />
               <div className="flex items-center gap-1 bg-muted p-1 rounded-xl border border-border">
                  <button
                     onClick={() => setBillingCycle("monthly")}
                     className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", billingCycle === "monthly" ? "bg-white shadow-sm text-primary" : "text-muted-foreground")}
                  >
                     Monthly
                  </button>
                  <button
                     onClick={() => setBillingCycle("yearly")}
                     className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", billingCycle === "yearly" ? "bg-white shadow-sm text-primary" : "text-muted-foreground")}
                  >
                     Yearly <span className="text-[10px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded ml-1">-20%</span>
                  </button>
               </div>
            </div>

            <div className="grid gap-20 md:grid-cols-2 lg:grid-cols-3">
               {PRICING_PLANS.map((plan) => (
                  <div key={plan.name} className={cn(
                     "relative flex flex-col rounded-3xl border p-8 bg-card transition-all hover:shadow-xl hover:-translate-y-1",
                     plan.name === "Professional" ? "border-primary ring-4 ring-primary/5 shadow-lg shadow-primary/10" : "border-border shadow-sm"
                  )}>
                     {plan.name === "Professional" && (
                        <div className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                           Recommended
                        </div>
                     )}
                     <div className="mb-8">
                        <h3 className="text-xl font-black">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                     </div>
                     <div className="mb-8 flex items-baseline gap-1">
                        <span className="text-4xl font-black">${billingCycle === "monthly" ? plan.price : Math.floor(plan.price * 10 * 0.8)}</span>
                        <span className="text-sm text-muted-foreground">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                     </div>
                     <div className="flex-1 space-y-4 mb-8">
                        {plan.features.map((feature) => (
                           <div key={feature} className="flex items-start gap-3">
                              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm font-medium">{feature}</span>
                           </div>
                        ))}
                     </div>
                     <Button className={cn("w-full rounded-xl py-6 font-bold text-sm", plan.name === "Professional" ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground hover:bg-slate-800 hover:text-white")}>
                        {plan.name === "Starter" ? "Current Plan" : `Upgrade to ${plan.name}`}
                     </Button>
                  </div>
               ))}
            </div>

            <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
               <div className="p-6 border-b border-border bg-muted/20 flex items-center justify-between">
                  <h3 className="font-bold text-lg">Billing History</h3>
                  <button className="text-xs font-bold text-primary hover:underline">View All Invoices</button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-muted/50 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border">
                        <tr>
                           <th className="px-6 py-4">Invoice ID</th>
                           <th className="px-6 py-4">Service Period</th>
                           <th className="px-6 py-4">Amount</th>
                           <th className="px-6 py-4">Status</th>
                           <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border">
                        {BILLING_HISTORY.map((invoice) => (
                           <tr key={invoice.id} className="hover:bg-muted/30 transition-colors">
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-bold font-mono">{invoice.id}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-muted-foreground">{invoice.date}</td>
                              <td className="px-6 py-4 font-black">${invoice.amount}</td>
                              <td className="px-6 py-4">
                                 <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-emerald-700 border border-emerald-200">
                                    {invoice.status}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <button className="p-2 rounded-lg hover:bg-muted transition-all">
                                    <Download className="h-4 w-4" />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </MainLayout>
   );
}
