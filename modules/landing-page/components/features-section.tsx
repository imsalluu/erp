"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, CalendarClock, PlaneTakeoff, 
  BarChart4, Briefcase, CheckSquare, 
  Clock, LineChart, Building2, CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "Employee Management",
    description: "Onboard, manage, and scale your workforce with comprehensive profiles and secure document vaults.",
    icon: Users,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Attendance Tracking",
    description: "Real-time clock-ins, biometric integrations, and automated daily timesheets.",
    icon: CalendarClock,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "Leave Management",
    description: "Streamline time-off requests, approval workflows, and automated balance calculations.",
    icon: PlaneTakeoff,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    title: "KPI & Performance",
    description: "Drive growth with goal setting, 360-degree reviews, and objective key results mapping.",
    icon: BarChart4,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Project Management",
    description: "Organize teams, assign resources, track budgets, and monitor project health effortlessly.",
    icon: Briefcase,
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    title: "Task Management",
    description: "Kanban boards, sub-tasks, dependencies, and real-time collaboration for maximum productivity.",
    icon: CheckSquare,
    color: "bg-rose-500/10 text-rose-500",
  },
  {
    title: "Shift Management",
    description: "Build robust schedules, handle night shifts, and manage overtime policies with ease.",
    icon: Clock,
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    title: "Reports & Analytics",
    description: "Deep dive into your organization's data with dynamic charts and exportable metrics.",
    icon: LineChart,
    color: "bg-teal-500/10 text-teal-500",
  },
  {
    title: "Multi-Tenant Control",
    description: "Manage multiple companies, subsidiaries, or clients from a single root admin dashboard.",
    icon: Building2,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Subscription Management",
    description: "Automated billing, feature gating, and usage monitoring for your enterprise tenants.",
    icon: CreditCard,
    color: "bg-slate-500/10 text-slate-500",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
            Platform Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Everything you need to <span className="text-muted-foreground/50">run your business.</span>
          </h2>
          <p className="text-lg text-muted-foreground pt-2">
            Eliminate context switching. Unify your HR, project management, and operations in a single source of truth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            // Make the first two cards slightly larger in an asymmetric grid
            const isFeatured = i === 0 || i === 1;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={cn(
                  "group rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-all relative overflow-hidden",
                  isFeatured ? "md:col-span-2 lg:col-span-2 xl:col-span-2 p-8" : ""
                )}
              >
                <div className={cn("inline-flex items-center justify-center rounded-2xl mb-6", feature.color, isFeatured ? "h-16 w-16" : "h-14 w-14")}>
                  <Icon className={isFeatured ? "h-8 w-8" : "h-6 w-6"} />
                </div>
                
                <h3 className={cn("font-bold tracking-tight text-foreground group-hover:text-primary transition-colors", isFeatured ? "text-2xl" : "text-xl")}>
                  {feature.title}
                </h3>
                
                <p className="mt-3 text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>

                {isActiveIndicator(i) && (
                  <div className="absolute bottom-6 right-6 h-2 w-2 rounded-full bg-primary animate-pulse" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Small helper to randomly show pulses on some cards
function isActiveIndicator(index: number) {
  return [0, 1, 4, 7].includes(index);
}
