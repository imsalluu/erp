"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import ProjectCard from "@/modules/projects/components/project-card";
import { MOCK_PROJECTS } from "@/mock-data";
import { Plus, LayoutGrid, List } from "lucide-react";
import { useState } from "react";

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <SectionHeader 
            title="Projects Portfolio" 
            description="Manage and track company-wide projects and resources."
          />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-lg border border-border p-1 bg-card shadow-sm">
              <button 
                onClick={() => setView("grid")}
                className={cn("p-1.5 rounded-md transition-all", view === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setView("list")}
                className={cn("p-1.5 rounded-md transition-all", view === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
              <Plus className="h-4 w-4" />
              New Project
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          
          {/* Empty state for new project */}
          <button className="rounded-xl border-2 border-dashed border-border p-6 flex flex-col items-center justify-center text-center gap-3 text-muted-foreground hover:border-primary hover:text-primary transition-all group">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Plus className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold">Add New Project</p>
              <p className="text-xs">Create a workspace for your team.</p>
            </div>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
