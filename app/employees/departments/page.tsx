"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { DEPARTMENTS } from "@/mock-data/detailed-mock-data";
import { Building2, Plus, Users, ArrowUpRight, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

export default function DepartmentsPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <SectionHeader 
            title="Department Management" 
            description="Manage organizational units, leads, and staff allocation."
          />
          <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <Plus className="h-5 w-5" />
            Add Department
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((dept, i) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Building2 className="h-6 w-6" />
                </div>
                <button className="text-muted-foreground hover:bg-muted p-1 rounded-lg transition-all">
                   <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold tracking-tight">{dept.name}</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium uppercase text-[10px] tracking-widest">Department Lead</span>
                    <span className="font-bold">{dept.lead}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium uppercase text-[10px] tracking-widest">Team Size</span>
                    <div className="flex items-center gap-1.5 font-black text-primary">
                      <Users className="h-4 w-4" />
                      {dept.count}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-center justify-center">
                 <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-3 transition-all">
                   Manage Resources
                   <ArrowUpRight className="h-4 w-4" />
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
