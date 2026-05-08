"use client";

import React from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import TaskKanban from "@/modules/tasks/components/task-kanban";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List as ListIcon, Filter } from "lucide-react";

export default function TasksPage() {
  return (
    <MainLayout>
      <div className="space-y-8 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <SectionHeader 
            title="Tasks & Todo" 
            description="Manage your personal and team tasks across projects."
          />
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-muted transition-all">
               <Filter className="h-4 w-4" />
               Filter
            </button>
            <Button className="rounded-xl font-bold px-6 py-2.5 h-auto shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-muted/20 p-4 rounded-2xl border border-border">
          <div className="flex items-center gap-6">
            <div className="text-sm">
              <span className="text-muted-foreground mr-1 font-medium">Project:</span>
              <span className="font-bold">All Projects</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground mr-1 font-medium">Assignee:</span>
              <span className="font-bold">Everyone</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-1 bg-card rounded-xl border border-border shadow-sm">
            <button className="p-2 rounded-lg bg-primary text-white shadow-sm">
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
              <ListIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <TaskKanban />
      </div>
    </MainLayout>
  );
}
