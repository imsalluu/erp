"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Briefcase, Users, KanbanSquare, Pickaxe, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ROLES = [
  { id: "admin", name: "System Admin", icon: ShieldAlert, color: "text-rose-500 bg-rose-500/10", border: "border-rose-500/20", content: "Manages platform-wide settings, tenants, and global subscriptions without accessing business-sensitive operational data." },
  { id: "owner", name: "Business Owner", icon: Briefcase, color: "text-amber-500 bg-amber-500/10", border: "border-amber-500/20", content: "Has absolute authority over their tenant. Can configure company settings, view analytics, and manage all HR and Project workflows." },
  { id: "hr", name: "HR Manager", icon: Users, color: "text-indigo-500 bg-indigo-500/10", border: "border-indigo-500/20", content: "Oversees employee lifecycles, payroll disbursements, shift scheduling, and approves organizational leave requests." },
  { id: "pm", name: "Project Manager", icon: KanbanSquare, color: "text-emerald-500 bg-emerald-500/10", border: "border-emerald-500/20", content: "Creates and tracks projects, assigns teams, monitors sprint velocity, and views project-specific KPIs." },
  { id: "supervisor", name: "Supervisor", icon: Pickaxe, color: "text-cyan-500 bg-cyan-500/10", border: "border-cyan-500/20", content: "Approves timesheets, assigns daily tasks, and monitors immediate team performance and attendance." },
  { id: "employee", name: "Employee", icon: User, color: "text-blue-500 bg-blue-500/10", border: "border-blue-500/20", content: "Accesses personal workspace to clock in/out, view payslips, update assigned tasks, and request time off." },
];

export default function RolesSection() {
  const [activeRole, setActiveRole] = useState(ROLES[0].id);

  const activeData = ROLES.find((r) => r.id === activeRole) || ROLES[0];

  return (
    <section className="py-24 bg-muted/20 border-y border-border relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Enterprise-Grade <span className="text-primary">Role-Based Access</span> Control
          </h2>
          <p className="text-lg text-muted-foreground pt-2">
            Strict separation of concerns natively built-in. Grant exactly the right access to the right people.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Vertical Tabs */}
          <div className="w-full lg:w-1/3 space-y-2">
            {ROLES.map((role) => {
              const Icon = role.icon;
              const isActive = activeRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left",
                    isActive 
                      ? "bg-card border border-border shadow-md" 
                      : "hover:bg-muted border border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <div className={cn("h-10 w-10 flex flex-shrink-0 items-center justify-center rounded-xl", isActive ? role.color : "bg-muted text-muted-foreground")}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={cn("font-bold", isActive ? "text-foreground" : "text-muted-foreground")}>
                    {role.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content Display */}
          <div className="w-full lg:w-2/3 h-full min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "w-full rounded-3xl p-8 md:p-12 border bg-card shadow-2xl relative overflow-hidden",
                  activeData.border
                )}
              >
                <div className={cn("absolute -top-10 -right-10 h-40 w-40 rounded-full blur-[80px]", activeData.color)} />
                <div className="relative z-10 flex flex-col gap-6">
                  <div className={cn("h-16 w-16 flex items-center justify-center rounded-2xl", activeData.color)}>
                    <activeData.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-black">{activeData.name}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {activeData.content}
                  </p>
                  
                  <div className="pt-8 border-t border-border mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Placeholder metrics or capabilities */}
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className={cn("h-full w-[70%]", activeData.color.split(' ')[0].replace('text-', 'bg-'))} style={{ width: `${Math.random() * 50 + 30}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
