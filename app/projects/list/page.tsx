"use client";

import React from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { PROJECTS } from "@/mock-data/detailed-mock-data";
import ProjectCard from "@/modules/projects/components/project-card";
import { Plus, Search, Filter, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProjectListPage() {
   const [view, setView] = useState<"grid" | "list">("grid");

   return (
      <MainLayout>
         <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <SectionHeader
                  title="Project Portfolio"
                  description="Manage client projects, track delivery milestones, and allocate resources."
                  badge="Strategic Ops"
               />
               <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-muted transition-all">
                     <Filter className="h-4 w-4" />
                     Filter
                  </button>
                  <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                     <Plus className="h-4 w-4" />
                     Start New Project
                  </button>
               </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-muted/20 p-4 rounded-2xl border border-border">
               <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                     placeholder="Search projects by name, client or manager..."
                     className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary transition-all shadow-sm"
                  />
               </div>
               <div className="flex items-center gap-2 p-1 bg-card rounded-xl border border-border shadow-sm">
                  <button
                     onClick={() => setView("grid")}
                     className={cn("p-2 rounded-lg transition-all", view === "grid" ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground")}
                  >
                     <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                     onClick={() => setView("list")}
                     className={cn("p-2 rounded-lg transition-all", view === "list" ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground")}
                  >
                     <List className="h-4 w-4" />
                  </button>
               </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
               {PROJECTS.map((project) => (
                  <ProjectCard key={project.id} project={project} />
               ))}
            </div>
         </div>
      </MainLayout>
   );
}
