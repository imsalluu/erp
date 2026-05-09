"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PLANS = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for small teams just getting started.",
    features: [
      "Up to 20 Employees",
      "Basic Time Tracking",
      "Leave Management",
      "Standard Support",
      "5GB Storage",
    ],
  },
  {
    name: "Professional",
    price: "$149",
    popular: true,
    description: "Everything you need to run a growing organization.",
    features: [
      "Up to 100 Employees",
      "Advanced KPI & Analytics",
      "Project & Task Management",
      "Shift Scheduling",
      "Multi-Tenant Support (3)",
      "Priority Support",
      "50GB Storage",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Unlimited scale and control for large enterprises.",
    features: [
      "Unlimited Employees",
      "Unlimited Tenants",
      "Custom Workflows & API",
      "Payroll Integrations",
      "Role-Based Access Control",
      "24/7 Dedicated Support",
      "Unlimited Storage",
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-muted/20 border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Simple, <span className="text-primary">transparent pricing.</span>
          </h2>
          <p className="text-lg text-muted-foreground pt-2">
            No hidden fees. Scale your platform as your company grows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`rounded-3xl p-8 flex flex-col relative transition-all duration-300 ${
                plan.popular 
                  ? "bg-primary text-white shadow-2xl scale-105 z-10 ring-4 ring-primary/20" 
                  : "bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-primary rounded-full text-xs font-black uppercase tracking-widest shadow-md">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={`text-xl font-bold ${plan.popular ? "text-white" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-2 text-sm ${plan.popular ? "text-white/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                {plan.price !== "Custom" && <span className={`text-sm ml-2 ${plan.popular ? "text-white/80" : "text-muted-foreground"}`}>/mo</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className={`h-5 w-5 shrink-0 ${plan.popular ? "text-white/80" : "text-primary"}`} />
                    <span className={plan.popular ? "text-white" : "text-muted-foreground"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.popular ? "secondary" : "default"}
                size="lg" 
                asChild
                className={`w-full rounded-xl font-bold h-14 ${plan.popular ? "text-primary hover:bg-white" : ""}`}
              >
                <Link href="/login">
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
