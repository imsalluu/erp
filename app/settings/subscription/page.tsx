"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { SUBSCRIPTION_PLANS } from "@/mock-data/detailed-mock-data";
import { Check, ArrowRight, ShieldCheck, Zap, Globe, ZapOff } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SubscriptionPage() {
   const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

   return (
      <MainLayout>
         <div className="space-y-12 pb-20">
            <SectionHeader
               title="Plans & Subscriptions"
               description="Manage your enterprise license, upgrade features, and review billing limits."
               badge="SaaS Ops"
            />

            {/* Billing Toggle */}
            <div className="flex flex-col items-center gap-6">
               <div className="flex items-center gap-4 bg-muted/20 p-2 rounded-2xl border border-border">
                  <button
                     onClick={() => setBillingCycle("monthly")}
                     className={cn("px-8 py-3 rounded-xl text-sm font-bold transition-all", billingCycle === "monthly" ? "bg-card text-primary shadow-sm border border-border" : "text-muted-foreground hover:text-foreground")}
                  >
                     Monthly
                  </button>
                  <button
                     onClick={() => setBillingCycle("yearly")}
                     className={cn("px-8 py-3 rounded-xl text-sm font-bold transition-all", billingCycle === "yearly" ? "bg-card text-primary shadow-sm border border-border" : "text-muted-foreground hover:text-foreground")}
                  >
                     Yearly <span className="text-[10px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded ml-1">-20%</span>
                  </button>
               </div>
            </div>

            {/* Pricing Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
               {SUBSCRIPTION_PLANS.map((plan, i) => (
                  <motion.div
                     key={plan.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className={cn(
                        "relative flex flex-col p-8 rounded-3xl border transition-all hover:scale-[1.02] cursor-pointer group",
                        plan.recommended ? "bg-card border-primary ring-4 ring-primary/5 shadow-2xl scale-105 z-10" : "bg-card border-border shadow-sm hover:border-primary/50"
                     )}
                  >
                     {plan.recommended && (
                        <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                           Recommended
                        </div>
                     )}

                     <div className="flex flex-col gap-1">
                        <h4 className="text-xl font-black tracking-tight">{plan.name}</h4>
                        <div className="flex items-baseline gap-1 mt-4">
                           <span className="text-4xl font-black tracking-tighter">${billingCycle === "monthly" ? plan.price : Math.round(plan.price * 0.8 * 12)}</span>
                           <span className="text-sm font-bold text-muted-foreground">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                        </div>
                     </div>

                     <div className="mt-8 space-y-4 flex-1">
                        {plan.features.map((feature, j) => (
                           <div key={j} className="flex items-center gap-3">
                              <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                 <Check className="h-3 w-3" />
                              </div>
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{feature}</span>
                           </div>
                        ))}
                     </div>

                     <button className={cn(
                        "mt-10 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                        plan.recommended ? "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90" : "bg-muted text-foreground hover:bg-primary hover:text-white"
                     )}>
                        {plan.recommended ? "Upgrade Now" : "Choose Plan"}
                     </button>
                  </motion.div>
               ))}
            </div>

            {/* Feature Comparison Placeholder */}
            <div className="rounded-3xl border border-border bg-card p-10 shadow-sm">
               <h3 className="text-2xl font-black text-center mb-10">Compare our features</h3>
               <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                     <thead>
                        <tr className="border-b border-border">
                           <th className="py-6 font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Feature</th>
                           <th className="py-6 font-bold text-center">Starter</th>
                           <th className="py-6 font-bold text-center text-primary">Professional</th>
                           <th className="py-6 font-bold text-center">Enterprise</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border">
                        <ComparisonRow feature="User Management" starter="10" prof="50" ent="Unlimited" />
                        <ComparisonRow feature="KPI Tracking" starter={false} prof={true} ent={true} />
                        <ComparisonRow feature="API Access" starter={false} prof={true} ent={true} />
                        <ComparisonRow feature="Custom Domains" starter={false} prof={false} ent={true} />
                        <ComparisonRow feature="SLA Support" starter={false} prof={false} ent={true} />
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </MainLayout>
   );
}

function ComparisonRow({ feature, starter, prof, ent }: { feature: string; starter: any; prof: any; ent: any }) {
   const renderCell = (val: any) => {
      if (typeof val === "boolean") {
         return val ? <Check className="h-4 w-4 text-emerald-500 mx-auto" /> : <ZapOff className="h-4 w-4 text-muted-foreground/30 mx-auto" />;
      }
      return <span className="font-bold">{val}</span>;
   };

   return (
      <tr>
         <td className="py-6 font-bold">{feature}</td>
         <td className="py-6 text-center">{renderCell(starter)}</td>
         <td className="py-6 text-center text-primary bg-primary/5">{renderCell(prof)}</td>
         <td className="py-6 text-center">{renderCell(ent)}</td>
      </tr>
   );
}
