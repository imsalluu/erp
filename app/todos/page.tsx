"use client";

import React from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader, StatCard } from "@/modules/dashboard/components/dashboard-ui";
import TodoKanban from "@/modules/todos/components/todo-kanban";
import { ListTodo, CheckSquare, Zap, Clock } from "lucide-react";

export default function TodosPage() {
  return (
    <MainLayout>
      <div className="space-y-10 pb-20">
        <SectionHeader 
          title="Team & Personal Tasks" 
          description="Track your daily agenda, manage project tasks, and collaborate on shared todos."
          badge="Productivity"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
           <StatCard label="Tasks Done" value="12" change="+3" trend="up" icon={CheckSquare} />
           <StatCard label="In Progress" value="8" trend="down" icon={Zap} />
           <StatCard label="Blocked" value="2" icon={Clock} />
           <StatCard label="Avg. Velocity" value="4.2" trend="up" icon={Zap} />
        </div>

        <TodoKanban />
      </div>
    </MainLayout>
  );
}
